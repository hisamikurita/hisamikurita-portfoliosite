<template>
  <div class="about">
    <AboutMainVisualSection />
    <AboutIntroSection />
    <AboutAwardSection
      :award-data="awardData.contents"
      :award-data-length="awardDataLength"
    />
    <AboutSelectProjectSideScrollSection :project-data="projectData.contents" />
  </div>
</template>

<script>
export default {
  name: 'About',

  async asyncData({ $microcms }) {
    const projectData = await $microcms.get({
      endpoint: `works`,
    })
    const awardData = await $microcms.get({
      endpoint: `award`,
      queries: { limit: 30 },
    })

    let awwwwardsLength = 0
    let cssdesignawardsLength = 0
    let csswinnerLength = 0

    awardData.contents.forEach((v) => {
      if (v.group === 'AWWWARDS') {
        awwwwardsLength++
      } else if (v.group === 'CSS DESIGN AWARDS') {
        cssdesignawardsLength++
      } else if (v.group === 'CSS WINNER') {
        csswinnerLength++
      }
    })

    const awardDataLength = {
      awwwwardsTotalLength: awwwwardsLength,
      cssdesignawardsTotalLength: cssdesignawardsLength,
      csswinnerTotalLength: csswinnerLength,
    }

    return { projectData, awardData, awardDataLength }
  },

  mounted() {
    this.$nextTick(() => {
      const render = () => {
        this.raf = window.requestAnimationFrame(render)
        this.$ScrollTrigger.update()
      }
      render()

      this.$asscroll.enable({ reset: true })
    })
  },

  beforeDestroy() {
    window.cancelAnimationFrame(this.raf);
    this.$asscroll.disable()
  },
}
</script>

<style lang="scss" scoped>
.about {
  overflow: hidden;
}
</style>