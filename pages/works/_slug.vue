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

  async asyncData({ $microcms, params }) {
    const projectResponse = await $microcms.get({
      endpoint: `works`,
    })

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
    this.$nextTick(() => {
      const images = document.querySelectorAll('.works img')
      const imagesLoaded = ImagesLoaded(images)
      imagesLoaded.on('always', () => {
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
.works {
  overflow: hidden;
}

.works-contents-inner {
  padding: 0 40px;
}

.works-contents-loop-title-wrapper {
  padding: 216px 0 242px;
}

.works-contents-loop-title {
  font-size: vw(140);
  font-family: $sixcaps;
}

.works-contents-info {
  display: flex;
  width: vw(1000);
  margin: 0 0 160px 0;
  padding: 38px 0 0 0;
  font-size: 12px;
  border-top: solid 1px;
}

.works-contents-info-dl {
  width: 33.333%;
  line-height: 1.2;
}

.works-contents-img {
  position: relative;
  width: vw(1000);
  height: vw(624);
  overflow: hidden;

  &:not(:last-of-type) {
    margin: 0 0 160px 0;
  }

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>