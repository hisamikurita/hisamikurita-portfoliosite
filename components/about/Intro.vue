<template>
  <div ref="Intro" class="intro">
    <div class="intro-sticky">
      <div ref="IntroReadText" class="intro-read-text">INTRODUCTION INTRODUCTION INT</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$gsap.to(this.$refs.IntroReadText, {
      x: this.$asscroll.targetPos,
      ease: "none",
      scrollTrigger: {
        pin: true,
        pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
        trigger: this.$refs.IntroReadText,
        start: 'center center',
        end: '+=1000px',
        markers: true,
        onEnter: (() =>{
          console.log('発火')
        })
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
  // height: vw(2000);
}

.intro-sticky{
  position: relative;
  height: var(--viewportHeight);
}

.intro-read-text{
  color: $darkPink;
  font-size: vw(280);
  font-family: 'Six Caps', sans-serif;
  white-space: nowrap;
}
</style>