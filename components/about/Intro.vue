<template>
  <div ref="Intro" class="intro">
    <!-- <div ref="IntroWrapper" class="intro-wrapper"> -->
    <div ref="IntroReadText" class="intro-read-text">
      INTRODUCTION INTRODUCTION INT
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.$gsap.set(this.$refs.IntroReadText, {
      x: window.innerWidth,
    })

    this.$nextTick(() => {
      // setTimeout(() => {
        this.$gsap.to(this.$refs.IntroReadText, {
          x: -this.$refs.IntroReadText.clientWidth + window.innerWidth,
          ease: 'none',
          scrollTrigger: {
            pin: true,
            pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
            trigger: this.$refs.IntroReadText,
            start: 'center center',
            end: '+=1000px',
            scrub: 1.0,
            // markers: true,
            onEnter: () => {
              // console.log('発火')
            },
          },
        })
        console.log(this.$refs.IntroReadText.clientWidth)
      // }, 1000)
    })

    // this.$gsap.to(this.$refs.IntroWrapper, {
    //   ease: "none",
    //   scrollTrigger: {
    //     pin: true,
    //     pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
    //     trigger: this.$refs.IntroWrapper,
    //     start: 'center center',
    //     end: '+=3000px',
    //     // markers: true,
    //     // onEnter: (() =>{
    //     //   // console.log('発火')
    //     // })
    //   }
    // });
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
  height: 3000px;
  padding: 200px 0 0 0;
}

// .intro-wrapper{
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100;
//   height: 100%;
// }

.intro-read-text {
  position: absolute;
  top: 0;
  left: 0;
  width: vw(1758);
  color: $darkPink;
  font-size: vw(280);
  font-family: 'Six Caps', sans-serif;
  white-space: nowrap;
  line-height: 1;
}
</style>