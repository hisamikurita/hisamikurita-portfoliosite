<template>
  <div ref="Hero" class="hero">
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <span class="pc-only">
            <span class="hero-title-read-area">
              <AppSectionReadTitle
                :state="isTextSegmentState"
                :text="[
                  '・',
                  'ABOUT',
                  'ABOUTABOUTABOUTABOUT',
                  'ABOUT',
                ]"
                :sp-animation="false"
                :modifier="'section'"
              />
            </span>
          </span>
          <span class="pc-only">
            <span class="hero-title-wrapper hero-title-wrapper-01">
              <AppTextUnderline
                :state="isTextUnderlineState"
                :origin="'left'"
                :sp-animation="false"
                :modifier="'about-hero'"
              />
              <AppTextSegment
                :state="isTextSegmentState"
                :rotate="rotateRight"
                :text="'HELLO, WORLD'"
                :sp-animation="false"
              />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02">
              <AppTextUnderline
                :state="isTextUnderlineState"
                :start="delay[1]"
                :origin="'right'"
                :sp-animation="false"
                :modifier="'about-hero'"
              />
              <AppTextSegment
                :state="isTextSegmentState"
                :start="delay[1]"
                :rotate="rotateLeft"
                :text="'HISAMI'"
                :sp-animation="false"
              />
              <AppTextSegment
                :state="isTextSegmentState"
                :start="delay[2]"
                :rotate="rotateLeft"
                :text="'KURITA'"
                :sp-animation="false"
              />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03">
              <AppTextUnderline
                :state="isTextUnderlineState"
                :start="delay[3]"
                :origin="'left'"
                :sp-animation="false"
                :modifier="'about-hero'"
              />
              <AppTextSegment
                :state="isTextSegmentState"
                :start="delay[3]"
                :rotate="rotateRight"
                :text="'IS  CR'"
                :sp-animation="false"
              />
              <AppTextSegment
                :state="isTextSegmentState"
                :start="delay[4]"
                :rotate="rotateRight"
                :text="'EATIVE'"
                :sp-animation="false"
              />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04">
              <AppTextUnderline
                :state="isTextUnderlineState"
                :start="delay[5]"
                :origin="'right'"
                :sp-animation="false"
                :modifier="'about-hero'"
              />
              <AppTextSegment
                :state="isTextSegmentState"
                :start="delay[5]"
                :rotate="rotateLeft"
                :text="'DEVELOPER AT LIG INC SINCE 2020'"
                :sp-animation="false"
              />
            </span>
          </span>
          <span class="sp-only">
            <span class="hero-title-wrapper hero-title-wrapper-01-sp">
              <span class="hero-text-underline"></span>
              HELLO, WORLD
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02-sp">
              <span class="hero-text-underline"></span>
              <span>HISAMI</span>
              <span>KURITA</span>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03-sp">
              <span class="hero-text-underline"></span>
              <span>IS</span>
              <span>CR</span>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04-sp">
              <span class="hero-text-underline"></span>
              <span>EATIVE</span>
              <span>DEVELO</span>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-05-sp">
              <span class="hero-text-underline"></span>
              <span>PER AT LIG INC</span>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-06-sp">
              <span class="hero-text-underline"></span>
              <span>SINCE 2020.</span>
            </span>
          </span>
        </h1>
        <span class="pc-only">
          <span class="hero-card-item">
            <AppCardBase
              :component-name="'CompanyContents'"
              :name="['・','LIG INC']"
              :title="'LIG INC.'"
              :subtitle="'(VISIT SITE)'"
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
              :sp-animation="false"
              :modifier="'about-hero'"
            />
          </span>
        </span>
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

  @include sp(){
    padding: 106px 0 148px;
  }
}

.hero-title {
  position: relative;
  color: $black;
  font-size: vw(180);
  font-family: $sixcaps;
  letter-spacing: -0.002em;

  @include sp(){
    font-size: vw_sp(220);
  }
}

.hero-title-read-area {
  position: absolute;
  top: 6px;
  left: 40px;
}

.hero-title-wrapper{
  display: block;
  position: relative;

  @include sp(){
    display: flex;
    justify-content: space-between;
    margin: 0 auto 18px;
    text-align: center;
    white-space: nowrap;
  }
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

.hero-title-wrapper-01-sp{
  width: vw_sp(550);
}

.hero-title-wrapper-02-sp{
  width: vw_sp(670);
}

.hero-title-wrapper-03-sp{
  width: vw_sp(590);
}

.hero-title-wrapper-04-sp{
  width: vw_sp(670);
}

.hero-title-wrapper-05-sp{
  width: vw_sp(573);
}

.hero-title-wrapper-06-sp{
  width: vw_sp(452);
}

.hero-text-underline{
  position: absolute;
  top: -7px;
  left: 0;
  background-color: $black;
  width: 100%;
  height: 1px;
}

.hero-card-item{
  position: absolute;
  top: 82.8%;
  left: 33%;
  transform: rotate(-10deg);
}
</style>