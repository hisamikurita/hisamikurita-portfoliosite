<template>
  <div>
    <div ref="AsscrollContainer" class="asscroll-container" asscroll-container>
      <div class="asscroll" asscroll>
        <nuxt />
      </div>
    </div>
    <div ref="AsscrollContainerCover" class="asscroll-container-cover"></div>
    <BaseHeader />
    <BaseHambergerMenu />
    <!-- <div v-if="error.statusCode === 404">404</div> -->
  </div>
</template>

<script>
import { preEvent } from '../lib/preEvent'

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
        this.$refs.AsscrollContainerCover.style.pointerEvents = 'auto'

        if (this.$siteConfig.isPc) {
          this.$gsap.to(this.$refs.AsscrollContainer, {
            delay: 0.2,
            duration: this.$siteConfig.baseDuration / 3.0,
            ease: this.$easing.transform,
            x: -560,
          })
        }

        if (this.$siteConfig.isTouch) {
          this.$backfaceScroll(false)
        } else if (this.$siteConfig.isNoTouch) {
          this.$asscroll.disable({ inputOnly: true })
          window.removeEventListener('wheel', preEvent, { passive: false })
        }
      } else if (!this.hambergerMenuState) {
        /**
         * ハンバガーメニューが閉じた時
         */
        this.$refs.AsscrollContainerCover.style.pointerEvents = 'none'

        if (this.$siteConfig.isPc) {
          this.$gsap.to(this.$refs.AsscrollContainer, {
            delay: 0.2,
            duration: this.$siteConfig.baseDuration / 3.0,
            ease: this.$easing.transform,
            x: 0,
          })
        }

        if (this.$siteConfig.isTouch) {
          /**
           * ピックアップセクションだった場合はスクロール固定を解除しない
           */
          // if (this.indexPickupState) return;
          this.$backfaceScroll(true)
        } else if (this.$siteConfig.isNoTouch) {
          window.addEventListener('wheel', preEvent, { passive: false })
          /**
           * ピックアップセクションだった場合はasscrollを有効しない、それ以外は有効にする
           */
          if (this.indexPickupState) return
          this.$asscroll.enable()
        }
      }
    },
  },
}
</script>

<style lang="scss">
.asscroll-container-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  @include sp() {
    display: none;
  }
}
</style>