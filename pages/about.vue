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
      this.$backfaceScroll(true, 0, 0);
      if(!this.$siteConfig.isTouch) this.$asscroll.enable({ reset: true });
    });
  },

  beforeDestroy() {
    this.$asscroll.disable();
  }
}
</script>

<style lang="scss">
  //
</style>