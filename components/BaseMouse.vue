<template>
  <div ref="Mouse" class="mouse">
    <nuxt-img src="/images/mouse.png" quality="80" />
  </div>
</template>

<script>
export default {
  mounted() {
    const mouseHalfWidth = this.$refs.Mouse.clientWidth / 2;
    const mouseHalfHeight = this.$refs.Mouse.clientHeight / 2;

    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX - mouseHalfWidth
      const posY = e.clientY - mouseHalfHeight

      this.$gsap.set(this.$refs.Mouse, {
        x: posX,
        y: posY,
      })
    })
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
</style>