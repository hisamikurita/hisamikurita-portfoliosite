<template>
  <div class="works">
    <!--
      ページによって色を変更する
    -->
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
    console.log(this.currentProject)
    this.$nextTick(() => {
      const images = document.querySelectorAll('.works img')
      const imagesLoaded = ImagesLoaded(images)

      imagesLoaded.on('always', () => {
        setTimeout(()=>{
          if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
          if (this.imageTransitionState) this.$store.commit('image-transition/end')
          if (this.pickupTransitionState) this.$store.commit('indexPickup/transition', false)

          this.$store.commit('imageLoaded/loaded')
        },100)
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