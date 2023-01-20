<template>
  <div ref="MouseArea" class="mouse">
    <span ref="MouseAction" class="mouse-action"
      ><span ref="MouseActionWrapper" class="mouse-action-wrapper"><span ref="MouseActionBlock" class="mouse-action-block">ACTION</span></span></span
    >
    <span ref="MouseLoading" class="mouse-loading"
      ><span ref="MouseLoadingWrapper" class="mouse-loading-wrapper"
        ><span ref="MouseLoadingBlock" class="mouse-loading-block"
          >LOADING<span class="mouse-loading-dot">.</span><span class="mouse-loading-dot">.</span><span class="mouse-loading-dot">.</span></span
        ></span
      ></span
    >
    <img ref="MouseImgClick" src="/images/mouse-click.webp" width="88" height="143" alt="" class="mouse-img-click" />
    <img ref="MouseImgHold" src="/images/mouse-hold.webp" width="200" height="170" alt="" class="mouse-img-hold" />
    <img ref="MouseImg" src="/images/mouse.webp" width="191" height="234" alt="" class="mouse-img" />
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
    mouseHover() {
      if (this.mouseHover) {
        this.$gsap.to(this.mouseAction, {
          duration: this.$SITECONFIG.shortDuration,
          ease: this.$EASING.transform,
          scale: 1,
        })
        this.$gsap.fromTo(
          this.mouseActionWrapper,
          {
            rotate: 8,
          },
          {
            duration: this.$SITECONFIG.shortDuration,
            delay: 0.2,
            ease: this.$EASING.transform,
            rotate: 0,
          }
        )
        this.$gsap.fromTo(
          this.mouseActionBlock,
          {
            y: 10,
          },
          {
            duration: this.$SITECONFIG.shortDuration,
            delay: 0.2,
            ease: this.$EASING.transform,
            y: 0,
          }
        )
      } else {
        this.$gsap.to(this.mouseAction, {
          duration: this.$SITECONFIG.shortDuration,
          ease: this.$EASING.transform,
          scale: 0,
        })
      }
    },
    mouseDown() {
      if (this.mouseDown) {
        this.$gsap.to(this.mouseAction, {
          duration: this.$SITECONFIG.shortDuration,
          ease: this.$EASING.transform,
          scale: 0,
        })
      }
    },
    mouseLoad() {
      if (this.$SITECONFIG.isSp) return

      if (this.mouseLoad) {
        this.mouseLoading.classList.add('is-loading')

        this.$gsap.to(this.mouseLoading, {
          duration: this.$SITECONFIG.shortDuration,
          ease: this.$EASING.transform,
          scale: 1,
        })
        this.$gsap.fromTo(
          this.mouseLoadingWrapper,
          {
            rotate: 8,
          },
          {
            duration: this.$SITECONFIG.shortDuration,
            delay: 0.2,
            ease: this.$EASING.transform,
            rotate: 0,
          }
        )
        this.$gsap.fromTo(
          this.mouseLoadingBlock,
          {
            y: 10,
          },
          {
            duration: this.$SITECONFIG.shortDuration,
            delay: 0.2,
            ease: this.$EASING.transform,
            y: 0,
          }
        )
      } else {
        this.mouseLoading.classList.remove('is-loading')

        this.$gsap.to(this.mouseLoading, {
          duration: this.$SITECONFIG.shortDuration,
          ease: this.$EASING.transform,
          scale: 0,
        })
      }
    },
    imageLoaded() {
      // タッチイベントではない時
      if (this.$SITECONFIG.isNoTouch) {
        // クリックできる要素を全てのコンポーネントから取得
        this.mouseClickTarget = document.querySelectorAll('.js-click-target')
        // ホールドできる要素を全てのコンポーネントから取得
        this.mouseHoldTarget = document.querySelectorAll('.js-hold-target')

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
          this.mouseClickTarget[i].addEventListener('mousedown', this.onMouseDown)
        }

        for (let i = 0; i < this.mouseClickTarget.length; i++) {
          this.mouseClickTarget[i].addEventListener('mouseup', this.onMouseUp)
        }

        for (let i = 0; i < this.mouseHoldTarget.length; i++) {
          this.mouseHoldTarget[i].addEventListener('mousedown', this.onMouseHoldDown)
        }

        for (let i = 0; i < this.mouseHoldTarget.length; i++) {
          this.mouseHoldTarget[i].addEventListener('mouseup', this.onMouseHoldUp)
        }
      }
    },
  },

  mounted() {
    this.mouseDefault = this.$refs.MouseImg
    this.mouseClick = this.$refs.MouseImgClick
    this.mouseHold = this.$refs.MouseImgHold
    this.mouseAction = this.$refs.MouseAction
    this.mouseActionWrapper = this.$refs.MouseActionWrapper
    this.mouseActionBlock = this.$refs.MouseActionBlock
    this.mouseLoading = this.$refs.MouseLoading
    this.mouseLoadingWrapper = this.$refs.MouseLoadingWrapper
    this.mouseLoadingBlock = this.$refs.MouseLoadingBlock
    this.mouseArea = this.$refs.MouseArea
    this.mouseHalfWidth = this.mouseArea.clientWidth / 2
    this.mouseHalfHeight = this.mouseArea.clientHeight / 2

    // タッチイベントではない時、マウス追従
    if (this.$SITECONFIG.isNoTouch) window.addEventListener('mousemove', this.onMouseMove)
  },
  methods: {
    onMouseDown() {
      this.$gsap.to(this.mouseClick, {
        duration: 0.2,
        ease: this.$EASING.transform,
        scale: 1,
      })
      this.$gsap.to(this.mouseDefault, {
        duration: 0.2,
        ease: this.$EASING.transform,
        rotate: 15,
      })
    },
    onMouseUp() {
      this.$gsap.to(this.mouseClick, {
        duration: 0.2,
        ease: this.$EASING.transform,
        scale: 0,
      })
      this.$gsap.to(this.mouseDefault, {
        duration: 0.2,
        ease: this.$EASING.transform,
        rotate: 0,
      })
    },
    onMouseHoldDown() {
      this.$gsap.set(this.mouseDefault, {
        opacity: 0,
      })
      this.$gsap.set(this.mouseHold, {
        opacity: 1,
      })
    },
    onMouseHoldUp() {
      this.$gsap.set(this.mouseDefault, {
        opacity: 1,
      })
      this.$gsap.set(this.mouseHold, {
        opacity: 0,
      })
    },
    onMouseMove(e) {
      const posX = e.clientX - this.mouseHalfWidth
      const posY = e.clientY - this.mouseHalfHeight

      this.$gsap.set(this.mouseArea, {
        x: posX,
        y: posY,
      })
    },
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
