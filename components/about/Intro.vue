<template>
  <div ref="Intro" class="intro">
    <div ref="IntroWrapper" class="intro-wrapper">
      <CommonCircleBg ref="IntroCircleBg" :state="isCircleBgState" modifier="about-intro">
      </CommonCircleBg>
      <div ref="IntroReadText" class="intro-read-text">
        INTRODUCTION INTRODUCTION INT
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      isCircleBgState: '',
    }
  },

  mounted() {
    this.$gsap.set(this.$refs.IntroWrapper, {
      height: window.innerHeight,
    })
    this.$gsap.set(this.$refs.IntroReadText, {
      x: window.innerWidth,
    })

    this.$nextTick(() => {
      setTimeout(()=>{

      const x = -this.$refs.IntroReadText.clientWidth + window.innerWidth;
      const end = 5000 - window.innerHeight;

      this.$gsap.to(this.$refs.IntroReadText, {
        x: x,
        ease: 'none',
        scrollTrigger: {
          // pin: true,
          // pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
          // pinSpacing: false,
          trigger: this.$refs.IntroReadText,
          start: 'center center',
          end: '+=1000px',
          scrub: 1.0,

          onEnter: () => {
            this.isCircleBgState = 'extend'
          },
          onLeaveBack: () => {
            this.isCircleBgState = 'shrink'
          },
        },
      })

    //   this.$gsap.to(this.$refs.IntroReadText, {
    //     ease: 'none',
    //     scrollTrigger: {
    //       pin: true,
    //       pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
    //       // pinSpacing: false,
    //       trigger: this.$refs.IntroReadText,
    //       start: 'center center',
    //       end: '+=1300px',
    //       scrub: 1.0,
    //     },
    //   })

      // this.$gsap.to(this.$refs.IntroCircleBg.$el, {
      //   ease: 'none',
      //   scrollTrigger: {
      //     // pin: true,
      //     // pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
      //     // pinSpacing: false,
      //     trigger: this.$refs.IntroReadText,
      //     start: 'center center',
      //     end: `+=${end}px`,
      //     scrub: 1.0,
        
      //   },
      // })
    // })

    this.$gsap.to(this.$refs.IntroWrapper, {
      ease: "none",
      scrollTrigger: {
        pin: true,
        pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
        trigger: this.$refs.IntroWrapper,
        start: 'end',
        end: `+=${end}px`,
        scrub: true,
        }
      })
      },500)

    });
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
  height: 5000px;
  // padding: 200px 0 0 0;
}

.intro-wrapper{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  // height: var(--viewportHeight);
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
}
</style>