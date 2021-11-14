const body = document.querySelector('body')
let saveCurrentScrollTop = 0

const scrollStop = (currentScrollTop = window.pageYOffset) => {
  saveCurrentScrollTop = currentScrollTop;
  body.style.position = 'fixed'
  body.style.top = `${currentScrollTop * -1}px`
  body.style.left = '0'
  body.style.width = '100%'
  body.style.height = '100%'
}

const scrollAuto = () => {
  body.style.position = ''
  body.style.top = ''
  body.style.left = ''
  body.style.width = ''
  body.style.height = ''
  window.scrollTo(0, saveCurrentScrollTop)
}

export const backfaceScroll = (state, currentScrollTop) => {
  state ? scrollAuto() : scrollStop(currentScrollTop)
}

export default (context, inject) => {
  inject('backfaceScroll', backfaceScroll);
}