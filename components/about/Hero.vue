<template>
  <div ref="Hero" class="hero">
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <span class="hero-title-wrapper hero-title-wrapper-01">
            <CommonTextUnderline
              modifier="about-hero"
              :state="isTextUnderlineState"
              :start="delay[0]"
              :rotate="rotateRight"
            ></CommonTextUnderline>
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="delay[0]"
              :rotate="rotateRight"
              text="HELLO, WORLD"
            >
            </CommonTextSegment>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-02">
            <CommonTextUnderline
              modifier="about-hero"
              :state="isTextUnderlineState"
              :start="delay[1]"
              :rotate="rotateLeft"
            ></CommonTextUnderline>
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="delay[1]"
              :rotate="rotateLeft"
              text="HISAMI"
            >
            </CommonTextSegment>
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="delay[2]"
              :rotate="rotateLeft"
              text="KURITA"
            >
            </CommonTextSegment>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-03">
            <CommonTextUnderline
              modifier="about-hero"
              :state="isTextUnderlineState"
              :start="delay[3]"
              :rotate="rotateRight"
            ></CommonTextUnderline>
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="delay[3]"
              :rotate="rotateRight"
              text="IS  CR"
            >
            </CommonTextSegment>
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="delay[4]"
              :rotate="rotateRight"
              text="EATIVE"
            >
            </CommonTextSegment>
          </span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      delay: [0, 0.176, 0.4, 0.42],
      isTextSegmentState: '',
      isTextUnderlineState: '',
    }
  },
  mounted() {
    this.isTextSegmentState = 'center'
    this.isTextUnderlineState = 'extend'
  },
}
</script>

<style lang="scss" scoped>
.hero-inner {
  padding: 92px 0;
}

.hero-title {
  position: relative;
  color: $black;
  font-size: vw(180);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: -0.002em;
}

.hero-title-wrapper{
  display: block;
  position: relative;
}

.hero-title-wrapper-01{
  width: vw(450);
  margin: 0 0 24px vw(310);
}

.hero-title-wrapper-02{
  display: flex;
  justify-content: space-between;
  width: vw(987);
  margin: 0 0 24px vw(46);
  padding: 0 26px 0 34px;
}

.hero-title-wrapper-03{
  display: flex;
  justify-content: space-between;
  width: vw(860);
  margin: 0 0 24px vw(112);
}
</style>