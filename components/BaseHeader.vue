<template>
  <div ref="HeaderLogo" class="header-logo is-top">
    <a class="heade-link" @click="onClickSameUrlReload">
      H<span class="header-logo-text header-logo-fade-text">I</span
      ><span
        class="header-logo-text header-logo-move-text header-logo-move-text-01"
        >S</span
      ><span class="header-logo-text header-logo-fade-text">A</span
      ><span
        class="header-logo-text header-logo-move-text header-logo-move-text-02"
        >M</span
      ><span class="header-logo-text header-logo-fade-text">I</span
      ><span
        class="header-logo-text header-logo-move-text header-logo-move-text-03"
        >K</span
      ><span class="header-logo-text header-logo-fade-text">U</span
      ><span
        class="header-logo-text header-logo-move-text header-logo-move-text-04"
        >R</span
      ><span class="header-logo-text header-logo-fade-text">I</span
      ><span
        class="header-logo-text header-logo-move-text header-logo-move-text-05"
        >T</span
      ><span class="header-logo-text header-logo-fade-text">A</span>
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
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
      console.log('発火')
      // if (!this.defaultTransitionState) {
        this.$refs.HeaderLogo.classList.add('is-top')
      // }
    },
    imageTransitionState: function () {
      console.log('発火')
      // if (!this.imageTransitionState) {
        this.$refs.HeaderLogo.classList.add('is-top')
      // }
    },
  },

  mounted() {
    this.$asscroll.on('scroll', () => {
      if (this.hambergerMenuState || this.indexPickupState) return

      if (this.$asscroll.targetPos < 1.0) {
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$refs.HeaderLogo.classList.remove('is-top')
      }
    })
  },

  methods: {
    onClickSameUrlReload(e) {
      e.preventDefault()

      if (this.$route.name === 'index') {
        this.$router.go({ path: this.$router.currentRoute.path, force: true })
      } else {
        this.$store.commit('bg-transition/start', '#f0efeb')
        setTimeout(() => {
          this.$router.push(`/`)
        }, this.$SITECONFIG.baseDuration * 0.8 * 1000)
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

@for $i from 1 through 5 {
  .header-logo-move-text-0#{$i} {
    $ratio: 0;
    @if ($i == 1) {
      $ratio: -10px;
    } @else if ($i == 2) {
      $ratio: -12px;
    } @else if ($i == 3) {
      $ratio: -11.5px;
    } @else if ($i == 4) {
      $ratio: -12.4px;
    } @else if ($i == 5) {
      $ratio: -12px;
    }

    transform: translateX($ratio * $i);
  }
}

.header-logo-move-text {
  transition-delay: $base-duration * 0.25;
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
  color: $black;
  font-size: 50px;
  font-family: $sixcaps;
  letter-spacing: 0.04em;
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

  & .heade-link {
    display: block;

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
