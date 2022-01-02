<template>
  <div ref="Contents" class="contents">
    <div class="contents-loop-title-wrapper">
      <span ref="ContentsLoopTitle" class="contents-loop-title">
        <AppTextLoop
          :state="isTextSegmentState"
          :loop="isLoopTextState"
          :start="-0.2"
          :rotate="rotateRight"
          :text="loopText"
        />
      </span>
    </div>
    <div class="l-container">
      <div class="contents-inner">
        <div class="contents-info">
          <dl class="contents-info-client">
            <dt>CLIENT</dt>
            <dd>{{client}}</dd>
          </dl>
          <div class="contents-info-desc">
            {{freeArea}}
          </div>
        </div>
        <div
          v-for="index of Object.keys(contentsImg).length - 1"
          :key="index"
          class="contents-img"
          :class="'contents-img-0' + index"
        >
          <img :src="`${contentsImg['contentsImg0' + index].url}?w=1000&h=624&q=80`" :width="`${contentsImg['contentsImg0' + index].width}`" :height="`${contentsImg['contentsImg0' + index].height}`"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
    /* text-animation */
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

    /* loop-text-animation */
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
.contents-inner {
  padding: 0 40px;
}

.contents-loop-title-wrapper {
  padding: 216px 0 242px;
}

.contents-loop-title {
  font-size: vw(140);
  font-family: $sixcaps;
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

.contents-info-desc{
  margin: -2px 0 0 0;
  line-height: 1.36;
}

.contents-img {
  position: relative;
  width: vw(1000);
  height: vw(624);
  overflow: hidden;

  &:not(:last-of-type) {
    margin: 0 0 160px 0;
  }

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>