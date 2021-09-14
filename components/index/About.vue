<template>
  <div ref="aboutSec" class="about">
    <div class="about-inner">
      <div class="l-container">
        <h2 class="about-title">
          <TextSegment
            :start="0"
            rotate="rotate-right"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing"
          >
          </TextSegment>
          <TextSegment
            :start="0"
            rotate="rotate-right"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing"
          >
          </TextSegment>
          <TextSegment
            :start="0"
            rotate="rotate-right"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lore"
          >
          </TextSegment>
          <TextSegment
            :start="0"
            rotate="rotate-right"
            text="m ipsum dolor sit amet, consectetur adipiscing elit, "
          >
          </TextSegment>
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
    padding: 684px 0 0 0;
  }

  .about-title{
    font-size: vw(80);
    font-family: 'Six Caps', sans-serif;
    text-transform: uppercase;
  }
</style>
