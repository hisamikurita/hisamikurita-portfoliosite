<template>
  <div ref="Hero" class="hero">
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <span class="hero-title-read-area">
            <CommonSectionReadTitle
              modifier="section"
              :state="isTextSegmentState"
              :start="delay[0]"
              :text="[
                '・',
                'ABOUT',
                'ABOUTABOUTABOUTABOUT',
                'ABOUT',
              ]"
            ></CommonSectionReadTitle>
          </span>
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
          <span class="hero-title-wrapper hero-title-wrapper-04">
            <CommonTextUnderline
              modifier="about-hero"
              :state="isTextUnderlineState"
              :start="delay[5]"
              :rotate="rotateLeft"
            ></CommonTextUnderline>
            <CommonTextSegment
              :state="isTextSegmentState"
              :start="delay[5]"
              :rotate="rotateLeft"
              text="DEVELOPER AT LIG INC SINCE 2020"
            >
            </CommonTextSegment>
          </span>
        </h1>
        <div class="hero-card-item">
          <CommonCardProject
            :name="['・','LIG INC']"
            :title="'LIG INC.'"
            :subtitle="'(VISIT SITE)'"
            :blank="true"
            :link="'https://liginc.co.jp'"
            :text="[
              'LOREM IPSUM DOLOR SIT',
              'AMET, CONSECTETUR',
              'ADIPISCING ELIT, SED DO',
              'EIUSMOD TEMPOR INCIDI'
            ]"
            :rotate="8"
            :xspeed="0.01"
            :yspeed="0.14"
            modifier="about-hero"
          ></CommonCardProject>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      delay: [0, 0.176, 0.4, 0.42, 0.6, 0.7],
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
.hero{
  position: relative;
}

.hero-inner {
  padding: 92px 0 333px;
}

.hero-title {
  position: relative;
  color: $black;
  font-size: vw(180);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: -0.002em;
}

.hero-title-read-area {
  position: absolute;
  top: 6px;
  left: 40px;
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

.hero-title-wrapper-04{
  width: vw(1077);
}

.hero-card-item{
  position: absolute;
  top: 63.8%;
  left: 33%;
  transform: rotate(-10deg);
}
</style>