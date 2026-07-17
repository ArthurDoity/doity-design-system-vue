import { ref, readonly } from 'vue'

export interface DoityToastAction {
  label: string
  onClick?: () => void
}

export interface DoityToastOptions {
  id?: string
  /** Título (acima da description, ou mensagem principal se não houver description) */
  title?: string
  /** Texto secundário ou mensagem principal */
  description?: string
  /**
   * default — só texto
   * success | info | warning | error — ícone + texto
   * loading — spinner (não auto-dismiss por padrão)
   */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading'
  /** Botão de ação (ex.: Undo) — Figma com action */
  action?: DoityToastAction
  /** ms; 0 = não fecha sozinho. loading default: 0 */
  duration?: number
}

export type DoityToastItem = Required<Pick<DoityToastOptions, 'id'>> & DoityToastOptions

const toasts = ref<DoityToastItem[]>([])
let counter = 0

export function useDoityToast() {
  function toast(options: string | DoityToastOptions) {
    const base: DoityToastOptions =
      typeof options === 'string'
        ? { description: options, variant: 'default' }
        : { variant: 'default', ...options }

    const isLoading = base.variant === 'loading'
    const item: DoityToastItem = {
      id: base.id ?? `toast-${++counter}`,
      duration: isLoading ? 0 : 4000,
      ...base,
    }

    toasts.value = [...toasts.value, item]

    const duration = item.duration ?? (isLoading ? 0 : 4000)
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

  function loading(description = 'Loading...') {
    return toast({ description, variant: 'loading', duration: 0 })
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
    loading,
    dismiss,
    dismissAll,
  }
}
