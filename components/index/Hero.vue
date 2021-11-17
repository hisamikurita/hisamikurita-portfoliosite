<template>
  <div ref="Hero" class="hero">
    <div class="hero-bg-circle-01"></div>
    <div ref="HeroBgCircle02" class="hero-bg-circle-02"></div>
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <span class="hero-title-read-area">
            <span class="pc-only">
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
                :sp-animation="false"
              ></CommonSectionReadTitle>
            </span>
            <span class="sp-only">
              <span class="hero-title-read-block-sp">AUTHOR : HISAMI KURITA</span>
              <span class="hero-title-read-block-sp">FRAMEWORK : VUE/NUXT'</span>
              <span class="hero-title-read-block-sp">LIBRARY : GSAP/THREE.JS'</span>
              <span class="hero-title-read-block-sp">SERVER : NETLIFY'</span>
            </span>
          </span>
          <span class="pc-only">
            <span class="hero-title-wrapper hero-title-wrapper-01">
              <CommonTextUnderline
                modifier="index-hero"
                :state="isTextUnderlineState"
                :start="delay[0]"
                :rotate="rotateRight"
                :sp-animation="false"
              ></CommonTextUnderline>
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="delay[0]"
                :rotate="rotateRight"
                text="FOLIO OF HISAMI KURITA"
                :sp-animation="false"
              >
              </CommonTextSegment>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02">
              <CommonTextUnderline
                modifier="index-hero"
                :state="isTextUnderlineState"
                :start="delay[1]"
                :rotate="rotateLeft"
                :sp-animation="false"
              ></CommonTextUnderline>
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="delay[1]"
                :rotate="rotateLeft"
                text="19/AUG.1996"
                :sp-animation="false"
              >
              </CommonTextSegment>
              <span class="hero-title-wrapper-02-base-area">
                <CommonTextSegment
                  :state="isTextSegmentState"
                  :start="0.264"
                  :rotate="rotateLeft"
                  text="( BASED IN TOKYO AND KAWASAKI )"
                  :sp-animation="false"
                ></CommonTextSegment>
                <span class="hero-title-wrapper-02-base-area-helvetica hero-title-wrapper-02-base-area-helvetica-sometimes">
                  <CommonTextSegment
                    :state="isTextSegmentState"
                    :start="0.352"
                    :rotate="rotateLeft"
                    text="SOMETIMES"
                    :sp-animation="false"
                  ></CommonTextSegment>
                </span>
                <span class="hero-title-wrapper-02-base-area-helvetica hero-title-wrapper-02-base-area-helvetica-allways">
                  <CommonTextSegment
                    :state="isTextSegmentState"
                    :start="0.432"
                    :rotate="rotateLeft"
                    text="ALLWAYS"
                    :sp-animation="false"
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
                :sp-animation="false"
              ></CommonTextUnderline>
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="delay[2]"
                :rotate="rotateRight"
                text="CREATIVE DEVELOPER"
                :sp-animation="false"
              ></CommonTextSegment>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04">
              <CommonTextUnderline
                modifier="index-hero"
                :state="isTextUnderlineState"
                :start="delay[3]"
                :rotate="rotateLeft"
                :sp-animation="false"
              ></CommonTextUnderline>
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="delay[3]"
                :rotate="rotateLeft"
                text="AT LIG INC"
                :sp-animation="false"
              ></CommonTextSegment>
            </span>
          </span>
          <span class="sp-only">
            <span class="hero-title-wrapper hero-title-wrapper-01-sp">
              <span class="hero-text-underline"></span>
              FOLIO OF
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02-sp">
              <span class="hero-text-underline"></span>
              HISAMI KURITA
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03-sp">
              <span class="hero-text-underline"></span>
              19/AUG.1996
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04-sp">
              ( BASED IN TOKYO AND KAWASAKI )
              <span class="hero-title-wrapper-04-01-sp">SOMETIMES</span>
              <span class="hero-title-wrapper-04-02-sp">ALLWAYS</span>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-05-sp">
              <span class="hero-text-underline"></span>
              CREATIVE
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-06-sp">
              <span class="hero-text-underline"></span>
              DEVELOPER
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-07-sp">
              <span class="hero-text-underline"></span>
              AT LIG INC
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
              'YOU CAN CLICK AND,',
              'SHOW ABOUT ME.',
              'BY THE WAY,',
              'YOU CAN THROW',
              'THIS CARD AWAY',
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

  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
  },

  mounted() {
    this.isTextSegmentState = 'center';
    this.isTextUnderlineState = 'extend';

    /* scroll-animation */
    this.$nextTick(() => {
      const observe = this.$refs.Hero
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.$gsap.ticker.add(this.bgCircleScaleChangeScroll);
            } else {
              this.$gsap.ticker.remove(this.bgCircleScaleChangeScroll);
            }
          })
        },
        {
          rootMargin: '0%',
        }
      ).observe(observe)
    })
  },

  beforeDestroy() {
    this.$gsap.ticker.remove(this.bgCircleScaleChangeScroll);
  },

  methods: {
    bgCircleScaleChangeScroll() {
      if (this.hambergerMenuState) return;

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
    padding: 106px vw_sp(20);
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
  font-family: Helvetica, sans-serif;

  @include sp(){
    top: -18px;
    font-size: 10px;
  }
}

.hero-title-read-block-sp{
  display: block;
}

.hero-title-wrapper {
  display: block;
  position: relative;

  @include sp(){
    margin: 0 0 20px 0;
    white-space: nowrap;
  }
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
  width: vw(668);
  margin: 0 0 22px vw(414);
}

.hero-title-wrapper-04 {
  width: vw(336);
  margin: 0 0 0 vw(206);
}

.hero-title-wrapper-01-sp{
  width: vw_sp(335);
  margin: 0 0 vw_sp(40) auto;
}

.hero-title-wrapper-02-sp{
  width: vw_sp(586);
  margin: 0 0 vw_sp(34) 0;
}

.hero-title-wrapper-03-sp{
  width: vw_sp(504);
  margin: 0 0 vw_sp(28) 42px;
}

.hero-title-wrapper-04-sp{
  position: relative;
  margin: 0 0 vw_sp(76) 45px;
  font-size: vw_sp(80);
}

.hero-title-wrapper-05-sp{
  width: vw_sp(367);
  margin: 0 0 vw_sp(40) 18px;
}

.hero-title-wrapper-06-sp{
  width: vw_sp(420);
  margin: 0 0 vw_sp(40) 102px;
}

.hero-title-wrapper-07-sp{
  width: vw_sp(406);
}

.hero-title-wrapper-04-01-sp{
  position: absolute;
  top: 120%;
  left: vw_sp(140);
  font-size: vw_sp(20);
  font-family: Helvetica, sans-serif;
  letter-spacing: 0.02em;
}

.hero-title-wrapper-04-02-sp{
  position: absolute;
  top: 120%;
  left: vw_sp(340);
  font-size: vw_sp(20);
  font-family: Helvetica, sans-serif;
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
  font-family: Helvetica, sans-serif;
  font-size: vw(14);
}

.hero-title-wrapper-02-base-area-helvetica-sometimes {
  left: vw(169);
}

.hero-title-wrapper-02-base-area-helvetica-allways {
  left: vw(380);
}

.hero-text-underline{
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

  @include sp(){
    top: vw_sp(650);
    left: vw_sp(-610);
    width: vw_sp(1345);
    height: vw_sp(1345);
  }
}

.hero-card-item{
  position: absolute;
  top: 19.8%;
  left: 9%;
  transform: rotate(10deg);

  @include sp(){
    top: 17.8%;
    left: 57%;
  }
}
</style>