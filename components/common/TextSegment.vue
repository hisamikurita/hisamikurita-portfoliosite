<template>
  <span
    ref="cmnTextSegmentWrapper"
    :class="rotate"
    :style="{ animationDelay: Number(start) + 's' }"
    class="cmn-text-segment-wrapper"
  >
    <span
      v-for="(char, index) of text"
      :key="index"
      class="cmn-text-segment"
      :style="{ animationDelay: Number(start) + index * 0.008 + 's' }"
      v-text="char"
    >
    </span>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
    rotate: {
      type: String,
      required: true,
      default: 'rotate-right',
    },
    start: {
      type: [String, Number],
      required: true,
      default: 0,
    },
  },
  mounted() {
    this.$refs.cmnTextSegmentWrapper.classList.add('is-active')
  },
}
</script>

<style lang="scss">
.cmn-text-segment-wrapper {
  display: block;
  overflow: hidden;
}

.cmn-text-segment-wrapper.rotate-right {
  transform-origin: left;
  transform: rotate($base-rotate);
}

.cmn-text-segment-wrapper.rotate-left {
  transform-origin: right;
  transform: rotate(-$base-rotate);
}

.is-active.cmn-text-segment-wrapper.rotate-right {
  animation: rotateRightInit $base-duration * 2.0 $transform-easing forwards;
}

.is-active.cmn-text-segment-wrapper.rotate-left {
  animation: rotateLeftInit $base-duration * 2.0 $transform-easing forwards;
}


.cmn-text-segment {
  display: inline-block;
  transform: translate3d(0, 100%, 0);
  opacity: 0;
  white-space: break-spaces;
}

.is-active .cmn-text-segment {
  animation: SlideUp $base-duration $transform-easing forwards;
}
</style>