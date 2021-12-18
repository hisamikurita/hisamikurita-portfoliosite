<template>
  <div ref="Contents" class="contents">
    <div class="contents-loop-title-wrapper">
      <span ref="ContentsLoopTitle" class="contents-loop-title">
        <AppTextLoop
          :state="isTextSegmentState"
          :loop="isLoopTextState"
          :start="-0.4"
          :rotate="rotateRight"
          :text="' M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST M-TRUST '"
        />
      </span>
    </div>
    <div class="l-container">
      <div class="contents-inner">
        <div class="contents-info">
          <dl class="contents-info-dl">
            <dt>CLIENT</dt>
            <dd>M-TRUST CO LTD.,</dd>
          </dl>
          <dl class="contents-info-dl">
            <dt>YEAR</dt>
            <dd>2020</dd>
          </dl>
          <dl class="contents-info-dl">
            <dt>LINK</dt>
            <dd>SITE IS LIVE</dd>
          </dl>
        </div>
        <div v-for="i of 4" :key="i" class="contents-img" :class="'contents-img-0' + i">
          <img :src="'/images/works-contents-mtrust-0' + i + '.jpg'" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.contents-inner{
  padding: 0 40px;
}

.contents-loop-title-wrapper{
  padding: 216px 0 242px;
}

.contents-loop-title {
  font-size: vw(140);
  font-family: $sixcaps;
}

.contents-info{
  display: flex;
  width: vw(1000);
  margin: 0 0 160px 0;
  padding: 38px 0 0 0;
  font-size: 12px;
  border-top: solid 1px;
}

.contents-info-dl{
  width: 33.333%;
  line-height: 1.2;
}

.contents-img{
  position: relative;
  width: vw(1000);
  height: vw(624);
  overflow: hidden;

  &:not(:last-of-type){
    margin: 0 0 160px 0;
  }

  & img{
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