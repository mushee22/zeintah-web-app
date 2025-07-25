"use client"

import * as React from "react"
import { CheckCircle } from "lucide-react"

import { Toast, ToastClose, ToastDescription, ToastTitle } from "./toast"

interface ToastContextType {
  showToast: (props: {
    title?: string
    description?: string
    variant?: "default" | "destructive" | "success"
    duration?: number
  }) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<Array<{
    id: string
    title?: string
    description?: string
    variant?: "default" | "destructive" | "success"
    duration?: number
  }>>([])

  const showToast = React.useCallback((props: {
    title?: string
    description?: string
    variant?: "default" | "destructive" | "success"
    duration?: number
  }) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, ...props }
    
    setToasts((prev) => [...prev, newToast])

    // Auto remove toast after duration
    const duration = props.duration ?? 5000
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, duration)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            className="min-w-[300px] md:min-w-[400px]"
          >
            <div className="flex items-start gap-3">
              {toast.variant === "success" && (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                {toast.description && (
                  <ToastDescription>{toast.description}</ToastDescription>
                )}
              </div>
            </div>
            <ToastClose onClick={() => removeToast(toast.id)} />
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  )
} 