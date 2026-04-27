import React from 'react'
import { TIME_SLOTS } from '../constants'
import { getDateStr, formatDate } from '../utils/date'
import styles from './TimeSlotPicker.module.css'

interface TimeSlotPickerProps {
  dayOffset: number
  selectedSlot: string | null
  isSlotOccupied: (date: string, slot: string) => boolean
  onDayChange: (dir: -1 | 1) => void
  onSlotSelect: (slot: string) => void
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  dayOffset,
  selectedSlot,
  isSlotOccupied,
  onDayChange,
  onSlotSelect,
}) => {
  const dateStr = getDateStr(dayOffset)
  const label =
    formatDate(dateStr) +
    (dayOffset === 0 ? ' (hoy)' : dayOffset === 1 ? ' (mañana)' : '')

  return (
    <>
      <div className={styles.dateNav}>
        <button
          type="button"
          onClick={() => onDayChange(-1)}
          disabled={dayOffset === 0}
          className={styles.navBtn}
        >
          ←
        </button>
        <span className={styles.dateLabel}>{label}</span>
        <button
          type="button"
          onClick={() => onDayChange(1)}
          disabled={dayOffset === 6}
          className={styles.navBtn}
        >
          →
        </button>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotAvailable}`} /> Disponible
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotOccupied}`} /> Ocupado
        </span>
      </div>

      <div className={styles.grid}>
        {TIME_SLOTS.map((slot) => {
          const occupied = isSlotOccupied(dateStr, slot)
          const isSelected = selectedSlot === slot && !occupied
          return (
            <button
              key={slot}
              type="button"
              disabled={occupied}
              onClick={() => !occupied && onSlotSelect(slot)}
              className={`${styles.slot} ${occupied ? styles.occupied : ''} ${isSelected ? styles.selected : ''}`}
            >
              {occupied ? `${slot} ✕` : slot}
            </button>
          )
        })}
      </div>
    </>
  )
}
