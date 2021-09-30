import { gsap } from 'gsap'
import { CustomEase } from '../vendor/CustomEase'
gsap.registerPlugin(CustomEase);

const baseAnimationConfig = {
  duration: 1.0,
  rotate: 3,
}

const easing = {
  transform: CustomEase.create('transform', 'M0,0 C0.44,0.05 0.17,1 1,1'),
  colorAndOpacity: CustomEase.create('colorAndOpacity', 'M0,0 C0.26,0.16 0.1,1 1,1 '),
}

export default (context, inject) => {
  inject('gsap', gsap);
  inject('easing', easing);
  inject('baseAnimationConfig', baseAnimationConfig);
}



