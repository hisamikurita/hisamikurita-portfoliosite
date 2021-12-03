<template>
  <div ref="Intro" class="intro">
    <span ref="IntroSpacer" class="intro-spacer"></span>
    <div ref="IntroWrapper" class="intro-wrapper">
      <CommonCircleBg
        ref="IntroCircleBg"
        :state="isCircleBgState"
        modifier="about-intro"
      >
      </CommonCircleBg>
      <div ref="IntroReadText" class="intro-read-text">
        <span>INTRODUCTION INTRODUCTION INT</span>
      </div>
      <span ref="IntroBg" class="intro-bg">
        <span><img src="/images/intro.jpg" /></span>
      </span>
      <p class="intro-title">
        <span class="intro-title-read-area">
          <CommonSectionReadTitle
            modifier="section"
            :state="isTextSegmentState"
            :start="0"
            :text="[
              '・',
              'ABOUT',
            ]"
            :sp-animation="false"
          ></CommonSectionReadTitle>
        </span>
        <span class="intro-title-wrapper intro-title-wrapper-01">
          <CommonTextSegment
            :state="isTextSegmentState"
            :start="0"
            :rotate="rotateRight"
            text="LOREM IPSUM DOLOR SITA"
            :sp-animation="false"
          >
          </CommonTextSegment>
        </span>
        <span class="intro-title-wrapper intro-title-wrapper-02">
          <CommonTextSegment
            :state="isTextSegmentState"
            :start="0.12"
            :rotate="rotateLeft"
            text="MET, CONSECTETUR ADIPISCINGELIT, L"
            :sp-animation="false"
          >
          </CommonTextSegment>
        </span>
        <span class="intro-title-wrapper intro-title-wrapper-03">
          <CommonTextSegment
            :state="isTextSegmentState"
            :start="0.24"
            :rotate="rotateRight"
            text="OREM IPSUM DOLOR SIT AMET, CONSE"
            :sp-animation="false"
          >
          </CommonTextSegment>
        </span>
        <span class="intro-title-wrapper intro-title-wrapper-04">
          <CommonTextSegment
            :state="isTextSegmentState"
            :start="0.36"
            :rotate="rotateLeft"
            text="CTETUR ADIPISCING ELIT, LOREM IPSU"
            :sp-animation="false"
          >
          </CommonTextSegment>
        </span>
        <span class="intro-title-wrapper intro-title-wrapper-05">
          <CommonTextSegment
            :state="isTextSegmentState"
            :start="0.48"
            :rotate="rotateRight"
            text="M DOLOR SIT AMET."
            :sp-animation="false"
          >
          </CommonTextSegment>
        </span>
      </p>
      <p class="intro-note">
        <CommonTextSegment
          :state="isTextSegmentState"
          :start="0"
          :rotate="rotateRight"
          text="LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DOEIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT"
          :sp-animation="false"
        >
        </CommonTextSegment>
        <CommonTextSegment
          :state="isTextSegmentState"
          :start="0.12"
          :rotate="rotateLeft"
          text="ENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISIUT ALIQUIP EX EA COMMODO CONSEQUAT. DUIS AUTE IR"
          :sp-animation="false"
        >
        </CommonTextSegment>
      </p>
    </div>
  </div>
</template>

<script>
import { vw } from '../../lib/vw';

export default {
  data: () => {
    return {
      isTextSegmentState: '',
      isCircleBgState: '',
      progress: 0,
      // tl: null,
      // tlProgress: 0,
    }
  },

  mounted() {
    window.addEventListener('resize', this.onResize);

    this.$gsap.set(this.$refs.IntroWrapper, {
      height: window.innerHeight,
    })
    this.$gsap.set(this.$refs.IntroReadText, {
      x: window.innerWidth,
    })

    this.$nextTick(() => {
      setTimeout(() => {
        this.wWidth = window.innerWidth;
        this.wHeight = window.innerHeight;
        this.x = -this.$refs.IntroReadText.clientWidth + window.innerWidth
        this.end = 8000 - window.innerHeight
        this.endSide = 5000 - window.innerHeight

        /**
         * タイムライン
         */
        this.scrollTl();

        /**
         * サークルアニメーション
         */
        this.$gsap.to(
          {},
          {
            scrollTrigger: {
              trigger: this.$refs.IntroReadText,
              onEnter: () => {
                this.isCircleBgState = 'extend'
              },
            },
          }
        )

        /**
         * テキストアニメーション
         */
        this.$gsap.to(
          {},
          {
            scrollTrigger: {
              trigger: this.$refs.IntroSpacer,
              onEnter: () => {
                this.isTextSegmentState = 'center'
              },
              onLeaveBack: () => {
                this.isTextSegmentState = 'top'
                setTimeout(() => {
                  this.isTextSegmentState = 'init'
                }, 2000)
              },
            },
          }
        )

        /**
         * セクション固定
         */
        this.fixSec = this.$gsap.to(this.$refs.IntroWrapper, {
          ease: 'none',
          scrollTrigger: {
            pin: true,
            pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
            trigger: this.$refs.IntroWrapper,
            start: 'end',
            end: `+=${this.end}px`,
            scrub: true,
          },
        })
      }, 500)
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  methods: {
    onResize(){
      //   this.wWidth = window.innerWidth;
      //   this.wHeight = window.innerHeight;
      //   // console.log(this.a.scrollTrigger.end)
      // this.$gsap.set(this.$refs.IntroReadText, {
      //   x: window.innerWidth,
      // })

      // this.x = -this.$refs.IntroReadText.clientWidth + window.innerWidth
      // this.end = 8000 - window.innerHeight
      // this.endSide = 5000 - window.innerHeight

      // /**
      //  * セクション固定
      //  */
      this.$gsap.set(this.$refs.IntroWrapper, { height: window.innerHeight,});
      // this.fixSec.scrollTrigger.end = this.end;

console.log(this.progress)
      this.progress = this.tl.progress();
      this.tl.kill();
      this.scrollTl();
    },

    scrollTl(){
      console.log('実行')
      this.tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.IntroReadText,
          start: 'center center',
          end: `+=${this.endSide}px`,
          scrub: 1.0,
        },
      })
      this.tl.fromTo(this.$refs.IntroReadText,
      {
        x: window.innerWidth
      },
      {
        x: -this.$refs.IntroReadText.clientWidth + window.innerWidth,
      })
      .fromTo(this.$refs.IntroBg,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      })
      .fromTo(this.$refs.IntroBg,
      {
        top: vw(17),
        right: vw(98),
        width: vw(54),
        height: vw(245),
        borderRadius: vw(17),
      },
      {
        top: 0,
        right: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
      })
      this.tl.seek(this.progress)
    }
  }
}
</script>

<style lang="scss" scoped>
:root {
  --viewportWidth: 0;
  --viewportHeight: 0;
}

.intro {
  position: relative;
  height: 8000px;
  // padding: 200px 0 0 0;
}

.intro-spacer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1500px;
  pointer-events: none;
}

.intro-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  // height: var(--viewportHeight);
}

.intro-read-text {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: vw(1758);
  height: vw(280);
  margin: auto 0;
  color: $darkPink;
  font-size: vw(280);
  font-family: 'Six Caps', sans-serif;
  white-space: nowrap;
  line-height: 1;
}

.intro-bg {
  position: absolute;
  top: vw(17);
  right: vw(98);
  bottom: 0;
  left: 0;
  width: vw(54);
  height: vw(245);
  // width: 100%;
  // height: 100%;
  margin: auto;
  border-radius: vw(22);
  overflow: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
  opacity: 0;

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

.intro-title {
  position: absolute;
  top: 50%;
  right: 158px;
  transform: translate3d(0, -50%, 0);
  color: $black;
  font-size: vw(80);
  font-family: 'Six Caps', sans-serif;
}

.intro-title-wrapper-01{
  text-align: right;
}

.intro-title-read-area {
  position: absolute;
  top: 0;
  left: 3px;
  color: $white;
}

.intro-note {
  position: absolute;
  bottom: 34px;
  left: 40px;
  color: $black;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.02em;
}

.intro-note-text {
  display: block;
}

.intro-note-text-01 {
  margin: 0 0 0 185px;
}
</style>