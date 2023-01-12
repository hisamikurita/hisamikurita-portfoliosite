import { reload } from "../assets/js/reload"
import { preEvent } from "../assets/js/preEvent"

const SITECONFIG = {
  breakPoint: 767,
  isPc: false,
  isMobile: false,
  isTab: false,
  isTouch: false,
  isIpad: false,
  isNoTouch: false,
  fullDuration: 2.0,
  baseDuration: 1.0,
  shortDuration: 0.5,
  halfBaseDuration: 0.5,
  pageTransitionDuration: 800,
  firstAccess: false,
}

// 767以上のデバイスはPCをtrueにする
if (window.innerWidth >= SITECONFIG.breakPoint) {
  SITECONFIG.isPc = true;
}
// 767以下のデバイスはSPをtrueにする
if(window.innerWidth <= SITECONFIG.breakPoint){
  SITECONFIG.isMobile = true;
}
// 768以上の1280以下のデバイスはTABをtrueにする
if (window.innerWidth <= 1280 && window.innerWidth >= SITECONFIG.breakPoint) {
  SITECONFIG.isTab = true;
}

// タッチイベント判定
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
// let isTouchFlag = false;
// if (SITECONFIG.isTouch) {
//   window.addEventListener('mousemove', function (e) {
//     if (Math.abs(e.movementX) > 0 || Math.abs(e.movementY) > 0) {
//       if (isTouchFlag) return;
//       reload();
//       isTouchFlag = true;
//     }
//   });
// }

// タッチデバイスではない時にホイールイベントのデフォルトの動作を止める
if (SITECONFIG.isNoTouch) {
  window.addEventListener('wheel', preEvent, { passive: false })
}

// ブレイクポイントを跨いだ時に強制的にロードさせる
const mediaQuery = window.matchMedia('(max-width: 767px)')
mediaQuery.addEventListener('change', reload)

// セッションストレージで訪問済みかを判定する
if(sessionStorage.getItem('visited')){
  SITECONFIG.firstAccess = false;
}
else{
  SITECONFIG.firstAccess = true;
  sessionStorage.setItem('visited', 0);
}
