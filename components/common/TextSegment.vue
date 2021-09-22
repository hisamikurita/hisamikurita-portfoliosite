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
    status: {
      type: String,
      required: true,
    },
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
  watch: {
    status() {
      switch (this.status) {
        case 'isCenter':
          this.$gsap.to(this.wrapper, {
            duration: this.$duration * 2.0,
            ease: this.$easing.transform,
            delay: Number(this.start),
            rotate: 0,
          })
          this.$gsap.to(this.textArray, {
            duration: this.$duration,
            delay: Number(this.start),
            ease: this.$easing.transform,
            stagger: {
              each: 0.008,
            },
            y: 0,
          })
          break
        case 'isTop':
          this.$gsap.to(this.wrapper, {
            duration: this.$duration * 2.0,
            ease: this.$easing.transform,
            delay: Number(this.start),
            rotate: 0,
          })
          this.$gsap.to(this.textArray, {
            duration: this.$duration,
            delay: Number(this.start),
            ease: this.$easing.transform,
            stagger: {
              each: 0.008,
            },
            y: -300,
          })
          break
        case 'isBottom':
          this.$gsap.to(this.wrapper, {
            duration: this.$duration * 2.0,
            ease: this.$easing.transform,
            delay: Number(this.start),
            rotate: 0,
          })
          this.$gsap.to(this.textArray, {
            duration: this.$duration,
            delay: Number(this.start),
            ease: this.$easing.transform,
            stagger: {
              each: 0.008,
            },
            y: 300,
          })
          break
      }
    },
  },
  mounted() {
    this.wrapper = this.$refs.CmnTextSegmentWrapper
    this.textArray = this.$refs.CmnTextSegment
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
  transform: translateY(-100%);
  white-space: break-spaces;
}
</style>