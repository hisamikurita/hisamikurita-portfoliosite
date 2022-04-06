<template>
  <svg
    ref="TextUnderlineSvg"
    :style="`transform-origin:${origin};`"
    class="text-under-line"
    :class="`text-under-line--${modifier}`"
    :viewBox="`0 0 ${width} 200`"
    @mousemove="onMousemove"
    @mouseleave="onMouseLeave"
  >
    <path
      ref="TextUnderlinePath"
      fill="none"
      stroke-width="1"
      :d="`M000,100 Q ${width / 2} ${path.y}, ${width},100`"
    />
    <path
      ref="TextUnderlinePathDammy"
      fill="none"
      stroke="transparent"
      stroke-width="10"
      :d="`M000,100 Q ${width / 2} ${path.y}, ${width},100`"
    />
  </svg>
</template>

<script>
export default {
  props: {
    origin: {
      type: String,
      default: 'right',
    },
    start: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    ratio: {
      type: Number,
      default: 2.0,
    },
    state: {
      type: String,
      default: '',
    },
    modifier: {
      type: String,
      default: '',
    },
    spAnimation: {
      type: Boolean,
      default: true,
    },
  },

  data: () => {
    return {
      path: { y: 100 },
    }
  },

  watch: {
    state: function () {
      if (!this.spAnimation && this.$SITECONFIG.isMobile) return
      switch (this.state) {
        case 'extend':
          this.toExtend()
          break
      }
    },
  },

  mounted() {
    // https://codepen.io/osublake/pen/qaRBmY/613dea251165576962577e898b1a4ce7?editors=1010

    this.connected = false

    this.raf = () => {
      this.update()
    }

    this.observe = this.$refs.TextUnderlineSvg
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.$gsap.ticker.add(this.raf)
          } else {
            this.$gsap.ticker.remove(this.raf)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserver.observe(this.observe)
  },

  beforeDestroy() {
    this.$gsap.ticker.remove(this.raf)
    this.iObserver.unobserve(this.observe)
  },

  methods: {
    update() {
      if (
        Math.abs(this.path.y - 100) >
        200 / 1.6
      ) {
        this.connected = false
        this.pathAnimation = this.$gsap.to(this.path, {
          duration: 1.0,
          ease: 'elastic.out(1, 0.3)',
          y: 100,
        })
      }
    },
    onMousemove(e) {
      console.log(this.path.y)
      if (!this.connected && e.target === this.$refs.TextUnderlinePathDammy) {
        if (this.pathAnimation) this.pathAnimation.kill()

        this.connected = true
      }

      if (this.connected) {
        this.path.y = ((e.offsetY / this.$refs.TextUnderlineSvg.clientHeight - 0.5) * (this.$refs.TextUnderlineSvg.clientHeight + (this.$refs.TextUnderlineSvg.clientWidth * 0.1))) + 100
      }
    },
    onMouseLeave() {
      this.connected = false
      this.pathAnimation = this.$gsap.to(this.path, {
        duration: 1.0,
        ease: 'elastic.out(1, 0.3)',
        y: 100,
      })
    },
    toExtend() {
      this.$gsap.to(this.$refs.TextUnderlineSvg, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.transform,
        delay: Number(this.start),
        scaleX: 1,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: 100%;
}

path {
  fill: none;
}

.text-under-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: scaleX(0);
  z-index: 1;
}

//modifier

.text-under-line--index-hero {
  position: absolute;
  top: vw(-100);
  left: 0;
  stroke: $white;
  // background-color: $white;
}

.text-under-line--index-about {
  position: absolute;
  top: vw(190);
  left: 40px;
  width: calc(100% - 56px - 40px);
  stroke: $darkBlue;

  @include tab {
    top: vw(220);
    left: vw(40);
    width: calc(100% - #{vw(56)} - 40px);
  }
}

.text-under-line--index-project-01 {
  position: absolute;
  top: -120px;
  left: 40px;
  width: vw(1080);
  height: vw(200);
  stroke: $black;

  @include sp() {
    left: 20px;
    width: calc(100% - 40px);
  }
}

.text-under-line--index-project-02 {
  position: absolute;
  bottom: 0;
  left: 40px;
  width: calc(100% - 200px);
  stroke: $black;

  @include sp() {
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

.text-under-line--about-project-01 {
  position: absolute;
  top: 0;
  left: 4px;
  width: calc(100% + 4px);
  background-color: $black;

  @include sp() {
    left: 0;
    width: 100%;
  }
}

.text-under-line--about-project-02 {
  position: absolute;
  bottom: 0;
  left: 4px;
  width: calc(100% + 4px);
  background-color: $black;

  @include sp() {
    left: 0;
    width: 100%;
  }
}

.text-under-line--works {
  display: block;
  background-color: inherit;
}

.text-under-line--works-next-01 {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100%);

  @include sp() {
    left: 0;
    width: 100%;
  }
}

.text-under-line--works-next-02 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100%);

  @include sp() {
    left: 0;
    width: 100%;
  }
}
</style>