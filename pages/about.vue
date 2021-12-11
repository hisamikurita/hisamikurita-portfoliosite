<template>
  <div class="about">
    <AboutHero></AboutHero>
    <AboutIntro></AboutIntro>
    <AboutAward></AboutAward>
    <AboutProject></AboutProject>
  </div>
</template>

<script>
export default {
  name: 'About',

  mounted() {
    this.$nextTick(() => {
      this.$asscroll.enable({ reset: true })
    });
  },

  beforeDestroy() {
    this.$asscroll.disable()
  }
}
</script>

<style lang="scss">
  .about {
  overflow-x: hidden;
}
</style>