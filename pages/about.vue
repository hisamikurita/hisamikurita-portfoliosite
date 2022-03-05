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
  },

  mounted() {
    this.$asscroll.enable({ reset: true })

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
        this.$store.commit('normal-transition/end')

        this.$asscroll.disable()
        this.$asscroll.enable({ reset: true })
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