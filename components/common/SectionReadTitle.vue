<template>
  <span class="cmn-title-read-text-wrapper">
    <span v-for="(char, index) of text" :key="index" class="cmn-title-read-text" :class="'cmn-title-read-text-0' + index">
      <TextSegment :start="index * 0.08" :rotate="index % 2 != 0 ? 'rotate-left' : 'rotate-right'" :text="char"></TextSegment>
    </span>
  </span>
</template>

<script>
import TextSegment from './TextSegment.vue'

export default {
  components: {
    TextSegment,
  },
  props: {
    text: {
      type: Array,
      required: true,
    },
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