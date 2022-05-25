<template>
  <div class="archive">
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'

export default {
  name: 'Archive',

  computed: {
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
    this.$nextTick(() => {
      const images = document.querySelectorAll('.achive img')
      const imagesLoaded = ImagesLoaded(images)
      imagesLoaded.on('always', () => {
        if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
        if (this.imageTransitionState) this.$store.commit('image-transition/end')

        this.$store.commit('imageLoaded/loaded')
      })
    })
  },

  beforeDestroy() {
    this.$preDefaultEvent(false);
    this.$asscroll.disable()
    this.$store.commit('imageLoaded/init')
  },
}
</script>

<style lang="scss" scoped>
.archive {
  position: relative;
  overflow: hidden;
  background-color: $darkBlack;
}
</style>