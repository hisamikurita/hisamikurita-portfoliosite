<template>
  <span ref="TextUnderline" class="text-under-line" :class="'text-under-line--' + modifier"></span>
</template>

<script>
export default {
  props: {
    rotate: {
      type: Number,
      required: true,
    },
    start: {
      type: [String, Number],
      required: true,
    },
    modifier:{
      type: String,
      default: '',
    }
  },
  methods: {
    init: function () {
      this.$gsap.set(this.$refs.TextUnderline, {
        transformOrigin: this.rotate > 0 ? 'left' : 'right',
      })
    },

    extend: function () {
      this.$gsap.to(this.$refs.TextUnderline, {
        duration: this.$baseAnimationConfig.duration,
        ease: this.$easing.transform,
        delay: Number(this.start),
        scaleX: 1,
      })
    },
  },
}
</script>

<style lang="scss">
.text-under-line {
  width: 100%;
  height: 1px;
  transform: scaleX(0);
}

.text-under-line--hero {
  position: absolute;
  top: -12px;
  left: 0;
  background-color: $white;
}

.text-under-line--about {
  position: absolute;
  bottom: -48px;
  right: 56px;
  background-color: $darkBlue;
  width: calc(100% - 56px - 40px);

  @include tab {
    right: vw(56);
    width: calc(100% - #{vw(56)} - 40px);
  }
}
</style>