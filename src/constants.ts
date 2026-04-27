import type { Service } from '../types'

export const SERVICES: Service[] = [
  { id: 'basic', name: 'Lavado básico', price: 25, duration: '45 min', durationMin: 45 },
  { id: 'premium', name: 'Lavado premium', price: 45, duration: '75 min', durationMin: 75 },
  { id: 'detailing', name: 'Full detailing', price: 120, duration: '3 hrs', durationMin: 180 },
]

export const TIME_SLOTS: string[] = [
  '08:00', '08:45', '09:30', '10:15', '11:00', '11:45',
  '13:00', '13:45', '14:30', '15:15', '16:00', '16:45',
]

export const STORAGE_KEY = 'cw_bookings_v1'

export const DAYS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
export const MONTHS_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
