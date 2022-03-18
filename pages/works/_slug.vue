<template>
  <div class="works">
    <div
      class="works-bg"
      :style="`
      background-color:${currentProject.siteColor.bodyContentsColor};
      color:${currentProject.siteColor.allTextColor};
      border-color:${currentProject.siteColor.allTextColor};
      `"
    >
      <WorksMainVisualSection :current-project="currentProject" />
      <WorksProjectVideoSection :current-project="currentProject" />
      <WorksProjectContentsSection :current-project="currentProject" />
      <WorksNextProjectSection
        :current-project="currentProject"
        :next-project="nextProject"
      />
    </div>
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'

export default {
  name: 'Works',

  computed: {
    currentProject() {
      const projectResponse = this.$store.getters.projectData
      const index = projectResponse.findIndex(
        (content) => content.id === this.$router.history.current.params.slug
      )
      const currentProject = projectResponse[index]
      currentProject.index = index + 1

      return currentProject
    },

    nextProject() {
      const projectResponse = this.$store.getters.projectData
      const index = projectResponse.findIndex(
        (content) => content.id === this.$router.history.current.params.slug
      )
      let nextProject = null

      if (index === projectResponse.length - 1) {
        nextProject = projectResponse[0]
      } else {
        nextProject = projectResponse[index + 1]
      }

      return nextProject
    },

    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    imageTransitionState() {
      return this.$store.getters['image-transition/state']
    },
    pickupTransitionState() {
      return this.$store.getters['indexPickup/transition']
    },
  },

  mounted() {
    console.log('ci/cdテスト')
    this.$asscroll.enable({ reset: true })

    this.$nextTick(() => {
      const images = document.querySelectorAll('.works source')
      const imagesLoaded = ImagesLoaded(images)
      imagesLoaded.on('always', () => {
        if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
        if (this.imageTransitionState) this.$store.commit('image-transition/end')
        if (this.pickupTransitionState) this.$store.commit('indexPickup/transition', false);

        this.$asscroll.disable()
        this.$asscroll.enable({ reset: true })
        this.$store.commit('imageLoaded/loaded')
      })
    })
  },

  beforeDestroy() {
    this.$store.commit('indexPickup/setScene', 'init')
    this.$asscroll.disable()
    this.$store.commit('imageLoaded/init')
  },
}
</script>

<style lang="scss" scoped>
.works {
  overflow: hidden;
}
</style>