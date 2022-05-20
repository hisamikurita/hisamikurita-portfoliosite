<template>
  <svg
    ref="TextUnderlineSvg"
    :style="`transform-origin:${origin};`"
    class="text-under-line"
    :class="`text-under-line--${modifier}`"
    :viewBox="`0 0 ${width} 160`"
    @mousemove="onMousemove"
    @mouseleave="onMouseLeave"
  >
    <path
      ref="TextUnderlinePath"
      fill="none"
      stroke-width="1"
      :d="`M000,80 Q ${width / 2} ${path.y}, ${width},80`"
    />
    <!-- <path
      ref="TextUnderlinePathDammy"
      fill="none"
      stroke="transparent"
      stroke-width="10"
      :d="`M000,100 Q ${width / 2} ${path.y}, ${width},100`"
    /> -->
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
    state: {
      type: String,
      default: '',
    },
    modifier: {
      type: String,
      default: '',
    },
    pcAnimation: {
      type: Boolean,
      default: true,
    },
    spAnimation: {
      type: Boolean,
      default: true,
    },
  },

  data: () => {
    return {
      path: { y: 200 },
    }
  },

  watch: {
    state: function () {
      if (
        (!this.spAnimation && this.$SITECONFIG.isMobile) ||
        (!this.pcAnimation && this.$SITECONFIG.isPc)
      )
        return
      switch (this.state) {
        case 'extend':
          this.toExtend()
          break
      }
    },
  },

  mounted() {
      // Reference https://codepen.io/osublake/pen/qaRBmY/613dea251165576962577e898b1a4ce7?editors=1010

      if(!this.pcAnimation && !this.spAnimation){
        this.path.y = 80;
      }
      this.connected = false
  },

  methods: {
    onMousemove(e) {
      if ((!this.spAnimation && this.$SITECONFIG.isMobile)) return
        if (e.target === this.$refs.TextUnderlineSvg) {
          if (this.connected) return
          if (this.pathLeaveAnimation01) this.pathLeaveAnimation01.kill()

          this.pathFixAnimation = this.$gsap.to(this.path, {
            duration: 0.3,
            ease: 'power1.out',
            y:
              (e.offsetY / this.$refs.TextUnderlineSvg.clientHeight - 0.5) *
                (this.$refs.TextUnderlineSvg.clientHeight +
                  this.$refs.TextUnderlineSvg.clientWidth) *
                0.07 +
              80,
          })
        }
    },
    onMouseLeave() {
      if (
        (!this.spAnimation && this.$SITECONFIG.isMobile) ||
        (!this.pcAnimation && this.$SITECONFIG.isPc)
      )
        if (this.pathFixAnimation) this.pathFixAnimation.kill()
      this.connected = true
      this.pathLeaveAnimation01 = this.$gsap.to(this.path, {
        duration: 1.0,
        ease: 'elastic.out(1, 0.3)',
        y: 80,
      })
      setTimeout(() => {
        this.connected = false
      }, 100)
    },
    toExtend() {
      this.$gsap.to(this.path, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.transform,
        delay: Number(this.start),
        y: 80,
      })
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
  // pointer-events: none; // 一時的にクリックイベントが拾えるようにしておく

  & path {
    pointer-events: none;
  }
}

//modifier

.text-under-line--index-hero {
  position: absolute;
  top: vw(-100);
  left: 0;
  stroke: $white;
  
  @include sp() {
    top: vw_sp(-124);
  }
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
  top: auto;
  bottom: vw(90);
  left: 40px;
  width: calc(100% - 200px);
  stroke: $black;

  @include sp() {
    bottom: vw_sp(90);
    left: 20px;
    width: calc(100% - 40px);
  }
}

.text-under-line--index-project-02 {
  position: absolute;
  top: auto;
  bottom: vw(-90);
  left: 40px;
  width: calc(100% - 200px);
  stroke: $black;

  @include sp() {
    bottom: vw_sp(-98);
    left: 20px;
    width: calc(100% - 40px);
  }
}

.text-under-line--about-hero {
  position: absolute;
  top: vw(-106);
  left: 0;
  stroke: $black;
  // background-color: $black;

  @include sp() {
    top: vw_sp(-122);
  }
}

// .is-safari .text-under-line--about-hero {
//   top: vw(-94);
// }

.text-under-line--about-award {
  position: absolute;
  top: vw(-100);
  left: 0;
  width: 100%;
  height: vw(200);
  stroke: $gray;
  transform: scaleX(1);
}

.text-under-line--about-award-last {
  position: absolute;
  top: vw(-100);
  left: 0;
  width: 100%;
  height: vw(200);
  stroke: $gray;
  transform: scaleX(1);
}

.text-under-line--about-project-01 {
  position: absolute;
  top: vw(-98);
  left: 0;
  width: calc(100% + 4px);
  stroke: $black;
  // background-color: $black;

  @include sp() {
    top: vw_sp(-98);
    left: 0;
    width: 100%;
  }
}

.text-under-line--about-project-02 {
  position: absolute;
  top: auto;
  bottom: vw(-98);
  left: 0;
  width: calc(100% + 4px);
  stroke: $black;
  // background-color: $black;

  @include sp() {
    bottom: vw_sp(-98);
    left: 0;
    width: 100%;
  }
}

.text-under-line--works {
  position: absolute;
  top: auto;
  bottom: vmin(148);
  background-color: inherit;
}

.text-under-line--works-next-01 {
  position: absolute;
  top: vw(-96);
  left: 0;
  width: calc(100%);

  @include sp() {
    top: vw_sp(-96);
    left: 0;
    width: 100%;
  }
}

.text-under-line--works-next-02 {
  position: absolute;
  top: auto;
  bottom: vw(-96);
  left: 0;
  width: calc(100%);

  @include sp() {
    bottom: vw_sp(-96);
    left: 0;
    width: 100%;
  }
}

.text-under-line--works-info {
  position: absolute;
  top: vw(-110);
  left: 0;
  width: calc(100%);
  height: vw(200);
  transform: scaleX(1);

  @include sp() {
    left: 0;
    width: 100%;
  }
}
</style>