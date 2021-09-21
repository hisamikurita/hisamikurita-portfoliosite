<template>
  <div ref="Pickup" class="pickup">
    <div class="pickup-bg">
      <div class="pickup-inner">
        <div class="l-container">
          <h2 class="pickup-title">
            <span class="pickup-title-01">
              <CommonTextSegment
                start="0"
                rotate="rotate-right"
                text="M-TRUST CO.,LTD. IS"
              >
              </CommonTextSegment>
              <CommonTextSegment
                start="0"
                rotate="rotate-left"
                text="A COMPANY WITH HIGH-SKILLED"
              >
              </CommonTextSegment>
              <CommonTextSegment
                start="0"
                rotate="rotate-right"
                text="PROFESSIONALS WHO"
              >
              </CommonTextSegment>
              <CommonTextSegment
                start="0"
                rotate="rotate-left"
                text="SOLVE SOCIAL ISSUES FROM"
              >
              </CommonTextSegment>
              <CommonTextSegment
                start="0"
                rotate="rotate-right"
                text="THE REAL ESTATE BUSINESS."
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
      isPickupSection: false,
      pickupSectionCurrentNum: 0,
      scroll: { value: 0 },
    }
  },
  watch: {
    pickupSectionCurrentNum(){
      console.log('発火')
      // this.pickupSectionCurrentNum = 2.0;
    }
  },
  mounted() {
    this.$asscroll.on('scroll', this.pickupEnterScroll);

    window.addEventListener('wheel', (e) => {
      e.preventDefault();

      console.log(e.deltaY)
    }, { passive: false })
  },
  methods: {
    pickupEnterScroll() {
      console.log(this.$asscroll.targetPos)
      console.log(this.$refs.Pickup.offsetTop - window.innerHeight)

      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupTopPos = pickupPos - window.innerHeight
      if (this.$asscroll.targetPos >= pickupTopPos) {
        if (this.isPickupSection) return

        this.$asscroll.disable({ inputOnly: true })
        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$duration,
          ease: 'none',
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete:() =>{
            this.pickupSectionCurrentNum = 1.0;
          }
        })
        this.isPickupSection = true
      }
    },
  },
}
</script>

<style scoped lang="scss">
.pickup-bg {
  background-color: #55b1ff;
}
.pickup-inner {
  height: 100vh;
}

.pickup-title {
  position: relative;
  font-size: vw(120);
  font-family: 'Six Caps', sans-serif;
  text-align: center;
  letter-spacing: -0.002em;
}
</style>