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
import { horizonalReload } from '../lib/horizonalReload';

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
        this.$asscroll.disable({ inputOnly: true })
        this.$gsap.to(this.$refs.AsscrollContainer, {
          delay: 0.2,
          duration: this.$baseAnimationConfig.duration / 3.0,
          ease: this.$easing.transform,
          x: -560,
        });
        window.removeEventListener('wheel', this.prEvent, { passive: false })
      }
      /**
       * ハンバガーメニューが閉じた時
       */
      else if (!this.hambergerMenuState) {
        if(!this.indexPickupState) this.$asscroll.enable()
        this.$gsap.to(this.$refs.AsscrollContainer, {
          delay: 0.2,
          duration: this.$baseAnimationConfig.duration / 3.0,
          ease: this.$easing.transform,
          x: 0,
        });
        window.addEventListener('wheel', this.prEvent, { passive: false })
      }
    },
  },
  mounted() {
    /**
     * ホイールイベントのデフォルトの動作を止める
     */
    if(!this.$checkDevice.isTouch()){
      window.addEventListener('wheel', this.prEvent, { passive: false });
    }
    /**
     * ブレイクポイントを跨いだ時に強制的にロードさせる
     */
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    mediaQuery.addEventListener('change', horizonalReload);
  },

  methods: {
    prEvent: function (e) {
      e.preventDefault()
    },
  },
}
</script>