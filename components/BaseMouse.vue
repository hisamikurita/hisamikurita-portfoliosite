<template>
  <div ref="MouseArea" class="mouse">
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

.mouse-img-click {
  position: absolute;
  top: -26px;
  left: -14px;
  width: 44px;
  transform: scale(0);
}
</style>