const root = document.documentElement
const viewportResize = () => {
  const width = `${window.innerWidth}`
  const height = `${window.innerHeight}`
  root.style.setProperty('--viewportWidth', `${width}px`)
  root.style.setProperty('--viewportHeight', `${height}px`)
}
viewportResize();
window.addEventListener('resize', viewportResize);

// SP用の縦リサイズ無効のHEIGHT
let spWidth = `${window.innerWidth}`
const spHeight = `${window.innerHeight}`
root.style.setProperty('--viewportSpHeight', `${spHeight}px`)

window.addEventListener('resize', () => {
  if (spWidth !== window.innerWidth) {
    spWidth = window.innerWidth;

    root.style.setProperty('--viewportSpHeight', `${spHeight}px`)
  }
});