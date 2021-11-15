<template>
  <div
    ref="Pickup"
    class="pickup"
    :class="{ 'is-enter': isPickupSectionEnter }"
  >
    <span ref="PickupCircleEnter" class="pickup-circle-bg-enter"></span>
    <span class="pickup-circle-bg-area">
      <CommonCircleBg :state="isCircleBgState02" modifier="pickup-02">
      </CommonCircleBg>
      <CommonCircleBg :state="isCircleBgState03" modifier="pickup-03">
      </CommonCircleBg>
      <!-- <CommonCircleBg :state="isCircleBgState04" modifier="pickup-04">
      </CommonCircleBg> -->
    </span>
    <div class="pickup-bg">
      <div class="pickup-inner">
        <div class="l-container">
          <div class="pickup-clip">
            <p class="pickup-section-number">
              <span
                v-for="num in 3"
                :key="num.id"
                class="pickup-section-number-wrapper"
                :class="'pickup-section-number-wrapper' + num"
              >
                <CommonSectionReadTitle
                  modifier="pickup-section"
                  :state="isTextSegmentState[num]"
                  :start="0"
                  :text="['・', 'SELECTED', 'PROJECT', '0' + num]"
                ></CommonSectionReadTitle>
              </span>
            </p>
            <p class="pickup-section-text">
              <span
                v-for="(data, index) in pickupData"
                :key="data.id"
                class="pickup-section-text-wrapper"
                :class="'pickup-section-text-wrapper-0' + Number(index + 1)"
              >
                <span class="pickup-section-text-title">
                  <CommonTextSegment
                    :state="isTextSegmentState[Number(index + 1)]"
                    :start="0"
                    :rotate="rotateLeft"
                    :text="data.title"
                  >
                  </CommonTextSegment>
                </span>
                <span>
                  <CommonSectionReadTitle
                    :state="isTextSegmentState[Number(index + 1)]"
                    :start="0.12"
                    :text="data.pickupDescArray"
                  >
                  </CommonSectionReadTitle>
                </span>
              </span>
            </p>
            <h2 class="pickup-title">
              <span
                v-for="(data, index) in pickupData"
                :key="data.id"
                class="pickup-title-wrapper"
                :class="'pickup-title-wrapper-0' + Number(index + 1)"
              >
                <span
                  v-for="(text, tIndex) in data.pickupTextArray"
                  :key="text.id"
                >
                  <CommonTextSegment
                    :state="isTextSegmentState[Number(index + 1)]"
                    :start="tIndex * 0.12"
                    :rotate="tIndex % 2 != 0 ? rotateLeft : rotateRight"
                    :text="text"
                  >
                  </CommonTextSegment>
                </span>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pickupData from '@/assets/json/pickup.json'

export default {
  data: () => {
    return {
      pickupData: pickupData,
      isPickupSectionEnter: false,
      pickupSectionCurrentNum: 0,
      isScrollAnimation: false,
      wheelInterval: 1.0,
      wheelRatio: 5,
      touchRatio: 50,
      prevTouchY: 0,
      isTextSegmentState: {
        1: '',
        2: '',
        3: '',
      },
      isCircleBgState02: '',
      isCircleBgState03: '',
      isCircleBgState04: '',
      scroll: { value: 0 },
    }
  },

  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
    indexPickupState: function () {
      return this.$store.getters['indexPickup/state']
    },
    indexPickupPos: function () {
      return this.$store.getters['indexPickup/pos']
    },
  },

  mounted() {
    this.$gsap.ticker.add(this.pickupToTopEnterScroll);
  },

  beforeDestroy() {
    this.$store.commit('indexPickup/leave')
    this.$gsap.ticker.remove(this.pickupToTopEnterScroll);
    this.$gsap.ticker.remove(this.pickupToBottomEnterScroll);
    window.removeEventListener('touchstart', this.setTouchY);
    window.removeEventListener('touchmove', this.pickupSceneTouchManager);
    window.removeEventListener('wheel', this.pickupSceneWheelManager, { passive: false,})
    window.removeEventListener('resize', this.pickupResize);
  },

  methods: {
    /**
     * ピックアップセクションに上から侵入する時
     */
    pickupToTopEnterScroll() {

      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupTopPos = pickupPos - window.innerHeight

      if (this.$asscroll.targetPos > pickupTopPos) {
        this.$store.commit('indexPickup/enter')
        this.$store.commit('indexPickup/setPickupPos', pickupPos)
        this.$gsap.ticker.remove(this.pickupToTopEnterScroll);

        /**
         * asscrollが有効な時
         */
        if (!this.$checkDevice.isTouch()) {
          this.$asscroll.disable({ inputOnly: true })
        }
        this.disable(this.$baseAnimationConfig.duration * 2000)

        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$baseAnimationConfig.duration,
          ease: this.$easing.transform,
          onUpdate: () => {
            /**
             * asscrollが有効な時
             */
            if (!this.$checkDevice.isTouch()) {
              this.$asscroll.scrollTo(this.scroll.value)
            }
            /**
             * asscrollが無効な時
             */
            else{
              window.scrollTo({ top: this.scroll.value })
            }
          },
          onComplete: () => {
            this.pickupSceneNext()
            this.disable(1000)
            setTimeout(() => {
              this.isPickupSectionEnter = true
            }, 500)

            /**
             * asscrollが無効な時
             */
            if (this.$checkDevice.isTouch()) {
              this.$backfaceScroll(false);
            }
            window.addEventListener('touchstart', this.setTouchY);
            window.addEventListener('touchmove', this.pickupSceneTouchManager);
            window.addEventListener('wheel', this.pickupSceneWheelManager, { passive: false })
            window.addEventListener('resize', this.pickupResize);
          },
        })

        if (this.$siteConfig.isPc) {
            this.$gsap.to(this.$refs.PickupCircleEnter, {
            duration: this.$baseAnimationConfig.duration * 1.2,
            ease: this.$easing.transform,
            delay: 0.2,
            y: window.innerHeight / 2,
            scale: Math.max(window.innerWidth, window.innerHeight) / 54.0,
          })
        }
        else{
            this.$gsap.to(this.$refs.PickupCircleEnter, {
            duration: this.$baseAnimationConfig.duration * 1.2,
            ease: this.$easing.transform,
            delay: 0.2,
            scale: 1,
          })
        }
      }
    },

    /**
     * ピックアップセクションの上から離れる時
     */
    pickupToTopLeaveScroll() {

      this.$store.commit('indexPickup/leave')
      this.isPickupSectionEnter = false;
      /**
       * asscrollが無効な時
       */
      if (this.$checkDevice.isTouch()) {
        this.$backfaceScroll(true);
      }
      window.removeEventListener('touchstart', this.setTouchY);
      window.removeEventListener('touchmove', this.pickupSceneTouchManager);
      window.removeEventListener('wheel', this.pickupSceneWheelManager, { passive: false,})
      window.removeEventListener('resize', this.pickupResize);
      this.disable(this.$baseAnimationConfig.duration * 2000)

      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupTopPos = pickupPos - window.innerHeight

      this.$gsap.to(this.scroll, {
        value: pickupTopPos,
        duration: this.$checkDevice.isTouch() ? this.$baseAnimationConfig.duration * 1.5 : this.$baseAnimationConfig.duration,
        ease: this.$easing.transform,
        onUpdate: () => {
          /**
           * asscrollが有効な時
           */
          if (!this.$checkDevice.isTouch()) {
            this.$asscroll.scrollTo(this.scroll.value)
          }
          /**
           * asscrollが無効な時
           */
          else{
            window.scrollTo({ top: this.scroll.value })
          }
        },
        onComplete: () => {
          setTimeout(() => {
            this.$gsap.ticker.add(this.pickupToTopEnterScroll);
            /**
             * asscrollが有効な時
             */
            if (!this.$checkDevice.isTouch()) {
              this.$asscroll.enable()
            }
          }, 100)
        },
      })

      if (this.$siteConfig.isPc) {
        this.$gsap.to(this.$refs.PickupCircleEnter, {
          duration: this.$baseAnimationConfig.duration * 1.2,
          ease: this.$easing.transform,
          delay: 0.2,
          y: 0,
          scale: 1,
        })
      }
      else{
        this.$gsap.to(this.$refs.PickupCircleEnter, {
          duration: this.$baseAnimationConfig.duration * 1.2,
          ease: this.$easing.transform,
          delay: 0.2,
          scale: 0,
        })
      }
    },

    /**
     * ピックアップセクションに下から侵入する時
     */
    pickupToBottomEnterScroll() {
      if (this.hambergerMenuState) return;

      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupBottomPos = pickupPos + window.innerHeight

      if (this.$asscroll.targetPos < pickupBottomPos) {
        this.$store.commit('indexPickup/enter')
        this.$store.commit('indexPickup/setPickupPos', pickupPos)
        this.$store.commit('indexPickup/setProjectAnimationState','end')
        this.$gsap.ticker.remove(this.pickupToBottomEnterScroll);
        /**
         * asscrollが有効な時
         */
        if (!this.$checkDevice.isTouch()) {
          this.$asscroll.disable({ inputOnly: true })
        }
        this.disable(this.$baseAnimationConfig.duration * 2000)

        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$checkDevice.isTouch() ? this.$baseAnimationConfig.duration * 1.5 : this.$baseAnimationConfig.duration,
          ease: this.$easing.transform,
          onUpdate: () => {
            /**
             * asscrollが有効な時
             */
            if (!this.$checkDevice.isTouch()) {
              this.$asscroll.scrollTo(this.scroll.value)
            }
            /**
             * asscrollが無効な時
             */
            else{
              window.scrollTo({ top: this.scroll.value })
            }
          },
          onComplete: () => {
            this.pickupScenePrev()
            this.disable(1000)

            /**
             * asscrollが無効な時
             */
            if (this.$checkDevice.isTouch()) {
              this.$backfaceScroll(false);
            }

            window.addEventListener('touchstart', this.setTouchY);
            window.addEventListener('touchmove', this.pickupSceneTouchManager);
            window.addEventListener('wheel', this.pickupSceneWheelManager, { passive: false })
            window.addEventListener('resize', this.pickupResize);
          },
        });

        /**
         * 下から侵入する時にサイズと位置を更新する
         */
        if (this.$siteConfig.isPc) {
          this.$gsap.set(this.$refs.PickupCircleEnter, {
            y: window.innerHeight / 2,
            scale: Math.max(window.innerWidth, window.innerHeight) / 54.0,
          })
        }
      }
    },

    /**
     * ピックアップセクションの下に離れる時
     */
    pickupToBottomLeaveScroll() {
      this.$store.commit('indexPickup/leave')
      /**
       * asscrollが無効な時
       */
      if (this.$checkDevice.isTouch()) {
        this.$backfaceScroll(true);
      }
      window.removeEventListener('touchstart', this.setTouchY);
      window.removeEventListener('touchmove', this.pickupSceneTouchManager);
      window.removeEventListener('wheel', this.pickupSceneWheelManager, { passive: false })
      window.removeEventListener('resize', this.pickupResize);

      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupBottomPos = pickupPos + window.innerHeight
      this.$gsap.to(this.scroll, {
        value: pickupBottomPos,
        duration: this.$checkDevice.isTouch() ? this.$baseAnimationConfig.duration * 1.5 : this.$baseAnimationConfig.duration,
        ease: this.$easing.transform,
        onUpdate: () => {
          /**
           * asscrollが有効な時
           */
          if (!this.$checkDevice.isTouch()) {
            this.$asscroll.scrollTo(this.scroll.value)
          }
          /**
           * asscrollが無効な時
           */
          else{
            window.scrollTo({ top: this.scroll.value })
          }
        },
        onComplete: () => {
          setTimeout(() => {
            /**
             * asscrollが有効な時
             */
            if (!this.$checkDevice.isTouch()) {
                this.$asscroll.enable()
            }
            this.$gsap.ticker.add(this.pickupToBottomEnterScroll);
          }, 100)
        },
      })
    },

    /**
     * 進む時のイベント管理
     */
    pickupSceneNext() {
      this.pickupSectionCurrentNum += 1.0

      switch (this.pickupSectionCurrentNum) {
        case 1.0:
          this.isTextSegmentState[1] = 'center'
          break
        case 2.0:
          this.isTextSegmentState[1] = 'top'
          setTimeout(() => {
            this.isTextSegmentState[2] = 'center'
            this.isCircleBgState02 = 'extend'
          }, this.wheelInterval * 1000)
          break
        case 3.0:
          this.isTextSegmentState[2] = 'top'
          setTimeout(() => {
            this.isTextSegmentState[3] = 'center'
            this.isCircleBgState03 = 'extend'
          }, this.wheelInterval * 1000)
          break
        case 4.0:
          this.isTextSegmentState[3] = 'top'
          setTimeout(() => {
            this.$store.commit('indexPickup/setProjectAnimationState','start')
            this.pickupToBottomLeaveScroll()
          }, this.wheelInterval * 500)
          break
      }
    },

    /**
     * 戻る時のイベント管理
     */
    pickupScenePrev() {
      this.pickupSectionCurrentNum += -1.0

      switch (this.pickupSectionCurrentNum) {
        case 0.0:
          this.pickupToTopLeaveScroll()
          this.isTextSegmentState[1] = 'bottom'
          break
        case 1.0:
          this.isTextSegmentState[2] = 'bottom'
          setTimeout(() => {
            this.isTextSegmentState[1] = 'center'
            this.isCircleBgState02 = 'shrink'
          }, this.wheelInterval * 1000)
          break
        case 2.0:
          this.isTextSegmentState[3] = 'bottom'
          setTimeout(() => {
            this.isTextSegmentState[2] = 'center'
            this.isCircleBgState03 = 'shrink'
          }, this.wheelInterval * 1000)
          break
        case 3.0:
          this.isTextSegmentState[3] = 'center'
          break
      }
    },

    /**
     * 全体のシーン管理
     */
    pickupSceneWheelManager(e) {
      if (this.isScrollAnimation || this.hambergerMenuState) return

      if (e.deltaY > this.wheelRatio) {
        this.pickupSceneNext()
        if(this.pickupSectionCurrentNum === 4.0){
          this.disable(4000)
        } else{
          this.disable();
        }

      } else if (e.deltaY < -this.wheelRatio) {
        this.pickupScenePrev()
        if(this.pickupSectionCurrentNum === 3.0){
          this.disable(4000)
        } else{
          this.disable();
        }
      }
    },

    pickupSceneTouchManager(e) {
      if (this.isScrollAnimation || this.hambergerMenuState) return

      const touchY = e.touches[0].clientY;
      const deltaY = -(touchY - this.prevTouchY);

      if (deltaY > this.touchRatio) {
        this.pickupSceneNext()
        if(this.pickupSectionCurrentNum === 4.0){
          this.disable(4000)
        } else{
          this.disable();
        }
      } else if (deltaY < -this.touchRatio) {
        this.pickupScenePrev()
        if(this.pickupSectionCurrentNum === 3.0){
          this.disable(4000)
        } else{
          this.disable();
        }
      }
    },

    setTouchY(e){
      this.prevTouchY = e.touches[0].clientY;
    },

    pickupResize(){
      /**
       * リサイズした時に一番目の円の位置と大きさを更新する
       */
      if (this.$siteConfig.isPc) {
        this.$gsap.set(this.$refs.PickupCircleEnter, {
          y: window.innerHeight / 2,
          scale: Math.max(window.innerWidth, window.innerHeight) / 54.0,
        })
      }
      else{
        this.$gsap.set(this.$refs.PickupCircleEnter, {
          scale: 1,
        })
      }

      /**
       * リサイズした時にasscrollのcontainerの位置を更新する
       */
      const pickupPos = this.$refs.Pickup.offsetTop
      this.scroll.value = pickupPos
      /**
       * asscrollが有効な時
       */
      if (!this.$checkDevice.isTouch()) {
        this.$asscroll.scrollTo(this.scroll.value)
      }
      /**
       * asscrollが無効な時
       */
      else{
        window.scrollTo({ top: this.scroll.value })
      }
      this.$store.commit('indexPickup/setPickupPos', pickupPos)
      this.$backfaceScroll(false, this.indexPickupPos);
    },

    /**
     * 操作不能
     */
    disable(interval = 2000) {
      if(this.isScrollAnimation) return
      this.isScrollAnimation = true
      window.addEventListener('touchstart', this.prEvent, { passive: false });
      window.addEventListener('touchmove', this.prEvent, { passive: false });
      window.addEventListener('wheel', this.prEvent, { passive: false })

      setTimeout(() => {
        this.isScrollAnimation = false
        window.removeEventListener('touchstart', this.prEvent, { passive: false });
        window.removeEventListener('touchmove', this.prEvent, { passive: false });
        window.removeEventListener('wheel', this.prEvent, { passive: false })
      }, interval)
    },

    prEvent: function (e) {
      e.preventDefault()
    },
  },
}
</script>

<style scoped lang="scss">
:root {
  --viewportWidth: 0;
  --viewportHeight: 0;
}

.pickup {
  position: relative;

  @include sp(){
    overflow: hidden;
  }
}

.pickup.is-enter {
  overflow: hidden;
}

.pickup-bg {
  background-color: $lightBlue;
}

.pickup-inner {
  height: 600px;
}

.pickup .l-container {
  height: 100%;
}

.pickup-clip {
  position: relative;
  width: 100%;
  height: 100%;
}

.pickup-title-wrapper {
  position: absolute;
  top: 50%;
  left: 45.4%;
  transform: translate3d(-50%, -50%, 0);
  font-size: vh(126);
  font-family: 'Six Caps', sans-serif;
  text-align: center;
  line-height: 0.98;

  @include sp() {
    top: calc(65px + 38%);
    left: 50%;
    font-size: vmin_sp(126);
  }
}

.pickup-section-number-wrapper {
  position: absolute;
  top: 70px;
  right: 115px;

  @include sp() {
    top: 72px;
    right: 0;
  }
}

.pickup-title-wrapper-01,
.pickup-section-text-wrapper-01 {
  color: $darkBlue;
}

.pickup-title-wrapper-02,
.pickup-section-text-wrapper-02 {
  color: $purple;
}

.pickup-title-wrapper-03,
.pickup-section-text-wrapper-03 {
  color: $darkPink;
}

.pickup-section-text-wrapper {
  position: absolute;
  bottom: 86px;
  left: 0;

  @include sp() {
    display: flex;
    justify-content: space-between;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: vw_sp(670);
  }
}

.pickup-section-text-title {
  display: block;
  margin: 0 0 60px 0;
  font-size: 20px;

  @include sp() {
    margin: 0;
    font-size: 18px;
  }
}

.pickup-circle-bg-enter {
  display: block;
  position: absolute;
  top: -130px;
  right: 0;
  left: -5%;
  margin: 0 auto;
  background-color: $blue;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  pointer-events: none;

  @include sp() {
    top: 50%;
    right: auto;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(0);
    width: 120vmax;
    height: 120vmax;
  }
}

.pickup-circle-bg-area{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}
</style>