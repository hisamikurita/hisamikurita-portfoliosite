<template>
  <div class="index">
    <div class="hero-and-about">
      <IndexMainVisualSection />
      <IndexAboutSection />
    </div>
    <IndexSelectProjectPickupSection :pickup-data="getPickupData" />
    <IndexSelectProjectCardSection
      :project-data="getProjectData"
      :pickup-end-data="getPickupData[2]"
    />
    <IndexContactSection
      :project-data="getProjectData"
      :contact-data="getContactData"
    />
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'

export default {
  name: 'Index',

  computed: {
    getProjectData() {
      return this.$store.getters.projectData
    },
    getContactData() {
      return this.$store.getters.contactData
    },
    getPickupData() {
      return this.$store.getters.pickupData
    },
  },

  mounted() {
    console.log(this.getProjectData);

    this.$asscroll.enable({ reset: true })

    this.$nextTick(() => {
      const images = document.querySelectorAll('.index img')
      const imagesLoaded = ImagesLoaded(images)

      imagesLoaded.on('always', () => {
        this.$store.commit('normal-transition/end')

        this.$asscroll.disable()
        this.$asscroll.enable({ reset: true })
        this.$store.commit('imageLoaded/loaded')
      })
    })
  },

  beforeDestroy() {
    this.$asscroll.disable()
    this.$store.commit('imageLoaded/init')
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