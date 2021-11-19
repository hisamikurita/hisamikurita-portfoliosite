export const preEvent = (e) => {
  e.preventDefault()
}

export const preEventTouch = (e) => {
  if(e.cancelable){
    e.preventDefault();
  }
}
