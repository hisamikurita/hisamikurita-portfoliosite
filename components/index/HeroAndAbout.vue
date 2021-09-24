<template>
  <div class="hero-and-about">
    <div class="hero-and-about-bg-circle-01"></div>
    <div ref="HeroAndAboutBgCircle02" class="hero-and-about-bg-circle-02"></div>
    <div ref="HeroAndAboutCircleTrigger">
      <IndexHero></IndexHero>
    </div>
    <IndexAbout></IndexAbout>
  </div>
</template>

<script>
export default {
  mounted() {
    /* scroll-animation */
    const observe = this.$refs.HeroAndAboutCircleTrigger
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.$asscroll.on('update', this.bgCircleScaleChangeScroll)
          } else {
            this.$asscroll.off('update', this.bgCircleScaleChangeScroll)
          }
        })
      },
      {
        rootMargin: '0%',
      }
    ).observe(observe)
  },
  beforeDestroy() {
    this.$asscroll.off('update', this.bgCircleScaleChangeScroll)
  },
  methods: {
    bgCircleScaleChangeScroll() {
      this.$gsap.to(this.$refs.HeroAndAboutBgCircle02, {
        duration: this.$baseAnimationConfig.duration / 2.0,
        ease: 'none',
        scale: (this.$asscroll.currentPos / this.$refs.HeroAndAboutCircleTrigger.clientHeight) * 3.0 + 1.0,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.hero-and-about {
  position: relative;
  overflow: hidden;
}

.hero-and-about-bg-circle-01 {
  position: absolute;
  top: vw(-184);
  right: vw(-90);
  width: vw(820);
  height: vw(820);
  background-color: $yellow;
  border-radius: 50%;
  pointer-events: none;
}

.hero-and-about-bg-circle-02 {
  position: absolute;
  top: 0;
  left: vw(-216);
  width: vw(1034);
  height: vw(1034);
  background-color: $lightBlue;
  border-radius: 50%;
  pointer-events: none;
}
</style>