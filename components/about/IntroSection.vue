<template>
  <div class="intro">
    <div ref="IntroContainer" class="intro-container">
      <span ref="IntroSpacer01" class="intro-spacer-01"></span>
      <span ref="IntroSpacer02" class="intro-spacer-02"></span>
      <div ref="IntroWrapper" class="intro-wrapper">
        <AppCircleBg ref="IntroCircleBg" :state="isCircleBgState" :modifier="'about-intro'" />
        <p ref="IntroReadText" class="intro-read-text">INTRODUCTION INTRODUCTION INT</p>
        <div ref="IntroBg" class="intro-bg">
          <div ref="IntroBgClip" class="intro-bg-clip">
            <div class="intro-bg-wrapper">
              <div ref="IntroBgCanvas" class="intro-bg-canvas" :data-pcimg="`/images/intro.webp`" :data-spimg="`/images/intro-sp.webp`"></div>
            </div>
            <h2 class="intro-title">
              <span class="intro-title-read-area">
                <AppReadTitle :state="isTextSegmentState" :text="['・', 'ABOUT']" :modifier="'section'" />
              </span>
              <span class="pc-only">
                <span class="intro-title-wrapper intro-title-wrapper-01">
                  <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'HI, I WORK FULL REMOTE'" :sp-animation="false" />
                </span>
                <span class="intro-title-wrapper intro-title-wrapper-02">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.12" :rotate="$BASEROTATE.left" :text="'DURING THE WEEK, BUT I ALSO DO CREA'" :sp-animation="false" />
                </span>
                <span class="intro-title-wrapper intro-title-wrapper-03">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.24" :rotate="$BASEROTATE.right" :text="'TIVE CODING AS A HOBBY ON MY DAYS O'" :sp-animation="false" />
                </span>
                <span class="intro-title-wrapper intro-title-wrapper-04">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.36" :rotate="$BASEROTATE.left" :text="'FF. OTHER THAN THAT, I PLAY ANIME AND'" :sp-animation="false" />
                </span>
                <span class="intro-title-wrapper intro-title-wrapper-05">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.48" :rotate="$BASEROTATE.right" :text="'GAMES. MY SPECIAL SKILL IS GO.'" :sp-animation="false" />
                </span>
              </span>
              <span class="sp-only">
                <span class="intro-title-wrapper intro-title-wrapper-sp-01">
                  <AppTextAnimation :state="isTextSegmentState" :start="0" :rotate="$BASEROTATE.right" :text="'HI, I WORK'" :pc-animation="false" />
                </span>
                <span class="intro-title-wrapper intro-title-wrapper-sp-02">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.12" :rotate="$BASEROTATE.left" :text="'FULL REMOTE DURING'" :pc-animation="false" />
                </span>
                <span class="intro-title-wrapper intro-title-wrapper-sp-03">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.24" :rotate="$BASEROTATE.right" :text="'THE WEEK, BUT I ALSO'" :pc-animation="false" />
                </span>
                <span class="intro-title-wrapper intro-title-wrapper-sp-04">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.36" :rotate="$BASEROTATE.left" :text="'DO CREATIVE CODING'" :pc-animation="false" />
                </span>
                <span class="intro-title-wrapper intro-title-wrapper-sp-05">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.48" :rotate="$BASEROTATE.right" :text="'AS A HOBBY ON MY D'" :pc-animation="false"> </AppTextAnimation>
                </span>
                <span class="intro-title-wrapper intro-title-wrapper-sp-06">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.6" :rotate="$BASEROTATE.left" :text="'AYS OFF.'" :pc-animation="false" />
                </span>
              </span>
            </h2>
            <p class="intro-note">
              <span class="pc-only">
                THE REASON WHY I STARTED CREATIVE CODING WAS BECAUSE I SAW A GREAT WE SITE THAT USED CSSANIMATION AND WEBGL. THEIR WORK STILL LOOKS GREAT AND I WANTED TO CREATE SOMETHING LIKE THAT, SO
                I STARTED CSSANIMATION. I COULDN'T WRITE JAVASCRIPT BACK THEN. NOW I'M STUDYING WEBGL HARD. I HOPE TO MEET THEM AND WORK WITH THEM ONE DAY!
              </span>
              <span class="sp-only">
                THE REASON WHY I STARTED CREATIVE CODING WAS BECAUSE I SAW A GREAT WE SITE THAT USED CSSANIMATION AND WEBGL. THEIR WORK STILL LOOKS GREAT AND I WANTED TO CREATE SOMETHING LIKE THAT, I
                HOPE TO MEET THEM AND WORK WITH THEM ONE DAY!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mesh from '../canvas/about/intro/mesh'
import Stage from '../canvas/stage'
import { vw, vwSp } from '../../assets/js/vw'

export default {
  data: () => {
    return {
      isTextSegmentState: 'default',
      isCircleBgState: 'default',
      buffer: { value: 0 },
    }
  },

  computed: {
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
  },

  watch: {
    imageLoaded: function () {
      if (this.imageLoaded) {
        setTimeout(() => {
          this.setupScrollAnimation()
        }, 200) // アニメーションが発火しないことがあるので処理を0.2秒遅らせる
      }
    },
    hambergerMenuState: function () {
      /**
       * ハンバガーメニューが開いた時
       */
      if (this.hambergerMenuState && this.$SITECONFIG.isPc) {
        this.$gsap.to(this.buffer, {
          delay: 0.16,
          duration: 0.3,
          ease: this.$EASING.transform,
          value: -560,
        })
      } else if (!this.hambergerMenuState) {
        /**
         * ハンバガーメニューが閉じた時
         */
        this.$gsap.to(this.buffer, {
          delay: 0,
          duration: 0.3,
          ease: this.$EASING.transform,
          value: 0,
        })
      }
    },
  },

  beforeDestroy() {
    // canvasリセット
    window.removeEventListener('mousemove', this.mMouse)
    this.$gsap.ticker.remove(this.mRaf)
    this.stage._destroy()
    this.mesh._destroy()
    this.stage = null
    this.mesh = null
    this.mObserver.unobserve(this.mObserve)
    this.mObserver = null
    // リセット
    this.fixSection.kill()
    this.scrollTl.kill()
    this.IntroImgParallaxAnimation.kill()
    this.iObserver.unobserve(this.observe)
    this.iObserver = null
    this.$gsap.ticker.remove(this.introTextFixed)
  },

  mounted() {
    this.stage = new Stage(this.$refs.IntroBgCanvas, this.$refs.IntroBgCanvas)
    this.stage.init()

    const texture = this.$SITECONFIG.isPc ? this.$refs.IntroBgCanvas.dataset.pcimg : this.$refs.IntroBgCanvas.dataset.spimg

    this.mesh = new Mesh(this.stage, this.$SITECONFIG, texture)
    this.mesh.init()

    this.mResize = () => {
      this.stage.onResize()
      this.mesh.onResize()
    }

    this.mRaf = () => {
      this.mResize()
      this.stage.onRaf()
      this.mesh.onRaf()
    }

    this.mMouse = (e) => {
      if (this.hambergerMenuState) return

      this.mesh.onMouseMove(e)
    }

    this.mObserve = this.$refs.IntroContainer
    this.mObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener('mousemove', this.mMouse)
            this.$gsap.ticker.add(this.mRaf)
          } else {
            window.removeEventListener('mousemove', this.mMouse)
            this.$gsap.ticker.remove(this.mRaf)
          }
        })
      },
      {
        rootMargin: '0%',
      }
    )
    this.mObserver.observe(this.mObserve)
  },

  methods: {
    setupScrollAnimation() {
      // セクション固定 グローバル関数(fixSection)
      this.fixSection = this.$fixSection(this.$refs.IntroWrapper, this.$SITECONFIG.isTouch, 5500)

      const textInit = this.$SITECONFIG.isPc ? vw(1280) : vwSp(750)
      const textMove = this.$SITECONFIG.isPc ? vw(-1758 + 1280) : vwSp(-1858 + 750)
      const bgWidth = this.$SITECONFIG.isPc ? vw(54) : vwSp(81)
      const bgHeight = this.$SITECONFIG.isPc ? vw(245) : vwSp(365)
      const bgRadius = this.$SITECONFIG.isPc ? vw(24) : vwSp(36)
      const bgX = this.$SITECONFIG.isPc ? vw(-49) : vwSp(121)
      const bgY = this.$SITECONFIG.isPc ? vw(7.8) : vwSp(39)

      // タイムライン
      this.scrollTl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.IntroReadText,
          start: 'center center',
          end: () => `+=${3500 - window.innerHeight}px`,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
      this.scrollTl
        .fromTo(
          this.$refs.IntroReadText,
          {
            x: textInit,
          },
          {
            x: textMove,
          },
          '-=0.1'
        )
        .fromTo(
          this.$refs.IntroBg,
          {
            opacity: 0,
          },
          {
            duration: 0.2,
            opacity: 1,
          },
          '-=0.05'
        )
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

            onComlete: () => {
              this.$gsap.set(this.$refs.IntroBgClip, {
                x: 0,
                y: 0,
              })
            },
          }
        )

      // サークルアニメーション
      this.$gsap.to(
        {},
        {
          scrollTrigger: {
            once: true,
            trigger: this.$refs.IntroWrapper,
            onEnter: () => {
              this.isCircleBgState = 'extend'
            },
          },
        }
      )

      // テキストアニメーション
      this.$gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: this.$refs.IntroSpacer01,
            once: true,
            onEnter: () => {
              this.isTextSegmentState = 'center'
            },
          },
        }
      )

      // テキスト固定
      this.introTextFixed = () => {
        this.$gsap.set(this.$refs.IntroBgClip, {
          x: -this.$refs.IntroBg.getBoundingClientRect().left + this.buffer.value,
          y: Math.min(-this.$refs.IntroBg.getBoundingClientRect().top, 0),
        })
      }
      this.observe = this.$refs.IntroSpacer02
      this.iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.$gsap.ticker.add(this.introTextFixed)
            } else {
              this.$gsap.ticker.remove(this.introTextFixed)
            }
          })
        },
        {
          rootMargin: '0%',
        }
      )
      this.iObserver.observe(this.observe)

      // 画像パララックスアニメーション
      this.IntroImgParallaxAnimation = this.$gsap.fromTo(
        this.$refs.IntroBgCanvas,
        {
          y: 350,
        },
        {
          y: -350,
          ease: 'power2.in',
          scrollTrigger: {
            start: 'start',
            end: () => `+=${4000 - window.innerHeight}px`,
            trigger: this.$refs.IntroSpacer02,
            scrub: 0.1,
            invalidateOnRefresh: true,
          },
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
:root {
  --viewportWidth: 100vw;
  --viewportHeight: 100vh;
}

.intro {
  position: relative;
  z-index: 1;

  @include sp() {
    overflow: hidden;
  }
}

.intro-container {
  position: relative;
  height: 5500px;
  margin: vw(600) 0 0 0;

  @include sp() {
    margin: vw_sp(380) 0 0 0;
  }
}

.intro-spacer-01 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2000px;
  pointer-events: none;
}

.intro-spacer-02 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4000px;
  pointer-events: none;
}

.intro-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--viewportHeight, 100vh) !important;
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
  font-family: $sixcaps;
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
  display: block;
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
  will-change: width, height;

  @include sp() {
    width: vw_sp(81);
    height: vw_sp(365);
    border-radius: vw(36);
    transform: translate(vw_sp(121), vw_sp(39));
  }

  // & img {
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  //   left: 0;
  //   width: 100%;
  //   height: calc(100% + 700px);
  //   margin: auto;
  //   object-fit: cover;
  // }
}

.intro-bg-wrapper {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% + 700px);

  & canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}

.intro-bg-canvas {
  display: block;
  position: absolute;
  top: -350px;
  left: 0;
  width: 100%;
  height: 100%;
}

.intro-bg-clip {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--viewportWidth, 100vw);
  height: var(--viewportHeight, 100vh);
  will-change: transform;
}

.intro-title {
  position: fixed;
  top: 50%;
  right: 158px;
  transform: translate3d(0, -50%, 0);
  color: #eae0cc;
  font-size: vmin(128);
  font-family: $sixcaps;

  @include sp() {
    top: calc(50% - 20px);
    right: 23px;
    font-size: vmin(170);
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
  right: 158px;
  left: 40px;
  color: #eae0cc;
  font-size: 12px;
  text-indent: 180px;
  line-height: 1.2;
  letter-spacing: 0.02em;

  @include sp() {
    right: 0;
    bottom: 40px;
    left: 0;
    width: 100%;
    padding: 0 20px;
    font-size: 10px;
  }
}

.intro-note-text {
  display: block;
}

.intro-note-text-01 {
  margin: 0 0 0 185px;
}
</style>
