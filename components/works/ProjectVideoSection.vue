<template>
  <div ref="ContentsLoopTitleWrapper" class="contents-loop-title-wrapper">
    <div ref="ContentsLoopTitle" class="contents-loop-title">
      <span class="contents-loop-video">
        <span
          class="contents-loop-video-shadow"
          :style="`box-shadow:0 20px 60px 10px ${currentProject.siteColor.shadowColor}`"
        ></span>
        <span class="contents-loop-video-wrapper"
          ><video
            :src="`/movie/${currentProject.id}.mp4`"
            autoplay
            loop
            muted
          ></video
        ></span>
      </span>
      <AppTextLoop
        :state="isTextSegmentState"
        :loop="isLoopTextState"
        :start="-0.2"
        :rotate="$BASEROTATE.right"
        :text="currentProject.loopText"
      />
    </div>
    <span class="contents-loop-card">
      <AppCardBase
        :component-name="'WorksLinkContents'"
        :shadow-color="currentProject.siteColor.shadowColor"
        :color="currentProject.siteColor.allTextColor"
        :external-link="currentProject.siteLink"
        :xspeed="0.04"
        :yspeed="0.04"
        :modifier="'works-contents-external'"
      />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    currentProject: {
      type: Object,
      required: true,
    },
  },

  data: () => {
    return {
      isTextSegmentState: 'default',
      isLoopTextState: 'default',
    }
  },

  mounted() {
    this.observe = this.$refs.ContentsLoopTitle
    /* text-animation call */
    this.iObserverTextSegment = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.isTextSegmentState = 'center'
              this.iObserverTextSegment.unobserve(this.observe)
            }, 300)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserverTextSegment.observe(this.observe)

    /* loop-text-animation call */
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

  beforeDestroy() {
    this.iObserverTextSegment.unobserve(this.observe)
    this.iObserverLoopText.unobserve(this.observe)
  },
}
</script>

<style lang="scss" scoped>
.contents-loop-title-wrapper {
  position: relative;
  padding: vw(216) 0 vw(242);

  @include sp() {
    padding: 64px 0 190px;
  }
}

.contents-loop-title {
  position: relative;
  font-size: vw(140);
  font-family: $sixcaps;

  @include sp() {
    font-size: vw_sp(160);
  }
}

.contents-loop-video {
  position: absolute;
  top: 8px;
  right: 0;
  bottom: 0;
  left: -120px;
  width: vw(480);
  height: vw(353);
  margin: auto;
  z-index: 10;

  @include sp() {
    top: 0;
    left: 0;
    width: vw_sp(669);
    height: vw_sp(491);
  }
}

.contents-loop-video-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // box-shadow: 0 20px 60px 10px #101237;
  border-radius: 12px;
  opacity: 0.6;

  @include sp() {
    border-radius: 8px;
  }
}

.contents-loop-video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;

  @include sp() {
    border-radius: 8px;
  }

  & video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.contents-loop-card {
  position: absolute;
  top: vw(500);
  right: vw(420);
  width: 147px;
  height: 200px;
  z-index: 10;
  transform: rotate(16deg);

  @include sp() {
  top: 400px;
  right: 110px;
  }
}
</style>