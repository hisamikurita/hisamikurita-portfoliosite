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
      if(this.hambergerMenuState){
        this.$asscroll.disable({ inputOnly: true });
        this.$gsap.to(this.$refs.AsscrollContainer, {
          delay: 0.4,
          duration: this.$baseAnimationConfig.duration / 3.0,
          ease: this.$easing.colorAndOpacity,
          x: -560,
        })
      }
      else if(!this.hambergerMenuState){
        this.$asscroll.enable();
        this.$gsap.to(this.$refs.AsscrollContainer, {
          duration: this.$baseAnimationConfig.duration / 3.0,
          ease: this.$easing.colorAndOpacity,
          x: 0,
        })
      }
    },
  },
}
</script>