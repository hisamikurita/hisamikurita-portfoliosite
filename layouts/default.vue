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
        this.$asscroll.enable()
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
    window.addEventListener('wheel', this.prEvent, { passive: false })
  },

  methods: {
    prEvent: function (e) {
      e.preventDefault()
    },
  },
}
</script>