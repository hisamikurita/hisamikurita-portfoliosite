import { reload } from "../assets/js/reload"
import { preEvent } from "../assets/js/preEvent"

const SITECONFIG = {
  breakPoint: 767,
  isPc: false,
  isMobile: false,
  isTouch: false,
  isNoTouch: false,
  fullDuration: 2.0,
  baseDuration: 1.0,
  halfBaseDuration: 0.5,
}

if (window.innerWidth > SITECONFIG.breakPoint) {
  SITECONFIG.isPc = true;
} else {
  SITECONFIG.isMobile = true;
}

if ('ontouchstart' in document.documentElement) {
  SITECONFIG.isTouch = true;
} else {
  SITECONFIG.isNoTouch = true;
}

export default (context, inject) => {
  inject('SITECONFIG', SITECONFIG);
}

/**
 * asscrollのtouchデバイス判定の仕様のカバー
 * タッチデバイスからタッチデバイスではなくなった時にリロードさせる
 * https://github.com/ashthornton/asscroll/blob/master/src/Events.js
 *
 */

let isTouchFlag = false;
if (SITECONFIG.isTouch) {
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
if (SITECONFIG.isNoTouch) {
  window.addEventListener('wheel', preEvent, { passive: false })
}

/**
 * ブレイクポイントを跨いだ時に強制的にロードさせる
 */
const mediaQuery = window.matchMedia('(max-width: 768px)')
mediaQuery.addEventListener('change', reload)