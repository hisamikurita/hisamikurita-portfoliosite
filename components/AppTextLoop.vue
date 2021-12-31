<template>
  <div ref="CmnLoopTextInner" class="cmn-loop-text-inner">
    <div ref="CmnLoopTextWrapper" class="cmn-loop-text-wrapper">
      <span v-for="num in 3" :key="num" ref="CmnLoopTextBlock" class="cmn-loop-text-block">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      default: 0,
    },
    rotate: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      default: '',
    },
    loop: {
      type: String,
      default: '',
    },
    loopdirection: {
      type: String,
      default: 'right',
    },
  },
  data: () => {
    return {
      position: { value: 0 },
      tweenPosition: { value: 0 },
      isScrollDirection: { value: -1 },
      scrollDirectionFlag: false,
      startPos: 0,
      scrollSpeed: 2.0,
      tweenScrollSpeed: 0.04,
      direction: 0,
    }
  },

  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
  },

  watch: {
    loop: function () {
      switch (this.loop) {
        case 'isActive':
          this.tweenPosition.value = this.$asscroll.currentPos
          this.$asscroll.on('scroll', this.onScrollDirection)
          this.$asscroll.on('scroll', this.onScrollTween)
          this.$gsap.ticker.add(this.render)
          break
        case 'isNoActive':
          this.$asscroll.off('scroll', this.onScrollDirection)
          this.$asscroll.off('scroll', this.onScrollTween)
          this.$gsap.ticker.remove(this.render)
          break
      }
    },
  },

  mounted() {
    this.direction = 0

    if (this.loopdirection === 'right') {
      this.direction = -1.0
    } else if (this.loopdirection === 'left') {
      this.direction = 1.0
    }
  },

  beforeDestroy() {
    this.$asscroll.off('scroll', this.onScrollDirection)
    this.$asscroll.off('scroll', this.onScrollTween)
    this.$gsap.ticker.remove(this.render)
  },

  methods: {
    onScrollDirection: function () {
      if (this.scrollDirectionFlag || this.hambergerMenuState) return

      const currentPos = this.$asscroll.currentPos
      if (currentPos > this.startPos) {
        this.$gsap.to(this.isScrollDirection, {
          duration: this.$siteConfig.baseDuration / 2.0,
          ease: 'none',
          value: -1,
        })
      } else {
        this.$gsap.to(this.isScrollDirection, {
          duration: this.$siteConfig.baseDuration / 2.0,
          ease: 'none',
          value: 1,
        })
      }
      this.startPos = currentPos

      this.scrollDirectionFlag = true
      setTimeout(() => {
        this.scrollDirectionFlag = false
      }, 500)
    },

    onScrollTween: function () {
      if (this.hambergerMenuState) return

      this.$gsap.to(this.tweenPosition, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: 'none',
        value: this.$asscroll.currentPos,
      })
    },

    render: function () {
      if (this.hambergerMenuState) return

      const standard = this.$refs.CmnLoopTextBlock[0].clientWidth;
      this.position.value += Math.floor(this.direction * ((this.scrollSpeed * this.isScrollDirection.value) - (this.$asscroll.currentPos - this.tweenPosition.value) * this.tweenScrollSpeed))

      if (this.position.value < -standard) {
        this.position.value = 0
      }
      else if(this.position.value > standard){
        this.position.value = 0
      }

      this.$refs.CmnLoopTextInner.style.transform = `translate3d(${-standard}px, 0, 0)`
      this.$refs.CmnLoopTextWrapper.style.transform = `translate3d(${this.position.value}px, 0, 0)`
    },
  },
}
</script>

<style lang="scss">
.cmn-loop-text-inner {
  width: max-content;
  overflow: hidden;
}

.cmn-loop-text-wrapper {
  display: flex;
  position: relative;
}

.cmn-loop-text-block{
  padding: 0 vw(6);
}
</style>