<template>
  <div ref="ContentsLoopTitleWrapper" class="contents-loop-title-wrapper">
    <div ref="ContentsLoopTitle" class="contents-loop-title">
      <span ref="ContentsLoopVideo" class="contents-loop-video">
        <span class="contents-loop-video-shadow" :style="`box-shadow:0 22px 60px 0px ${currentProject.siteColor.shadowColor}`"></span>
        <span class="contents-loop-video-wrapper"
          ><video :poster="`/images/poster-${currentProject.id}.webp`" :src="`/movie/${currentProject.id}.mp4`" playsinline autoplay loop muted disablePictureInPicture disableRemotePlayback></video
        ></span>
      </span>
      <AppLoopText :loop="isLoopTextState" :text="currentProject.title.short" />
    </div>
    <div class="contents-loop-card">
      <AppCard
        :component-name="'works'"
        :shadow-color="currentProject.siteColor.shadowColor"
        :color="currentProject.siteColor.allTextColor"
        :external-link="currentProject.siteLink"
        :xspeed="0.04"
        :yspeed="0.04"
      />
    </div>
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

  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
  },

  watch: {
    hambergerMenuState: function () {
      /**
       * PCかつタッチデバイスではない時
       */
      if (this.$SITECONFIG.isPc && this.$SITECONFIG.isNoTouch) {
        /**
         * ハンバガーメニューが開いた時
         */
        if (this.hambergerMenuState) {
          this.iObserverLoopVideo.unobserve(this.$refs.ContentsLoopVideo)
          window.removeEventListener('mousemove', this.onMoseMove)
        } else if (!this.hambergerMenuState) {
          /**
           * ハンバガーメニューが閉じた時
           */
          this.iObserverLoopVideo.observe(this.$refs.ContentsLoopVideo)
          window.addEventListener('mousemove', this.onMoseMove)
        }
      }
    },
  },
  mounted() {
    // 一回発火のテキストアニメーション
    this.observe = this.$refs.ContentsLoopTitle
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

    // ループのテキストアニメーション、画面内に侵入してきた時のみ発火させる
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

    // ビデオのマウスアニメーション、画面内に侵入してきた時のみ発火させる
    if (this.$SITECONFIG.isPc && this.$SITECONFIG.isNoTouch) {
      this.iObserverLoopVideo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              window.addEventListener('mousemove', this.onMoseMove)
            } else {
              window.removeEventListener('mousemove', this.onMoseMove)
            }
          })
        },
        { rootMargin: '0%' }
      )
      this.iObserverLoopVideo.observe(this.$refs.ContentsLoopVideo)
    }
  },

  beforeDestroy() {
    // リセット
    this.iObserverTextSegment.unobserve(this.observe)
    this.iObserverTextSegment = null
    this.iObserverLoopText.unobserve(this.observe)
    this.iObserverLoopText = null
    if (this.$SITECONFIG.isPc && this.$SITECONFIG.isNoTouch) {
      this.iObserverLoopVideo.unobserve(this.$refs.ContentsLoopVideo)
      this.iObserverLoopVideo = null
      window.removeEventListener('mousemove', this.onMoseMove)
    }
  },

  methods: {
    onMoseMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2.0 * 5
      const y = (e.clientY / window.innerHeight - 0.5) * 2.0 * 5

      this.$gsap.to(this.$refs.ContentsLoopVideo, {
        duration: this.$SITECONFIG.fullDuration,
        ease: 'power2.out',
        rotateX: y,
        rotateY: -x,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.contents-loop-title-wrapper {
  position: relative;
  padding: vw(286) 0 vw(242);

  @include sp() {
    padding: 194px 0 190px;
  }
}

.contents-loop-title {
  position: relative;
  font-size: vw(140);
  font-family: $sixcaps;
  transform-style: preserve-3d;
  perspective: 1000px;

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
  width: vw(386 * 1.1);
  height: vw(241 * 1.1);
  margin: auto;
  z-index: 10;
  transform: translateZ(200px);

  @include sp() {
    top: 0;
    left: 0;
    width: vw_sp(669);
    height: vw_sp(418);
    transform: none;
  }
}

.contents-loop-video-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  opacity: 0.3;
}

.contents-loop-video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;

  & video {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
    object-position: center;
  }
}

.contents-loop-card {
  position: absolute;
  top: vw(580);
  right: vw(420);
  width: 147px;
  height: 200px;
  z-index: 10;
  transform: rotate(16deg);

  @include sp() {
    top: 520px;
    right: 110px;
  }
}
</style>
