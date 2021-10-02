<template>
  <div ref="CmnLoopTextWrapper" class="cmn-loop-text-wrapper">
    <CommonTextSegment
      :state="state"
      :start="Number(start)"
      :rotate="rotate"
      :text="text"
    ></CommonTextSegment>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    start: {
      type: [String, Number],
      required: true,
    },
    rotate: {
      type: [String, Number],
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  mounted(){
    //
  }
}
</script>

<style lang="scss">
.cmn-loop-text-wrapper{
  width: max-content;
}
</style>