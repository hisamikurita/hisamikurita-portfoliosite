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
      wheelInterval: 1.1,
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
    this.$asscroll.on('scroll', this.pickupEnterScroll);

    // let isAnimtion = false;
    // const interval = 1.2;
    // const wheelRatio = 20;

    window.addEventListener('wheel', (e) => {
      e.preventDefault();

      if(this.isWheelAnimation || !this.isPickupSection) return;

      // console.log(e.deltaY)

      if(e.deltaY > this.wheelRatio){
        this.pickupSectionCurrentNum += 1.0;
        this.pickupSceneManager();
      // console.log(this.pickupSectionCurrentNum)
        this.disable();
      }
      else if(e.deltaY < -this.wheelRatio){
        this.pickupSectionCurrentNum += -1.0;
        this.pickupSceneManager();
      // console.log(this.pickupSectionCurrentNum)
        this.disable();
      }

      // this.isWheelAnimation = true;
      // setTimeout(() =>{
      //   this.isWheelAnimation = false;
      // },this.pickupSectionCurrentNum === 1 ? this.wheelInterval * 1000 : this.wheelInterval * 2000);
    }, { passive: false })
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

    pickupEnterScroll() {
      if (this.isPickupSectionEnter) return

      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupTopPos = pickupPos - window.innerHeight
      if (this.$asscroll.targetPos >= pickupTopPos) {
        this.$asscroll.disable({ inputOnly: true });
        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$baseAnimationConfig.duration,
          ease: 'none',
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete:() =>{
            this.isPickupSection = true;
            this.pickupSectionCurrentNum = 1.0;
            this.pickupSceneManager();
            this.disable();
          }
        });
        this.isPickupSectionEnter = true;
      }
    },

    pickupSceneManager(){
      switch (this.pickupSectionCurrentNum) {
        case 1.0:
          for (let i = 0; i < this.commonTextSegmentArray01.length; i++) {
            this.commonTextSegmentArray01[i].toCenter()
          }
          break;
        case 2.0:
          for (let i = 0; i < this.commonTextSegmentArray01.length; i++) {
            this.commonTextSegmentArray01[i].toTop()
          }
          setTimeout(()=>{
            for (let i = 0; i < this.commonTextSegmentArray02.length; i++) {
              this.commonTextSegmentArray02[i].toCenter()
            }
          },1000);
          break;
        case 3.0:
          for (let i = 0; i < this.commonTextSegmentArray02.length; i++) {
            this.commonTextSegmentArray02[i].toTop()
          }
          setTimeout(()=>{
            for (let i = 0; i < this.commonTextSegmentArray03.length; i++) {
              this.commonTextSegmentArray03[i].toCenter()
            }
          },1000);
          break;
      }
    },

    disable(){
      this.isWheelAnimation = true;
      setTimeout(() =>{
        this.isWheelAnimation = false;
      },this.pickupSectionCurrentNum === 1 ? this.wheelInterval * 1000 : this.wheelInterval * 2000);
    }
  },
}
</script>

<style scoped lang="scss">
.pickup-bg {
  background-color: #55b1ff;
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