import { useState, useCallback, useRef } from 'react'

interface Toast {
  message: string
  type: 'success' | 'error'
  visible: boolean
}

interface UseToastReturn {
  toast: Toast
  showToast: (message: string, type?: 'success' | 'error') => void
}

export function useToast(): UseToastReturn {
  const [toast, setToast] = useState<Toast>({ message: '', type: 'success', visible: false })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ message, type, visible: true })
    timerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 2800)
  }, [])

  return { toast, showToast }
}
