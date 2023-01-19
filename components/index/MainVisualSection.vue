<template>
  <div ref="Hero" class="hero">
    <div ref="HeroBgCircle01" class="hero-bg-circle-01"></div>
    <div ref="HeroBgCircle02" class="hero-bg-circle-02"></div>
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <span class="hero-title-read-area">
            <AppReadTitle :state="isTextSegmentState" :text="['・', 'AUTHOR : HISAMI KURITA', 'FRAMEWORK : VUE/NUXT', 'LIBRARY : GSAP/THREE.JS', 'CMS : MICROCMS']" :modifier="'section'" />
          </span>
          <span class="pc-only">
            <span class="hero-title-wrapper hero-title-wrapper-01">
              <AppBounceLine :state="isTextUnderlineState" :origin="'left'" :sp-animation="false" :width="840" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'FOLIO OF HISAMI KURITA'" :sp-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02">
              <AppBounceLine :state="isTextUnderlineState" :start="0.176" :origin="'right'" :width="1080" :sp-animation="false" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.176" :rotate="$BASEROTATE.left" :text="'19/AUG.1996'" :sp-animation="false" />
              <span class="hero-title-wrapper-02-base-area">
                <AppTextAnimation :state="isTextSegmentState" :start="0.264" :rotate="$BASEROTATE.left" :text="'( BASED IN TOKYO AND KAWASAKI )'" :sp-animation="false" />
                <span class="hero-title-wrapper-02-base-area-helvetica hero-title-wrapper-02-base-area-helvetica-sometimes">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.352" :rotate="$BASEROTATE.left" :text="'SOMETIMES'" :sp-animation="false" />
                </span>
                <span class="hero-title-wrapper-02-base-area-helvetica hero-title-wrapper-02-base-area-helvetica-allways">
                  <AppTextAnimation :state="isTextSegmentState" :start="0.432" :rotate="$BASEROTATE.left" :text="'ALLWAYS'" :sp-animation="false" />
                </span>
              </span>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03">
              <AppBounceLine :state="isTextUnderlineState" :start="0.4" :origin="'left'" :width="700" :sp-animation="false" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.4" :rotate="$BASEROTATE.right" :text="'FRONTEND DEVELOPER'" :sp-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04">
              <AppBounceLine :state="isTextUnderlineState" :start="0.42" :width="350" :origin="'right'" :sp-animation="false" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.42" :rotate="$BASEROTATE.left" :text="'AT LIG INC'" :sp-animation="false" />
            </span>
          </span>
          <span class="sp-only">
            <span class="hero-title-wrapper hero-title-wrapper-01-sp">
              <AppBounceLine :state="isTextUnderlineState" :origin="'left'" :pc-animation="false" :width="335" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'FOLIO OF'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.176" :origin="'right'" :pc-animation="false" :width="586" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.176" :rotate="$BASEROTATE.left" :text="'HISAMI KURITA'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.264" :origin="'left'" :pc-animation="false" :width="504" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.264" :rotate="$BASEROTATE.right" :text="'19/AUG.1996'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04-sp">
              <AppTextAnimation :state="isTextSegmentState" :start="0.352" :rotate="$BASEROTATE.left" :text="'( BASED IN TOKYO AND KAWASAKI )'" :pc-animation="false" />
              <span class="hero-title-wrapper-04-01-sp">
                <AppTextAnimation :state="isTextSegmentState" :start="0.432" :rotate="$BASEROTATE.left" :text="'SOMETIMES'" :pc-animation="false" />
              </span>
              <span class="hero-title-wrapper-04-02-sp">
                <AppTextAnimation :state="isTextSegmentState" :start="0.512" :rotate="$BASEROTATE.left" :text="'ALLWAYS'" :pc-animation="false" />
              </span>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-05-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.592" :origin="'right'" :pc-animation="false" :width="367" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.592" :rotate="$BASEROTATE.right" :text="'FRONTEND'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-06-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.672" :origin="'left'" :pc-animation="false" :width="420" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.672" :rotate="$BASEROTATE.left" :text="'DEVELOPER'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-07-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.752" :origin="'right'" :pc-animation="false" :width="431" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.752" :rotate="$BASEROTATE.right" :text="'AT LIG INC'" :pc-animation="false" />
            </span>
          </span>
        </h1>
        <div ref="HeroCardItem" class="hero-card-item">
          <AppCard
            :component-name="'mv'"
            :name="['・', 'HISAMIKURITA']"
            :title="'HSMKRT'"
            :subtitle="'(ABOUT ME)'"
            :desc="['YOU CAN CLICK AND,', 'SHOW ABOUT ME.', 'BY THE WAY,', 'YOU CAN THROW', 'THIS CARD AWAY']"
            :rotate="8"
            :xspeed="0.01"
            :yspeed="0.14"
            :drag-animation="isMvCardDrag"
            :view-animation="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      isTextSegmentState: 'default',
      isTextUnderlineState: 'default',
      isMvCardDrag: false,
    }
  },

  computed: {
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
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
    this.deviceRatio = this.$checkDevice.isIpad ? 8.0 : 4.0
  },

  beforeDestroy() {
    this.iObserver.unobserve(this.observe)
    this.iObserver = null
    this.$gsap.ticker.remove(this.bgCircleScaleChangeScroll)
  },

  methods: {
    mvItemViewIn() {
      // テキストアニメーション
      this.isTextSegmentState = 'center'
      // ラインアニメーション
      this.isTextUnderlineState = 'extend'

      // サークルアニメーション①
      this.$gsap.to(this.$refs.HeroBgCircle01, {
        duration: this.$SITECONFIG.baseDuration,
        delay: 0.2,
        ease: this.$EASING.transform,
        scale: 1,
      })

      // カードアニメーション
      this.$gsap.to(this.$refs.HeroCardItem, {
        duration: this.$SITECONFIG.fullDuration,
        ease: this.$EASING.transform,
        x: 0,
        rotate: 0,
        onComplete: () => {
          // 処理が終わったらドラッグを有効にする
          this.isMvCardDrag = true
        },
      })

      this.observe = this.$refs.Hero
      this.iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // サークルアニメーション②
              this.$gsap.ticker.add(this.bgCircleScaleChangeScroll)
            } else {
              this.$gsap.ticker.remove(this.bgCircleScaleChangeScroll)
            }
          })
        },
        {
          rootMargin: '0%',
        }
      )
      this.iObserver.observe(this.observe)
    },

    bgCircleScaleChangeScroll() {
      if (this.hambergerMenuState) return

      this.$gsap.to(this.$refs.HeroBgCircle02, {
        duration: this.$SITECONFIG.baseDuration / 3.0,
        ease: 'none',
        scale: (this.$asscroll.currentPos / this.$refs.Hero.clientHeight) * this.deviceRatio + 1.0,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.hero-inner {
  padding: 92px 0;

  @include sp() {
    padding: 106px vw_sp(20);
  }
}

.hero-title {
  position: relative;
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
  top: 8px;
  left: 2px;
  font-family: $helvetica;

  @include sp() {
    top: -18px;
    font-size: 10px;
  }
}

.hero-title-read-block-sp {
  display: block;

  &:nth-of-type(1) {
    display: inline-block;
    margin: 0 0 0 -4px;
    font-size: 32px;
  }
}

// .is-android .hero-title-read-block-sp {
//   &:nth-of-type(1) {
//     position: relative;
//     left: -8px;
//   }
// }

.hero-title-wrapper {
  display: block;
  position: relative;

  @include sp() {
    margin: 0 0 20px 0;
    white-space: nowrap;
  }
}

.hero-title-wrapper-01 {
  width: vw(783);
  margin: 0 0 24px vw(260);

  @include tab-vertical() {
    width: vw(676);
  }
}

.hero-title-wrapper-02 {
  display: flex;
  justify-content: space-between;
  width: vw(965);
  margin: 0 0 24px 0;
}

.hero-title-wrapper-03 {
  width: vw(698);
  margin: 0 0 22px vw(414);

  @include tab-vertical() {
    width: vw(596);
  }
}

.hero-title-wrapper-04 {
  width: vw(336);
  margin: 0 0 0 vw(206);

  @include tab-vertical() {
    width: vw(290);
  }
}

.hero-title-wrapper-01-sp {
  width: vw_sp(335);
  margin: 0 0 vw_sp(40) auto;
}

.hero-title-wrapper-02-sp {
  width: vw_sp(586);
  margin: 0 0 vw_sp(34) 0;
}

.hero-title-wrapper-03-sp {
  width: vw_sp(504);
  margin: 0 0 vw_sp(28) 42px;
}

.hero-title-wrapper-04-sp {
  position: relative;
  margin: 0 0 vw_sp(76) 45px;
  font-size: vw_sp(80);
}

.hero-title-wrapper-05-sp {
  width: vw_sp(398);
  margin: 0 0 vw_sp(40) 18px;
}

.hero-title-wrapper-06-sp {
  width: vw_sp(420);
  margin: 0 0 vw_sp(40) 102px;
}

.hero-title-wrapper-07-sp {
  width: vw_sp(406);
}

.hero-title-wrapper-04-01-sp {
  position: absolute;
  top: 120%;
  left: vw_sp(140);
  font-size: vw_sp(20);
  font-family: $helvetica;
  letter-spacing: 0.02em;
}

.hero-title-wrapper-04-02-sp {
  position: absolute;
  top: 120%;
  left: vw_sp(340);
  font-size: vw_sp(20);
  font-family: $helvetica;
  letter-spacing: 0.02em;
}

.hero-title-wrapper-02-base-area {
  position: relative;
  padding: 12px 0 0 0;
  font-size: vw(80);
  letter-spacing: 0.0025em;
}

.hero-title-wrapper-02-base-area-helvetica {
  position: absolute;
  top: vw(98);
  font-family: $helvetica;
  font-size: vw(14);

  @include tab-vertical() {
    top: vw(104);
  }
}

.hero-title-wrapper-02-base-area-helvetica-sometimes {
  left: vw(169);
}

.hero-title-wrapper-02-base-area-helvetica-allways {
  left: vw(380);
}

.hero-text-underline {
  position: absolute;
  top: -7px;
  left: 0;
  background-color: $white;
  width: 100%;
  height: 1px;
}

.hero-bg-circle-01 {
  position: absolute;
  top: vw(-184);
  right: vw(-90);
  width: vw(820);
  height: vw(820);
  background-color: $yellow;
  border-radius: 50%;
  pointer-events: none;
  transform: scale(0);

  @include sp() {
    top: vw_sp(-184);
    right: auto;
    left: 9px;
    width: vw_sp(1046);
    height: vw_sp(1046);
  }
}

.hero-bg-circle-02 {
  position: absolute;
  top: 0;
  left: vw(-216);
  width: vw(1034);
  height: vw(1034);
  background-color: $lightBlue;
  border-radius: 50%;
  pointer-events: none;
  transform: scale(0);

  @include sp() {
    top: vw_sp(650);
    left: vw_sp(-610);
    width: vw_sp(1345);
    height: vw_sp(1345);
  }
}

.hero-card-item {
  position: absolute;
  top: 18%;
  left: 9%;
  transform: translateX(-600px) rotate(240deg);
  z-index: 2;

  @include sp() {
    top: 28%;
    right: 6%;
    left: auto;
    transform: translateX(400px) rotate(180deg);
  }
}
</style>
