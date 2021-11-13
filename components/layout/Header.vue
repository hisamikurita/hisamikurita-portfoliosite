<template>
  <div ref="HeaderLogo" class="header-logo is-top">
    <component :is="setRootTagName" class="heade-link" to="./" @click="onClickSameUrlReload">
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
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
    setRootTagName() {
      return this.$route.name === 'index' ? 'span' : 'nuxt-link';
    },
  },
  mounted() {
    this.$asscroll.on('scroll', () => {
      if (this.hambergerMenuState) return

      if (this.$asscroll.targetPos < 1.0) {
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$refs.HeaderLogo.classList.remove('is-top')
      }
    })
  },

  methods: {
    onClickSameUrlReload(){
      if (this.$route.name === 'index') {
        this.$router.go({ path: this.$router.currentRoute.path, force: true })
      }
    }
  }
}
</script>

<style lang="scss">
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
  // width: 154px;
  transition-delay: 0s;
}

.header-logo {
  position: fixed;
  top: 20px;
  left: 40px;
  // width: 80px;
  color: $black;
  font-size: 50px;
  font-family: 'Six Caps', sans-serif;
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

  & .heade-link  {
    display: block;

    &:hover {
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
