import ASScroll from '@ashthornton/asscroll'

/**
 * 初期化
 */
const asscroll = new ASScroll({
  ease: 0.09,
  touchScrollType: 'none',
  customScrollbar: false,
});

export default ({ app }, inject) => {
  /**
   * ロード時に再度有効化
   * https://github.com/hisamikurita/hisamikurita-portfoliosite/issues/11
   */
  window.addEventListener('load',()=>{
    asscroll.disable();
    asscroll.enable();
  });

  inject('asscroll', asscroll);
}