<template>
  <div ref="MouseArea" class="mouse">
    <span ref="MouseAction" class="mouse-action"
      ><span ref="MouseActionWrapper" class="mouse-action-wrapper"
        ><span ref="MouseActionBlock" class="mouse-action-block"
          >ACTION</span
        ></span
      ></span
    >
    <span ref="MouseLoading" class="mouse-loading"
      ><span ref="MouseLoadingWrapper" class="mouse-loading-wrapper"
        ><span ref="MouseLoadingBlock" class="mouse-loading-block"
          >LOADING<span class="mouse-loading-dot">.</span
          ><span class="mouse-loading-dot">.</span
          ><span class="mouse-loading-dot">.</span></span
        ></span
      ></span
    >
    <nuxt-img
      ref="MouseImgClick"
      src="/images/mouse-click.png"
      width="88"
      height="143"
      quality="80"
      alt="mouse-img-click"
      class="mouse-img-click"
    />
    <nuxt-img
      ref="MouseImgHold"
      src="/images/mouse-hold.png"
      width="200"
      height="170"
      alt="mouse-img-hold"
      quality="80"
      class="mouse-img-hold"
    />
    <nuxt-img
      ref="MouseImg"
      src="/images/mouse.png"
      width="191"
      height="234"
      alt="mouse-img"
      quality="80"
      class="mouse-img"
    />
  </div>
</template>

<script>
export default {
  computed: {
    mouseHover() {
      return this.$store.getters['mouse/isHover']
    },
    mouseDown() {
      return this.$store.getters['mouse/isDown']
    },
    mouseLoad() {
      return this.$store.getters['mouse/isLoad']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
  },
  watch: {
    mouseHover: function () {
      if (this.mouseHover) {
        this.$gsap.to(this.$refs.MouseAction, {
          duration: this.$SITECONFIG.halfBaseDuration,
          ease: this.$EASING.transform,
          scale: 1,
        })
        this.$gsap.fromTo(
          this.$refs.MouseActionWrapper,
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
          this.$refs.MouseActionBlock,
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
        this.$gsap.to(this.$refs.MouseAction, {
          duration: this.$SITECONFIG.halfBaseDuration,
          ease: this.$EASING.transform,
          scale: 0,
        })
      }
    },
    mouseDown: function () {
      if (this.mouseDown) {
        this.$gsap.to(this.$refs.MouseAction, {
          duration: this.$SITECONFIG.halfBaseDuration,
          ease: this.$EASING.transform,
          scale: 0,
        })
      }
    },
    mouseLoad: function () {
      if(this.$SITECONFIG.isSp) return;

      if (this.mouseLoad) {
        this.$refs.MouseLoading.classList.add('is-loading')

        this.$gsap.to(this.$refs.MouseLoading, {
          duration: this.$SITECONFIG.halfBaseDuration,
          ease: this.$EASING.transform,
          scale: 1,
        })
        this.$gsap.fromTo(
          this.$refs.MouseLoadingWrapper,
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
          this.$refs.MouseLoadingBlock,
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
        this.$refs.MouseLoading.classList.remove('is-loading')

        this.$gsap.to(this.$refs.MouseLoading, {
          duration: this.$SITECONFIG.halfBaseDuration,
          ease: this.$EASING.transform,
          scale: 0,
        })
      }
    },
    imageLoaded: function () {
      // タッチイベントではない時
      if (this.$SITECONFIG.isNoTouch) {
        // クリックできる要素を全てのコンポーネントから取得
        this.mouseClickTarget = document.querySelectorAll(
          '.hambergerMenu-btn, .hambergerMenu-item-wrapper, .header-link,.hambergerMenu-title-wrapper-01, .hambergerMenu-title-wrapper-02, .pickup-link, .contact-info-item, .next-loop-title-wrapper, .next-backbtn, .project-item'
        )
        // ホールドできる要素を全てのコンポーネントから取得
        this.mouseHoldTarget = document.querySelectorAll(
          '.card-project-article, .archive'
        )

        // イベント付与
        setTimeout(() => {
          this.$gsap.set(this.$refs.MouseArea, {
            opacity: 1,
          })
          this.$gsap.to(this.$refs.MouseArea, {
            duration: this.$SITECONFIG.baseDuration,
            ease: this.$EASING.transform,
            scale: 1,
          })
        }, 200)

        for (let i = 0; i < this.mouseClickTarget.length; i++) {
          this.mouseClickTarget[i].addEventListener('mousedown', () => {
            this.$gsap.to(this.$refs.MouseImgClick.$el, {
              duration: 0.2,
              ease: this.$EASING.transform,
              scale: 1,
            })
            this.$gsap.to(this.$refs.MouseImg.$el, {
              duration: 0.2,
              ease: this.$EASING.transform,
              rotate: 15,
            })
          })
        }

        for (let i = 0; i < this.mouseClickTarget.length; i++) {
          this.mouseClickTarget[i].addEventListener('mouseup', () => {
            this.$gsap.to(this.$refs.MouseImgClick.$el, {
              duration: 0.2,
              ease: this.$EASING.transform,
              scale: 0,
            })
            this.$gsap.to(this.$refs.MouseImg.$el, {
              duration: 0.2,
              ease: this.$EASING.transform,
              rotate: 0,
            })
          })
        }

        for (let i = 0; i < this.mouseHoldTarget.length; i++) {
          this.mouseHoldTarget[i].addEventListener('mousedown', () => {
            this.$gsap.set(this.$refs.MouseImg.$el, {
              opacity: 0,
            })
            this.$gsap.set(this.$refs.MouseImgHold.$el, {
              opacity: 1,
            })
          })
        }

        for (let i = 0; i < this.mouseHoldTarget.length; i++) {
          this.mouseHoldTarget[i].addEventListener('mouseup', () => {
            this.$gsap.set(this.$refs.MouseImg.$el, {
              opacity: 1,
            })
            this.$gsap.set(this.$refs.MouseImgHold.$el, {
              opacity: 0,
            })
          })
        }
      }
    },
  },

  mounted() {
    const mouseHalfWidth = this.$refs.MouseArea.clientWidth / 2
    const mouseHalfHeight = this.$refs.MouseArea.clientHeight / 2

    // タッチイベントではない時
    if (this.$SITECONFIG.isNoTouch) {
      // マウス追従
      window.addEventListener('mousemove', (e) => {
        const posX = e.clientX - mouseHalfWidth
        const posY = e.clientY - mouseHalfHeight

        this.$gsap.set(this.$refs.MouseArea, {
          x: posX,
          y: posY,
        })
      })
    }
  },
}
</script>

<style scoped lang="scss">
:root {
  --viewportHeight: 100vh;
}

.mouse {
  position: fixed;
  top: 9px;
  left: 6px;
  width: 20px;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transform: translate(40px, calc(var(--viewportHeight) - 80px)) scale(0);
}

.mouse-action {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -18px;
  right: -38px;
  width: 44px;
  height: 14px;
  padding: 1px 0 0 0;
  background-color: $white;
  color: $black;
  font-size: 10px;
  border-radius: 8px;
  transform: scale(0);
}

.mouse-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -18px;
  right: -38px;
  width: 64px;
  height: 14px;
  padding: 1px 0 0 0;
  background-color: $white;
  color: $black;
  font-size: 10px;
  border-radius: 8px;
  transform: scale(0);
}

.mouse-action-wrapper,
.mouse-loading-wrapper {
  position: relative;
  overflow: hidden;
  transform: rotate(8deg);
}

.mouse-action-block,
.mouse-loading-block {
  display: inline-block;
  transform: translateY(10px);
}

.is-loading .mouse-loading-dot {
  animation: loadingFade $base-duration $colorAndOpacity-easing infinite;
}

.mouse-loading-dot:nth-child(1) {
  animation-delay: 0s;
}

.mouse-loading-dot:nth-child(2) {
  animation-delay: 0.1s;
}

.mouse-loading-dot:nth-child(3) {
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

.mouse-img-click {
  position: absolute;
  top: -26px;
  left: -14px;
  width: 44px;
  transform: scale(0);
}

.mouse-img-hold {
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(1.3);
  opacity: 0;
}
</style>
