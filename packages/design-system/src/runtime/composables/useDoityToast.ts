import { ref, readonly } from 'vue'

export interface DoityToastOptions {
  id?: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const toasts = ref<Required<Pick<DoityToastOptions, 'id'>> & DoityToastOptions[]>([])
let counter = 0

export function useDoityToast() {
  function toast(options: string | DoityToastOptions) {
    const item: DoityToastOptions & { id: string } = typeof options === 'string'
      ? { id: `toast-${++counter}`, description: options }
      : { id: `toast-${++counter}`, duration: 4000, ...options }

    toasts.value = [...toasts.value, item as typeof toasts.value[number]]

    const duration = item.duration ?? 4000
    if (duration > 0) {
      setTimeout(() => dismiss(item.id), duration)
    }

    return item.id
  }

  function success(description: string, title?: string) {
    return toast({ title, description, variant: 'success' })
  }

  function error(description: string, title?: string) {
    return toast({ title, description, variant: 'error' })
  }

  function warning(description: string, title?: string) {
    return toast({ title, description, variant: 'warning' })
  }

  function info(description: string, title?: string) {
    return toast({ title, description, variant: 'info' })
  }

  function dismiss(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function dismissAll() {
    toasts.value = []
  }

  return {
    toasts: readonly(toasts),
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
  }
}
