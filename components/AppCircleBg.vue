<template>
  <span class="circle-bg" :class="`circle-bg-${modifier}`"
    ><span
      ref="CircleBgElement"
      class="circle-bg-element"
      :class="`circle-bg-element-${modifier}`"
      :style="`background-color:${color}`"
    ></span
  ></span>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      default: '',
    },
    modifier: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
  watch: {
    state: function () {
      switch (this.state) {
        case 'extend':
          this.toExtend()
          break
        case 'shrink':
          this.toShrink()
          break
      }
    },
  },
  methods: {
    toExtend: function () {
      this.$gsap.to(this.$refs.CircleBgElement, {
        duration: this.$SITECONFIG.baseDuration * 1.2,
        ease: this.$EASING.transform,
        scale: 1,
      })
    },
    toShrink: function () {
      this.$gsap.to(this.$refs.CircleBgElement, {
        duration: this.$SITECONFIG.baseDuration * 1.2,
        ease: this.$EASING.transform,
        scale: 0,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.circle-bg {
  display: block;
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate3d(-50%, -50%, 0);
  width: 142vmax;
  height: 142vmax;
  pointer-events: none;

    @include tab() {
    width: 150vmax;
    height: 150vmax;
  }

  @include sp() {
    left: 50%;
    width: 140vmax;
    height: 140vmax;
  }
}

.circle-bg-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: scale(0);
}

//modifier

.circle-bg-index-contact {
  top: 0;
  width: 160vmax;
  height: 160vmax;
  transform: translate3d(-50%, 0, 0);

  @include tab() {
    width: 180vmax;
    height: 180vmax;
  }

  @include sp() {
    left: 50%;
    width: 195vmax;
    height: 375vmax;
  }
}

.circle-bg-element-index-contact {
  background-color: $thinPink;
}

.circle-bg-element-about-intro {
  background-color: $thinPink;
}

.circle-bg-element-about-project {
  background-color: $skinColor;
}
</style>