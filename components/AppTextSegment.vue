<template>
  <span ref="CmnTextSegmentBlock" class="cmn-text-segment-block">
    <span ref="CmnTextSegmentWrapper" class="cmn-text-segment-wrapper">
      <span ref="CmnTextSegment" class="cmn-text-segment">{{ text }}</span>
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
      default: 0,
    },
    start: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      default: '',
    },
    spAnimation: {
      type: Boolean,
      default: true,
    },
    pcAnimation: {
      type: Boolean,
      default: true,
    },
  },

  watch: {
    state: function () {
      if (
        (!this.spAnimation && this.$SITECONFIG.isMobile) ||
        (!this.pcAnimation && this.$SITECONFIG.isPc)
      )
        return

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
          if (this.topWrapper) this.topWrapper.kill()
          if (this.topArray) this.topArray.kill()
          if (this.centerWrapper) this.centerWrapper.kill()
          if (this.centerArray) this.centerArray.kill()
          if (this.bottomWrapper) this.bottomWrapper.kill()
          if (this.bottomArray) this.bottomArray.kill()
          this.init()
          break
      }
    },
  },

  mounted() {
    if (
      (!this.spAnimation && this.$SITECONFIG.isMobile) ||
      (!this.pcAnimation && this.$SITECONFIG.isPc)
    )
      return

    this.textBlock = this.$refs.CmnTextSegmentBlock
    this.textWrapper = this.$refs.CmnTextSegmentWrapper
    this.textArray = this.$refs.CmnTextSegment

    this.init()
  },

  methods: {
    init() {
      this.$gsap.set(this.textWrapper, {
        rotate: this.rotate,
        transformOrigin: this.rotate > 0 ? 'left' : 'right',
      })
      this.$gsap.set(this.textArray, {
        opacity: 1.0,
        yPercent: 103.8,
      })
    },

    toCenter() {
      this.$gsap.set(this.textBlock, {
        pointerEvents: 'auto',
        userSelect: 'auto',
      })

      this.centerWrapper = this.$gsap.to(this.textWrapper, {
        duration: this.$SITECONFIG.fullDuration,
        ease: this.$EASING.transform,
        delay: Number(this.start),
        rotate: 0,
      })
      this.centerArray = this.$gsap.to(this.textArray, {
        duration: this.$SITECONFIG.baseDuration,
        delay: Number(this.start),
        ease: this.$EASING.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: 0,
      })
    },

    toTop() {
      this.$gsap.set(this.textBlock, {
        pointerEvents: 'auto',
        userSelect: 'auto',
      })

      this.topWrapper = this.$gsap.to(this.textWrapper, {
        duration: this.$SITECONFIG.fullDuration,
        ease: this.$EASING.transform,
        delay: Number(this.start),
        rotate: this.rotate,
      })
      this.topArray = this.$gsap.to(this.textArray, {
        duration: this.$SITECONFIG.baseDuration,
        delay: Number(this.start),
        ease: this.$EASING.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: -103.8,
      })
    },

    toBottom() {
      this.$gsap.set(this.textBlock, {
        pointerEvents: 'auto',
        userSelect: 'auto',
      })

      this.bottomWrapper = this.$gsap.to(this.textWrapper, {
        duration: this.$SITECONFIG.fullDuration,
        ease: this.$EASING.transform,
        delay: Number(this.start),
        rotate: this.rotate,
      })
      this.bottomArray = this.$gsap.to(this.textArray, {
        duration: this.$SITECONFIG.baseDuration,
        delay: Number(this.start),
        ease: this.$EASING.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: 103.8,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.cmn-text-segment-block {
  display: block;
  pointer-events: none;
  user-select: none;

  @include sp() {
    position: relative;
    overflow: hidden;
  }
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
