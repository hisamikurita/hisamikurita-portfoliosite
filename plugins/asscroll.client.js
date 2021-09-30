import ASScroll from '@ashthornton/asscroll'

export default (context, inject) => {
  const asscroll = new ASScroll({
    ease: 0.09,
    touchScrollType: 'scrollTop',
    customScrollbar: false,
  });
  asscroll.enable()
  inject('asscroll', asscroll);
}