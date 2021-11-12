<template>
  <div>
    <AboutHero></AboutHero>
    <AboutAward></AboutAward>
  </div>
</template>

<script>
export default {
  name: 'About',

  mounted() {
    this.$nextTick(() => {
      this.$asscroll.enable({ reset: true });
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