<template>
  <span class="cmn-title-read-text-wrapper">
    <span v-for="(char, index) of text" :key="index" class="cmn-title-read-text" :class="'cmn-title-read-text-0' + index">
      <CommonTextSegment :start="Number(start) + index * 0.12" :rotate="index % 2 != 0 ? rotateLeft : rotateRight" :text="char"></CommonTextSegment>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: Array,
      required: true,
    },
    start: {
      type: [String, Number],
      required: true,
    },
  },
  data: () => {
    return {
      rotateRight: 0,
      rotateLeft: 0,
    }
  },
  beforeMount(){
    this.rotateRight = this.$baseAnimationConfig.rotate;
    this.rotateLeft = -this.$baseAnimationConfig.rotate;
  },
}
</script>

<style lang="scss">
.cmn-title-read-text-wrapper{
  display: block;
  font-size: 12px;
  font-family: Helvetica, sans-serif;
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.cmn-title-read-text-00{
  font-size: 36px;
  text-indent: -2px;
  line-height: 0.8;
}
</style>