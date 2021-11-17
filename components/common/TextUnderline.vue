<template>
  <span
    ref="TextUnderline"
    class="text-under-line"
    :class="'text-under-line--' + modifier"
  ></span>
</template>

<script>
export default {
  props: {
    rotate: {
      type: [String, Number],
      required: true,
    },
    start: {
      type: [String, Number],
      required: true,
    },
    state: {
      type: [String, Number],
      required: true,
    },
    spAnimation: {
      type: Boolean,
      default: true,
    },
    modifier: {
      type: String,
      default: '',
    },
  },

  watch: {
    state: function () {
      if (!this.spAnimation && this.$siteConfig.isMobile) return

      switch (this.state) {
        case 'extend':
          this.toExtend()
          break
      }
    },
  },

  mounted() {
    if (!this.spAnimation && this.$siteConfig.isMobile) return

    this.init()
  },

  methods: {
    init: function () {
      this.$gsap.set(this.$refs.TextUnderline, {
        transformOrigin: this.rotate > 0 ? 'left' : 'right',
      })
    },

    toExtend: function () {
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

//modifier

.text-under-line--index-hero {
  position: absolute;
  top: -12px;
  left: 0;
  background-color: $white;
}

.text-under-line--index-about {
  position: absolute;
  bottom: -48px;
  right: 56px;
  background-color: $darkBlue;
  width: calc(100% - 56px - 40px);

  @include tab {
    right: vw(56);
    width: calc(100% - #{vw(56)} - 40px);
  }

  // @include sp(){
  //   width: calc(100% - #{vw_sp(40)});
  //   bottom: -34px;
  //   right: vw_sp(20);
  // }
}

.text-under-line--index-project-01 {
  position: absolute;
  top: 0;
  left: 40px;
  width: calc(100% - 200px);
  background-color: $black;

  @include sp(){
    left: 20px;
    width: calc(100% - 40px);
  }
}

.text-under-line--index-project-02 {
  position: absolute;
  bottom: 0;
  left: 40px;
  width: calc(100% - 200px);
  background-color: $black;

  @include sp(){
    left: 20px;
    width: calc(100% - 40px);
  }
}

.text-under-line--about-hero {
  position: absolute;
  top: -12px;
  left: 0;
  background-color: $black;
}

</style>