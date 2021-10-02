import Vue from 'vue'

Vue.mixin({
  data: () => {
    return {
      rotateRight : '',
      rotateLeft : '',
    }
  },
  beforeMount() {
    this.rotateRight = this.$baseAnimationConfig.rotate;
    this.rotateLeft = -this.$baseAnimationConfig.rotate;
  },
})