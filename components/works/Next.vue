<template>
  <div ref="Next" class="next">
    <div ref="Next" class="next">
      <div ref="ContentsLoopTitle" class="next-loop-title">
        <CommonTextLoop
          :state="'center'"
          :loop="isLoopTextState"
          :loopdirection="-1.0"
          :start="0"
          :rotate="rotateRight"
          text=" NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT "
        >
        </CommonTextLoop>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      isLoopTextState: '',
    }
  },
  mounted() {
    /* loop-text-animation */
    this.observe = this.$refs.ContentsLoopTitle
    this.iObserverLoopText = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isLoopTextState = 'isActive'
          } else {
            this.isLoopTextState = 'isNoActive'
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserverLoopText.observe(this.observe)
  },
}
</script>

<style lang="scss" scoped>
.next-loop-title{
  font-size: vw(140);
  font-family: 'Six Caps', sans-serif;
}
</style>