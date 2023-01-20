<template>
  <div ref="HeaderLogo" class="header-logo is-top is-op">
    <button class="header-link js-click-target" @click="onClickSameUrlReload">
      <span
        v-for="(char, index) of name"
        :key="index"
        ref="HeaderLogoText"
        class="header-logo-text"
        style="transform: translateY(60px)"
        :class="{
          'header-logo-fade-text': index % 2 === 1,
          'header-logo-move-text': index % 2 === 0,
        }"
        >{{ char }}</span
      >
    </button>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      name: ['H', 'I', 'S', 'A', 'M', 'I', 'K', 'U', 'R', 'I', 'T', 'A'],
    }
  },
  computed: {
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    pickupTransitionState() {
      return this.$store.getters['indexPickup/transition']
    },
    imageTransitionState() {
      return this.$store.getters['image-transition/state']
    },
    indexPickupState() {
      return this.$store.getters['indexPickup/state']
    },
  },

  watch: {
    defaultTransitionState: function () {
      if (this.defaultTransitionState) {
        this.$asscroll.off('scroll', this.onScroll)
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$asscroll.on('scroll', this.onScroll)
      }
    },
    imageTransitionState: function () {
      if (this.imageTransitionState) {
        this.$asscroll.off('scroll', this.onScroll)
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$asscroll.on('scroll', this.onScroll)
      }
    },
    pickupTransitionState: function () {
      if (this.pickupTransitionState) {
        this.$asscroll.off('scroll', this.onScroll)
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$asscroll.on('scroll', this.onScroll)
      }
    },
    openningEnd: function () {
      this.$gsap.to(this.$refs.HeaderLogoText, {
        duration: 1.2,
        delay: -0.8,
        ease: this.$EASING.transform,
        stagger: {
          each: 0.04,
        },
        y: 0,
        clearProps: 'all',
        onComplete: () => {
          this.$refs.HeaderLogo.classList.remove('is-op')
        },
      })
    },
    hambergerMenuState: function () {
      // ハンバーガーメニューが開いて、PCだった時にロゴを動かす
      if (this.hambergerMenuState && this.$SITECONFIG.isPc) {
        this.$gsap.to(this.$refs.HeaderLogo, {
          delay: 0.16,
          duration: 0.3,
          ease: this.$EASING.transform,
          x: -560,
        })
      } else {
        this.$gsap.to(this.$refs.HeaderLogo, {
          delay: 0,
          duration: 0.3,
          ease: this.$EASING.transform,
          x: 0,
        })
      }
    },
  },

  mounted() {
    this.$asscroll.on('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      // ハンバーガーメニューが開いている時と遷移中は処理を返す
      if (this.hambergerMenuState || this.indexPickupState) return

      if (this.$asscroll.targetPos < 1.0) {
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$refs.HeaderLogo.classList.remove('is-top')
      }
    },

    onClickSameUrlReload(e) {
      e.preventDefault()

      if (this.$route.name === 'index') {
        this.$router.go({ path: this.$router.currentRoute.path, force: true })
      } else {
        this.$preDefaultEvent(true)
        this.$asscroll.disable()
        this.$store.commit('bg-transition/start', '#f0efeb')
        this.$store.commit('mouse/loading')

        setTimeout(() => {
          this.$router.push(`/`)
          this.$store.commit('mouse/loadend')
        }, this.$SITECONFIG.pageTransitionDuration)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.header-logo-text {
  display: inline-block;
  transition: transform $base-duration $transform-easing;
}

.header-logo.is-op {
  user-select: none;
  pointer-events: none;
}

.is-op .header-logo-text {
  transition-delay: 0s !important;
}

.header-logo-move-text {
  transition-delay: $base-duration * 0.25;
}

.header-logo-move-text:nth-of-type(3) {
  transform: translateX(-10px);
}

.header-logo-move-text:nth-of-type(5) {
  transform: translateX(-24px);
}

.header-logo-move-text:nth-of-type(7) {
  transform: translateX(-34.5px);
}

.header-logo-move-text:nth-of-type(9) {
  transform: translateX(-49.6px);
}

.header-logo-move-text:nth-of-type(11) {
  transform: translateX(-60px);
}

.is-top .header-logo-move-text {
  transform: translateX(0);
  transition-delay: 0s;
}

.header-logo-fade-text {
  transform: translateY(-100%);
  transition-delay: 0s;
}

.is-top .header-logo-fade-text {
  transform: translateY(0);
  transition-delay: $base-duration * 0.25;
}

.header-logo.is-top {
  transition-delay: 0s;
}

.header-logo {
  position: fixed;
  top: 20px;
  left: 40px;
  z-index: 10;
  overflow: hidden;
  white-space: nowrap;
  transition: width 0.01s linear;
  transition-delay: $base-duration * 0.25;
  cursor: pointer;

  @include sp() {
    top: 14px;
    left: 20px;
  }

  & .header-link {
    display: block;
    color: $black;
    font-size: 50px;
    font-family: $sixcaps;
    letter-spacing: 0.04em;

    @include hover() {
      & .header-logo-move-text {
        transform: translateX(0);
        transition-delay: 0s;
      }

      & .header-logo-fade-text {
        transform: translateY(0);
        transition-delay: $base-duration * 0.25;
      }
    }
  }
}
</style>
