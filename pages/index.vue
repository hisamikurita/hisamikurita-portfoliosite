<template>
  <div class="index">
    <div class="hero-and-about">
      <IndexMainVisualSection />
      <IndexAboutSection />
    </div>
    <IndexSelectProjectPickupSection :pickup-data="pickupData" />
    <IndexSelectProjectCardSection
      :project-data="projectData.contents"
      :pickup-end-data="pickupData[2]"
    />
    <IndexContactSection :project-data="projectData.contents" :contact-data="contactData.contents" />
  </div>
</template>

<script>
export default {
  name: 'Index',

  async asyncData({ $microcms }) {
    const projectData = await $microcms.get({
      endpoint: `works`,
    })
    const contactData = await $microcms.get({
      endpoint: `contact`,
    })
    const pickupData = projectData.contents.filter((v) => v.pickup.pickupFlag)

    return { projectData, pickupData, contactData }
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
.index {
  overflow: hidden;
}

.hero-and-about {
  position: relative;
  overflow: hidden;
}
</style>