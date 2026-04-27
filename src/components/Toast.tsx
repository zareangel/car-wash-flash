import React from 'react'
import styles from './Toast.module.css'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  visible: boolean
}

export const Toast: React.FC<ToastProps> = ({ message, type, visible }) => (
  <div className={`${styles.toast} ${styles[type]} ${visible ? styles.show : ''}`}>
    {message}
  </div>
)
