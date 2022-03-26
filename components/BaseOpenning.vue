<template>
  <div ref="Openning" class="openning">
    <div ref="OpenningBgCircle" class="openning-bg-circle"><span class="openning-bg-circle-element"></span></div>
    <div class="openning-num">
      <span ref="OpenningNumFirst" class="openning-num-first">01</span>
      <span ref="OpenningNumSecond" class="openning-num-second">01234567890</span>
      <span ref="OpenningNumThird" class="openning-num-third">012345678901234567890</span>
      <span ref="OpenningNumPercent" class="openning-percent">%</span>
    </div>
    <div ref="OpenningName" class="openning-name">
      <span v-for="(char, index) of name" :key="index" ref="OpenningNameBlock" class="openning-name-block">{{ char }}</span>
    </div>
    <div ref="OpenningPortfolio" class="openning-portfolio">PORTFORIO 2022</div>
    <div ref="OpenningCircleLine01" class="openning-circle-line-01"></div>
    <div ref="OpenningCircleLine02" class="openning-circle-line-02"></div>
    <div ref="OpenningCircle" class="openning-circle"></div>
  </div>
</template>

<script>
export default {
  data:() =>{
    return {
      name: ['H','I','S','A','M','I','K','U','R','I','T','A'],
    }
  },
  mounted() {
    this.$gsap.to(this.$refs.OpenningNumFirst, {
      duration: 1.8,
      delay: 1.6,
      ease: this.$EASING.transform,
      y: -72,
    })
    this.$gsap.to(this.$refs.OpenningNumSecond, {
      duration: 3.0,
      delay: 0.4,
      ease: this.$EASING.transform,
      y: -720,
    })
    this.$gsap.to(this.$refs.OpenningNumThird, {
      duration: 3.0,
      delay: 0.4,
      ease: this.$EASING.transform,
      y: -1440,
    })

    this.$gsap.to(this.$refs.OpenningNumFirst, {
      duration: 1.8,
      delay: 3.2,
      ease: this.$EASING.transform,
      y: -144,
    })
    this.$gsap.to(this.$refs.OpenningNumSecond, {
      duration: 1.8,
      delay: 3.3,
      ease: this.$EASING.transform,
      y: -792,
    })
    this.$gsap.to(this.$refs.OpenningNumThird, {
      duration: 1.8,
      delay: 3.4,
      ease: this.$EASING.transform,
      y: -1512,
    })
    this.$gsap.to(this.$refs.OpenningNumPercent, {
      duration: 1.8,
      delay: 3.5,
      ease: this.$EASING.transform,
      y: -72,
    })

    this.$gsap.to(this.$refs.OpenningNameBlock,{
      duration: 1.2,
      delay: 3.6,
      ease: this.$EASING.transform,
      stagger: {
          each: 0.04,
      },
      y:0,
    });
    this.$gsap.to(this.$refs.OpenningName,{
      duration: 0.8,
      delay: 5.2,
      ease: this.$EASING.transform,
      letterSpacing: '-0.2em',

      onComplete:()=>{
        this.$gsap.set(this.$refs.OpenningName,{
          opacity: 0,
        });
        this.$gsap.set(this.$refs.OpenningPortfolio,{
          opacity: 1,
        });
      }
    });

    this.$gsap.to(this.$refs.OpenningPortfolio,{
      duration: 0.8,
      delay: 6.0,
      ease: this.$EASING.transform,
      letterSpacing: '0'
    });

    this.$gsap.to(this.$refs.OpenningCircleLine01, {
      duration: 0.2,
      delay: 2.7,
      ease: this.$EASING.transform,
      y: window.innerHeight / 2,
      onComplete: () => {
        this.$gsap.to(this.$refs.OpenningCircleLine01, {
          duration: 0.1,
          delay: -0.1,
          ease: 'power1.in',
          scaleY: 0,
        })
      },
    });
    this.$gsap.to(this.$refs.OpenningCircleLine02, {
      duration: 0.2,
      delay: 2.7,
      ease: this.$EASING.transform,
      y: -window.innerHeight / 2,
      onComplete: () => {
        this.$gsap.to(this.$refs.OpenningCircleLine02, {
          duration: 0.1,
          delay: -0.1,
          ease: 'power1.in',
          scaleY: 0,
        })
      },
    });
    this.$gsap.to(this.$refs.OpenningCircle, {
      duration: 0.8,
      delay: 2.8,
      ease: 'expo.out',
      scale: 1
    })
    this.$gsap.to(this.$refs.OpenningBgCircle, {
      duration: 4.0,
      delay: 3.0,
      ease: this.$EASING.transform,
      scale: 0
    })

    setTimeout(()=>{
      this.$store.commit('openning/end');
      this.$store.commit('bg-transition/start', '#f0efeb');
    },7200)

    setTimeout(()=>{
      this.$store.commit('bg-transition/end');
      this.$refs.Openning.remove();
    },8000)
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
  width: 61px;
  height: 72px;
  text-align: right;
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

.openning-name{
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

.openning-name-block{
  display: inline-block;
  transform: translateY(100%);
}

.openning-portfolio{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: $black;
  font-size: 60px;
  font-family: $sixcaps;
  letter-spacing: -0.2em;
  backface-visibility: hidden;
  opacity: 0;
}

.openning-circle-line-01 {
  position: absolute;
  top: -63px;
  right: 0;
  left: 0;
  width: 12px;
  height: 63px;
  margin: 0 auto;
  background-color: $black;
  border-radius: 8px;
  transform-origin: bottom;
}

.openning-circle-line-02 {
  position: absolute;
  bottom: -63px;
  right: 0;
  left: 0;
  width: 12px;
  height: 63px;
  margin: 0 auto;
  background-color: $black;
  border-radius: 8px;
  transform-origin: top;
}

.openning-circle{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) scale(0);
  width: 900px;
  height: 900px;
  border-radius: 50%;
  border: solid 1px $black;
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