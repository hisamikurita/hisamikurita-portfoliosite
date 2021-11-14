const root = document.documentElement

export default () => {
  const viewportResize = () => {
    const width = `${window.innerWidth}`
    const height = `${window.innerHeight}`
    root.style.setProperty('--viewportWidth', `${width}px`)
    root.style.setProperty('--viewportHeight', `${height}px`)
  }

  window.addEventListener('load', viewportResize);
  window.addEventListener('resize', viewportResize);
}