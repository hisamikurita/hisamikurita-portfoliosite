<template>
  <div class="works">
    <!-- ページによって色を変更する -->
    <div
      class="works-bg"
      :style="`
      background-color:${currentProject.siteColor.bodyContentsColor};
      color:${currentProject.siteColor.allTextColor};
      stroke:${currentProject.siteColor.mvTextColor};
      `"
    >
      <WorksMainVisualSection :current-project="currentProject" />
      <WorksProjectVideoSection :current-project="currentProject" />
      <WorksProjectContentsSection :current-project="currentProject" />
      <WorksNextProjectSection :current-project="currentProject" :next-project="nextProject" />
    </div>
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'

export default {
  name: 'Works',

  head() {
    return {
      title: `Hisami Kurita Portfolio | ${this.currentProject.title.full}`,
      meta: [
        { hid: 'og:title', property: 'og:title', content: `Hisami Kurita Portfolio | ${this.currentProject.title.full}` },
      ]
    }
  },

  computed: {
    /**
     * 現在のプロジェクトを取得
     */
    currentProject() {
      const projectResponse = this.$store.getters.projectData
      const index = projectResponse.findIndex((content) => content.id === this.$router.history.current.params.slug)
      const currentProject = projectResponse[index]
      currentProject.index = index + 1

      return currentProject
    },

    /**
     * 次のプロジェクトを取得
     */
    nextProject() {
      const projectResponse = this.$store.getters.projectData
      const index = projectResponse.findIndex((content) => content.id === this.$router.history.current.params.slug)
      let nextProject = null

      if (index === projectResponse.length - 1) {
        nextProject = projectResponse[0]
      } else {
        nextProject = projectResponse[index + 1]
      }

      return nextProject
    },

    indexPickupIsAnimation() {
      return this.$store.getters['indexPickup/sceneAnimationState']
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
        if (!this.openningEnd) return // アクセス時はopenningEndが発火するので、処理を返す

        // スクロール可能にする
        if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
        this.$asscroll.enable({ reset: true })
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      const images = document.querySelectorAll('.works img')
      const imagesLoaded = ImagesLoaded(images)

      // 画像の読み込みが全て完了した時
      imagesLoaded.on('always', () => {
        setTimeout(() => {
          // 遷移のアニメーションを終了させる
          if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
          if (this.imageTransitionState) this.$store.commit('image-transition/end')
          if (this.pickupTransitionState) this.$store.commit('indexPickup/transition', false)
          this.$store.commit('mouse/loadend')

          this.$store.commit('imageLoaded/loaded')
        }, 100) // worksのみ慣性スクロールがバグりがちなので、処理を0.1s遅らせる

        setTimeout(() => {
          if (this.indexPickupIsAnimation) this.$store.commit('indexPickup/sceneAnimationState', false)
        }, 1200) // パーティクルを時間差で削除
      })
    })
  },

  beforeDestroy() {
    // リセット
    this.$preDefaultEvent(false)
    this.$asscroll.disable()
    this.$store.commit('indexPickup/setScene', 'init')
    this.$store.commit('imageLoaded/init')
  },
}
</script>

<style lang="scss" scoped>
.works {
  overflow: hidden;
}
</style>
