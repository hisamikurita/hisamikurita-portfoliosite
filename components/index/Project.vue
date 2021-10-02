<template>
  <div class="project">
    <div class="project-bg">
      <div class="project-inner">
        <h2 ref="ProjectLoopTitle" class="project-loop-title">
          <span class="project-loop-title-read-area">
            <CommonSectionReadTitle
              modifier="project-section"
              :state="isTextSegmentState"
              :start="0"
              :text="[
                '・',
                'SELECTED',
                'PROJECTS',
              ]"
            ></CommonSectionReadTitle>
          </span>
          <span class="project-loop-title-wrapper project-loop-title-wrapper-01">
            <CommonTextUnderline
              modifier="project-01"
              :state="isTextUnderlineState"
              :start="0"
              :rotate="rotateLeft"
            >
            </CommonTextUnderline>
            <CommonTextUnderline
              modifier="project-02"
              :state="isTextUnderlineState"
              :start="0.12"
              :rotate="rotateRight"
            >
            </CommonTextUnderline>
            <CommonTextLoop
              :state="isTextSegmentState"
              :loop="isLoopTextState"
              :loopdirection="1.0"
              :start="-0.4"
              :rotate="rotateRight"
              text=" MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. "
            >
            </CommonTextLoop>
          </span>
          <span class="project-loop-title-wrapper project-loop-title-wrapper-01">
            <CommonTextUnderline
              modifier="project-02"
              :state="isTextUnderlineState"
              :start="0"
              :rotate="rotateLeft"
            >
            </CommonTextUnderline>
            <CommonTextLoop
              :state="isTextSegmentState"
              :loop="isLoopTextState"
              :loopdirection="-1.0"
              :start="-0.2"
              :rotate="rotateRight"
              text=" MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. "
            >
            </CommonTextLoop>
          </span>
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
      isTextUnderlineState: '',
      isLoopTextState: '',
    }
  },

  mounted() {
    /* text-animation */
    this.observe = this.$refs.ProjectLoopTitle;
    this.iObserverTextSegment = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center';
            this.isTextUnderlineState = 'extend';
            this.iObserverTextSegment.unobserve(this.observe)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserverTextSegment.observe(this.observe)

    this.iObserverLoopText = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isLoopTextState = 'isActive';
          }
          else{
            this.isLoopTextState = 'isNoActive';
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserverLoopText.observe(this.observe)
  },

  beforeDestroy() {
    this.iObserverTextSegment.unobserve(this.observe)
    this.iObserverLoopText.unobserve(this.observe)
  },
}
</script>

<style scoped lang="scss">
.project-inner {
  padding: 206px 0 0 0;
  height: 100vh;
}

.project-loop-title{
  position: relative;
  color: $black;
  font-size: vw(140);
  font-family: 'Six Caps', sans-serif;
  white-space: nowrap;
}

.project-loop-title-wrapper{
  display: block;
  position: relative;
  padding: 28px;
}

.project-loop-title-read-area{
  position: absolute;
  top: -96px;
  right: 160px;
  text-align: right;
}
</style>