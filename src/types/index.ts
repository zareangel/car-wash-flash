export type ServiceKey = 'basic' | 'premium' | 'detailing'

export interface Service {
  id: ServiceKey
  name: string
  price: number
  duration: string
  durationMin: number
}

export interface Booking {
  id: number
  nombre: string
  telefono: string
  placa: string
  date: string
  slot: string
  service: ServiceKey
  serviceName: string
  price: number
  createdAt: string
}

export type TabView = 'reservar' | 'admin'
export type AdminFilter = 'todos' | ServiceKey
