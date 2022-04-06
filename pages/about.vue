<template>
  <div class="about">
    <AboutMainVisualSection />
    <AboutIntroSection />
    <AboutAwardSection
      :award-data="getAwardData"
      :award-data-length="getAwardDataLength"
    />
    <AboutSelectProjectSideScrollSection :project-data="getProjectData" />
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'

export default {
  name: 'About',

  computed: {
    getProjectData() {
      return this.$store.getters.projectData
    },
    getAwardData() {
      return this.$store.getters.awardData
    },
    getAwardDataLength() {
      return this.$store.getters.awardDataLength
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
      }
    },
  },

  mounted() {
    // this.$asscroll.enable({ reset: true })

    this.$nextTick(() => {
      // aboutページのみカクツキ防止のためscrolltriggerのフレームレートを上げる
      const render = () => {
        this.raf = window.requestAnimationFrame(render)
        this.$ScrollTrigger.update()
      }
      render()

      const images = document.querySelectorAll('.about img')
      const imagesLoaded = ImagesLoaded(images)
      imagesLoaded.on('always', () => {
        if (this.defaultTransitionState)
          this.$store.commit('bg-transition/end')
        if (this.imageTransitionState)
          this.$store.commit('image-transition/end')

        // this.$asscroll.disable()
        // this.$asscroll.enable({ reset: true })
        this.$store.commit('imageLoaded/loaded')
      })
    })
  },

  beforeDestroy() {
    window.cancelAnimationFrame(this.raf)
    this.$asscroll.disable()
    this.$store.commit('imageLoaded/init')
  },
}
</script>

<style lang="scss" scoped>
.about {
  overflow: hidden;
}
</style>