const ua = navigator.userAgent.toLowerCase()
const android = ua.includes('android')
const windows = ua.includes('windows nt')
const safari = ua.includes('safari')

const checkDevice = {
  isAndroid: false,
  isWindows: false,
  isSafari: false,
}

if (android) {
  checkDevice.isAndroid = true
} else if (windows) {
  checkDevice.isWindows = true
} else if (safari) {
  checkDevice.isSafari = true
}

export default (context, inject) => {
  inject('checkDevice', checkDevice)
}
