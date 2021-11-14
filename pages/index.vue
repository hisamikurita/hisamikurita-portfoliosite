<template>
  <div>
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
      this.$backfaceScroll(true, 0, 0);
      this.$asscroll.enable({ reset: true });
    });
  },
  beforeDestroy() {
    this.$asscroll.disable();
  }
}
</script>

<style lang="scss" scoped>
.hero-and-about {
  position: relative;
  overflow: hidden;
}
</style>