<template>
  <div class="index">
    <div class="hero-and-about">
      <IndexHero></IndexHero>
      <IndexAbout></IndexAbout>
    </div>
    <IndexPickup></IndexPickup>
    <IndexProject></IndexProject>
    <IndexContact></IndexContact>
  </div>
</template>

<script>
export default {
  name: 'Index',

  mounted() {
    this.$nextTick(() => {
      if (this.$siteConfig.isTouch) {
        this.$backfaceScroll(true, 0, 0)
      }
      else if (this.$siteConfig.isNoTouch) {
        this.$asscroll.enable({ reset: true })
      }
    });
  },
  beforeDestroy() {
    if (this.$siteConfig.isNoTouch) this.$asscroll.disable()
  },
}
</script>

<style lang="scss" scoped>
.hero-and-about {
  position: relative;
  overflow: hidden;
}

.index {
  overflow-x: hidden;
}
</style>