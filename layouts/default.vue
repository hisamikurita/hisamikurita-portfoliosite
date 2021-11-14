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
    indexPickupPos: function () {
      return this.$store.getters['indexPickup/pos']
    },
  },
  watch: {
    hambergerMenuState: function () {
      /**
       * ハンバガーメニューが開いた時
       */
      if (this.hambergerMenuState) {
        if (this.$siteConfig.isPc) {
          this.$gsap.to(this.$refs.AsscrollContainer, {
            delay: 0.2,
            duration: this.$baseAnimationConfig.duration / 3.0,
            ease: this.$easing.transform,
            x: -560,
          })
        }
        if (this.$checkDevice.isTouch()) {
          if (this.indexPickupState) {
            this.$backfaceScroll(false, this.indexPickupPos);
          }
          else{
            this.$backfaceScroll(false);
          }
        }
        else {
          /**
           * asscrollを無効にする
           */
          this.$asscroll.disable({ inputOnly: true })
          window.removeEventListener('wheel', this.prEvent, { passive: false })
        }
      }
      /**
       * ハンバガーメニューが閉じた時
       */
      else if (!this.hambergerMenuState) {
        if (this.$siteConfig.isPc) {
          this.$gsap.to(this.$refs.AsscrollContainer, {
            delay: 0.2,
            duration: this.$baseAnimationConfig.duration / 3.0,
            ease: this.$easing.transform,
            x: 0,
          })
        }
        if (this.$checkDevice.isTouch()) {
          if (!this.indexPickupState) this.$backfaceScroll(true);
        }
        else {
          /**
           * ピックアップセクションだった場合はasscrollを有効しない、それ以外は有効にする
           */
          if (!this.indexPickupState) this.$asscroll.enable()
          window.addEventListener('wheel', this.prEvent, { passive: false })
        }
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