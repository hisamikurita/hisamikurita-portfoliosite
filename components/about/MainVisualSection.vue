<template>
  <div ref="Hero" class="hero">
    <div class="hero-inner">
      <div class="l-container">
        <div ref="HeroCanvas" class="hero-canvas"></div>
        <h1 ref="HeroTitle" class="hero-title">
          <span class="pc-only">
            <span class="hero-title-read-area">
              <AppReadTitle :state="isTextSegmentState" :text="['・', 'MYSKILL', 'HTML/CSS/JAVASCRIPT', 'VUE/NUXT/THREE.JS']" :sp-animation="false" :modifier="'section'" />
            </span>
          </span>
          <span class="pc-only">
            <span class="hero-title-wrapper hero-title-wrapper-01">
              <AppBounceLine :state="isTextUnderlineState" :origin="'left'" :sp-animation="false" :width="470" :modifier="'about-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'HELLO, WORLD'" :sp-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02">
              <AppBounceLine :state="isTextUnderlineState" :start="0.176" :origin="'right'" :sp-animation="false" :width="820" :modifier="'about-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.176" :rotate="$BASEROTATE.left" :text="'HISAMI'" :sp-animation="false" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.4" :rotate="$BASEROTATE.left" :text="'KURITA'" :sp-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03">
              <AppBounceLine :state="isTextUnderlineState" :start="0.42" :origin="'left'" :sp-animation="false" :width="900" :modifier="'about-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.42" :rotate="$BASEROTATE.right" :text="'IS  FRO'" :sp-animation="false" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.6" :rotate="$BASEROTATE.right" :text="'NTEND'" :sp-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04">
              <AppBounceLine :state="isTextUnderlineState" :start="0.7" :origin="'right'" :sp-animation="false" :width="1200" :modifier="'about-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.7" :rotate="$BASEROTATE.right" :text="'DEVELOPER AT LIG INC SINCE 2020'" :sp-animation="false" />
            </span>
          </span>
          <span class="sp-only">
            <span class="hero-title-wrapper hero-title-wrapper-01-sp">
              <AppBounceLine :state="isTextUnderlineState" :origin="'left'" :pc-animation="false" :width="547" :modifier="'about-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'HELLO, WORLD'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.176" :origin="'right'" :pc-animation="false" :width="670" :modifier="'about-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.176" :rotate="$BASEROTATE.left" :text="'HISAMI'" :pc-animation="false" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.4" :rotate="$BASEROTATE.left" :text="'KURITA'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.42" :origin="'left'" :pc-animation="false" :width="590" :modifier="'about-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.42" :rotate="$BASEROTATE.right" :text="'IS'" :pc-animation="false" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.42" :rotate="$BASEROTATE.right" :text="'FRO'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.6" :origin="'right'" :pc-animation="false" :width="670" :modifier="'about-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.6" :rotate="$BASEROTATE.right" :text="'NTEND'" :pc-animation="false" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.6" :rotate="$BASEROTATE.right" :text="'DEVELO'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-05-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.72" :origin="'left'" :pc-animation="false" :width="573" :modifier="'about-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.72" :rotate="$BASEROTATE.right" :text="'PER AT LIG INC'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-06-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.84" :origin="'right'" :pc-animation="false" :width="452" :modifier="'about-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.84" :rotate="$BASEROTATE.right" :text="'SINCE 2020.'" :pc-animation="false" />
            </span>
          </span>
        </h1>
        <div class="pc-only">
          <div class="hero-card-item">
            <AppCard
              :component-name="'company'"
              :name="['・', 'LIG INC']"
              :title="'LIG INC.'"
              :subtitle="'(VISIT SITE)'"
              :link="'https://liginc.co.jp'"
              :desc="['WEB PRODUCTION,', 'SYSTEM DEVELOPMENT,', 'MARKETING SUPPORT,', 'WEB CREATOR SCHOOL,', 'WERE ROLLING IT OUT.']"
              :rotate="8"
              :xspeed="0.01"
              :yspeed="0.14"
              :sp-animation="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Mesh from '../canvas/about/mainvisual/metaball'
import Stage from '../canvas/stage'
import { aboutMv } from '../../assets/js/metaball'

export default {
  data: () => {
    return {
      delay: [0, 0.176, 0.4, 0.42, 0.6, 0.7],
      isTextSegmentState: 'init',
      isTextUnderlineState: 'init',
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
    openningEnd: function () {
      setTimeout(() => {
        this.mvItemViewIn()
      }, 1000)
    },
    imageLoaded: function () {
      if (this.imageLoaded) {
        if (!this.openningEnd) return
        this.mvItemViewIn()
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.stage = new Stage(this.$refs.HeroCanvas, this.$refs.HeroCanvas)
      this.stage.init()

      this.mesh = new Mesh(this.stage, this.$SITECONFIG, aboutMv)
      this.mesh.init()

      this.mResize = () => {
        this.stage.onResize()
        this.mesh.onResize()
      }

      this.mRaf = () => {
        this.stage.onRaf()
        this.mesh.onRaf()
      }

      this.mMouse = (e) => {
        if (this.hambergerMenuState) return

        this.mesh.onMouseMove(e, this.$asscroll.currentPos)
      }

      window.addEventListener('resize', this.mResize)

      this.observe = this.$refs.Hero
      this.iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.$gsap.ticker.add(this.mRaf)
              window.addEventListener('mousemove', this.mMouse)
            } else {
              this.$gsap.ticker.remove(this.mRaf)
              window.removeEventListener('mousemove', this.mMouse)
            }
          })
        },
        {
          rootMargin: '0%',
        }
      )
      this.iObserver.observe(this.observe)
    })
  },

  beforeDestroy() {
    // リセット
    this.iObserver.unobserve(this.observe)
    this.iObserver = null

    // メタボールリセット
    window.removeEventListener('mousemove', this.mMouse)
    window.removeEventListener('resize', this.mResize)
    this.$gsap.ticker.remove(this.mRaf)
    this.stage._destroy()
    this.stage = null
    this.mesh._destroy()
    this.mesh = null
  },

  methods: {
    mvItemViewIn() {
      this.isTextSegmentState = 'center'
      this.isTextUnderlineState = 'extend'
      this.mesh.fadeIn()
    },
  },
}
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  background-color: $skinColor;
  z-index: 1;
}

.hero .l-container {
  position: relative;
}

.hero-canvas {
  position: absolute;
  top: -92px;
  left: 0;
  width: 100%;
  height: calc(100% + (92px * 2));
  z-index: 100;
  pointer-events: none;
}

.hero-inner {
  padding: 92px 0 333px;

  @include sp() {
    padding: 106px 0 48px;
  }
}

.hero-title {
  position: relative;
  color: $black;
  font-size: vw(180);
  font-family: $sixcaps;
  letter-spacing: -0.002em;

  @include tab-vertical() {
    font-size: vw(154);
  }

  @include sp() {
    font-size: vw_sp(220);
  }
}

.hero-title-read-area {
  position: absolute;
  top: 6px;
  left: 40px;

  @include tab-vertical() {
    left: 20px;
  }
}

.hero-title-wrapper {
  display: block;
  position: relative;

  @include sp() {
    display: flex;
    justify-content: space-between;
    margin: 0 auto 18px;
    text-align: center;
    white-space: nowrap;
  }
}

.hero-title-wrapper-01 {
  width: vw(450);
  margin: 0 0 24px vw(310);

  @include tab-vertical() {
    width: vw(394);
    margin: 0 0 24px vw(270);
  }
}

.hero-title-wrapper-02 {
  display: flex;
  justify-content: space-between;
  width: vw(987);
  margin: 0 0 24px vw(46);
  padding: 0 26px 0 34px;

  @include tab-vertical() {
    margin: 0 0 24px vw(-24);
  }
}

.hero-title-wrapper-03 {
  display: flex;
  justify-content: space-between;
  width: vw(860);
  margin: 0 0 24px vw(112);

  @include tab-vertical() {
    margin: 0 0 24px vw(34);
  }
}

.hero-title-wrapper-04 {
  width: vw(1077);

  @include tab-vertical() {
    width: vw(934);
  }
}

.hero-title-wrapper-01-sp {
  width: vw_sp(550);
}

.hero-title-wrapper-02-sp {
  width: vw_sp(670);
}

.hero-title-wrapper-03-sp {
  width: vw_sp(590);
}

.hero-title-wrapper-04-sp {
  width: vw_sp(670);
}

.hero-title-wrapper-05-sp {
  width: vw_sp(573);
}

.hero-title-wrapper-06-sp {
  width: vw_sp(452);
}

.hero-text-underline {
  position: absolute;
  top: -7px;
  left: 0;
  background-color: $black;
  width: 100%;
  height: 1px;
}

.hero-card-item {
  position: absolute;
  top: 110.8%;
  left: 33%;
  transform: rotate(-10deg);
  z-index: 101;
}
</style>
