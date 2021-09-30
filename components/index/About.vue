<template>
  <div class="about">
    <div class="about-inner">
      <div class="l-container">
        <h2 ref="AboutTitleTrigger" class="about-title">
          <CommonTextUnderline
            ref="AboutTitleLine-01"
            modifier="about"
            :start="0.60"
            :rotate="rotateLeft"
          ></CommonTextUnderline>
          <span class="about-title-read-area">
            <CommonSectionReadTitle
              ref="commonSectionReadTitle-01"
              modifier="section"
              :start="0"
              :text="['・', 'ABOUT']"
            ></CommonSectionReadTitle>
          </span>
          <span class="about-title-wrapper about-title-wrapper-01">
            <CommonTextSegment
              ref="commonTextSegment-01"
              :start="0"
              :rotate="rotateRight"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing"
            >
            </CommonTextSegment>
          </span>
          <span class="about-title-wrapper about-title-wrapper-02">
            <CommonTextSegment
              ref="commonTextSegment-02"
              :start="0.12"
              :rotate="rotateLeft"
              text="elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
            >
            </CommonTextSegment>
          </span>
          <span class="about-title-wrapper about-title-wrapper-03">
            <CommonTextSegment
              ref="commonTextSegment-03"
              :start="0.24"
              :rotate="rotateRight"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lore"
            >
            </CommonTextSegment>
          </span>
          <span class="about-title-wrapper about-title-wrapper-04">
            <CommonTextSegment
              ref="commonTextSegment-04"
              :start="0.36"
              :rotate="rotateLeft"
              text="m ipsum dolor sit amet, consectetur adipiscing elit,"
            >
            </CommonTextSegment>
          </span>
        </h2>
        <p class="about-read-text">
          <CommonSectionReadTitle
            ref="commonSectionReadTitle-02"
            :start="0.48"
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
  data: () => {
    return {
      rotateRight: 0,
      rotateLeft: 0,
    }
  },
  beforeMount() {
    this.rotateRight = this.$baseAnimationConfig.rotate
    this.rotateLeft = -this.$baseAnimationConfig.rotate
  },
  mounted() {
    this.init()

    /* text-animation */
    const observe = this.$refs.AboutTitleTrigger;
    const iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.commonTextSegmentArray.map((text) => text.toCenter());
            this.aboutTitleLineArray.map((line) => line.extend());
            iObserver.unobserve(observe)
          }
        })
      },
      { rootMargin: '0%' }
    )
    iObserver.observe(observe)
  },

  methods: {
    init: function () {
      this.commonTextSegmentArray = [];
      for (let i = 1; i < 2 + 1; i++) {
        const commonSectionReadTitleArray = this.$refs['commonSectionReadTitle-0' + i];
        for (let i = 0; i < commonSectionReadTitleArray.$children.length; i++) {
          this.commonTextSegmentArray.push(commonSectionReadTitleArray.$children[i]);
        }
      }
      for (let i = 1; i < 4 + 1; i++) {
        this.commonTextSegmentArray.push(this.$refs['commonTextSegment-0' + i])
      }
      for (let i = 0; i < this.commonTextSegmentArray.length; i++) {
        this.commonTextSegmentArray[i].init()
      }

      this.aboutTitleLineArray = []
      for (let i = 1; i < 1 + 1; i++) {
        this.aboutTitleLineArray.push(this.$refs['AboutTitleLine-0' + i]);
      }
      for (let i = 0; i < this.aboutTitleLineArray.length; i++) {
        this.aboutTitleLineArray[i].init()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.about-inner {
  padding: 333px 0 258px 0;
}

.about-title {
  position: relative;
  width: vw(1090);
  margin: 0 0 85px 0;
  padding: 0 56px 0 40px;
  color: $darkBlue;
  font-size: vw(80);
  font-family: 'Six Caps', sans-serif;
  text-transform: uppercase;

  @include tab {
    padding: 0 vw(56) 0 vw(40);
  }
}

.about-title-read-area {
  position: absolute;
  top: -4px;
  left: 42px;
  color: $white;
}

.about-title-wrapper {
  display: block;
  text-align: right;
}

.about-title-wrapper-01 {
  padding: 0 0 0 vw(156);
}

.about-read-text{
  width: vw(1090);
  color: $darkBlue;
  padding: 0 56px 0 40px;
  font-size: 12px;
  text-align: right;
  letter-spacing: 0.02em;

  @include tab {
    padding: 0 vw(56) 0 vw(40);
  }
}
</style>
