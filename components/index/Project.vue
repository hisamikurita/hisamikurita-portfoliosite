<template>
  <div ref="Project" class="project">
    <div class="project-bg">
      <div class="project-inner">
        <h2 class="project-loop-title">
          <CommonTextLoop
            :state="isTextSegmentState"
            :start="0"
            :rotate="rotateRight"
            text="MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON."
          >
          </CommonTextLoop>
        </h2>
        <!-- <div class="l-container">
          <h1 class="project-title">PROJECT</h1>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      isTextSegmentState: '',
    }
  },

  mounted() {
    /* text-animation */
    this.observe = this.$refs.Project;
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center';
            this.iObserver.unobserve(this.observe)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserver.observe(this.observe)
  },

  beforeDestroy() {
    this.iObserver.unobserve(this.observe)
  },
}
</script>

<style scoped lang="scss">
.project-inner {
  height: 100vh;
}

.project-loop-title{
  color: $black;
  font-size: vw(140);
  font-family: 'Six Caps', sans-serif;
  white-space: nowrap;
}
</style>