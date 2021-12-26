<template>
  <div ref="Hero" class="hero">
    <div class="hero-bg" :style="`color:${heroColor};`">
      <div class="hero-img"><img :src="`${heroImg.url}?w=1000&h=624&q=80`" :width="`${heroImg.width}`" :height="`${heroImg.height}`" alt=""></div>
      <h1 class="hero-title">
        <span
          v-for="index of Object.keys(detailsMainText).length - 1"
          :key="index"
          class="hero-title-wrapper"
          :class="'hero-title-wrapper-0' + index"
        >
        <AppTextSegment
          :state="isTextSegmentState"
          :start="index * 0.12"
          :rotate="index % 2 != 0 ? rotateLeft : rotateRight"
          :text="`${detailsMainText['text0' + index]}`"
          :sp-animation="false"
        />
        </span>
      </h1>
      <p class="hero-desc">
        <span
          v-for="index of Object.keys(detailsMainDesc).length - 1"
          :key="index"
          class="hero-desc-wrapper"
          :class="'hero-desc-wrapper-0' + index"
        >
          <AppTextSegment
            :state="isTextSegmentState"
            :start="index * 0.12"
            :rotate="index % 2 != 0 ? rotateLeft : rotateRight"
            :text="`${detailsMainDesc['text0' + index]}`"
            :sp-animation="false"
          />
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heroColor: {
      type: String,
      default: '#ffffff',
    },
    heroImg: {
      type: Object,
      required: true,
    },
    detailsMainText: {
      type: Object,
      required: true,
    },
    detailsMainDesc: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      isTextSegmentState: '',
    }
  },
  mounted() {
    this.isTextSegmentState = 'center'
  },
}
</script>

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

.hero-title{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: $white;
  font-size: vw(80);
  font-family: $sixcaps;
}

.hero-desc{
  position: absolute;
  bottom: 20px;
  color: $white;
  font-size: 12px;
  font-family: $helvetica;
}
</style>