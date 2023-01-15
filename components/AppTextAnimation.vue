<template>
  <span ref="root" class="app-text-animation">
    <span ref="wrapper" class="app-text-animation-wrapper">
      <span ref="block" class="app-text-animation-block">{{ text }}</span>
    </span>
  </span>
</template>

<script>
export default {
  /**
   * text : 中身のテキスト
   * rotate : テキストを傾ける角度
   * start : 数値分アニメーションをdelayさせる
   * state : 親コンポーネントから監視されているアニメーションの状態管理用のprops
   * pcAnimation : PCでアニメーションさせるか、させないかを決める
   * spAnimation : SPでアニメーションさせるか、させないかを決める
   * */
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
    /**
     * 親コンポーネントからアニメーションの状態管理をする
     */
    state() {
      if ((!this.spAnimation && this.$SITECONFIG.isMobile) || (!this.pcAnimation && this.$SITECONFIG.isPc)) return

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
          if (this.wrapperTopAnimation) this.wrapperTopAnimation.kill()
          if (this.blockTopAnimation) this.blockTopAnimation.kill()
          if (this.wrapperCenterAnimation) this.wrapperCenterAnimation.kill()
          if (this.blockCenterAnimation) this.blockCenterAnimation.kill()
          if (this.wrapperBottomAnimation) this.wrapperBottomAnimation.kill()
          if (this.blockBottomAnimation) this.blockBottomAnimation.kill()
          this.init()
          break
      }
    },
  },

  mounted() {
    if ((!this.spAnimation && this.$SITECONFIG.isMobile) || (!this.pcAnimation && this.$SITECONFIG.isPc)) return

    this.movePercent = this.$SITECONFIG.isPc ? 105 : 127
    this.root = this.$refs.root
    this.wrapper = this.$refs.wrapper
    this.block = this.$refs.block
    this.wrapperTopAnimation = null
    this.wrapperCenterAnimation = null
    this.wrapperBottomAnimation = null
    this.blockTopAnimation = null
    this.blockCenterAnimation = null
    this.blockBottomAnimation = null

    this.init()
  },

  methods: {
    init() {
      this.$gsap.set(this.wrapper, {
        rotate: this.rotate,
        transformOrigin: this.rotate > 0 ? 'left' : 'right',
      })
      this.$gsap.set(this.block, {
        opacity: 1.0,
        yPercent: this.movePercent,
      })
    },

    setRootPointerEvent() {
      this.$gsap.set(this.root, {
        pointerEvents: 'auto',
        userSelect: 'auto',
      })
    },

    toCenter() {
      this.setRootPointerEvent()

      this.wrapperCenterAnimation = this.$gsap.to(this.wrapper, {
        duration: this.$SITECONFIG.fullDuration,
        ease: this.$EASING.transform,
        delay: this.start,
        rotate: 0,
      })
      this.blockCenterAnimation = this.$gsap.to(this.block, {
        duration: this.$SITECONFIG.baseDuration,
        delay: this.start,
        ease: this.$EASING.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: 0,
      })
    },

    toTop() {
      this.setRootPointerEvent()

      this.wrapperTopAnimation = this.$gsap.to(this.wrapper, {
        duration: this.$SITECONFIG.fullDuration,
        ease: this.$EASING.transform,
        delay: this.start,
        rotate: this.rotate,
      })
      this.blockTopAnimation = this.$gsap.to(this.block, {
        duration: this.$SITECONFIG.baseDuration,
        delay: this.start,
        ease: this.$EASING.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: -this.movePercent,
      })
    },

    toBottom() {
      this.setRootPointerEvent()

      this.wrapperBottomAnimation = this.$gsap.to(this.wrapper, {
        duration: this.$SITECONFIG.fullDuration,
        ease: this.$EASING.transform,
        delay: this.start,
        rotate: this.rotate,
      })
      this.blockBottomAnimation = this.$gsap.to(this.block, {
        duration: this.$SITECONFIG.baseDuration,
        delay: this.start,
        ease: this.$EASING.transform,
        stagger: {
          each: 0.008,
        },
        yPercent: this.movePercent,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.app-text-animation {
  display: block;
  pointer-events: none;
  user-select: none;

  @include sp() {
    position: relative;
    overflow: hidden;
  }
}

.app-text-animation-wrapper {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.app-text-animation-block {
  display: inline-block;
  opacity: 0;
  white-space: nowrap;
}
</style>
