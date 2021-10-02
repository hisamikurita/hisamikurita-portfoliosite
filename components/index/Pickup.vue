<template>
  <div ref="Pickup" class="pickup">
    <div class="pickup-bg">
      <div class="pickup-inner">
        <div class="l-container">
          <h2 class="pickup-title">
            <span class="pickup-title-wrapper pickup-title-wrapper-01">
              <CommonTextSegment
                :state="isTextSegmentState01"
                :start="0"
                :rotate="rotateRight"
                text="M-TRUST CO.,LTD. IS"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState01"
                :start="0.12"
                :rotate="rotateLeft"
                text="A COMPANY WITH HIGH-SKILLED"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState01"
                :start="0.24"
                :rotate="rotateRight"
                text="PROFESSIONALS WHO"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState01"
                :start="0.36"
                :rotate="rotateLeft"
                text="SOLVE SOCIAL ISSUES FROM"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState01"
                :start="0.48"
                :rotate="rotateRight"
                text="THE REAL ESTATE BUSINESS."
              >
              </CommonTextSegment>
            </span>
            <span class="pickup-title-wrapper pickup-title-wrapper-02">
              <CommonTextSegment
                :state="isTextSegmentState02"
                :start="0"
                :rotate="rotateRight"
                text="JAPANESE CHARACTER"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState02"
                :start="0.12"
                :rotate="rotateLeft"
                text="KETAKUMA,"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState02"
                :start="0.24"
                :rotate="rotateRight"
                text="A BEAR WHO LIVES"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState02"
                :start="0.36"
                :rotate="rotateLeft"
                text="FOR MOVING GGRESSIVELY,"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState02"
                :start="0.48"
                :rotate="rotateRight"
                text="AND HIS FRIEND KETAWAN."
              >
              </CommonTextSegment>
            </span>
            <span class="pickup-title-wrapper pickup-title-wrapper-03">
              <CommonTextSegment
                :state="isTextSegmentState03"
                :start="0"
                :rotate="rotateRight"
                text="NLPLUS IS"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState03"
                :start="0.12"
                :rotate="rotateLeft"
                text="A SOLUTIONS COMPANY"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState03"
                :start="0.24"
                :rotate="rotateRight"
                text="THAT PROVIDES SERVICES"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState03"
                :start="0.36"
                :rotate="rotateLeft"
                text="SUCH AS “FIRST WEB” AND “LOCCO”"
              >
              </CommonTextSegment>
              <CommonTextSegment
                :state="isTextSegmentState03"
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
      isPickupSectionEnter: false,
      pickupSectionCurrentNum: 0,
      isWheelAnimation: false,
      wheelInterval: 1.0,
      wheelRatio: 5,
      isTextSegmentState01: '',
      isTextSegmentState02: '',
      isTextSegmentState03: '',
      scroll: { value: 0 },
    }
  },

  mounted() {
    this.$asscroll.on('update', this.pickupToTopEnterScroll)
    window.addEventListener('wheel',(e) => {e.preventDefault()},{ passive: false });
  },

  beforeDestroy() {
    this.$asscroll.off('update', this.pickupToTopEnterScroll)
    window.removeEventListener('wheel', this.pickupSceneManager, {passive: false,});
  },

  methods: {
    pickupToTopEnterScroll() {
      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupTopPos = pickupPos - window.innerHeight

      if (this.$asscroll.targetPos > pickupTopPos) {
        this.$asscroll.off('update', this.pickupToTopEnterScroll)
        this.$asscroll.disable({ inputOnly: true })

        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$baseAnimationConfig.duration,
          ease: this.$easing.transform,
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete: () => {
            this.pickupSceneNext()
            this.disable(1000)

            window.addEventListener('wheel', this.pickupSceneManager, {
              passive: false,
            })
          },
        })
      }
    },

    pickupToTopLeaveScroll() {
      window.removeEventListener('wheel', this.pickupSceneManager, {
        passive: false,
      })

      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupTopPos = pickupPos - window.innerHeight
      this.$gsap.to(this.scroll, {
        value: pickupTopPos,
        duration: this.$baseAnimationConfig.duration,
        ease: this.$easing.transform,
        onUpdate: () => {
          this.$asscroll.scrollTo(this.scroll.value)
        },
        onComplete: () => {
          setTimeout(() => {
            this.$asscroll.on('update', this.pickupToTopEnterScroll)
            this.$asscroll.enable()
          }, 100)
        },
      })
    },

    pickupToBottomEnterScroll() {
      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupBottomPos = pickupPos + window.innerHeight

      if (this.$asscroll.targetPos < pickupBottomPos) {
        this.$asscroll.off('update', this.pickupToBottomEnterScroll)
        this.$asscroll.disable({ inputOnly: true })

        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$baseAnimationConfig.duration,
          ease: this.$easing.transform,
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete: () => {
            this.pickupScenePrev()
            this.disable(1000)

            window.addEventListener('wheel', this.pickupSceneManager, {
              passive: false,
            })
          },
        })
      }
    },

    pickupToBottomLeaveScroll() {
      window.removeEventListener('wheel', this.pickupSceneManager, {
        passive: false,
      })

      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupBottomPos = pickupPos + window.innerHeight
      this.$gsap.to(this.scroll, {
        value: pickupBottomPos,
        duration: this.$baseAnimationConfig.duration,
        ease: this.$easing.transform,
        onUpdate: () => {
          this.$asscroll.scrollTo(this.scroll.value)
        },
        onComplete: () => {
          setTimeout(() => {
            this.$asscroll.enable()
            this.$asscroll.on('update', this.pickupToBottomEnterScroll)
          }, 100)
        },
      })
    },

    pickupSceneNext() {
      this.pickupSectionCurrentNum += 1.0

      switch (this.pickupSectionCurrentNum) {
        case 1.0:
          this.isTextSegmentState01 = 'center'
          break
        case 2.0:
          this.isTextSegmentState01 = 'top'
          setTimeout(() => {
            this.isTextSegmentState02 = 'center'
          }, this.wheelInterval * 1000)
          break
        case 3.0:
          this.isTextSegmentState02 = 'top'
          setTimeout(() => {
            this.isTextSegmentState03 = 'center'
          }, this.wheelInterval * 1000)
          break
        case 4.0:
          this.pickupToBottomLeaveScroll()
          this.isTextSegmentState03 = 'top'
          break
      }
    },

    pickupScenePrev() {
      this.pickupSectionCurrentNum += -1.0

      switch (this.pickupSectionCurrentNum) {
        case 0.0:
          this.pickupToTopLeaveScroll()
          this.isTextSegmentState01 = 'bottom'
          break
        case 1.0:
          this.isTextSegmentState02 = 'bottom'
          setTimeout(() => {
            this.isTextSegmentState01 = 'center'
          }, this.wheelInterval * 1000)
          break
        case 2.0:
          this.isTextSegmentState03 = 'bottom'
          setTimeout(() => {
            this.isTextSegmentState02 = 'center'
          }, this.wheelInterval * 1000)
          break
        case 3.0:
          this.isTextSegmentState03 = 'center'
          break
      }
    },

    pickupSceneManager(e) {
      if (this.isWheelAnimation) return

      if (e.deltaY > this.wheelRatio) {
        this.pickupSceneNext()
        this.disable()
      } else if (e.deltaY < -this.wheelRatio) {
        this.pickupScenePrev()
        this.disable()
      }
    },

    disable(interval = 2000) {
      this.isWheelAnimation = true
      setTimeout(() => {
        this.isWheelAnimation = false
      }, interval)
    },
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

.pickup-title-wrapper {
  position: absolute;
  top: 50%;
  left: 45.4%;
  transform: translate3d(-50%, -50%, 0);
  font-size: vw(126);
  font-family: 'Six Caps', sans-serif;
  text-align: center;
}

.pickup-title-wrapper-01 {
  color: $darkBlue;
}

.pickup-title-wrapper-02 {
  color: $purple;
}

.pickup-title-wrapper-03 {
  color: $darkPink;
}
</style>