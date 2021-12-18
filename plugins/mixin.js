import Vue from 'vue'

Vue.mixin({
  data: () => {
    return {
      rotateRight : 0,
      rotateLeft : 0,
    }
  },
  beforeMount() {
    this.rotateRight = this.$siteConfig.rotate;
    this.rotateLeft = -this.$siteConfig.rotate;
  },
})