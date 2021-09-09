<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span ref="cmnTextSegmentWrapper" class="cmn-text-segment-wrapper" v-html="toTextArray"></span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
    start: {
      type: [String, Number],
      required: true,
      default: 0,
    },
  },
  computed: {
    toTextArray() {
      let returnText = ''
      const splitTextArray = Array.from(this.text)
      const intervalTime = 0.06;
      for (let i = 0; i < splitTextArray.length; i++) {
        const animationTime = (Math.ceil((Number(this.start) + intervalTime * i) * 100) / 100) + 's';
        if (splitTextArray[i] === ' ') {
          const spanInlineTextWrapper = `<span class="cmn-text-segment" style="display: inline; animation-delay: ${animationTime};">${splitTextArray[i]}</span>`
          returnText += spanInlineTextWrapper
        } else {
          const spanInlineBlockTextWrapper = `<span class="cmn-text-segment" style="display: inline-block; animation-delay: ${animationTime};">${splitTextArray[i]}</span>`
          returnText += spanInlineBlockTextWrapper
        }
      }

      return returnText
    },
  },
  mounted(){
    this.$refs.cmnTextSegmentWrapper.classList.add('is-active');
  }
}
</script>

<style lang="scss">
.cmn-text-segment-wrapper{
  display: block;
  overflow: hidden;
}

.cmn-text-segment{
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}

.is-active .cmn-text-segment{
  animation: SlideUp $base-duration $transform-easing forwards;
}


</style>