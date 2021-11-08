<template>
  <div class="about">
    <div class="about-bg">
      <div class="about-inner">
        <div class="l-container">
          <h2 ref="AboutTitleTrigger" class="about-title">
            <CommonTextUnderline
              modifier="index-about"
              :state="isTextUnderlineState"
              :start="0.6"
              :rotate="rotateLeft"
            ></CommonTextUnderline>
            <span class="about-title-read-area">
              <CommonSectionReadTitle
                modifier="section"
                :state="isTextSegmentState"
                :start="0"
                :text="['・', 'ABOUT']"
              ></CommonSectionReadTitle>
            </span>
            <span class="about-title-wrapper about-title-wrapper-01">
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="0"
                :rotate="rotateRight"
                text="IN THE SUMMER OF 22, I STARTED PROGRAMMING. IT WAS LA"
              >
              </CommonTextSegment>
            </span>
            <span class="about-title-wrapper about-title-wrapper-02">
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="0.12"
                :rotate="rotateLeft"
                text="TER THAN MOST, BUT I THINK I FOUND SOMETHING THAT I WAS PASSION"
              >
              </CommonTextSegment>
            </span>
            <span class="about-title-wrapper about-title-wrapper-03">
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="0.24"
                :rotate="rotateRight"
                text="ATE ABOUT. I'VE BEEN WRITING CODE EVERY DAY EVER SINCE. MY GREATE"
              >
              </CommonTextSegment>
            </span>
            <span class="about-title-wrapper about-title-wrapper-04">
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="0.36"
                :rotate="rotateLeft"
                text="ST STRENGTH IS MY NEVER-ENDING INQUISITIVENESS."
              >
              </CommonTextSegment>
            </span>
          </h2>
          <p class="about-read-text">
            <CommonSectionReadTitle
              :state="isTextSegmentState"
              :start="0.48"
              :text="[
                'THE VISUAL EXPRESSIONS THAT I AM EXPLORING ON A DAILY BASIS ARE AVAILABLE ON CODEPEN AND',
                'GITHUB, RANGING FROM CSS ANIMATION TO EXPRESSIONS IN THREE.JS. NOT',
                'ALL OF MY WORK IS AVAILABLE ON GITHUB OR CODEPEN,',
                'BUT YOU CAN FIND LINKS TO IT IN MY PORTFOLIO.',
              ]"
            ></CommonSectionReadTitle>
          </p>
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
      isTextUnderlineState: '',
    }
  },
  mounted() {
    /* text-animation */
    this.observe = this.$refs.AboutTitleTrigger
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center'
            this.isTextUnderlineState = 'extend'
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
.about-bg{
  position: relative;

  @include sp(){
    overflow: hidden;
  }
}

.about-inner {
  padding: 333px 0 258px 0;
}

.about-title {
  position: relative;
  width: vw(1090);
  margin: 0 0 85px 0;
  padding: 0 56px 0 40px;
  color: $darkBlue;
  font-size: vw(80);
  font-family: 'Six Caps', sans-serif;
  text-transform: uppercase;
  line-height: 0.964;

  @include tab {
    padding: 0 vw(56) 0 vw(40);
  }
}

.about-title-read-area {
  position: absolute;
  top: -4px;
  left: 42px;
  color: $white;
}

.about-title-wrapper {
  display: block;
}

.about-title-wrapper-01 {
  padding: 0 0 0 vw(156);
  text-align: right;
}

.about-title-wrapper-04 {
  padding: 0 vw(150) 0 0;
}

.about-read-text {
  width: vw(1090);
  color: $darkBlue;
  padding: 0 56px 0 40px;
  font-size: 12px;
  text-align: right;
  letter-spacing: 0.02em;

  @include tab {
    padding: 0 vw(56) 0 vw(40);
  }
}
</style>
