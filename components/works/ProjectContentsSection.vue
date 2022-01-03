<template>
  <div ref="Contents" class="contents">
    <div class="contents-loop-title-wrapper">
      <div ref="ContentsLoopTitle" class="contents-loop-title">
        <span class="contents-loop-video-shadow">
          <span class="contents-loop-video-wrapper"
            ><video :src="`/movie/${name}.mp4`" autoplay loop muted></video
          ></span>
        </span>
        <span class="contents-loop-card">
          <AppCardBase
            :component-name="'WorksLinkContents'"
            :drag-animation="false"
            :color="siteColor"
            :external-link="externalLink"
            :modifier="'works-contents-external'"
          />
        </span>
        <AppTextLoop
          :state="isTextSegmentState"
          :loop="isLoopTextState"
          :start="-0.2"
          :rotate="rotateRight"
          :text="loopText"
        />
      </div>
    </div>
    <div class="l-container">
      <div class="contents-inner">
        <div class="contents-info">
          <dl class="contents-info-client">
            <dt>CLIENT</dt>
            <dd>{{ client }}</dd>
          </dl>
          <div class="contents-info-desc">
            {{ freeArea }}
          </div>
        </div>
        <div
          v-for="index of Object.keys(contentsImg).length - 1"
          :key="index"
          ref="ContentsImgWrapper"
          class="contents-img"
          :class="'contents-img-0' + index"
        >
          <img
            ref="ContentsImg"
            :src="`${
              contentsImg['contentsImg0' + index].url
            }?w=2000&h=1248&q=80`"
            :width="`${contentsImg['contentsImg0' + index].width}`"
            :height="`${contentsImg['contentsImg0' + index].height}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    siteColor: {
      type: String,
      default: '',
    },
    externalLink: {
      type: String,
      default: null,
    },
    loopText: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    freeArea: {
      type: String,
      required: true,
    },
    contentsImg: {
      type: Object,
      required: true,
    },
  },

  data: () => {
    return {
      isTextSegmentState: '',
      isLoopTextState: '',
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

    /* img-animation call */
    this.imgTriggerArray = []
    this.imgWrapper = this.$refs.ContentsImgWrapper
    this.img = this.$refs.ContentsImg

    this.$nextTick(() => {
      setTimeout(() => {
        this.imgWrapper.forEach((item, index) => {
          this.imgTriggerArray.push(
            this.$ScrollTrigger.create({
              trigger: item,
              start: 'top bottom',
              once: true,
              onEnter: () => {
                this.$gsap.to(this.imgWrapper[index], {
                  duration: this.$siteConfig.baseDuration,
                  ease: this.$easing.transform,
                  scale: 1.0,
                })
                this.$gsap.to(this.img[index], {
                  duration: this.$siteConfig.baseDuration,
                  ease: this.$easing.transform,
                  scale: 1.0,
                })
              },
            })
          )
        })
      }, 100)
    })
  },
  beforeDestroy() {
    this.iObserverTextSegment.unobserve(this.observe)
    this.iObserverLoopText.unobserve(this.observe)
    this.imgTriggerArray.forEach((item) => {
      item.kill()
    })
  },
}
</script>

<style lang="scss" scoped>
.contents-inner {
  padding: 0 40px;
}

.contents-loop-title-wrapper {
  padding: vw(216) 0 vw(242);
}

.contents-loop-title {
  position: relative;
  font-size: vw(140);
  font-family: $sixcaps;
}

.contents-loop-video-shadow {
  position: absolute;
  top: 8px;
  right: 0;
  bottom: 0;
  left: -120px;
  width: vw(480);
  height: vw(353);
  margin: auto;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 20px 60px 10px #101237;
    border-radius: 12px;
    opacity: 0.6;
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
  top: 560px;
  right: 0;
  bottom: 0;
  left: 238px;
  width: 147px;
  height: 200px;
  margin: auto;
  z-index: 10;
  transform: rotate(16deg);
}

.contents-info {
  display: flex;
  width: vw(1000);
  margin: 0 0 160px 0;
  padding: 38px 0 0 0;
  font-size: 12px;
  border-top: solid 1px;
}

.contents-info-client {
  flex-shrink: 0;
  width: 250px;
  line-height: 1.2;
}

.contents-info-desc {
  margin: -2px 0 0 0;
  line-height: 1.36;
}

.contents-img {
  position: relative;
  width: vw(1000);
  height: vw(624);
  overflow: hidden;
  transform: scale(0.7);

  &:not(:last-of-type) {
    margin: 0 0 160px 0;
  }

  & img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.6);
  }
}
</style>