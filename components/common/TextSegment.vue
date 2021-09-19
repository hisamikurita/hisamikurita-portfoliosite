<template>
  <span
    ref="CmnTextSegmentWrapper"
    :class="rotate"
    class="cmn-text-segment-wrapper"
  >
    <span
      v-for="(char, index) of text"
      :key="index"
      ref="CmnTextSegment"
      class="cmn-text-segment"
      v-text="char"
    >
    </span>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
    rotate: {
      type: String,
      required: true,
      default: 'rotate-right',
    },
    start: {
      type: [String, Number],
      required: true,
      default: 0,
    },
  },
  mounted() {
    this.$gsap.to(this.$refs.CmnTextSegmentWrapper, {
      duration: this.$duration * 2.0,
      ease: this.$easing.transform,
      delay: Number(this.start),
      rotate: 0,
    })

    for (let i = 0; i < this.$refs.CmnTextSegment.length; i++) {
      this.$gsap.to(this.$refs.CmnTextSegment[i], {
        duration: this.$duration,
        ease: this.$easing.transform,
        delay: Number(this.start) + i * 0.008,
        y: 0,
      })
    }
  },
}
</script>

<style lang="scss">
.cmn-text-segment-wrapper {
  display: block;
  overflow: hidden;
  white-space: nowrap;
}

.cmn-text-segment-wrapper.rotate-right {
  transform-origin: left;
  transform: rotate($base-rotate);
}

.cmn-text-segment-wrapper.rotate-left {
  transform-origin: right;
  transform: rotate(-$base-rotate);
}

.cmn-text-segment {
  display: inline-block;
  transform: translateY(100%);
  white-space: break-spaces;
}

</style>