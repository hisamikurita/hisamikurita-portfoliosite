<template>
  <div ref="Award" class="award">
    <div ref="AwardCardArea" class="award-card-area">
      <CommonCardAward></CommonCardAward>
    </div>
    <div class="award-bg">
      <div class="award-inner">
        <div class="l-container">
          <div v-for="data in awardData" :key="data.id" class="award-list">
            <div
              v-for="award in data.awards"
              :key="award.id"
              class="award-item"
            >
              <p class="award-group">{{ award.group }}</p>
              <p class="award-title">{{ data.title }}</p>
              <p class="award-rank">{{ award.rank }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import awardData from '@/assets/json/award.json'

export default {
  data: () => {
    return {
      awardData: awardData,
    }
  },
  mounted() {
    this.$refs.Award.addEventListener('mousemove', (e) => {
      this.$gsap.to(this.$refs.AwardCardArea, {
        x: e.clientX,
        y: e.clientY,
      })
    })
  },
}
</script>

<style lang="scss" scoped>
.award{
  position: relative;
  overflow: hidden;
}

.award-bg {
  position: relative;
  background-color: $darkBlack;
}

.award-inner {
  padding: 160px 40px;
}

.award-card-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 293px;
  height: 400px;
  pointer-events: none;
  z-index: 1;
}

// .award-card-area-item{
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 293px;
//   height: 400px;
// }

.award-list {
  width: vw(1000);
}

.award-item {
  display: flex;
  padding: 15px 0;
  border-top: solid 1px $gray;

  &:last-of-type {
    border-bottom: solid 1px $gray;
  }
}

.award-group {
  position: relative;
  top: 2px;
  flex-shrink: 0;
  width: vw(238);
  font-size: 14px;
  letter-spacing: 0.02em;
}

.award-title {
  flex-shrink: 0;
  width: vw(440);
  color: $gray;
  font-size: vw(60);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: 0.02em;
}

.award-rank {
  flex-shrink: 0;
  color: $gray;
  font-size: vw(60);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: 0.02em;
}
</style>