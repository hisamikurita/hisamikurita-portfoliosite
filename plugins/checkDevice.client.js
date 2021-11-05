const ua = navigator.userAgent.toLowerCase()
const sp = ua.includes('iphone') !== -1 || (ua.includes('android') !== -1 && ua.includes('mobile') !== -1)
const ipad = ua.includes('ipad') !== -1 || (ua.includes('macintosh') !== -1 && 'ontouchend' in document)
const tab = !sp && (ipad || ua.includes('android') !== -1)
const touch = 'ontouchend' in document
const msie = ua.includes('msie') !== -1 || ua.includes('trident') !== -1
const edge = ua.includes('edge') !== -1
const safari = ua.includes('safari') !== -1 && ua.includes('chrome') === -1
const android = ua.includes('android') !== -1

const checkDevice = {
  /**
   * @description SPデバイスだったときは true を返す
   */
  isSp() {
    if (sp) {
      return true
    } else {
      return false
    }
  },

  /**
   * @description Androidデバイスだったときは true を返す
   */
  isAndroid() {
    if (android) {
      return true
    } else {
      return false
    }
  },

  /**
   * @description タブレットデバイスだったときは true を返す
   */
  isTab() {
    if (tab) {
      return true
    } else {
      return false
    }
  },

  /**
   * @description タッチイベントが可能だったときは true を返す
   */
  isTouch() {
    if (touch) {
      return true
    } else {
      return false
    }
  },

  /**
   * @description IEブラウザだったときは true を返す
   */
  isMSIE() {
    if (msie) {
      return true
    } else {
      return false
    }
  },

  /**
   * @description Edgeブラウザだったときは true を返す
   */
  isEdge() {
    if (edge) {
      return true
    } else {
      return false
    }
  },

  /**
   * @description Safariブラウザだったときは true を返す
   */
  isSafari() {
    if (safari) {
      return true
    } else {
      return false
    }
  }
}

export default (context, inject) => {
  inject('checkDevice', checkDevice);
}