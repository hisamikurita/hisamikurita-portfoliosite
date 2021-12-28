<template>
  <div class="about">
    <AboutMainVisualSection />
    <AboutIntroSection />
    <AboutAwardSection />
    <AboutSelectProjectSideScrollSection />
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

<style lang="scss" scoped>
.about {
  overflow: hidden;
}
</style>