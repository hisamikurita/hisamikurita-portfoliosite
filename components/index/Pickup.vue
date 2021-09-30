<template>
  <div ref="Pickup" class="pickup">
    <div class="pickup-bg">
      <div class="pickup-inner">
        <div class="l-container">
          <h2 class="pickup-title">
            <span class="pickup-title-wrapper pickup-title-wrapper-01">
              <CommonTextSegment
                ref="commonTextSegment-01-01"
                :start="0"
                :rotate="rotateRight"
                text="M-TRUST CO.,LTD. IS"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-01-02"
                :start="0.12"
                :rotate="rotateLeft"
                text="A COMPANY WITH HIGH-SKILLED"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-01-03"
                :start="0.24"
                :rotate="rotateRight"
                text="PROFESSIONALS WHO"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-01-04"
                :start="0.36"
                :rotate="rotateLeft"
                text="SOLVE SOCIAL ISSUES FROM"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-01-05"
                :start="0.48"
                :rotate="rotateRight"
                text="THE REAL ESTATE BUSINESS."
              >
              </CommonTextSegment>
            </span>
            <span class="pickup-title-wrapper pickup-title-wrapper-02">
              <CommonTextSegment
                ref="commonTextSegment-02-01"
                :start="0"
                :rotate="rotateRight"
                text="JAPANESE CHARACTER"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-02-02"
                :start="0.12"
                :rotate="rotateLeft"
                text="KETAKUMA,"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-02-03"
                :start="0.24"
                :rotate="rotateRight"
                text="A BEAR WHO LIVES"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-02-04"
                :start="0.36"
                :rotate="rotateLeft"
                text="FOR MOVING GGRESSIVELY,"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-02-05"
                :start="0.48"
                :rotate="rotateRight"
                text="AND HIS FRIEND KETAWAN."
              >
              </CommonTextSegment>
            </span>
            <span class="pickup-title-wrapper pickup-title-wrapper-03">
              <CommonTextSegment
                ref="commonTextSegment-03-01"
                :start="0"
                :rotate="rotateRight"
                text="NLPLUS IS"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-03-02"
                :start="0.12"
                :rotate="rotateLeft"
                text="A SOLUTIONS COMPANY"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-03-03"
                :start="0.24"
                :rotate="rotateRight"
                text="THAT PROVIDES SERVICES"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-03-04"
                :start="0.36"
                :rotate="rotateLeft"
                text="SUCH AS “FIRST WEB” AND “LOCCO”"
              >
              </CommonTextSegment>
              <CommonTextSegment
                ref="commonTextSegment-03-05"
                :start="0.48"
                :rotate="rotateRight"
                text="TO SOLVE PROBLEMS USING ICT."
              >
              </CommonTextSegment>
            </span>
          </h2>
        </div>
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
      isPickupSectionEnter: false,
      isPickupSection: false,
      pickupSectionCurrentNum: 0,
      isWheelAnimation: false,
      wheelInterval: 1.0,
      wheelRatio: 5,
      scroll: { value: 0 },
    }
  },
  beforeMount() {
    this.rotateRight = this.$baseAnimationConfig.rotate
    this.rotateLeft = -this.$baseAnimationConfig.rotate
  },
  mounted() {
    this.init();
    this.$asscroll.on('update', this.pickupToTopEnterScroll);

    window.addEventListener('wheel',(e)=>{
      e.preventDefault();
    }, { passive: false })
  },
  beforeDestroy() {
    this.$asscroll.off('update', this.pickupToTopEnterScroll);
    window.removeEventListener('wheel', this.pickupSceneManager, { passive: false });
  },
  methods: {
    init(){
      this.commonTextSegmentArray01 = [];
      for (let i = 1; i < 5 + 1; i++) {
        this.commonTextSegmentArray01.push(this.$refs['commonTextSegment-01-0' + i])
      }
      for (let i = 0; i < this.commonTextSegmentArray01.length; i++) {
        this.commonTextSegmentArray01[i].init()
      }

      this.commonTextSegmentArray02 = [];
      for (let i = 1; i < 5 + 1; i++) {
        this.commonTextSegmentArray02.push(this.$refs['commonTextSegment-02-0' + i])
      }
      for (let i = 0; i < this.commonTextSegmentArray02.length; i++) {
        this.commonTextSegmentArray02[i].init()
      }

      this.commonTextSegmentArray03 = [];
      for (let i = 1; i < 5 + 1; i++) {
        this.commonTextSegmentArray03.push(this.$refs['commonTextSegment-03-0' + i])
      }
      for (let i = 0; i < this.commonTextSegmentArray03.length; i++) {
        this.commonTextSegmentArray03[i].init()
      }
    },

    pickupToTopEnterScroll() {
      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupTopPos = pickupPos - window.innerHeight

      if (this.$asscroll.targetPos > pickupTopPos) {
        this.$asscroll.off('update', this.pickupToTopEnterScroll);
        this.$asscroll.disable({ inputOnly: true });

        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$baseAnimationConfig.duration,
          ease: this.$easing.transform,
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete:() =>{
            this.pickupSceneNext();
            this.disable(1000);

            window.addEventListener('wheel', this.pickupSceneManager, { passive: false });
          }
        });
      }
    },

    pickupToTopLeaveScroll(){
      window.removeEventListener('wheel', this.pickupSceneManager, { passive: false });

      const pickupPos = this.$refs.Pickup.offsetTop;
      const pickupTopPos = pickupPos - window.innerHeight;
      this.$gsap.to(this.scroll, {
        value: pickupTopPos,
        duration: this.$baseAnimationConfig.duration,
        ease: this.$easing.transform,
        onUpdate: () => {
          this.$asscroll.scrollTo(this.scroll.value)
        },
        onComplete:() =>{
          setTimeout(()=>{
            this.$asscroll.on('update', this.pickupToTopEnterScroll);
            this.$asscroll.enable();
          },100)
        }
      });
    },

    pickupToBottomEnterScroll() {

      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupBottomPos = pickupPos + window.innerHeight

      if (this.$asscroll.targetPos < pickupBottomPos) {
        this.$asscroll.off('update', this.pickupToBottomEnterScroll);
        this.$asscroll.disable({ inputOnly: true });

        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$baseAnimationConfig.duration,
          ease: this.$easing.transform,
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete:() =>{
            this.pickupScenePrev();
            this.disable(1000);

            window.addEventListener('wheel', this.pickupSceneManager, { passive: false });
          }
        });
      }
    },

    pickupToBottomLeaveScroll() {
      // console.log(this.$asscroll.targetPos)
      // console.log(this.$asscroll.currentPos)
      window.removeEventListener('wheel', this.pickupSceneManager, { passive: false });

      const pickupPos = this.$refs.Pickup.offsetTop;
      const pickupBottomPos = pickupPos + window.innerHeight;
      this.$gsap.to(this.scroll, {
        value: pickupBottomPos,
        duration: this.$baseAnimationConfig.duration,
        ease: this.$easing.transform,
        onUpdate: () => {
          this.$asscroll.scrollTo(this.scroll.value)
        },
        onComplete:() =>{
          setTimeout(()=>{
            this.$asscroll.enable();
            this.$asscroll.on('update', this.pickupToBottomEnterScroll);
          },100)
        }
      });
    },

    pickupSceneNext(){
      this.pickupSectionCurrentNum += 1.0;

      switch (this.pickupSectionCurrentNum) {
        case 1.0:
          this.commonTextSegmentArray01.map((text) => text.toCenter());
          break;
        case 2.0:
          this.commonTextSegmentArray01.map((text) => text.toTop());
          setTimeout(()=>{
            this.commonTextSegmentArray02.map((text) => text.toCenter());
          },this.wheelInterval * 1000);
          break;
        case 3.0:
          this.commonTextSegmentArray02.map((text) => text.toTop());
          setTimeout(()=>{
            this.commonTextSegmentArray03.map((text) => text.toCenter());
          },this.wheelInterval * 1000);
          break;
        case 4.0:
            this.pickupToBottomLeaveScroll();
            this.commonTextSegmentArray03.map((text) => text.toTop());
          break;
      }
    },

    pickupScenePrev(){
      this.pickupSectionCurrentNum += -1.0;

      switch (this.pickupSectionCurrentNum) {
        case 0.0:
            this.pickupToTopLeaveScroll();
            this.commonTextSegmentArray01.map((text) => text.toBottom());
          break;
        case 1.0:
          this.commonTextSegmentArray02.map((text) => text.toBottom());
          setTimeout(()=>{
            this.commonTextSegmentArray01.map((text) => text.toCenter());
          },this.wheelInterval * 1000);
          break;
        case 2.0:
          this.commonTextSegmentArray03.map((text) => text.toBottom());
          setTimeout(()=>{
            this.commonTextSegmentArray02.map((text) => text.toCenter());
          },this.wheelInterval * 1000);
          break;
        case 3.0:
          this.commonTextSegmentArray03.map((text) => text.toCenter());
          break;
      }
    },

    pickupSceneManager(e){
      if(this.isWheelAnimation) return;

      if(e.deltaY > this.wheelRatio){
        this.pickupSceneNext();
        this.disable();
      }
      else if(e.deltaY < -this.wheelRatio){
        this.pickupScenePrev();
        this.disable();
      }
    },

    disable(interval = 2000){
      this.isWheelAnimation = true;
      setTimeout(() =>{
        this.isWheelAnimation = false;
      },interval);
    }
  },
}
</script>

<style scoped lang="scss">
.pickup-bg {
  background-color: #000;
}
.pickup-inner {
  position: relative;
  height: 100vh;
}

.pickup-title-wrapper{
  position: absolute;
  top: 50%;
  left: 45.4%;
  transform: translate3d(-50%, -50%, 0);
  font-size: vw(126);
  font-family: 'Six Caps', sans-serif;
  text-align: center;
}

.pickup-title-wrapper-01{
  color: $darkBlue;
}

.pickup-title-wrapper-02{
  color: $purple;
}

.pickup-title-wrapper-03{
  color: $darkPink;
}
</style>