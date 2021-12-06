<template>
  <div class="works">
    <div class="works-bg">
      <WorksHero></WorksHero>
      <WorksContents></WorksContents>
      <WorksNext></WorksNext>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Works',

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
  .works-bg{
    background-color: #7ec1f9;
    border-color: $darkBlue;
    color: $darkBlue;
  }
</style>