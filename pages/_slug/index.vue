<template>
  <div class="works">
    <div
      class="works-bg"
      :style="`background-color:${currentProject.siteColor.bodyContentsColor};color:${currentProject.siteColor.allTextColor};border-color:${currentProject.siteColor.allTextColor}`"
    >
      <WorksMainVisualSection
        :hero-color="currentProject.siteColor.mvTextColor"
        :hero-img="currentProject.heroImg"
        :details-main-text="currentProject.detailsMainText"
        :details-main-desc="currentProject.detailsMainDesc"
      />
      <WorksProjectContentsSection
        :loop-text="currentProject.loopText"
        :client="currentProject.client"
        :free-area="currentProject.freeArea"
        :contents-img="currentProject.contentsImg"
      />
      <WorksNextProjectSection />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Works',

  async asyncData({ $microcms, params }) {
    const currentProject = await $microcms.get({
      endpoint: `works/${params.slug}`,
    })

    return { currentProject }
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