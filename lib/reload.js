export const reload = () => {
  const body = document.querySelector('body')
  body.style.opacity = 0.0
  window.location.reload()
}
