<template>
  <div ref="Pickup" class="pickup is-pickup-scene-00">
    <span ref="PickupCircleEnter" class="pickup-circle-bg-enter"></span>
    <span class="pickup-circle-bg-area">
      <CommonCircleBg :state="isCircleBgState02" modifier="pickup-02">
      </CommonCircleBg>
      <CommonCircleBg :state="isCircleBgState03" modifier="pickup-03">
      </CommonCircleBg>
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
                :class="'pickup-section-number-wrapper-0' + num"
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
import { preEvent, preEventTouch } from "../../lib/preEvent"
import pickupData from '@/assets/json/pickup.json'

export default {
  data: () => {
    return {
      pickupData: pickupData,
      pickupSectionOldCurrentNum: 0,
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
    this.removeAllEvent();
    this.removeAllPreEvent();
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
        this.addAllPreEvent();
        this.disable(2000)
        this.$store.commit('hambergerMenu/disable')
        this.$gsap.ticker.remove(this.pickupToTopEnterScroll);
        this.$asscroll.disable({ inputOnly: true })

        this.$store.commit('indexPickup/enter')
        this.$store.commit('indexPickup/setPickupPos', pickupPos)

        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$baseAnimationConfig.duration,
          ease: this.$easing.transform,
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete: () => {
            this.pickupSceneNext()
            this.addAllEvent();
            this.$store.commit('hambergerMenu/enable')
          },
        })

        /**
         * 侵入した時の最初のサークルアニメーション
         */
        if (this.$siteConfig.isPc) {
            this.$gsap.to(this.$refs.PickupCircleEnter, {
            duration: this.$baseAnimationConfig.duration * 1.2,
            ease: this.$easing.transform,
            delay: 0.2,
            y: window.innerHeight / 2,
            scale: Math.max(window.innerWidth, window.innerHeight) / 54.0,
          })
        }
        else if(this.$siteConfig.isMobile){
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
      this.disable(3000)
      this.$store.commit('hambergerMenu/disable')
      this.$store.commit('indexPickup/leave')
      this.removeAllEvent();

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
            this.$gsap.ticker.add(this.pickupToTopEnterScroll);
            this.removeAllPreEvent();
            this.$asscroll.enable()
            this.$store.commit('hambergerMenu/enable')
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
        this.$gsap.ticker.remove(this.pickupToBottomEnterScroll);
        this.$asscroll.disable({ inputOnly: true })
        this.$store.commit('hambergerMenu/disable')
        this.addAllPreEvent();
        this.disable(2000)
        this.$store.commit('indexPickup/enter')
        this.$store.commit('indexPickup/setPickupPos', pickupPos)
        this.$store.commit('indexPickup/setProjectAnimationState','end')

        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$baseAnimationConfig.duration,
          ease: this.$easing.transform,
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete: () => {
            this.pickupScenePrev()
            this.addAllEvent();
            this.$store.commit('hambergerMenu/enable')
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
      this.$store.commit('hambergerMenu/disable')
      this.removeAllEvent();

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
            this.removeAllPreEvent();
            this.$gsap.ticker.add(this.pickupToBottomEnterScroll);
            this.$store.commit('hambergerMenu/enable')
          }, 100)
        },
      })
    },

    /**
     * 進む時のイベント管理
     */
    pickupSceneNext() {
      this.pickupSectionOldCurrentNum = this.pickupSectionCurrentNum
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
          }, this.wheelInterval * 1000)
          break
      }

      this.pickupSceneClassToggle();
    },

    /**
     * 戻る時のイベント管理
     */
    pickupScenePrev() {
      this.pickupSectionOldCurrentNum = this.pickupSectionCurrentNum
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

      this.pickupSceneClassToggle();
    },

    /**
     * 全体のシーン管理
     */
    pickupSceneWheelManager(e) {
      if (this.isScrollAnimation || this.hambergerMenuState) return

      if (e.deltaY > this.wheelRatio) {
        this.pickupSceneNext()
        this.disable();
      }
      else if (e.deltaY < -this.wheelRatio) {
        this.pickupScenePrev()
        this.disable();
      }
    },

    pickupSceneTouchManager(e) {
      if (this.isScrollAnimation || this.hambergerMenuState) return

      const touchY = e.touches[0].clientY;
      const deltaY = -(touchY - this.prevTouchY);

      if (deltaY > this.touchRatio) {
        this.pickupSceneNext()
        this.disable();
      }
      else if (deltaY < -this.touchRatio) {
        this.pickupScenePrev()
        this.disable();
      }
    },

    pickupSceneClassToggle(){
      this.$refs.Pickup.classList.remove(`is-pickup-scene-0${this.pickupSectionOldCurrentNum}`);
      this.$refs.Pickup.classList.add(`is-pickup-scene-0${this.pickupSectionCurrentNum}`);
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
      this.$asscroll.scrollTo(this.scroll.value)
      this.$store.commit('indexPickup/setPickupPos', pickupPos)
    },

    /**
     * 進む戻るの操作不能
     */
    disable(interval = 2000) {
      this.isScrollAnimation = true
      if(this.clear) clearTimeout(this.clear);

      this.clear = setTimeout(this.clearAnimation, interval);
    },

    clearAnimation(){
      this.isScrollAnimation = false
    },

    /**
     * デフォルトのイベントを止める
     */
    addAllPreEvent(){
      window.addEventListener('touchstart', preEventTouch, { passive: false });
      window.addEventListener('touchmove', preEventTouch, { passive: false });
      window.addEventListener('wheel', preEvent, { passive: false })
    },

    /**
     * イベントをセットする
     */
    addAllEvent(){
      window.addEventListener('touchstart', this.setTouchY);
      window.addEventListener('touchmove', this.pickupSceneTouchManager);
      window.addEventListener('wheel', this.pickupSceneWheelManager, { passive: false })
      window.addEventListener('resize', this.pickupResize);
    },

    /**
     * デフォルトのイベントを戻す
     */
    removeAllPreEvent(){
      window.removeEventListener('touchstart', preEventTouch, { passive: false });
      window.removeEventListener('touchmove', preEventTouch, { passive: false });
      window.removeEventListener('wheel', preEvent, { passive: false })
    },

    /**
     * イベントを削除する
     */
    removeAllEvent(){
      window.removeEventListener('touchstart', this.setTouchY);
      window.removeEventListener('touchmove', this.pickupSceneTouchManager);
      window.removeEventListener('wheel', this.pickupSceneWheelManager, { passive: false })
      window.removeEventListener('resize', this.pickupResize);
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

.pickup-bg {
  background-color: $lightBlue;
}

.pickup-inner {
  height: var(--viewportHeight);
  backface-visibility: hidden;
  transform: translateZ(0);
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
  left: -10%;
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

//z-index

@for $i from 1 through 3 {
  .is-pickup-scene-0#{$i} .pickup-title-wrapper-0#{$i}{
    z-index: 1;
  }

  .is-pickup-scene-0#{$i} .pickup-section-text-wrapper-0#{$i}{
    z-index: 1;
  }

  .is-pickup-scene-0#{$i} .pickup-section-number-wrapper-0#{$i}{
    z-index: 1;
  }
}
</style>