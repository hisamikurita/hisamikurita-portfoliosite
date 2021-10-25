<template>
  <div ref="Hero" class="hero">
    <div class="hero-bg-circle-01"></div>
    <div ref="HeroBgCircle02" class="hero-bg-circle-02"></div>
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <span class="hero-title-read-area">
            <CommonSectionReadTitle
              modifier="section"
              :state="isTextSegmentState"
              :start="delay[0]"
              :text="[
                '・',
                'AUTHOR : HISAMI KURITA',
                'FRAMEWORK : VUE/NUXT',
                'LIBRARY : GSAP/THREE.JS',
                'SERVER : NETLIFY',
              ]"
            ></CommonSectionReadTitle>
          </span>
          <span class="pc-only">
            <span class="hero-title-wrapper hero-title-wrapper-01">
              <CommonTextUnderline
                modifier="index-hero"
                :state="isTextUnderlineState"
                :start="delay[0]"
                :rotate="rotateRight"
              ></CommonTextUnderline>
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="delay[0]"
                :rotate="rotateRight"
                text="FOLIO OF HISAMI KURITA"
              >
              </CommonTextSegment>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02">
              <CommonTextUnderline
                modifier="index-hero"
                :state="isTextUnderlineState"
                :start="delay[1]"
                :rotate="rotateLeft"
              ></CommonTextUnderline>
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="delay[1]"
                :rotate="rotateLeft"
                text="19/AUG.1996"
              >
              </CommonTextSegment>
              <span class="hero-title-wrapper-02-base-area">
                <CommonTextSegment
                  :state="isTextSegmentState"
                  :start="0.264"
                  :rotate="rotateLeft"
                  text="( BASED IN TOKYO AND KAWASAKI )"
                ></CommonTextSegment>
                <span class="hero-title-wrapper-02-base-area-helvetica hero-title-wrapper-02-base-area-helvetica-sometimes">
                  <CommonTextSegment
                    :state="isTextSegmentState"
                    :start="0.352"
                    :rotate="rotateLeft"
                    text="SOMETIMES"
                  ></CommonTextSegment>
                </span>
                <span class="hero-title-wrapper-02-base-area-helvetica hero-title-wrapper-02-base-area-helvetica-allways">
                  <CommonTextSegment
                    :state="isTextSegmentState"
                    :start="0.432"
                    :rotate="rotateLeft"
                    text="ALLWAYS"
                  ></CommonTextSegment>
                </span>
              </span>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03">
              <CommonTextUnderline
                modifier="index-hero"
                :state="isTextUnderlineState"
                :start="delay[2]"
                :rotate="rotateRight"
              ></CommonTextUnderline>
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="delay[2]"
                :rotate="rotateRight"
                text="CREATIVE DEVELOPER"
              ></CommonTextSegment>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04">
              <CommonTextUnderline
                modifier="index-hero"
                :state="isTextUnderlineState"
                :start="delay[3]"
                :rotate="rotateLeft"
              ></CommonTextUnderline>
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="delay[3]"
                :rotate="rotateLeft"
                text="AT LIG INC"
              ></CommonTextSegment>
            </span>
          </span>
          <span class="sp-only">
            <span class="hero-title-wrapper hero-title-wrapper-01-sp">
              FOLIO OF
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02-sp">
              HISAMI KURITA
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03-sp">
              19/AUG.1996
            </span>
          </span>
        </h1>
        <div class="hero-card-item">
          <CommonCardProject
            :name="['・','HISAMIKURITA']"
            :title="'HSMKRT'"
            :subtitle="'(ABOUT ME)'"
            :link="'about'"
            :text="[
              'LOREM IPSUM DOLOR SIT',
              'AMET, CONSECTETUR',
              'ADIPISCING ELIT, SED DO',
              'EIUSMOD TEMPOR INCIDI'
            ]"
            :rotate="8"
            :xspeed="0.01"
            :yspeed="0.14"
            modifier="index-hero"
          ></CommonCardProject>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      delay: [0, 0.176, 0.4, 0.42],
      isTextSegmentState: '',
      isTextUnderlineState: '',
    }
  },
  mounted() {
    setTimeout(()=>{
    this.isTextSegmentState = 'center';
    this.isTextUnderlineState = 'extend';
    },1000)

    /* scroll-animation */
    const observe = this.$refs.Hero
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.$asscroll.on('update', this.bgCircleScaleChangeScroll)
          } else {
            this.$asscroll.off('update', this.bgCircleScaleChangeScroll)
          }
        })
      },
      {
        rootMargin: '0%',
      }
    ).observe(observe)
  },

  beforeDestroy() {
    this.$asscroll.off('update', this.bgCircleScaleChangeScroll)
  },

  methods: {
    bgCircleScaleChangeScroll() {
      this.$gsap.to(this.$refs.HeroBgCircle02, {
        duration: this.$baseAnimationConfig.duration / 3.0,
        ease: 'none',
        scale: (this.$asscroll.currentPos / this.$refs.Hero.clientHeight) * 4.0 + 1.0,
      })
    },
  }
}
</script>

<style scoped lang="scss">
.hero-inner {
  padding: 92px 0;

  @include sp(){
    height: 100vh;
  }
}

.hero-title {
  position: relative;
  font-size: vw(180);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: -0.002em;

  @include sp(){
    font-size: vw_sp(220);
  }
}

.hero-title-read-area {
  position: absolute;
  top: 8px;
  left: 2px;
}

.hero-title-wrapper {
  display: block;
  position: relative;
}

.hero-title-wrapper-01 {
  width: vw(783);
  margin: 0 0 24px vw(260);
}

.hero-title-wrapper-02 {
  display: flex;
  justify-content: space-between;
  width: vw(965);
  margin: 0 0 24px 0;
}

.hero-title-wrapper-03 {
  width: vw(662);
  margin: 0 0 22px vw(414);
}

.hero-title-wrapper-04 {
  width: vw(330);
  margin: 0 0 0 vw(206);
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
  font-family: Helvetica, sans-serif;
  font-size: vw(14);
}

.hero-title-wrapper-02-base-area-helvetica-sometimes {
  left: vw(169);
}

.hero-title-wrapper-02-base-area-helvetica-allways {
  left: vw(380);
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

  @include sp(){
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
}

.hero-card-item{
  position: absolute;
  top: 19.8%;
  left: 9%;
  transform: rotate(10deg);
}
</style>