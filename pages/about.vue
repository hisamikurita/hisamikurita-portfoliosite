<template>
  <div class="about">
    <AboutMainVisualSection />
    <AboutIntroSection />
    <AboutAwardSection :award-data="getAwardData" :award-data-length="getAwardDataLength" />
    <AboutSelectProjectSideScrollSection :project-data="getProjectData" />
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'

export default {
  name: 'About',

  head() {
    return {
      title: 'Hisami Kurita Portfolio | About',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Hisami Kurita Portfolio | About' },
      ]
    }
  },

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
    openningEnd() {
      setTimeout(() => {
        // スクロール可能にする
        if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
        this.$asscroll.enable({ reset: true })
      }, 1200)
    },
    imageLoaded() {
      if (this.imageLoaded) {
        // アクセス時はopenningEndが発火するので、処理を返す
        if (!this.openningEnd) return

        this.$store.commit('mouse/loadend')
        // スクロール可能にする
        if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
        this.$asscroll.enable({ reset: true })
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      // aboutページのみカクツキ防止のためscrolltriggerをupdateする
      const render = () => {
        this.raf = window.requestAnimationFrame(render)
        this.$ScrollTrigger.update()
      }
      render()

      const images = document.querySelectorAll('.about img')
      const imagesLoaded = ImagesLoaded(images)

      // 画像の読み込みが全て完了した時
      imagesLoaded.on('always', () => {
        // 遷移のアニメーションを終了させる
        if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
        if (this.imageTransitionState) this.$store.commit('image-transition/end')
        if (this.pickupTransitionState) this.$store.commit('indexPickup/transition', false)

        this.$store.commit('imageLoaded/loaded')
      })
    })
  },

  beforeDestroy() {
    // リセット
    window.cancelAnimationFrame(this.raf)
    this.$preDefaultEvent(false)
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
