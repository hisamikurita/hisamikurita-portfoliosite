<template>
  <div class="index">
    <div class="hero-and-about">
      <IndexMainVisualSection />
      <IndexAboutSection />
    </div>
    <IndexSelectProjectPickupSection />
    <IndexSelectProjectCardSection />
    <IndexContactSection />
  </div>
</template>

<script>
export default {
  name: 'Index',

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
.hero-and-about {
  position: relative;
  overflow: hidden;
}

.index {
  overflow-x: hidden;
}
</style>