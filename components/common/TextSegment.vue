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
    spAnimation: {
      type: Boolean,
      default: true,
    },
    isLoadInit: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    state: function () {
      if (!this.spAnimation && this.$siteConfig.isMobile) return

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
    if (!this.spAnimation && this.$siteConfig.isMobile) return

    this.wrapper = this.$refs.CmnTextSegmentWrapper
    this.textArray = this.$refs.CmnTextSegment

    if (this.isLoadInit) {
      /**
       * ハンバーガーメニューの同URLだった場合にリロードさせる処理とアニメーションが、
       * タグを書き換える際にmouted内も発火するため、バッティングする。
       * そのため初期化をロード時のみ有効化させる
       */
      this.textArray.style.opacity = 1.0
      window.addEventListener('load',()=>{
        this.init()
      })
    }
    else {
      this.init()
    }
  },

  methods: {
    init: function () {
      if (this.state === 'center') {
        this.$gsap.set(this.wrapper, {
          rotate: 0,
          transformOrigin: this.rotate > 0 ? 'left' : 'right',
        })
        this.$gsap.set(this.textArray, {
          opacity: 1.0,
          yPercent: 0,
        })
      } else {
        this.$gsap.set(this.wrapper, {
          rotate: this.rotate,
          transformOrigin: this.rotate > 0 ? 'left' : 'right',
        })
        this.$gsap.set(this.textArray, {
          opacity: 1.0,
          yPercent: 103.5,
        })
      }
    },

    toCenter: function () {
      this.$refs.CmnTextSegmentBlock.style.pointerEvents = 'auto'
      this.$refs.CmnTextSegmentBlock.style.userSelect = 'auto'

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
      this.$refs.CmnTextSegmentBlock.style.pointerEvents = 'none'
      this.$refs.CmnTextSegmentBlock.style.userSelect = 'none'

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
      this.$refs.CmnTextSegmentBlock.style.pointerEvents = 'none'
      this.$refs.CmnTextSegmentBlock.style.userSelect = 'none'

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
  pointer-events: none;
  user-select: none;
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