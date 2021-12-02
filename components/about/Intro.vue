<template>
  <div ref="Intro" class="intro">
    <div ref="IntroReadText" class="intro-read-text">INTRODUCTION INTRODUCTION INT</div>
  </div>
</template>

<script>
export default {
  mounted() {
      this.$gsap.set(this.$refs.IntroReadText,{
        x: window.innerWidth
      })

      const totalScroll = this.$asscroll.containerElement.scrollHeight - window.innerHeight;

      this.$gsap.to(this.$refs.IntroReadText, {
        x: -totalScroll * 0.1,
        ease: "none",
        scrollTrigger: {
          pin: true,
          pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
          trigger: this.$refs.IntroReadText,
          start: 'center center',
          end: '+=1000px',
          scrub: 0.9,
          // markers: true,
          // onEnter: (() =>{
          //   // console.log('発火')
          // })
        }
      });
  },
}
</script>

<style lang="scss" scoped>
:root {
  --viewportWidth: 0;
  --viewportHeight: 0;
}

.intro{
  position: relative;
  height: 3000px;
  padding: 200px 0 0 0;
}

.intro-read-text{
  position: absolute;
  top: 0;
  left: 0;
  color: $darkPink;
  font-size: vw(280);
  font-family: 'Six Caps', sans-serif;
  white-space: nowrap;
  line-height: 1;
}
</style>