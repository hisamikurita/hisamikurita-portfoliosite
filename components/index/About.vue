<template>
  <div ref="aboutSec" class="about">
    <div class="about-inner">
      <div class="l-container">
        <h2 class="about-title">
          <span class="about-title-wrapper about-title-wrapper-01">
            <TextSegment
              :start="0"
              rotate="rotate-right"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing"
            >
            </TextSegment>
          </span>
          <span class="about-title-wrapper about-title-wrapper-02">
            <TextSegment
              :start="0"
              rotate="rotate-right"
              text="elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
            >
            </TextSegment>
          </span>
          <span class="about-title-wrapper about-title-wrapper-03">
            <TextSegment
              :start="0"
              rotate="rotate-right"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lore"
            >
            </TextSegment>
          </span>
          <span class="about-title-wrapper about-title-wrapper-04">
            <TextSegment
              :start="0"
              rotate="rotate-right"
              text="m ipsum dolor sit amet, consectetur adipiscing elit,"
            >
            </TextSegment>
          </span>
        </h2>
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
  mounted() {
    this.$refs.aboutSec.classList.add('is-op-complete')
  },
}
</script>

<style scoped lang="scss">
  .about-inner{
    padding: 633px 0 0 0;
  }

  .about-title{
    width: vw(1090);
    padding: 0 0 0 40px;
    color: $darkBlue;
    font-size: vw(80);
    font-family: 'Six Caps', sans-serif;
    text-transform: uppercase;
  }

  .about-title-wrapper{
    display: block;
  }

  .about-title-wrapper-01{
    padding: 0 0 0 vw(156);
  }
</style>
