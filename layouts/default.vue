<template>
  <div>
    <div ref="AsscrollContainer" class="asscroll-container" asscroll-container>
      <div>
        <nuxt />
      </div>
    </div>
    <div ref="AsscrollContainerCover" class="asscroll-container-cover"></div>
    <LayoutHeader></LayoutHeader>
    <LayoutHambergerMenu></LayoutHambergerMenu>
  </div>
</template>

<script>
import { preEvent } from "../lib/preEvent"

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
            duration: this.$baseAnimationConfig.duration / 3.0,
            ease: this.$easing.transform,
            x: -560,
          })
        }

        if (this.$siteConfig.isTouch) {
          this.$backfaceScroll(false);
        }
        else if(this.$siteConfig.isNoTouch) {
          this.$asscroll.disable({ inputOnly: true })
          window.removeEventListener('wheel', preEvent, { passive: false })
        }
      }

      /**
       * ハンバガーメニューが閉じた時
       */
      else if (!this.hambergerMenuState) {
        this.$refs.AsscrollContainerCover.style.pointerEvents = 'none'

        if (this.$siteConfig.isPc) {
          this.$gsap.to(this.$refs.AsscrollContainer, {
            delay: 0.2,
            duration: this.$baseAnimationConfig.duration / 3.0,
            ease: this.$easing.transform,
            x: 0,
          })
        }

        if (this.$siteConfig.isTouch) {
          /**
           * ピックアップセクションだった場合はスクロール固定を解除しない
           */
          // if (this.indexPickupState) return;
          this.$backfaceScroll(true);
        }
        else if(this.$siteConfig.isNoTouch) {
          window.addEventListener('wheel', preEvent, { passive: false })
          /**
           * ピックアップセクションだった場合はasscrollを有効しない、それ以外は有効にする
           */
          if(this.indexPickupState) return;
          this.$asscroll.enable()
        }
      }
    }
  },
  mounted() {
    this.$ScrollTrigger.defaults({
      scroller: this.$asscroll.containerElement
    })
    this.$ScrollTrigger.scrollerProxy(this.$asscroll.containerElement, {
      scrollTop(value) {
        return arguments.length ? this.$asscroll.currentPos = value : this.$asscroll.currentPos;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      }
    });
    this.$gsap.ticker.add(this.$ScrollTrigger.update);
    this.$ScrollTrigger.addEventListener("refresh", this.$asscroll.resize);
  }
}

</script>

<style lang="scss">
.asscroll-container-cover{
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