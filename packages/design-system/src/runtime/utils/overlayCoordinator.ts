type CloseHandler = () => void

let activeCloser: CloseHandler | null = null

export function openOverlay(close: CloseHandler) {
  if (activeCloser && activeCloser !== close) {
    activeCloser()
  }

  activeCloser = close
}

export function closeOverlay(close: CloseHandler) {
  if (activeCloser === close) {
    activeCloser = null
  }
}
