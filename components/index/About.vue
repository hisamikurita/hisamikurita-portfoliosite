<template>
  <div ref="aboutSec" class="about">
    <div class="about-inner">
      <div class="l-container">
        <h2 class="about-title">
          <span class="about-title-read-area">
            <CommonSectionReadTitle
              :text="[
                '・',
                'ABOUT',
              ]"
            ></CommonSectionReadTitle>
          </span>
          <span class="about-title-wrapper about-title-wrapper-01">
            <CommonTextSegment
              :start="0"
              rotate="rotate-right"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing"
            >
            </CommonTextSegment>
          </span>
          <span class="about-title-wrapper about-title-wrapper-02">
            <CommonTextSegment
              :start="0"
              rotate="rotate-left"
              text="elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
            >
            </CommonTextSegment>
          </span>
          <span class="about-title-wrapper about-title-wrapper-03">
            <CommonTextSegment
              :start="0"
              rotate="rotate-right"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lore"
            >
            </CommonTextSegment>
          </span>
          <span class="about-title-wrapper about-title-wrapper-04">
            <CommonTextSegment
              :start="0"
              rotate="rotate-left"
              text="m ipsum dolor sit amet, consectetur adipiscing elit,"
            >
            </CommonTextSegment>
          </span>
        </h2>
        <p class="">
          <CommonSectionReadTitle
            :text="[
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
              'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
              'veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ',
              'commodo consequat. Duis aute ir',
            ]"
          ></CommonSectionReadTitle>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.aboutSec.classList.add('is-op-complete')
  },
}
</script>

<style scoped lang="scss">
.about-inner {
  padding: 633px 0 248px 0;
}

.about-title {
  position: relative;
  width: vw(1090);
  margin: 0 0 0 40px;
  color: $darkBlue;
  font-size: vw(80);
  font-family: 'Six Caps', sans-serif;
  text-transform: uppercase;
}

.about-title-read-area {
  position: absolute;
  top: 8px;
  left: 2px;
  color: $white;
}

.about-title-wrapper {
  display: block;
}

.about-title-wrapper-01 {
  padding: 0 0 0 vw(156);
}
</style>
