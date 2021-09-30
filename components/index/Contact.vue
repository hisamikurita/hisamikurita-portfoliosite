<template>
  <div ref="Contact" class="contact">
    <div class="contact-bg">
      <div class="contact-inner">
        <div class="l-container">
          <h2 class="contact-title">
            <span class="contact-title-read-area">
              <CommonSectionReadTitle
                ref="commonSectionReadTitle-01"
                modifier="section"
                :start="0"
                :text="['・', 'SAY HI']"
              ></CommonSectionReadTitle>
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-01">
              <CommonTextSegment
                ref="commonTextSegment-01"
                :start="0"
                :rotate="rotateRight"
                text="I AM CREATIVE DEVELOPER"
              >
              </CommonTextSegment>
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-02">
              <CommonTextSegment
                ref="commonTextSegment-02"
                :start="0.12"
                :rotate="rotateLeft"
                text="FOCUSED ON CREATING THINGS"
              >
              </CommonTextSegment>
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-03">
              <CommonTextSegment
                ref="commonTextSegment-03"
                :start="0.24"
                :rotate="rotateRight"
                text="WITH INTERACTION & ANIMATION"
              >
              </CommonTextSegment>
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-04">
              <CommonTextSegment
                ref="commonTextSegment-04"
                :start="0.36"
                :rotate="rotateLeft"
                text="AS MY MAIN FOCUS."
              >
              </CommonTextSegment>
            </span>
          </h2>
          <div class="contact-info-area">
            <div class="contact-info-index-area">
              <span class="contact-info-index">
                <CommonSectionReadTitle
                  ref="commonSectionReadTitle-02"
                  modifier="contact-section"
                  :start="0.48"
                  :text="['・', 'INDEX']"
                ></CommonSectionReadTitle>
              </span>
              <span class="">
                <CommonSectionReadTitle
                  ref="commonSectionReadTitle-03"
                  :start="0.48"
                  :text="['M-TRUST', 'KETAMUKUMA', 'NLPLUS', 'REDANDGREEN', 'ASOVISION', 'BASTA', 'FRONTIER' ,'YAKUDOU','ARCHIVE']"
                ></CommonSectionReadTitle>
              </span>
            </div>
            <div class="contact-info-name-area">
              <p class="contact-name">
                <CommonTextSegment
                  ref="commonTextSegment-05"
                  :start="0.48"
                  :rotate="rotateRight"
                  text="HISAMI KURITA"
                >
                </CommonTextSegment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      delay: [0, 0.176, 0.4, 0.42],
      rotateRight: 0,
      rotateLeft: 0,
    }
  },
  beforeMount(){
    this.rotateRight = this.$baseAnimationConfig.rotate;
    this.rotateLeft = -this.$baseAnimationConfig.rotate;
  },
    mounted() {
    this.init()

    /* text-animation */
    const observe = this.$refs.Contact;
    const iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.commonTextSegmentArray.map((text) => text.toCenter());
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
      for (let i = 1; i < 3 + 1; i++) {
        const commonSectionReadTitleArray = this.$refs['commonSectionReadTitle-0' + i];
        for (let i = 0; i < commonSectionReadTitleArray.$children.length; i++) {
          this.commonTextSegmentArray.push(commonSectionReadTitleArray.$children[i]);
        }
      }
      for (let i = 1; i < 5 + 1; i++) {
        this.commonTextSegmentArray.push(this.$refs['commonTextSegment-0' + i])
      }
      for (let i = 0; i < this.commonTextSegmentArray.length; i++) {
        this.commonTextSegmentArray[i].init()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.contact-bg {
  background-color: $thinPink;
}
.contact-inner {
  //
}

.contact-title{
  position: relative;
  margin: 0 0 140px 0;
  color: $darkPink;
  font-size: vw(180);
  font-family: 'Six Caps', sans-serif;
}

.contact-title-read-area {
  position: absolute;
  top: 8px;
  left: 2px;
  color: $white;
}

.contact-title-wrapper{
  display: block;
}

.contact-title-wrapper-01{
  padding: 0 0 0 290px;

  @include tab {
      padding: 0 0 0 vw(290);
  }
}

.contact-title-wrapper-02{
  padding: 0 0 0 33px;
}

.contact-title-wrapper-04{
  padding: 0 0 0 40px;
}

.contact-info-area{
  display: flex;
}

.contact-info-index-area{
  margin: 0 40px 0 0;
}

.contact-info-index{
  display: block;
  margin: 0 0 56px 0;
}

.contact-name{
  margin: -26px 0 0 0;
  color: $darkPink;
  font-size: vw(400);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: -0.02em;
}

</style>