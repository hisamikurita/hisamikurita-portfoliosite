<template>
  <div ref="Openning" class="openning">
    <div ref="OpenningBgCircleContainer" class="openning-bg-circle-container">
      <div ref="OpenningBgCircle" class="openning-bg-circle">
        <span class="openning-bg-circle-element"></span>
      </div>
    </div>
    <div
      v-for="i of 9"
      :key="i"
      ref="OpenningBgColorCircleContainer"
      class="openning-bg-circle-color-container"
    >
      <div :class="`openning-bg-circle-color-0${i}`"></div>
    </div>
    <div ref="OpenningNum" class="openning-num">
      <span ref="OpenningNumFirst" class="openning-num-first">01</span>
      <span ref="OpenningNumSecond" class="openning-num-second"
        >0123456789</span
      >
      <span ref="OpenningNumThird" class="openning-num-third"
        >01234567890123456789</span
      >
      <span ref="OpenningNumPercent" class="openning-percent">%</span>
    </div>
    <div ref="OpenningName" class="openning-name">
      <span
        v-for="(char, index) of name"
        :key="index"
        ref="OpenningNameBlock"
        class="openning-name-block"
        >{{ char }}</span
      >
    </div>
    <div ref="OpenningPortfolio" class="openning-portfolio">PORTFORIO 2022</div>
    <div ref="OpenningCircleLine01" class="openning-circle-line-01">
      <span
        ref="OpenningCircleLine01Block"
        class="openning-circle-line-01-block"
        >0</span
      >
    </div>
    <div ref="OpenningCircleLine02" class="openning-circle-line-02">
      <span
        ref="OpenningCircleLine02Block"
        class="openning-circle-line-02-block"
        >0</span
      >
    </div>
    <div ref="OpenningCircle" class="openning-circle"></div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      index: 0,
      name: ['H', 'I', 'S', 'A', 'M', 'I', 'K', 'U', 'R', 'I', 'T', 'A'],
    }
  },

  mounted() {
    const projectResponse = this.$store.getters.projectData
    const index = projectResponse.findIndex(
      (content) => content.id === this.$router.history.current.params.slug
    )

    window.addEventListener('load',() => {
      // 初回読み込み
      if (this.$SITECONFIG.firstAccess) {
        setTimeout(() => {
          this.$gsap.set(this.$refs.OpenningNum, {
            opacity: 1.0,
          })
        }, 300)

        this.$gsap.to(this.$refs.OpenningNumFirst, {
          duration: 0.3,
          delay: 3.46,
          ease: this.$EASING.transform,
          y: -72,
        })
        this.$gsap.to(this.$refs.OpenningNumSecond, {
          duration: 3.0,
          delay: 0.6,
          ease: this.$EASING.transform,
          y: -648,
        })
        this.$gsap.to(this.$refs.OpenningNumThird, {
          duration: 3.0,
          delay: 0.6,
          ease: this.$EASING.transform,
          y: -1368,
        })

        this.$gsap.to(this.$refs.OpenningNumFirst, {
          duration: 1.2,
          delay: 4.0,
          ease: this.$EASING.transform,
          y: -144,
        })
        this.$gsap.to(this.$refs.OpenningCircleLine01Block, {
          duration: 1.2,
          delay: 4.1,
          ease: this.$EASING.transform,
          y: -72,
        })
        this.$gsap.to(this.$refs.OpenningCircleLine02Block, {
          duration: 1.2,
          delay: 4.2,
          ease: this.$EASING.transform,
          y: -72,
        })
        this.$gsap.to(this.$refs.OpenningNumPercent, {
          duration: 1.2,
          delay: 4.3,
          ease: this.$EASING.transform,
          y: -72,
        })

        this.$gsap.to(this.$refs.OpenningNameBlock, {
          duration: 0.8,
          delay: 4.1,
          ease: this.$EASING.transform,
          stagger: {
            each: 0.04,
          },
          y: 0,
        })
        this.$gsap.to(this.$refs.OpenningName, {
          duration: 0.6,
          delay: 5.4,
          ease: this.$EASING.transform,
          // letterSpacing: '-10px',
          scaleX: 0.2,

          onComplete: () => {
            this.$gsap.to(this.$refs.OpenningName, {
              duration: 0.3,
              ease: this.$EASING.colorAndOpacity,
              opacity: 0,
            })
            this.$gsap.to(this.$refs.OpenningPortfolio, {
              duration: 0.3,
              ease: this.$EASING.colorAndOpacity,
              opacity: 1,
            })
          },
        })

        this.$gsap.to(this.$refs.OpenningPortfolio, {
          duration: 0.8,
          delay: 6.0,
          ease: this.$EASING.transform,
          // letterSpacing: '0',
          // z:0,
          scaleX: 1.0,
        })

        this.$gsap.to(this.$refs.OpenningCircleLine01, {
          duration: 0.2,
          delay: 3.5,
          ease: this.$EASING.transform,
          y: window.innerHeight / 2 + 33,
          onComplete: () => {
            this.$gsap.to(this.$refs.OpenningNumSecond, {
              duration: 0.1,
              delay: -0.1,
              ease: 'power1.in',
              opacity: 0,
            })
            this.$gsap.to(this.$refs.OpenningNumThird, {
              duration: 0.1,
              delay: -0.1,
              ease: 'power1.in',
              opacity: 0,
            })
            this.$gsap.to(this.$refs.OpenningCircleLine01, {
              duration: 0.1,
              delay: -0.1,
              ease: 'power1.in',
              backgroundColor: 'transparent',
            })
          },
        })
        this.$gsap.to(this.$refs.OpenningCircleLine02, {
          duration: 0.2,
          delay: 3.5,
          ease: this.$EASING.transform,
          y: -window.innerHeight / 2 - 30,
          onComplete: () => {
            this.$gsap.to(this.$refs.OpenningCircleLine02, {
              duration: 0.1,
              delay: -0.1,
              ease: 'power1.in',
              backgroundColor: 'transparent',
            })
          },
        })
        this.$gsap.to(this.$refs.OpenningCircle, {
          duration: 0.8,
          delay: 3.6,
          ease: 'expo.out',
          opacity: 0,
          scale: 1,
        })

        this.$gsap.to(this.$refs.OpenningBgColorCircleContainer, {
          duration: 2.0,
          delay: 3.4,
          ease: this.$EASING.transform,
          scale: 0,
          rotate: 240,
          stagger: {
            each: 0.09,
          },
        })
        this.$gsap.to(this.$refs.OpenningBgCircle, {
          duration: 2.0,
          delay: 3.2,
          ease: this.$EASING.transform,
          scale: 0,
        })

        setTimeout(() => {
          this.$store.commit('openning/end')
          if (this.$route.name === 'works-slug') {
            this.$store.commit('image-transition/start', index)
          } else {
            this.$store.commit('bg-transition/start', '#f0efeb')
          }
        }, 6900)

        setTimeout(() => {
          if (this.$route.name === 'works-slug') {
            this.$store.commit('image-transition/end')
          } else {
            this.$store.commit('bg-transition/end')
          }
          this.$refs.Openning.remove()
        }, 7700)
      }
      // 2回目以降
      else {
        setTimeout(() => {
          this.$store.commit('openning/end')
          if (this.$route.name === 'works-slug') {
            this.$store.commit('image-transition/start', index)
          }else{
          this.$store.commit('bg-transition/start', '#f0efeb')
          }
        }, 100)

        setTimeout(() => {
           if (this.$route.name === 'works-slug') {
            this.$store.commit('image-transition/end')
          } else {
            this.$store.commit('bg-transition/end')
          }
          this.$refs.Openning.remove()
        }, 900)
      }
    })
  },
}
</script>

<style scoped lang="scss">
.openning {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $white;
  color: $black;
  font-size: 72px;
  font-family: $sixcaps;
  z-index: 1;
}

.openning-num {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 63px;
  height: 72px;
  text-align: right;
  opacity: 0;
  overflow: hidden;
}

.openning-num-first {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
}

.openning-num-second {
  position: absolute;
  top: 0;
  left: 14px;
  width: 14px;
}

.openning-num-third {
  position: absolute;
  top: 0;
  left: 29px;
  width: 14px;
}

.openning-percent {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 32px;
}

.openning-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: $black;
  font-size: 60px;
  font-family: $sixcaps;
  backface-visibility: hidden;
  overflow: hidden;
}

.openning-name-block {
  display: inline-block;
  transform: translateY(100%);
}

.openning-portfolio {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) scaleX(0.1);
  color: $black;
  font-size: 60px;
  font-family: $sixcaps;
  backface-visibility: hidden;
  opacity: 0;
}

.openning-circle-line-01 {
  position: absolute;
  top: -63px;
  right: 20px;
  left: 0;
  width: 14px;
  height: 63px;
  margin: 0 auto;
  background-color: $black;
  border-radius: 8px;
  transform-origin: bottom;
  line-height: 0.84;
  overflow: hidden;
}

.openning-circle-line-02 {
  position: absolute;
  bottom: -63px;
  right: -12px;
  left: 0;
  width: 14px;
  height: 63px;
  margin: 0 auto;
  background-color: $black;
  border-radius: 8px;
  transform-origin: top;
  line-height: 0.84;
  overflow: hidden;
}

.openning-circle-line-01-block,
.openning-circle-line-02-block {
  display: inline-block;
}

.openning-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) scale(0);
  width: 900px;
  height: 900px;
  border-radius: 50%;
  border: solid 1px $black;
}

.openning-bg-circle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.openning-bg-circle-color-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.openning-bg-circle-color-01 {
  position: absolute;
  top: -607px;
  left: 146px;
  width: 597px;
  height: 597px;
  background-color: $lightBlue;
  border-radius: 50%;
}

.openning-bg-circle-color-02 {
  position: absolute;
  top: -346px;
  left: 86px;
  width: 296px;
  height: 296px;
  background-color: $thinPink;
  border-radius: 50%;
}

.openning-bg-circle-color-03 {
  position: absolute;
  bottom: -381px;
  left: 406px;
  width: 311px;
  height: 311px;
  background-color: $yellow;
  border-radius: 50%;
}

.openning-bg-circle-color-04 {
  position: absolute;
  bottom: -452px;
  left: 276px;
  width: 402px;
  height: 402px;
  background-color: $thinPink;
  border-radius: 50%;
}

.openning-bg-circle-color-05 {
  position: absolute;
  bottom: -300px;
  left: 122px;
  width: 296px;
  height: 296px;
  background-color: $lightBlue;
  border-radius: 50%;
}

.openning-bg-circle-color-06 {
  position: absolute;
  bottom: -660px;
  right: 440px;
  width: 331px;
  height: 331px;
  background-color: $thinPink;
  border-radius: 50%;
}

.openning-bg-circle-color-07 {
  position: absolute;
  bottom: -647px;
  right: 186px;
  width: 597px;
  height: 597px;
  background-color: $yellow;
  border-radius: 50%;
}

.openning-bg-circle-color-08 {
  position: absolute;
  bottom: -547px;
  right: 210px;
  width: 296px;
  height: 296px;
  background-color: $blue;
  border-radius: 50%;
}

.openning-bg-circle-color-09 {
  position: absolute;
  bottom: -440px;
  right: 86px;
  width: 241px;
  height: 241px;
  background-color: $thinPink;
  border-radius: 50%;
}

.openning-bg-circle {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 142vmax;
  height: 142vmax;
  pointer-events: none;

  @include tab() {
    width: 150vmax;
    height: 150vmax;
  }

  @include sp() {
    left: 50%;
    width: 140vmax;
    height: 140vmax;
  }
}

.openning-bg-circle-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: scale(1);
  background-color: $skinColor;
}
</style>