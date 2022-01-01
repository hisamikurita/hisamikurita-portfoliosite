<template>
  <div class="about">
    <AboutMainVisualSection />
    <AboutIntroSection />
    <AboutAwardSection />
    <AboutSelectProjectSideScrollSection :project-data="projectData.contents" />
  </div>
</template>

<script>
export default {
  name: 'About',

  async asyncData({ $microcms }) {
    const projectData = await $microcms.get({
      endpoint: `works`,
    })

    return { projectData }
  },

  mounted() {
    this.$nextTick(() => {
      this.$asscroll.enable({ reset: true })
    })
  },

  beforeDestroy() {
    this.$asscroll.disable()
  },
}
</script>

<style lang="scss" scoped>
.about {
  overflow: hidden;
}
</style>