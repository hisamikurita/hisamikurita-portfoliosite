<template>
  <div ref="Contents" class="contents">
    <div class="contents-loop-title-wrapper">
      <div ref="ContentsLoopTitle" class="contents-loop-title">
        <span class="contents-loop-video">
          <span class="contents-loop-video-shadow" :style="`box-shadow:0 20px 60px 10px ${currentProject.siteColor.shadowColor}`"></span>
          <span class="contents-loop-video-wrapper"
            ><video :src="`/movie/${currentProject.id}.mp4`" autoplay loop muted></video
          ></span>
        </span>
        <span class="contents-loop-card">
          <AppCardBase
            :component-name="'WorksLinkContents'"
            :drag-animation="false"
            :shadow-color="currentProject.siteColor.shadowColor"
            :external-link="currentProject.siteLink"
            :modifier="'works-contents-external'"
          />
        </span>
        <AppTextLoop
          :state="isTextSegmentState"
          :loop="isLoopTextState"
          :start="-0.2"
          :rotate="$BASEROTATE.right"
          :text="currentProject.loopText"
        />
      </div>
    </div>
    <div class="l-container">
      <div class="contents-inner">
        <div class="contents-info">
          <dl class="contents-info-client">
            <dt>CLIENT</dt>
            <dd>{{ currentProject.client }}</dd>
          </dl>
          <div class="contents-info-desc">
            {{ currentProject.freeArea }}
          </div>
        </div>
        <div
          v-for="(image, index) in currentProject.contentsImg"
          :key="index"
          ref="ContentsImgWrapper"
          class="contents-img"
          :class="`contents-img-0${index + 1} ${image.fieldId}`"
        >
          <span v-if="image.fieldId === 'default' || image.fieldId === 'full'">
            <picture>
              <source
                :srcset="`${image.object.url}?fm=webp&w=2000&h=1248&q=50`"
                :width="`${image.object.width}`"
                :height="`${image.object.height}`"
                type="image/webp"
              >
              <img
                ref="ContentsImg"
                :src="`${image.object.url}?w=2000&h=1248&q=50`"
                :width="`${image.object.width}`"
                :height="`${image.object.height}`"
              />
            </picture>
          </span>
          <span v-else class="contents-img-split">
            <picture>
              <source
                :srcset="`${image.split1.url}?fm=webp&w=2000&h=1248&q=50`"
                :width="`${image.split1.width}`"
                :height="`${image.split1.height}`"
                type="image/webp"
              >
              <img
                ref="ContentsImg"
                :src="`${image.split1.url}?w=2000&h=1248&q=50`"
                :width="`${image.split1.width}`"
                :height="`${image.split1.height}`"
              />
            </picture>
            <picture>
              <source
                :srcset="`${image.split2.url}?fm=webp&w=2000&h=1248&q=50`"
                :width="`${image.split2.width}`"
                :height="`${image.split2.height}`"
                type="image/webp"
              >
              <img
                ref="ContentsImg"
                :src="`${image.split2.url}?w=2000&h=1248&q=50`"
                :width="`${image.split2.width}`"
                :height="`${image.split2.height}`"
              />
            </picture>
          </span>
        </div>
      </div>
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
                  duration: this.$SITECONFIG.baseDuration,
                  ease: this.$EASING.transform,
                  scale: 1.0,
                })
                this.$gsap.to(this.img[index], {
                  duration: this.$SITECONFIG.baseDuration,
                  ease: this.$EASING.transform,
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

  @include sp() {
    padding: 0;
  }
}

.contents-loop-title-wrapper {
  padding: vw(216) 0 vw(242);
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
}

.contents-loop-video-shadow{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // box-shadow: 0 20px 60px 10px #101237;
    border-radius: 12px;
    opacity: 0.6;
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

  @include sp() {
    display: block;
    width: 100%;
    font-size: 10px;
  }
}

.contents-info-client {
  flex-shrink: 0;
  width: 250px;
  line-height: 1.2;

  @include sp() {
    width: 100%;
    margin: 0 0 28px 0;
  }
}

.contents-info-desc {
  margin: -2px 0 0 0;
  line-height: 1.36;
}

.contents-img {
  position: relative;
  margin: 0 0 160px 0;
  transform: scale(0.7);

  & img {
    width: 100%;
  }

  &.default {
    width: vw(1000);
  }

  &.full {
    width: calc(100% + 160px);
    margin: 0 0 160px -80px;
  }

  &.split {
    width: calc(100% + 160px);
    margin: 0 0 160px -80px;
  }
}

.contents-img-split {
  display: flex;
}
</style>