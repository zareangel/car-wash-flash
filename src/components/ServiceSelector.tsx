import React from 'react'
import type { Service, ServiceKey } from '../types'
import styles from './ServiceSelector.module.css'

interface ServiceSelectorProps {
  services: Service[]
  selected: ServiceKey
  onSelect: (id: ServiceKey) => void
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ services, selected, onSelect }) => (
  <div className={styles.grid}>
    {services.map((s) => (
      <button
        key={s.id}
        className={`${styles.card} ${selected === s.id ? styles.active : ''}`}
        onClick={() => onSelect(s.id)}
        type="button"
      >
        <span className={styles.name}>{s.name}</span>
        <span className={styles.price}>S/ {s.price}</span>
        <span className={styles.duration}>{s.duration}</span>
      </button>
    ))}
  </div>
)
