const ua = navigator.userAgent.toLowerCase()
const android = ua.includes('android')
const windows = ua.includes('windows nt')
const safari = ua.includes('safari')

const checkDevice = {
  isAndroid: false,
  isWindows: false,
  isSafari: false,
  isIpad: false,
}

if (android) {
  checkDevice.isAndroid = true
} else if (windows) {
  checkDevice.isWindows = true
} else if (safari) {
  checkDevice.isSafari = true
}

if(ua.includes('ipad') !== -1 || (ua.includes('macintosh') !== -1 && 'ontouchend' in document)){
  checkDevice.isIpad = true
}


export default (context, inject) => {
  inject('checkDevice', checkDevice)
}
