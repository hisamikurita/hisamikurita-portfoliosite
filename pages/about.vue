<template>
  <div class="about">
    <AboutHero></AboutHero>
    <AboutAward></AboutAward>
  </div>
</template>

<script>
export default {
  name: 'About',

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
  }
}
</script>

<style lang="scss">
  //
</style>