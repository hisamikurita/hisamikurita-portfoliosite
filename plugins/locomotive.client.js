import ASScroll from '@ashthornton/asscroll'
// import LocomotiveScroll from "locomotive-scroll";

// window.addEventListener('load', () => {
//   asscroll.enable()
// })

export default (context, inject) => {
  // const scroll = new LocomotiveScroll();
  // context.$asscroll = scroll;
  // inject('asscroll', scroll)
  const asscroll = ASScroll;
  // context.$asscroll = asscroll;
  inject('asscroll', asscroll)
}