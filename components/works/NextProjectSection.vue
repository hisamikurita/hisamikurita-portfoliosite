<template>
  <div ref="Next" class="next">
    <div ref="Next" class="next">
      <div ref="ContentsLoopTitle" class="next-loop-title">
        <AppTextLoop
          :state="'center'"
          :loop="isLoopTextState"
          :rotate="rotateRight"
          :text="' NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT '"
        >
        </AppTextLoop>
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
  font-family: $sixcaps;
}
</style>