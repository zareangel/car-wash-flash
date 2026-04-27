import { useState, useCallback } from 'react'
import type { Booking, ServiceKey } from '../types'
import { STORAGE_KEY } from '../constants'

function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Booking[]) : []
  } catch {
    return []
  }
}

function saveBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  } catch {
    // silent fail
  }
}

interface AddBookingPayload {
  nombre: string
  telefono: string
  placa: string
  date: string
  slot: string
  service: ServiceKey
  serviceName: string
  price: number
}

interface UseBookingsReturn {
  bookings: Booking[]
  addBooking: (payload: AddBookingPayload) => { success: boolean; message: string }
  deleteBooking: (id: number) => void
  isSlotOccupied: (date: string, slot: string) => boolean
}

export function useBookings(): UseBookingsReturn {
  const [bookings, setBookings] = useState<Booking[]>(loadBookings)

  const isSlotOccupied = useCallback(
    (date: string, slot: string): boolean =>
      bookings.some((b) => b.date === date && b.slot === slot),
    [bookings]
  )

  const addBooking = useCallback(
    (payload: AddBookingPayload): { success: boolean; message: string } => {
      if (isSlotOccupied(payload.date, payload.slot)) {
        return { success: false, message: 'Ese horario ya está reservado' }
      }
      const newBooking: Booking = {
        ...payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      }
      setBookings((prev) => {
        const updated = [...prev, newBooking]
        saveBookings(updated)
        return updated
      })
      return { success: true, message: 'Reserva confirmada' }
    },
    [isSlotOccupied]
  )

  const deleteBooking = useCallback((id: number): void => {
    setBookings((prev) => {
      const updated = prev.filter((b) => b.id !== id)
      saveBookings(updated)
      return updated
    })
  }, [])

  return { bookings, addBooking, deleteBooking, isSlotOccupied }
}
