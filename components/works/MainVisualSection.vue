<template>
  <div ref="Hero" class="hero">
    <div class="hero-bg">
      <div class="hero-img"><img :src="`${heroImg.url}?w=1000&h=624&q=80`" :width="`${heroImg.width}`" :height="`${heroImg.height}`" alt=""></div>
      <div class="hero-title" :style="`color:${heroColor};`">
        <h1>
          <span class="hero-title-read-area">
            <AppSectionReadTitle
              :state="isTextSegmentState"
              :text="[
                '・',
                `WORKS 0${projectIndex}`,
              ]"
              :sp-animation="false"
              :modifier="'works-section'"
            />
          </span>
          <span class="hero-title-wrapper-block">
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
          </span>
          <span class="hero-title-line">
            <AppTextUnderline
              :state="isTextUnderlineState"
              :start="0.72"
              :color="heroColor"
              :origin="'left'"
              :sp-animation="false"
              :modifier="'works'"
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
              :start="index * 0.12 + 0.84"
              :rotate="index % 2 != 0 ? rotateLeft : rotateRight"
              :text="`${detailsMainDesc['text0' + index]}`"
              :sp-animation="false"
            />
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projectIndex: {
      type: Number,
      required: true,
    },
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
      isTextUnderlineState: '',
    }
  },
  mounted() {
    this.isTextSegmentState = 'center'
    this.isTextUnderlineState = 'extend';
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
  pointer-events: none;
  user-select: none;

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
  top: calc(50.2% + 53px);
  left: 80px;
  transform: translate3d(0, -50%, 0);
  width: vw(494);
  color: $white;
  font-size: vw(80);
  font-family: $sixcaps;
  line-height: 1.04;
}

.hero-title-wrapper-block{
  display: block;
  margin: 0 0 37px 0;
}

.hero-title-wrapper-01{
  text-align: right;
}

.hero-title-read-area{
  position: absolute;
  top: 0;
  left: 0;
}

.hero-title-line{
  display: block;
  margin: 0 0 36px 0;
}

.hero-desc{
  color: inherit;
  font-size: 12px;
  font-family: $helvetica;
}
</style>