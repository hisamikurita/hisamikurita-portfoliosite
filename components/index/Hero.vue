<template>
  <div class="hero">
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <TextSegment start="0" text="FOLIO OF HISAMI KURITA"></TextSegment>
          <TextSegment start="1.32" text="19/Aug.1996"></TextSegment>
          <TextSegment start="1.98" text="CREATIVE DEVELOPER"></TextSegment>
          <TextSegment start="3.06" text="AT LIG INC"></TextSegment>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import TextSegment from '../common/TextSgment.vue'

export default {
  components: {
    TextSegment,
  },
}
</script>

<style scoped lang="scss">
.hero-inner{
  padding: 40px 0;
}

.hero-title {
  font-size: vw(160);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: 0.02em;
}
</style>