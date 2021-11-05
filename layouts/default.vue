<template>
  <div>
    <div ref="AsscrollContainer" class="asscroll-container" asscroll-container>
      <div>
        <nuxt />
      </div>
    </div>
    <LayoutHeader></LayoutHeader>
    <LayoutHambergerMenu></LayoutHambergerMenu>
  </div>
</template>

<script>
export default {
  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
    indexPickupState: function () {
      return this.$store.getters['indexPickup/state']
    },
  },
  watch: {
    hambergerMenuState: function () {
      /**
       * ハンバガーメニューが開いた時
       */
      if (this.hambergerMenuState) {
        /**
         * asscrollを無効にする
         */
        this.$asscroll.disable({ inputOnly: true })
        if (this.$siteConfig.isPc) {
          this.$gsap.to(this.$refs.AsscrollContainer, {
            delay: 0.2,
            duration: this.$baseAnimationConfig.duration / 3.0,
            ease: this.$easing.transform,
            x: -560,
          })
        }
        window.removeEventListener('wheel', this.prEvent, { passive: false })
      }
      /**
       * ハンバガーメニューが閉じた時
       */
      else if (!this.hambergerMenuState) {
        /**
         * ピックアップセクションだった場合はasscrollを有効しない
         */
        if (!this.indexPickupState) this.$asscroll.enable()
        if (this.$siteConfig.isPc) {
          this.$gsap.to(this.$refs.AsscrollContainer, {
            delay: 0.2,
            duration: this.$baseAnimationConfig.duration / 3.0,
            ease: this.$easing.transform,
            x: 0,
          })
        }
        window.addEventListener('wheel', this.prEvent, { passive: false })
      }
    },
  },
  mounted() {
    /**
     * ホイールイベントのデフォルトの動作を止める
     */
    if (!this.$checkDevice.isTouch()) {
      window.addEventListener('wheel', this.prEvent, { passive: false })
    }
  },

  methods: {
    prEvent: function (e) {
      e.preventDefault()
    },
  },
}
</script>