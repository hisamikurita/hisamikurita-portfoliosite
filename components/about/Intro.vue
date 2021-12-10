<template>
  <div ref="Intro" class="intro">
    <span ref="IntroSpacer01" class="intro-spacer-01"></span>
    <span ref="IntroSpacer02" class="intro-spacer-02"></span>
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
        <span><img ref="IntroImg" src="/images/intro.jpg" /></span>
      </span>
      <p class="intro-title">
        <span class="intro-title-read-area">
          <CommonSectionReadTitle
            modifier="section"
            :state="isTextSegmentState"
            :start="0"
            :text="['・', 'ABOUT']"
          ></CommonSectionReadTitle>
        </span>
        <span class="pc-only">
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
        </span>
        <span class="sp-only">
          <span class="intro-title-wrapper intro-title-wrapper-sp-01">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0"
              :rotate="rotateRight"
              text="LOREM I"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-title-wrapper intro-title-wrapper-sp-02">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.12"
              :rotate="rotateLeft"
              text="PSUM DOLOR SI"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-title-wrapper intro-title-wrapper-sp-03">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.24"
              :rotate="rotateRight"
              text="TAMET, CONSEC"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-title-wrapper intro-title-wrapper-sp-04">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.36"
              :rotate="rotateLeft"
              text="TETUR ADIPISCI"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-title-wrapper intro-title-wrapper-sp-05">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.48"
              :rotate="rotateRight"
              text="NGELIT, LOREM"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-title-wrapper intro-title-wrapper-sp-06">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.6"
              :rotate="rotateLeft"
              text="IPSUM DOLOR S"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-title-wrapper intro-title-wrapper-sp-07">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.72"
              :rotate="rotateRight"
              text="IT AMET."
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
        </span>
      </p>
      <p class="intro-note">
        <span class="pc-only">
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
        </span>
        <span class="sp-only">
          <span class="intro-note-wrapper intro-note-wrapper-sp-01">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0"
              :rotate="rotateRight"
              text="LOREM IPSUM DOLOR SIT"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-note-wrapper intro-note-wrapper-sp-02">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.12"
              :rotate="rotateLeft"
              text="AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-note-wrapper intro-note-wrapper-sp-03">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.24"
              :rotate="rotateRight"
              text="TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-note-wrapper intro-note-wrapper-sp-04">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.36"
              :rotate="rotateLeft"
              text="ENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-note-wrapper intro-note-wrapper-sp-05">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.48"
              :rotate="rotateRight"
              text="LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT. DUIS"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
          <span class="intro-note-wrapper intro-note-wrapper-sp-06">
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="0.6"
              :rotate="rotateLeft"
              text="AUTE IR"
              :pc-animation="false"
            >
            </CommonTextSegment>
          </span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { vw, vwSp } from '../../lib/vw'

export default {
  data: () => {
    return {
      isTextSegmentState: '',
      isCircleBgState: '',
    }
  },

  mounted() {
    window.addEventListener('resize', this.onResize)

    this.$nextTick(() => {
      setTimeout(() => {
        /**
         * タイムライン
         */
        this.scrollTl()

        /**
         * サークルアニメーション
         */
        this.$gsap.to(
          {},
          {
            scrollTrigger: {
              once: true,
              trigger: this.$refs.IntroReadText,
              onEnter: () => {
                setTimeout(() => {
                  this.isCircleBgState = 'extend'
                }, 200)
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
              trigger: this.$refs.IntroSpacer01,
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

        this.scrollFix()
      }, 100)
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize() {},

    scrollFix() {
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
          end: () => `+=${7000 - window.innerHeight}px`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      if (this.$siteConfig.isTouch) {
        this.$gsap.set(this.$refs.IntroWrapper, {
          zIndex: -1,
        })
      }
    },

    scrollTl() {
      const textInit = this.$siteConfig.isPc ? vw(1280) : vwSp(750)
      const textMove = this.$siteConfig.isPc
        ? vw(-1758 + 1280)
        : vwSp(-1858 + 750)
      const bgWidth = this.$siteConfig.isPc ? vw(54) : vwSp(81)
      const bgHeight = this.$siteConfig.isPc ? vw(245) : vwSp(365)
      const bgRadius = this.$siteConfig.isPc ? vw(24) : vwSp(36)
      const bgX = this.$siteConfig.isPc ? vw(-49) : vwSp(121)
      const bgY = this.$siteConfig.isPc ? vw(7.8) : vwSp(39)

      this.tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.IntroReadText,
          start: 'center center',
          end: () => `+=${4000 - window.innerHeight}px`,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
      this.tl
        .fromTo(
          this.$refs.IntroReadText,
          {
            x: textInit,
          },
          {
            x: textMove,
          },'-=0.1')
        .fromTo(
          this.$refs.IntroBg,
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },'-=0.1')
        .fromTo(
          this.$refs.IntroBg,
          {
            x: bgX,
            y: bgY,
            width: bgWidth,
            height: bgHeight,
            borderRadius: bgRadius,
          },
          {
            x: 0,
            y: 0,
            width: () => window.innerWidth,
            height: () => window.innerHeight,
            borderRadius: 0,
          },'-=0.1')

      this.$gsap.fromTo(
        this.$refs.IntroImg,
        {
          y: 200,
        },
        {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            start: 'start',
            trigger: this.$refs.IntroSpacer02,
            scrub: 0.1,
          },
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
:root {
  --viewportWidth: 0;
  --viewportHeight: 0;
}

.intro {
  position: relative;
  height: 7000px;
  margin: vw(600) 0 0 0;

  @include sp() {
    margin: 100px 0 0 0;
  }
}

.intro-spacer-01 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1500px;
  pointer-events: none;
}

.intro-spacer-02 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5000px;
  pointer-events: none;
}

.intro-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--viewportHeight) !important;
  z-index: -1;
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
  transform: translateX(vw(1280));

  @include sp() {
    width: vw_sp(2604);
    height: vw_sp(365);
    font-size: vw_sp(420);
    transform: translateX(vw_sp(750));
  }
}

.intro-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: vw(54);
  height: vw(245);
  margin: auto;
  border-radius: vw(22);
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate(vw(-48), vw(8));
  opacity: 0;
  pointer-events: none;

  @include sp() {
    width: vw_sp(81);
    height: vw_sp(365);
    border-radius: vw(36);
    transform: translate(vw_sp(121), vw_sp(39));
  }

  & img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% + 400px);
    margin: auto;
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

  @include sp() {
    top: calc(50% - 20px);
    right: 23px;
    font-size: vw_sp(120);
  }
}

.intro-title-wrapper-01,
.intro-title-wrapper-sp-01 {
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

  @include sp() {
    bottom: 20px;
    left: 20px;
    font-size: vw_sp(20);
  }
}

.intro-note-text {
  display: block;
}

.intro-note-text-01 {
  margin: 0 0 0 185px;
}
</style>