<template>
  <div ref="Hero" class="hero">
    <div class="hero-bg-circle-01"></div>
    <div ref="HeroBgCircle02" class="hero-bg-circle-02"></div>
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <span class="hero-title-read-area">
            <CommonSectionReadTitle
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
              :start="delay[0]"
              rotate="rotate-right"
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
              :start="delay[1]"
              rotate="rotate-left"
              text="19/Aug.1996"
            >
            </CommonTextSegment>
            <span class="hero-title-wrapper-02-base-area">
              <CommonTextSegment
                start="0.264"
                rotate="rotate-left"
                text="( BASED IN TOKYO AND KAWASAKI )"
              ></CommonTextSegment>
              <span
                class="
                  hero-title-wrapper-02-base-area-helvetica
                  hero-title-wrapper-02-base-area-helvetica-sometimes
                "
                ><CommonTextSegment
                  start="0.352"
                  rotate="rotate-left"
                  text="SOMETIMES"
                ></CommonTextSegment
              ></span>
              <span
                class="
                  hero-title-wrapper-02-base-area-helvetica
                  hero-title-wrapper-02-base-area-helvetica-allways
                "
                ><CommonTextSegment
                  start="0.432"
                  rotate="rotate-left"
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
              :start="delay[2]"
              rotate="rotate-right"
              text="CREATIVE DEVELOPER"
            ></CommonTextSegment>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-04">
            <span
              ref="HeroTitleLine-04"
              class="hero-title-line hero-title-line-left"
            ></span>
            <CommonTextSegment
              :start="delay[3]"
              rotate="rotate-left"
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
    }
  },
  mounted() {
    /* text-animation */
    const heroTitleLineArray = []
    for (let i = 1; i < this.delay.length + 1; i++) {
      heroTitleLineArray.push(this.$refs['HeroTitleLine-0' + i])
    }

    for (let i = 0; i < heroTitleLineArray.length; i++) {
      this.$gsap.to(heroTitleLineArray[i], {
        duration: this.$duration * 1.8,
        ease: this.$easing.transform,
        delay: this.delay[i],
        scaleX: 1,
      })
    }

    /* scroll-animation */
    const observe = this.$refs.Hero
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.$asscroll.on('scroll', this.bgCircleScaleChangeScroll)
          } else {
            this.$asscroll.off('scroll', this.bgCircleScaleChangeScroll)
          }
        })
      },
      {
        rootMargin: '0%',
      }
    ).observe(observe)
  },
  beforeDestroy() {
    this.$asscroll.off('scroll', this.bgCircleScaleChangeScroll)
  },
  methods: {
    bgCircleScaleChangeScroll() {
      this.$gsap.to(this.$refs.HeroBgCircle02, {
        duration: this.$duration / 2,
        ease: 'none',
        scale: ((this.$asscroll.currentPos / this.$refs.Hero.clientHeight) * 2.2) + 1.0,
      });
      // console.log(
      //   this.$asscroll.currentPos / this.$refs.Hero.clientHeight + 1.0
      // )
    },
  },
}
</script>

<style scoped lang="scss">
.hero {
  border: solid 1px #000;
  position: relative;
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