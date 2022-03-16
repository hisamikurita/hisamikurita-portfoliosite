const ua = navigator.userAgent.toLowerCase()
const android = ua.includes('android')
const windows = ua.includes('windows nt')

const checkDevice = {
  isAndroid: false,
  isWindows: false,
}

if (android) {
  checkDevice.isAndroid = true
} else if (windows) {
  checkDevice.isWindows = true
}

export default (context, inject) => {
  inject('checkDevice', checkDevice)
}
