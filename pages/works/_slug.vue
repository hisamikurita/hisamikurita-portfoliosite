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

  async asyncData({ $axios, params }) {
    const projectResponse = await $axios.$get(`https://${process.env.serviceDomain}.microcms.io/api/v1/works?limit=200`, {
          headers: {
            'X-MICROCMS-API-KEY': process.env.apiKey
          }
        })
    console.log(projectResponse);

    const index = projectResponse.contents.findIndex(
      (content) => content.id === params.slug
    )
    const currentProject = projectResponse.contents[index]
    currentProject.index = index + 1

    let nextProject = null

    if (index === projectResponse.contents.length - 1) {
      nextProject = projectResponse.contents[0]
    } else {
      nextProject = projectResponse.contents[index + 1]
    }

    return { currentProject, nextProject }
  },

  mounted() {
    console.log(this.currentProject);

    this.$asscroll.enable({ reset: true })

    this.$nextTick(() => {
      const images = document.querySelectorAll('.works img')
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
    this.$store.commit('indexPickup/setScene', 'init');
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