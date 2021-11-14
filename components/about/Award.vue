<template>
  <div ref="Award" class="award">
    <span class="pc-only">
      <span ref="AwardCardArea" class="award-card-area">
        <CommonCardAward></CommonCardAward>
      </span>
    </span>
    <div class="award-bg">
      <div class="award-inner">
        <div class="l-container">
          <span class="award-title-read-area">
            <CommonSectionReadTitle
              modifier="award-section"
              :state="isTextSegmentState"
              :start="0"
              :text="[
                '・',
                'AWARDS',
              ]"
            ></CommonSectionReadTitle>
          </span>
          <div class="award-list-wrapper">
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
          <span class="pc-only">
            <ul class="award-total-list">
              <li class="award-total-item">AWWWARDS*{{ awardData[awardData.length - 1.0].total.awwwwards }}</li>
              <li class="award-total-item">CSSDA*{{ awardData[awardData.length - 1.0].total.cssda }}</li>
              <li class="award-total-item">CSSWINNER*{{ awardData[awardData.length - 1.0].total.csswinner }}</li>
            </ul>
          </span>
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
      isTextSegmentState: '',
    }
  },
  mounted() {
    /* text-animation */
    this.observe = this.$refs.Award
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center'
            this.iObserver.unobserve(this.observe)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserver.observe(this.observe)

    /* mouse */
    this.$refs.Award.addEventListener('mousemove', (e) => {
      this.$gsap.to(this.$refs.AwardCardArea, {
        x: e.clientX,
        y: e.clientY,
      })
    })
  },

  beforeDestroy() {
    this.iObserver.unobserve(this.observe)
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
  padding: 152px 40px;

  @include sp(){
    padding: 63px vw_sp(20);
  }
}

.award-card-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 293px;
  height: 400px;
  pointer-events: none;
  z-index: 1;
  display: none;
}

.award-title-read-area{
  display: block;
  margin: 0 0 36px 0;

  @include sp(){
    margin: 0 0 40px 0;
  }
}

// .award-card-area-item{
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 293px;
//   height: 400px;
// }

.award-list-wrapper{
  margin: 0 0 40px 0;
}

.award-list {
  width: vw(1000);

  @include sp(){
    width: 100%;
  }
}

.award-item {
  display: flex;
  padding: 15px 0;
  border-top: solid 1px $gray;

  &:last-of-type {
    border-bottom: solid 1px $gray;
  }

  @include sp(){
    display: block;
    padding: 18px 0;
  }
}

.award-group {
  position: relative;
  top: 2px;
  flex-shrink: 0;
  width: vw(238);
  font-size: 14px;
  letter-spacing: 0.02em;

  @include sp(){
    top: auto;
    width: auto;
    margin: 0 0 10px 0;
    font-size: 10px;
  }
}

.award-title {
  flex-shrink: 0;
  width: vw(440);
  color: $gray;
  font-size: vw(60);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: 0.02em;

  @include sp(){
    width: auto;
    margin: 0 0 8px 0;
    font-size: vw_sp(100);
    text-align: right;
  }
}

.award-rank {
  flex-shrink: 0;
  color: $gray;
  font-size: vw(60);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: 0.02em;

  @include sp(){
    width: auto;
    font-size: vw_sp(100);
  }
}

.award-total-item{
  color: $gray;
  font-size: 12px;
  letter-spacing: 0.02em;

  &:not(:last-of-type) {
    margin: 0 0 4px 0;
  }
}
</style>