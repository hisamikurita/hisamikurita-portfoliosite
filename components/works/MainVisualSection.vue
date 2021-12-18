<template>
  <div ref="Hero" class="hero">
    <div class="hero-bg">
      <div class="hero-img"><img src="/images/works-hero-mtrust.jpg" alt=""></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --viewportWidth: 0;
  --viewportHeight: 0;
}

.hero-bg{
  position: relative;
  height: var(--viewportHeight);
}

.hero-img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>