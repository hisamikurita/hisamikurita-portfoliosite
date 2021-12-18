import { reload } from "../lib/reload"
import { preEvent } from "../lib/preEvent"

const siteConfig = {
  breakPoint: 767,
  isPc: false,
  isMobile: false,
  isTouch: false,
  isNoTouch: false,
  baseDuration: 1.0,
  halfBaseDuration: 0.5,
  rotate: 3,
}

if (window.innerWidth > siteConfig.breakPoint) {
  siteConfig.isPc = true;
} else {
  siteConfig.isMobile = true;
}

if ('ontouchstart' in document.documentElement) {
  siteConfig.isTouch = true;
} else {
  siteConfig.isNoTouch = true;
}

export default (context, inject) => {
  inject('siteConfig', siteConfig);
}

/**
 * asscrollのtouchデバイス判定の仕様のカバー
 * タッチデバイスからタッチデバイスではなくなった時にリロードさせる
 * https://github.com/ashthornton/asscroll/blob/master/src/Events.js
 *
 */

let isTouchFlag = false;
if (siteConfig.isTouch) {
  window.addEventListener('mousemove', function (e) {
    if (Math.abs(e.movementX) > 0 || Math.abs(e.movementY) > 0) {
      if (isTouchFlag) return;
      reload();
      isTouchFlag = true;
    }
  });
}

/**
 * タッチデバイスではない時にホイールイベントのデフォルトの動作を止める
 */
if (siteConfig.isNoTouch) {
  window.addEventListener('wheel', preEvent, { passive: false })
}

/**
 * ブレイクポイントを跨いだ時に強制的にロードさせる
 */
const mediaQuery = window.matchMedia('(max-width: 768px)')
mediaQuery.addEventListener('change', reload)