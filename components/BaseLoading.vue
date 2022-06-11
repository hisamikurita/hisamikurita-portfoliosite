<template>
  <div class="loading-area">
    <span ref="Loading" class="loading">
      <span ref="LoadingWrapper" class="loading-wrapper">
        <span ref="LoadingBlock" class="loading-block">
          LOADING
          <span class="loading-dot">.</span>
          <span class="loading-dot">.</span>
          <span class="loading-dot">.</span>
        </span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    mouseLoad() {
      return this.$store.getters['mouse/isLoad']
    },
  },
  watch: {
    mouseLoad: function () {
      if(this.$SITECONFIG.isPc) return;

      if (this.mouseLoad) {
        this.$refs.Loading.classList.add('is-loading')

        this.$gsap.to(this.$refs.Loading, {
          duration: this.$SITECONFIG.halfBaseDuration,
          ease: this.$EASING.transform,
          scale: 1,
        })
        this.$gsap.fromTo(
          this.$refs.LoadingWrapper,
          {
            rotate: 8,
          },
          {
            duration: this.$SITECONFIG.halfBaseDuration,
            delay: 0.2,
            ease: this.$EASING.transform,
            rotate: 0,
          }
        )
        this.$gsap.fromTo(
          this.$refs.LoadingBlock,
          {
            y: 10,
          },
          {
            duration: this.$SITECONFIG.halfBaseDuration,
            delay: 0.2,
            ease: this.$EASING.transform,
            y: 0,
          }
        )
      } else {
        this.$refs.Loading.classList.remove('is-loading')

        this.$gsap.to(this.$refs.Loading, {
          duration: this.$SITECONFIG.halfBaseDuration,
          ease: this.$EASING.transform,
          scale: 0,
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.loading-area {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 20px;
  z-index: 100;
  pointer-events: none;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -18px;
  right: -38px;
  width: 94px;
  height: 16px;
  padding: 1px 0 0 0;
  background-color: #fff;
  color: #302c1a;
  font-size: 12px;
  border-radius: 8px;
  transform: scale(0);
}

.loading-wrapper {
  position: relative;
  overflow: hidden;
  transform: rotate(8deg);
}

.loading-block {
  display: inline-block;
  transform: translateY(10px);
}

.is-loading .loading-dot {
  animation: loadingFade $base-duration $colorAndOpacity-easing infinite;
}

.loading-dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes loadingFade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
