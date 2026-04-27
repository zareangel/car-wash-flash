import React, { useState } from 'react'
import { SERVICES } from '../constants'
import { getDateStr } from '../utils/date'
import type { ServiceKey } from '../types'
import { ServiceSelector } from './ServiceSelector'
import { TimeSlotPicker } from './TimeSlotPicker'
import styles from './BookingForm.module.css'

interface BookingFormProps {
  isSlotOccupied: (date: string, slot: string) => boolean
  onSubmit: (payload: {
    nombre: string
    telefono: string
    placa: string
    date: string
    slot: string
    service: ServiceKey
    serviceName: string
    price: number
  }) => { success: boolean; message: string }
}

export const BookingForm: React.FC<BookingFormProps> = ({ isSlotOccupied, onSubmit }) => {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [placa, setPlaca] = useState('')
  const [selectedService, setSelectedService] = useState<ServiceKey>('basic')
  const [dayOffset, setDayOffset] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleServiceChange = (id: ServiceKey) => {
    setSelectedService(id)
    setSelectedSlot(null)
  }

  const handleDayChange = (dir: -1 | 1) => {
    setDayOffset((prev) => Math.max(0, Math.min(6, prev + dir)))
    setSelectedSlot(null)
  }

  const handleSubmit = () => {
    setError(null)
    if (!nombre.trim()) { setError('Ingresa tu nombre'); return }
    if (!placa.trim()) { setError('Ingresa la placa del vehículo'); return }
    if (!selectedSlot) { setError('Selecciona un horario'); return }

    const service = SERVICES.find((s) => s.id === selectedService)!
    const result = onSubmit({
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      placa: placa.trim().toUpperCase(),
      date: getDateStr(dayOffset),
      slot: selectedSlot,
      service: selectedService,
      serviceName: service.name,
      price: service.price,
    })

    if (result.success) {
      setNombre('')
      setTelefono('')
      setPlaca('')
      setSelectedSlot(null)
    } else {
      setError(result.message)
    }
  }

  return (
    <div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Datos del cliente</h2>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Nombre completo</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Teléfono</label>
            <input
              type="tel"
              placeholder="Ej: 987 654 321"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Placa del vehículo</label>
          <input
            type="text"
            placeholder="Ej: ABC-123"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            style={{ textTransform: 'uppercase' }}
          />
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Servicio</h2>
        <ServiceSelector
          services={SERVICES}
          selected={selectedService}
          onSelect={handleServiceChange}
        />
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Fecha y hora</h2>
        <TimeSlotPicker
          dayOffset={dayOffset}
          selectedSlot={selectedSlot}
          isSlotOccupied={isSlotOccupied}
          onDayChange={handleDayChange}
          onSlotSelect={setSelectedSlot}
        />
      </div>

      {error && <p className={styles.errorMsg}>{error}</p>}

      <button type="button" className={styles.btnPrimary} onClick={handleSubmit}>
        Confirmar reserva
      </button>
    </div>
  )
}
