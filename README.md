# AquaShine — Car Wash Reservas

App de reservas para car wash construida con **React 18 + Vite + TypeScript**.

## Requisitos

- Node.js 18+
- npm / pnpm / yarn

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Estructura del proyecto

```
src/
├── components/
│   ├── AdminPanel.tsx       # Panel de administración con estadísticas
│   ├── BookingForm.tsx      # Formulario de nueva reserva
│   ├── ServiceSelector.tsx  # Selector de servicio (básico/premium/detailing)
│   ├── TimeSlotPicker.tsx   # Selector de fecha y hora con bloqueo de ocupados
│   └── Toast.tsx            # Notificaciones
├── hooks/
│   ├── useBookings.ts       # Lógica de reservas + localStorage
│   └── useToast.ts          # Estado de notificaciones
├── types/
│   └── index.ts             # Tipos TypeScript compartidos
├── utils/
│   └── date.ts              # Utilidades de fecha en español
├── constants.ts             # Servicios, horarios y claves de storage
├── App.tsx                  # Componente raíz con tabs
└── main.tsx                 # Entry point
```

## Funcionalidades

- **Reserva de turno**: nombre, teléfono, placa, servicio, fecha y hora
- **Anti-duplicados**: los horarios ya reservados se bloquean visualmente
- **Panel admin**: estadísticas del día, filtros por servicio, cancelación de reservas
- **Persistencia**: las reservas se guardan en `localStorage`
- **TypeScript estricto**: todos los tipos definidos, sin `any`
