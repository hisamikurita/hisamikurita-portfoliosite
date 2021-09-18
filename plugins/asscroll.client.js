import ASScroll from '@ashthornton/asscroll'

export default (context, inject) => {
  const asscroll = new ASScroll();
  inject('asscroll', asscroll);
}