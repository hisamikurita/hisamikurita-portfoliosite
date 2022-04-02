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
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    imageTransitionState() {
      return this.$store.getters['image-transition/state']
    },
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
  },

  watch: {
    openningEnd: function () {
      setTimeout(() => {
        this.$asscroll.enable({ reset: true })
      }, 1200)
    },
    imageLoaded: function () {
      if (this.imageLoaded) {
        if (!this.openningEnd) return
          this.$asscroll.enable({ reset: true })
        // this.$asscroll.disable()

        // setTimeout(() => {
        //   this.$asscroll.enable({ reset: true })
        // }, 600)
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      const images = document.querySelectorAll('.index img')
      const imagesLoaded = ImagesLoaded(images)

      imagesLoaded.on('always', () => {
        if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
        if (this.imageTransitionState)
          this.$store.commit('image-transition/end')

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