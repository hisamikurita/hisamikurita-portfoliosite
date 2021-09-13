<template>
  <div ref="heroSec" class="hero">
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <span class="hero-title-wrapper hero-title-wrapper-01">
            <span
              class="hero-title-line hero-title-line-right"
              :style="{ animationDelay: TextSegmentDelay01 + 's' }"
            ></span>
            <TextSegment
              :start="TextSegmentDelay01"
              rotate="rotate-right"
              text="FOLIO OF HISAMI KURITA"
            >
            </TextSegment>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-02">
            <span
              class="hero-title-line hero-title-line-left"
              :style="{ animationDelay: TextSegmentDelay02 + 's' }"
            ></span>
            <TextSegment
              :start="TextSegmentDelay02"
              rotate="rotate-left"
              text="19/Aug.1996"
            >
            </TextSegment>
            <span class="hero-title-wrapper-02-base-area">
              <TextSegment
                start="0.264"
                rotate="rotate-left"
                text="( BASED IN TOKYO AND KAWASAKI )"
              ></TextSegment>
              <span
                class="
                  hero-title-wrapper-02-base-area-helvetica
                  hero-title-wrapper-02-base-area-helvetica-sometimes
                "
                ><TextSegment
                  start="0.352"
                  rotate="rotate-left"
                  text="SOMETIMES"
                ></TextSegment
              ></span>
              <span
                class="
                  hero-title-wrapper-02-base-area-helvetica
                  hero-title-wrapper-02-base-area-helvetica-allways
                "
                ><TextSegment
                  start="0.432"
                  rotate="rotate-left"
                  text="ALLWAYS"
                ></TextSegment
              ></span>
            </span>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-03">
            <span
              class="hero-title-line hero-title-line-right"
              :style="{ animationDelay: TextSegmentDelay03 + 's' }"
            ></span>
            <TextSegment
              :start="TextSegmentDelay03"
              rotate="rotate-right"
              text="CREATIVE DEVELOPER"
            ></TextSegment>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-04">
            <span
              class="hero-title-line hero-title-line-left"
              :style="{ animationDelay: TextSegmentDelay04 + 's' }"
            ></span>
            <TextSegment
              :start="TextSegmentDelay04"
              rotate="rotate-left"
              text="AT LIG INC"
            ></TextSegment>
          </span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import TextSegment from '../common/TextSegment.vue'

export default {
  components: {
    TextSegment,
  },
  data: () => {
    return {
      TextSegmentDelay01: 0,
      TextSegmentDelay02: 0.176,
      TextSegmentDelay03: 0.512,
      TextSegmentDelay04: 0.656,
    }
  },
  mounted() {
    this.$refs.heroSec.classList.add('is-op-complete')
  },
}
</script>

<style scoped lang="scss">
.hero-inner {
  padding: 92px 0;
}

.hero-title {
  font-size: vw(180);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: -0.002em;
}

.hero-title-wrapper {
  display: block;
  position: relative;
}

.hero-title-line {
  position: absolute;
  top: -12px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: $white;
  transform: scale(0);
  animation-delay: inherit;
}

.hero-title-line-right {
  transform-origin: left;
}

.hero-title-line-left {
  transform-origin: right;
}

.is-op-complete .hero-title-line {
  animation: scaleX $base-duration * 1.8 $transform-easing forwards;
}

.hero-title-wrapper-01 {
  width: vw(783);
  margin: 0 0 36px vw(260);
}

.hero-title-wrapper-02 {
  display: flex;
  justify-content: space-between;
  width: vw(965);
  margin: 0 0 32px 0;
}

.hero-title-wrapper-03 {
  width: vw(662);
  margin: 0 0 32px vw(414);
}

.hero-title-wrapper-04 {
  width: vw(330);
  margin: 0 0 0 vw(206);
}

.hero-title-wrapper-02-base-area {
  position: relative;
  padding: 12px 0 0 0;
  font-size: vw(80);
  letter-spacing: 0.0025em;
}

.hero-title-wrapper-02-base-area-helvetica {
  position: absolute;
  top: vw(98);
  font-family: Helvetica, sans-serif;
  font-size: vw(14);
}

.hero-title-wrapper-02-base-area-helvetica-sometimes {
  left: vw(169);
}

.hero-title-wrapper-02-base-area-helvetica-allways {
  left: vw(380);
}
</style>