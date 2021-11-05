const horizonReload = () => {
  const body = document.querySelector('body')
  body.style.opacity = 0.0
  window.location.reload()
}

export default () => {
  /**
   * ブレイクポイントを跨いだ時に強制的にロードさせる
   */
  const mediaQuery = window.matchMedia('(max-width: 768px)')
  mediaQuery.addEventListener('change', horizonReload)
}