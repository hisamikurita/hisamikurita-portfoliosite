const root = document.documentElement
const viewportResize = () => {
  const width = `${window.innerWidth}`
  const height = `${window.innerHeight}`
  root.style.setProperty('--viewportWidth', `${width}px`)
  root.style.setProperty('--viewportHeight', `${height}px`)
}

window.addEventListener('DOMContentLoaded', viewportResize);
window.addEventListener('resize', viewportResize);