import React, { useState, useMemo } from 'react'
import type { Booking, AdminFilter } from '../types'
import { SERVICES } from '../constants'
import { formatDate, getDateStr, getInitials, isToday } from '../utils/date'
import styles from './AdminPanel.module.css'

interface AdminPanelProps {
  bookings: Booking[]
  onDelete: (id: number) => void
}

const BADGE_CLASS: Record<string, string> = {
  basic: styles.badgeBasic,
  premium: styles.badgePremium,
  detailing: styles.badgeDetailing,
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ bookings, onDelete }) => {
  const [filter, setFilter] = useState<AdminFilter>('todos')

  const todayStr = getDateStr(0)

  const stats = useMemo(() => {
    const hoy = bookings.filter((b) => b.date === todayStr)
    return {
      hoy: hoy.length,
      semana: bookings.length,
      ingresos: hoy.reduce((sum, b) => sum + b.price, 0),
    }
  }, [bookings, todayStr])

  const filtered = useMemo(() => {
    const list = filter === 'todos' ? bookings : bookings.filter((b) => b.service === filter)
    return [...list].sort((a, b) => a.date.localeCompare(b.date) || a.slot.localeCompare(b.slot))
  }, [bookings, filter])

  return (
    <div>
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Reservas hoy</p>
          <p className={`${styles.statValue} ${styles.green}`}>{stats.hoy}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total registradas</p>
          <p className={styles.statValue}>{stats.semana}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Ingresos hoy</p>
          <p className={`${styles.statValue} ${styles.green}`}>S/ {stats.ingresos}</p>
        </div>
      </div>

      <div className={styles.filterRow}>
        {(['todos', ...SERVICES.map((s) => s.id)] as AdminFilter[]).map((f) => (
          <button
            key={f}
            type="button"
            className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'todos' ? 'Todos' : SERVICES.find((s) => s.id === f)?.name ?? f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>Sin reservas aún</p>
      ) : (
        <div className={styles.list}>
          {filtered.map((b) => (
            <div key={b.id} className={styles.item}>
              <div className={styles.avatar}>{getInitials(b.nombre)}</div>
              <div className={styles.info}>
                <p className={styles.name}>
                  {b.nombre}
                  {b.placa && <span className={styles.placa}> · {b.placa}</span>}
                  {isToday(b.date) && <span className={styles.todayBadge}>hoy</span>}
                </p>
                <p className={styles.meta}>
                  {formatDate(b.date)} a las {b.slot}
                  {b.telefono && ` · ${b.telefono}`}
                </p>
              </div>
              <div className={styles.right}>
                <span className={`${styles.badge} ${BADGE_CLASS[b.service] ?? styles.badgeBasic}`}>
                  {b.serviceName}
                </span>
                <p className={styles.price}>S/ {b.price}</p>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => onDelete(b.id)}
                  title="Cancelar reserva"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
