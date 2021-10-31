<template>
  <span class="cmn-text-segment-block">
    <span ref="CmnTextSegmentWrapper" class="cmn-text-segment-wrapper">
      <span
        ref="CmnTextSegment"
        class="cmn-text-segment"
      >{{ text }}</span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: [Object, String],
      required: true,
    },
    rotate: {
      type: [String, Number],
      required: true,
    },
    start: {
      type: [String, Number],
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },

  watch: {
    state: function () {
      switch (this.state) {
        case 'center':
          this.toCenter()
          break
        case 'top':
          this.toTop()
          break
        case 'bottom':
          this.toBottom()
          break
        case 'init':
          if(this.topWrapper) this.topWrapper.kill();
          if(this.topArray) this.topArray.kill();
          if(this.centerWrapper) this.centerWrapper.kill();
          if(this.centerArray) this.centerArray.kill();
          if(this.bottomWrapper) this.bottomWrapper.kill();
          if(this.bottomArray) this.bottomArray.kill();
          this.init()
          break
      }
    },
  },

  mounted() {
    this.wrapper = this.$refs.CmnTextSegmentWrapper
    this.textArray = this.$refs.CmnTextSegment
    this.init()
  },

  methods: {
    init: function () {
      this.$gsap.set(this.wrapper, {
        rotate: this.rotate,
        transformOrigin: this.rotate > 0 ? 'left' : 'right',
      })
      this.$gsap.set(this.textArray, {
        opacity: 1.0,
        yPercent: 103.5,
      })
    },

    toCenter: function () {
      this.centerWrapper = this.$gsap.to(this.wrapper, {
        duration: this.$baseAnimationConfig.duration * 2.0,
        ease: this.$easing.transform,
        delay: Number(this.start),
        rotate: 0,
      })
      this.centerArray = this.$gsap.to(this.textArray, {
        duration: this.$baseAnimationConfig.duration,
        delay: Number(this.start),
        ease: this.$easing.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: 0,
      })
    },

    toTop: function () {
      this.topWrapper = this.$gsap.to(this.wrapper, {
        duration: this.$baseAnimationConfig.duration * 2.0,
        ease: this.$easing.transform,
        delay: Number(this.start),
        rotate: this.rotate,
      })
      this.topArray = this.$gsap.to(this.textArray, {
        duration: this.$baseAnimationConfig.duration,
        delay: Number(this.start),
        ease: this.$easing.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: -103.5,
      })
    },

    toBottom: function () {
      this.bottomWrapper = this.$gsap.to(this.wrapper, {
        duration: this.$baseAnimationConfig.duration * 2.0,
        ease: this.$easing.transform,
        delay: Number(this.start),
        rotate: this.rotate,
      })
      this.bottomArray = this.$gsap.to(this.textArray, {
        duration: this.$baseAnimationConfig.duration,
        delay: Number(this.start),
        ease: this.$easing.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: 103.5,
      })
    },
  },
}
</script>

<style lang="scss">
.cmn-text-segment-block {
  display: block;
}

.cmn-text-segment-wrapper {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.cmn-text-segment {
  display: inline-block;
  opacity: 0;
  white-space: nowrap;
}
</style>