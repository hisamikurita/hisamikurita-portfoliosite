<template>
  <span
    ref="CmnTextSegmentWrapper"
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
    },
    rotate: {
      type: Number,
      required: true,
    },
    start: {
      type: [String, Number],
      required: true,
    },
  },

  mounted() {
    this.wrapper = this.$refs.CmnTextSegmentWrapper
    this.textArray = this.$refs.CmnTextSegment
  },

  methods: {
    init: function() {
      this.$gsap.set(this.wrapper, {
        rotate: this.rotate,
        transformOrigin: this.rotate > 0 ? 'left' : 'right',
      });
      this.$gsap.set(this.textArray, {
        opacity: 1.0,
        yPercent: 103,
      });
    },

    toCenter: function() {
      this.$gsap.to(this.wrapper, {
        duration: this.$baseAnimationConfig.duration * 2.0,
        ease: this.$easing.transform,
        delay: Number(this.start),
        rotate: 0,
      })
      this.$gsap.to(this.textArray, {
        duration: this.$baseAnimationConfig.duration,
        delay: Number(this.start),
        ease: this.$easing.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: 0,
      })
    },

    toTop: function() {
      this.$gsap.to(this.wrapper, {
        duration: this.$baseAnimationConfig.duration * 2.0,
        ease: this.$easing.transform,
        delay: Number(this.start),
        rotate: this.rotate,
      })
      this.$gsap.to(this.textArray, {
        duration: this.$baseAnimationConfig.duration,
        delay: Number(this.start),
        ease: this.$easing.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: -103,
      })
    },

    toBottom: function() {
      this.$gsap.to(this.wrapper, {
        duration: this.$baseAnimationConfig.duration * 2.0,
        ease: this.$easing.transform,
        delay: Number(this.start),
        rotate: this.rotate,
      })
      this.$gsap.to(this.textArray, {
        duration: this.$baseAnimationConfig.duration,
        delay: Number(this.start),
        ease: this.$easing.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: 103,
      })
    },
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
  opacity: 0;
  white-space: break-spaces;
}
</style>