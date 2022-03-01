<template>
  <div ref="Hero" class="hero">
    <div class="hero-bg">
      <div class="hero-img">
        <picture>
          <source
            :srcset="`${currentProject.heroImg.url}?fm=webp&w=2560&h=1600&q=50`"
            :width="`${currentProject.heroImg.width}`"
            :height="`${currentProject.heroImg.height}`"
            type="image/webp"
          />
          <img
            :src="`${currentProject.heroImg.url}?w=2560&h=1600&q=50`"
            :width="`${currentProject.heroImg.width}`"
            :height="`${currentProject.heroImg.height}`"
          />
        </picture>
      </div>
      <div class="pc-only">
        <div
          class="hero-title"
          :style="`color:${currentProject.siteColor.mvTextColor};`"
        >
          <h1>
            <span class="hero-title-read-area">
              <AppSectionReadTitle
                :state="isTextSegmentState"
                :text="['・', `WORKS 0${currentProject.index}`]"
                :sp-animation="false"
                :modifier="'works-section'"
              />
            </span>
            <span class="hero-title-wrapper-block">
              <span
                v-for="index of Object.keys(currentProject.detailsMainTextPc)
                  .length - 1"
                :key="index"
                class="hero-title-wrapper"
                :class="`hero-title-wrapper-0${index}`"
              >
                <AppTextSegment
                  :state="isTextSegmentState"
                  :start="index * 0.12"
                  :rotate="
                    index % 2 != 0 ? $BASEROTATE.left : $BASEROTATE.right
                  "
                  :text="`${currentProject.detailsMainTextPc['text0' + index]}`"
                  :sp-animation="false"
                />
              </span>
            </span>
            <span class="hero-title-line">
              <AppTextUnderline
                :state="isTextUnderlineState"
                :start="0.72"
                :color="currentProject.siteColor.mvTextColor"
                :origin="'left'"
                :sp-animation="false"
                :modifier="'works'"
              />
            </span>
          </h1>
          <p class="hero-desc">
            <span
              v-for="index of Object.keys(currentProject.detailsMainDescPc)
                .length - 1"
              :key="index"
              class="hero-desc-wrapper"
              :class="`hero-desc-wrapper-0${index}`"
            >
              <AppTextSegment
                :state="isTextSegmentState"
                :start="index * 0.12 + 0.84"
                :rotate="index % 2 != 0 ? $BASEROTATE.left : $BASEROTATE.right"
                :text="`${currentProject.detailsMainDescPc['text0' + index]}`"
                :sp-animation="false"
              />
            </span>
          </p>
        </div>
      </div>
      <div class="sp-only">
        <div
          class="hero-index-sp"
          :style="`color:${currentProject.siteColor.mvTextColor};`"
        >
          <span class="hero-index-sp-01">・</span>
          <span>WORKS 0{{ currentProject.index }}</span>
        </div>
      </div>
    </div>
    <div class="sp-only">
      <div class="hero-inner">
        <div class="l-container">
          <div class="hero-title-sp-area">
            <h1 class="hero-title-sp">
              <span class="hero-title-wrapper-block-sp">
                <span
                  v-for="index of Object.keys(currentProject.detailsMainTextSp)
                    .length - 1"
                  :key="index"
                  class="hero-title-wrapper-sp"
                  :class="`hero-title-wrapper-sp-0${index}`"
                >
                  {{ currentProject.detailsMainTextSp['text0' + index] }}
                </span>
              </span>
            </h1>
            <p class="hero-desc-sp">
              <span
                v-for="index of Object.keys(currentProject.detailsMainDescSp)
                  .length - 1"
                :key="index"
                class="hero-desc-wrapper-sp"
                :class="`hero-desc-wrapper-sp-0${index}`"
              >
                {{ currentProject.detailsMainDescSp['text0' + index] }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentProject: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      isTextSegmentState: 'default',
      isTextUnderlineState: 'default',
    }
  },
  mounted() {
    setTimeout(() => {
      this.isTextSegmentState = 'center'
      this.isTextUnderlineState = 'extend'
    }, 400)
  },
}
</script>

<style lang="scss" scoped>
:root {
  --viewportWidth: 0;
  --viewportHeight: 0;
}

.hero-bg {
  position: relative;
  height: var(--viewportHeight, 100vh);
}

.hero-inner {
  padding: 93px vw_sp(20) 163px;
}

.hero-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.hero-title {
  position: absolute;
  top: calc(50.2% + #{vmin(86)});
  left: 80px;
  transform: translate3d(0, -50%, 0);
  width: vmin(792);
  font-size: vmin(128);
  font-family: $sixcaps;
  line-height: 1.04;
}

.hero-title-wrapper-block {
  display: block;
  margin: 0 0 37px 0;
}

.hero-title-wrapper-01 {
  text-align: right;
}

.hero-title-read-area {
  position: absolute;
  top: 0;
  left: 0;
}

.hero-title-line {
  display: block;
  margin: 0 0 36px 0;
}

.hero-desc {
  font-size: 12px;
  font-family: $helvetica;
}

.hero-title-sp {
  margin: 0 0 23px 0;
  font-size: vw_sp(120);
  font-family: $sixcaps;
  line-height: 1.1;
  border-bottom: solid 1px;
}

.hero-title-wrapper-block-sp {
  display: block;
  margin: 0 0 26px 0;
}

.hero-title-wrapper-sp {
  display: block;
  white-space: nowrap;

  &:first-of-type {
    text-align: right;
  }
}

.hero-desc-wrapper-sp {
  display: block;
}

.hero-desc-sp {
  font-size: 10px;
  font-family: $helvetica;
  line-height: 1.21;
}

.hero-index-sp {
  position: absolute;
  bottom: 39px;
  left: 21px;
  font-size: 10px;
  font-family: $helvetica;
  line-height: 1.1;
}

.hero-index-sp-01 {
  display: block;
  margin: 0 0 0 -4.5px;
  font-size: 26px;
}
</style>