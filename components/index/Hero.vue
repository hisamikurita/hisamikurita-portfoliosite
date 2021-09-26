<template>
  <div class="hero">
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <span class="hero-title-read-area">
            <CommonSectionReadTitle
              ref="commonSectionReadTitle"
              :start="delay[0]"
              :text="[
                '・',
                'HI, THANKS FOR COMING',
                'TO MY SITE ！！',
                'THIS SITE IS BUILT WITH',
                'NUXT.JS AND THREE.JS',
              ]"
            ></CommonSectionReadTitle>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-01">
            <span
              ref="HeroTitleLine-01"
              class="hero-title-line hero-title-line-right"
            ></span>
            <CommonTextSegment
              ref="commonTextSegment-01"
              :start="delay[0]"
              :rotate="rotateRight"
              text="FOLIO OF HISAMI KURITA"
            >
            </CommonTextSegment>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-02">
            <span
              ref="HeroTitleLine-02"
              class="hero-title-line hero-title-line-left"
            ></span>
            <CommonTextSegment
              ref="commonTextSegment-02"
              :start="delay[1]"
              :rotate="rotateLeft"
              text="19/AUG.1996"
            >
            </CommonTextSegment>
            <span class="hero-title-wrapper-02-base-area">
              <CommonTextSegment
                ref="commonTextSegment-03"
                start="0.264"
                :rotate="rotateLeft"
                text="( BASED IN TOKYO AND KAWASAKI )"
              ></CommonTextSegment>
              <span
                class="
                  hero-title-wrapper-02-base-area-helvetica
                  hero-title-wrapper-02-base-area-helvetica-sometimes
                "
                ><CommonTextSegment
                  ref="commonTextSegment-04"
                  start="0.352"
                  :rotate="rotateLeft"
                  text="SOMETIMES"
                ></CommonTextSegment
              ></span>
              <span
                class="
                  hero-title-wrapper-02-base-area-helvetica
                  hero-title-wrapper-02-base-area-helvetica-allways
                "
                ><CommonTextSegment
                  ref="commonTextSegment-05"
                  start="0.432"
                  :rotate="rotateLeft"
                  text="ALLWAYS"
                ></CommonTextSegment
              ></span>
            </span>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-03">
            <span
              ref="HeroTitleLine-03"
              class="hero-title-line hero-title-line-right"
            ></span>
            <CommonTextSegment
              ref="commonTextSegment-06"
              :start="delay[2]"
              :rotate="rotateRight"
              text="CREATIVE DEVELOPER"
            ></CommonTextSegment>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-04">
            <span
              ref="HeroTitleLine-04"
              class="hero-title-line hero-title-line-left"
            ></span>
            <CommonTextSegment
              ref="commonTextSegment-07"
              :start="delay[3]"
              :rotate="rotateLeft"
              text="AT LIG INC"
            ></CommonTextSegment>
          </span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      delay: [0, 0.176, 0.4, 0.42],
      rotateRight: 0,
      rotateLeft: 0,
    }
  },
  beforeMount(){
    this.rotateRight = this.$baseAnimationConfig.rotate;
    this.rotateLeft = -this.$baseAnimationConfig.rotate;
  },
  mounted() {
    this.init();

    this.commonTextSegmentArray.map((text) => text.toCenter());

    for (let i = 0; i < this.heroTitleLineArray.length; i++) {
      this.$gsap.to(this.heroTitleLineArray[i], {
        duration: this.$baseAnimationConfig.duration * 1.8,
        ease: this.$easing.transform,
        delay: this.delay[i],
        scaleX: 1,
      })
    }
  },

  methods: {
    init: function() {
      this.commonTextSegmentArray = [];
      for (let i = 0; i < this.$refs.commonSectionReadTitle.$children.length; i++) {
        this.commonTextSegmentArray.push(this.$refs.commonSectionReadTitle.$children[i]);
      }
      for (let i = 1; i < 7 + 1; i++) {
        this.commonTextSegmentArray.push(this.$refs['commonTextSegment-0' + i])
      }
      for (let i = 0; i < this.commonTextSegmentArray.length; i++) {
        this.commonTextSegmentArray[i].init()
      }

      this.heroTitleLineArray = []
      for (let i = 1; i < this.delay.length + 1; i++) {
        this.heroTitleLineArray.push(this.$refs['HeroTitleLine-0' + i])
      }
    },
  }
}
</script>

<style scoped lang="scss">
.hero-inner {
  padding: 92px 0;
}

.hero-title {
  position: relative;
  font-size: vw(180);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: -0.002em;
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

.hero-title-line {
  position: absolute;
  top: -12px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: $white;
  transform: scaleX(0);
}

.hero-title-line-right {
  transform-origin: left;
}

.hero-title-line-left {
  transform-origin: right;
}

.hero-title-wrapper-01 {
  width: vw(783);
  margin: 0 0 36px vw(260);
}

.hero-title-wrapper-02 {
  display: flex;
  justify-content: space-between;
  width: vw(965);
  margin: 0 0 32px 0;
}

.hero-title-wrapper-03 {
  width: vw(662);
  margin: 0 0 32px vw(414);
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
</style>