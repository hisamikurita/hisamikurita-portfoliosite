<template>
  <span class="cmn-title-read-text-wrapper" :class="'cmn-title-read-text-wrapper--' + modifier">
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
    modifier: {
      type: String,
      default: '',
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

//modifier

.cmn-title-read-text-wrapper--section{
  & .cmn-title-read-text-00{
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.8;
  }
}

.cmn-title-read-text-wrapper--contact-section{
  & .cmn-title-read-text-00{
    display: block;
    margin: 0 0 6px 0;
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.8;
  }

  & .cmn-title-read-text-01{
    font-size: 20px;
  }
}

</style>