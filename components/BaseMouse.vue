<template>
  <div ref="MouseArea" class="mouse">
    <span ref="MouseAction" class="mouse-action"><span ref="MouseActionWrapper" class="mouse-action-wrapper"><span ref="MouseActionBlock" class="mouse-action-block">ACTION</span></span></span>
    <nuxt-img
      ref="MouseImgClick"
      src="/images/mouse-click.png"
      width="88"
      height="143"
      quality="80"
      class="mouse-img-click"
    />
    <nuxt-img
      ref="MouseImg"
      src="/images/mouse.png"
      width="191"
      height="234"
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
  },
  watch: {
    mouseHover: function () {
      if (this.mouseHover) {
        this.$gsap.to(this.$refs.MouseAction, {
          duration: this.$SITECONFIG.halfBaseDuration,
          ease: this.$EASING.transform,
          scale: 1,
        })
        this.$gsap.fromTo(this.$refs.MouseActionWrapper,
        {
          rotate: 8,
        },
        {
          duration: this.$SITECONFIG.halfBaseDuration,
          delay: 0.2,
          ease: this.$EASING.transform,
          rotate: 0,
        })
        this.$gsap.fromTo(this.$refs.MouseActionBlock,
        {
          y: 10,
        },
        {
          duration: this.$SITECONFIG.halfBaseDuration,
          delay: 0.2,
          ease: this.$EASING.transform,
          y: 0,
        })
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
  },

  mounted() {
    const mouseHalfWidth = this.$refs.MouseArea.clientWidth / 2
    const mouseHalfHeight = this.$refs.MouseArea.clientHeight / 2

    if (this.$SITECONFIG.isNoTouch) {
      window.addEventListener('mousemove', (e) => {
        const posX = e.clientX - mouseHalfWidth
        const posY = e.clientY - mouseHalfHeight

        this.$gsap.set(this.$refs.MouseArea, {
          x: posX,
          y: posY,
        })
      })

      document.addEventListener('mousedown', () => {
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

      document.addEventListener('mouseup', () => {
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

    if (this.$SITECONFIG.isTouch) {
      this.$refs.MouseArea.style.display = 'none'
    }
  },
}
</script>

<style scoped lang="scss">
.mouse {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  z-index: 100;
  pointer-events: none;
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

.mouse-action-wrapper{
  position: relative;
  overflow: hidden;
  transform: rotate(8deg);
}

.mouse-action-block{
  display: inline-block;
  transform: translateY(10px);
}

.mouse-img-click {
  position: absolute;
  top: -26px;
  left: -14px;
  width: 44px;
  transform: scale(0);
}
</style>