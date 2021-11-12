import ASScroll from '@ashthornton/asscroll'

export default ({ app }, inject) => {
  /**
   * 初期化
   */
  const asscroll = new ASScroll({
    ease: 0.09,
    touchScrollType: 'none',
    customScrollbar: false,
  });
  inject('asscroll', asscroll);
}