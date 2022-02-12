<template>
  <div ref="Pickup" class="pickup is-pickup-scene-00">
    <span
      ref="PickupCircleEnter"
      class="pickup-circle-bg-enter"
      :class="{ 'is-enter': indexPickupState }"
      :style="`background-color:${pickupData[0].siteColor.bodyContentsColor};`"
    ></span>
    <span class="pickup-circle-bg-area">
      <AppCircleBg
        :state="isCircleBgState02"
        :modifier="'pickup-02'"
        :color="pickupData[1].siteColor.bodyContentsColor"
      />
      <AppCircleBg
        :state="isCircleBgState03"
        :modifier="'pickup-03'"
        :color="pickupData[2].siteColor.bodyContentsColor"
      />
    </span>
    <p class="pickup-section-number">
      <span
        v-for="num in pickupData.length"
        :key="num.id"
        class="pickup-section-number-wrapper"
        :class="'pickup-section-number-wrapper-0' + num"
      >
        <AppSectionReadTitle
          :state="isTextSegmentState[num]"
          :text="['・', 'SELECTED', 'PROJECT', '0' + num]"
          :modifier="'pickup-section'"
        />
      </span>
    </p>
    <p class="pickup-section-text">
      <span
        v-for="(data, index) in pickupData"
        :key="data.id"
        class="pickup-section-text-wrapper"
        :class="`pickup-section-text-wrapper-0${index + 1}`"
        :style="`color:${data.siteColor.allTextColor};`"
      >
        <span class="pickup-section-text-title">
          <AppTextSegment
            :state="isTextSegmentState[Number(index + 1)]"
            :rotate="$BASEROTATE.right"
            :text="data.title.full"
          />
        </span>
        <span>
          <span
            v-for="tIndex of Object.keys(data.pickup.text[0]).length - 1"
            :key="tIndex"
          >
            <AppTextSegment
              :state="isTextSegmentState[index + 1]"
              :start="tIndex * 0.12"
              :text="`${data.pickup.text[0]['text0' + tIndex]}`"
            />
          </span>
        </span>
      </span>
    </p>
    <div class="pickup-bg">
      <div class="pickup-inner">
        <div class="l-container">
          <span
            v-for="(data, index) in pickupData"
            :key="data.id"
            class="pickup-link"
            :class="`pickup-link-0${index + 1}`"
            @click="nextPage"
          >
            <!-- <NuxtLink :to="`/works/${data.id}`"> </NuxtLink> -->
          </span>
          <div class="pickup-clip">
            <!-- <p class="pickup-section-number">
              <span
                v-for="num in pickupData.length"
                :key="num.id"
                class="pickup-section-number-wrapper"
                :class="'pickup-section-number-wrapper-0' + num"
              >
                <AppSectionReadTitle
                  :state="isTextSegmentState[num]"
                  :text="['・', 'SELECTED', 'PROJECT', '0' + num]"
                  :modifier="'pickup-section'"
                />
              </span>
            </p> -->
            <!-- <p class="pickup-section-text">
              <span
                v-for="(data, index) in pickupData"
                :key="data.id"
                class="pickup-section-text-wrapper"
                :class="`pickup-section-text-wrapper-0${index + 1}`"
                :style="`color:${data.siteColor.allTextColor};`"
              >
                <span class="pickup-section-text-title">
                  <AppTextSegment
                    :state="isTextSegmentState[Number(index + 1)]"
                    :rotate="$BASEROTATE.right"
                    :text="data.title.full"
                  />
                </span>
                <span>
                  <span
                    v-for="tIndex of Object.keys(data.pickup.text[0]).length -
                    1"
                    :key="tIndex"
                  >
                    <AppTextSegment
                      :state="isTextSegmentState[index + 1]"
                      :start="tIndex * 0.12"
                      :text="`${data.pickup.text[0]['text0' + tIndex]}`"
                    />
                  </span>
                </span>
              </span>
            </p> -->
            <h2 class="pickup-title">
              <span
                v-for="(data, index) in pickupData"
                :key="data.id"
                class="pickup-title-wrapper"
                :class="`pickup-title-wrapper-0${index + 1}`"
                :style="`color:${data.siteColor.allTextColor};`"
              >
                <span
                  v-for="tIndex of Object.keys(data.pickup.title[0]).length - 1"
                  :key="tIndex"
                >
                  <AppTextSegment
                    :state="isTextSegmentState[Number(index + 1)]"
                    :start="tIndex * 0.12"
                    :rotate="
                      tIndex % 2 != 0 ? $BASEROTATE.left : $BASEROTATE.right
                    "
                    :text="`${data.pickup.title[0]['text0' + tIndex]}`"
                  />
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
import { preEvent, preEventTouch } from '../../assets/js/preEvent'

export default {
  props: {
    pickupData: {
      type: Array,
      required: true,
    },
  },

  data: () => {
    return {
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
    setTimeout(() => {
      this.$gsap.ticker.add(this.pickupToTopEnterScroll)
    }, 100)
  },

  beforeDestroy() {
    this.$store.commit('indexPickup/leave')
    this.$store.commit('indexPickup/setProjectAnimationState', 'end')
    this.$gsap.ticker.remove(this.pickupToTopEnterScroll)
    this.$gsap.ticker.remove(this.pickupToBottomEnterScroll)
    // this.$gsap.ticker.remove(this.pRaf)
    this.removeAllEvent()
    this.removeAllPreEvent()
    window.removeEventListener('resize', this.pResize)
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
        this.addAllPreEvent()
        this.disable(2000)
        this.$store.commit('hambergerMenu/disable')
        // this.$gsap.ticker.add(this.pRaf)
        this.$gsap.ticker.remove(this.pickupToTopEnterScroll)
        this.$asscroll.disable({ inputOnly: true })

        this.$store.commit('indexPickup/enter')
        this.$store.commit('indexPickup/sceneAnimationState', true)
        this.$store.commit('indexPickup/setPickupPos', pickupPos)

        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$SITECONFIG.baseDuration,
          ease: this.$EASING.transform,
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete: () => {
            this.pickupSceneNext()
            this.addAllEvent()
            this.$store.commit('hambergerMenu/enable')
          },
        })

        /**
         * 侵入した時の最初のサークルアニメーション
         */
        if (this.$SITECONFIG.isPc) {
          this.$gsap.to(this.$refs.PickupCircleEnter, {
            duration: this.$SITECONFIG.baseDuration * 1.2,
            ease: this.$EASING.transform,
            delay: 0.2,
            y: window.innerHeight / 2,
            scale: Math.max(window.innerWidth, window.innerHeight) / 54.0,
          })
        } else if (this.$SITECONFIG.isMobile) {
          this.$gsap.to(this.$refs.PickupCircleEnter, {
            duration: this.$SITECONFIG.baseDuration * 1.2,
            ease: this.$EASING.transform,
            delay: 0.2,
            scale: 1.2,
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
      this.removeAllEvent()

      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupTopPos = pickupPos - window.innerHeight

      this.$gsap.to(this.scroll, {
        value: pickupTopPos,
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.transform,
        onUpdate: () => {
          this.$asscroll.scrollTo(this.scroll.value)
        },
        onComplete: () => {
          setTimeout(() => {
            this.$gsap.ticker.add(this.pickupToTopEnterScroll)
            this.removeAllPreEvent()
            this.$asscroll.enable()
            this.$store.commit('hambergerMenu/enable')
            this.$store.commit('indexPickup/sceneAnimationState', false)
          }, 100)
          // setTimeout(() => {
          // }, 300)
        },
      })

      if (this.$SITECONFIG.isPc) {
        this.$gsap.to(this.$refs.PickupCircleEnter, {
          duration: this.$SITECONFIG.baseDuration * 1.2,
          ease: this.$EASING.transform,
          delay: 0.2,
          y: 0,
          scale: 1,
        })
      } else {
        this.$gsap.to(this.$refs.PickupCircleEnter, {
          duration: this.$SITECONFIG.baseDuration * 1.2,
          ease: this.$EASING.transform,
          delay: 0.2,
          scale: 0,
        })
      }
    },

    /**
     * ピックアップセクションに下から侵入する時
     */
    pickupToBottomEnterScroll() {
      if (this.hambergerMenuState) return

      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupBottomPos = pickupPos + window.innerHeight

      if (this.$asscroll.targetPos < pickupBottomPos) {
        // this.$gsap.ticker.add(this.pRaf)
        this.$gsap.ticker.remove(this.pickupToBottomEnterScroll)
        this.$asscroll.disable({ inputOnly: true })
        this.$store.commit('hambergerMenu/disable')
        this.addAllPreEvent()
        this.disable(2000)
        this.$store.commit('indexPickup/enter')
        this.$store.commit('indexPickup/sceneAnimationState', true)
        this.$store.commit('indexPickup/setPickupPos', pickupPos)
        this.$store.commit('indexPickup/setProjectAnimationState', 'end')

        this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.$SITECONFIG.baseDuration,
          ease: this.$EASING.transform,
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete: () => {
            this.pickupScenePrev()
            this.addAllEvent()
            this.$store.commit('hambergerMenu/enable')
          },
        })

        /**
         * 下から侵入する時にサイズと位置を更新する
         */
        if (this.$SITECONFIG.isPc) {
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
      this.removeAllEvent()
      this.$asscroll.enable()

      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupBottomPos = pickupPos + window.innerHeight

      this.$gsap.to(this.scroll, {
        value: pickupBottomPos,
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.transform,
        onUpdate: () => {
          this.$asscroll.scrollTo(this.scroll.value)
        },
        onComplete: () => {
          setTimeout(() => {
            this.removeAllPreEvent()
            this.$store.commit('indexPickup/sceneAnimationState', false)
            this.$gsap.ticker.add(this.pickupToBottomEnterScroll)
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
          this.$store.commit('indexPickup/setScene', 'next01')

          this.isTextSegmentState[1] = 'center'
          // this.particle.setNextScene01()
          break
        case 2.0:
          this.$store.commit('indexPickup/setScene', 'next02')

          this.isTextSegmentState[1] = 'top'
          // this.particle.setNextScene02()
          setTimeout(() => {
            this.isTextSegmentState[2] = 'center'
            this.isCircleBgState02 = 'extend'
          }, this.wheelInterval * 1000)
          break
        case 3.0:
          this.$store.commit('indexPickup/setScene', 'next03')

          this.isTextSegmentState[2] = 'top'
          // this.particle.setNextScene03()
          setTimeout(() => {
            this.isTextSegmentState[3] = 'center'
            this.isCircleBgState03 = 'extend'
          }, this.wheelInterval * 1000)
          break
        case 4.0:
          this.$store.commit('indexPickup/setScene', 'next04')

          this.isTextSegmentState[3] = 'top'
          // this.particle.setNextScene04()
          this.$store.commit('hambergerMenu/disable')
          setTimeout(() => {
            this.$store.commit('indexPickup/setProjectAnimationState', 'start')
            this.pickupToBottomLeaveScroll()
          }, this.wheelInterval * 1000)
          break
      }

      this.pickupSceneClassToggle()
    },

    /**
     * 戻る時のイベント管理
     */
    pickupScenePrev() {
      this.pickupSectionOldCurrentNum = this.pickupSectionCurrentNum
      this.pickupSectionCurrentNum += -1.0

      switch (this.pickupSectionCurrentNum) {
        case 0.0:
          this.$store.commit('indexPickup/setScene', 'prev00')

          this.pickupToTopLeaveScroll()
          this.isTextSegmentState[1] = 'bottom'
          // this.particle.setPrevScene00()
          break
        case 1.0:
          this.$store.commit('indexPickup/setScene', 'prev01')

          this.isTextSegmentState[2] = 'bottom'
          // this.particle.setPrevScene01()
          setTimeout(() => {
            this.isTextSegmentState[1] = 'center'
            this.isCircleBgState02 = 'shrink'
          }, this.wheelInterval * 1000)
          break
        case 2.0:
          this.$store.commit('indexPickup/setScene', 'prev02')

          this.isTextSegmentState[3] = 'bottom'
          // this.particle.setPrevScene02()
          setTimeout(() => {
            this.isTextSegmentState[2] = 'center'
            this.isCircleBgState03 = 'shrink'
          }, this.wheelInterval * 1000)
          break
        case 3.0:
          this.$store.commit('indexPickup/setScene', 'prev03')

          this.isTextSegmentState[3] = 'center'
          // this.particle.setPrevScene03()
          break
      }

      this.pickupSceneClassToggle()
    },

    /**
     * 全体のシーン管理
     */
    pickupSceneWheelManager(e) {
      if (this.isScrollAnimation || this.hambergerMenuState) return

      if (e.deltaY > this.wheelRatio) {
        this.pickupSceneNext()
        this.disable()
      } else if (e.deltaY < -this.wheelRatio) {
        this.pickupScenePrev()
        this.disable()
      }
    },

    pickupSceneTouchManager(e) {
      if (this.isScrollAnimation || this.hambergerMenuState) return

      const touchY = e.touches[0].clientY
      const deltaY = -(touchY - this.prevTouchY)

      if (deltaY > this.touchRatio) {
        this.pickupSceneNext()
        this.disable()
      } else if (deltaY < -this.touchRatio) {
        this.pickupScenePrev()
        this.disable()
      }
    },

    pickupSceneClassToggle() {
      this.$refs.Pickup.classList.remove(
        `is-pickup-scene-0${this.pickupSectionOldCurrentNum}`
      )
      this.$refs.Pickup.classList.add(
        `is-pickup-scene-0${this.pickupSectionCurrentNum}`
      )
    },

    setTouchY(e) {
      this.prevTouchY = e.touches[0].clientY
    },

    pickupResize() {
      /**
       * リサイズした時に一番目の円の位置と大きさを更新する
       */
      if (this.$SITECONFIG.isPc) {
        this.$gsap.set(this.$refs.PickupCircleEnter, {
          y: window.innerHeight / 2,
          scale: Math.max(window.innerWidth, window.innerHeight) / 54.0,
        })
      } else {
        this.$gsap.set(this.$refs.PickupCircleEnter, {
          scale: 1.2,
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
      if (this.clear) clearTimeout(this.clear)

      this.clear = setTimeout(this.clearAnimation, interval)
    },

    clearAnimation() {
      this.isScrollAnimation = false
    },

    /**
     * デフォルトのイベントを止める
     */
    addAllPreEvent() {
      window.addEventListener('touchstart', preEventTouch, { passive: false })
      window.addEventListener('touchmove', preEventTouch, { passive: false })
      window.addEventListener('wheel', preEvent, { passive: false })
    },

    /**
     * イベントをセットする
     */
    addAllEvent() {
      window.addEventListener('touchstart', this.setTouchY)
      window.addEventListener('touchmove', this.pickupSceneTouchManager)
      window.addEventListener('wheel', this.pickupSceneWheelManager, {
        passive: false,
      })
      window.addEventListener('resize', this.pickupResize)
    },

    /**
     * デフォルトのイベントを戻す
     */
    removeAllPreEvent() {
      window.removeEventListener('touchstart', preEventTouch, {
        passive: false,
      })
      window.removeEventListener('touchmove', preEventTouch, { passive: false })
      window.removeEventListener('wheel', preEvent, { passive: false })
    },

    /**
     * イベントを削除する
     */
    removeAllEvent() {
      window.removeEventListener('touchstart', this.setTouchY)
      window.removeEventListener('touchmove', this.pickupSceneTouchManager)
      window.removeEventListener('wheel', this.pickupSceneWheelManager, {
        passive: false,
      })
      window.removeEventListener('resize', this.pickupResize)
    },

    nextPage() {
      this.$store.commit('indexPickup/setScene', 'nextpage')

      setTimeout(() => {
        this.$router.push('/works/mtrust')
      }, (this.$SITECONFIG.baseDuration + (7 * 0.08)) * 1000)

      setTimeout(() => {
        this.$store.commit('indexPickup/sceneAnimationState', false)
      }, ((this.$SITECONFIG.fullDuration + (7 * 0.08)) * 1000) + 20)

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

  @include sp() {
    overflow: hidden;
  }
}

.pickup-bg {
  background-color: $lightBlue;
}

.pickup-inner {
  height: var(--viewportHeight, 100vh);
  backface-visibility: hidden;
  transform: translateZ(0);
}

.pickup .l-container {
  height: 100%;
}

.pickup-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  user-select: none;

  & a {
    display: block;
    width: 100%;
    height: 100%;
  }
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
  font-family: $sixcaps;
  text-align: center;
  line-height: 0.98;

  @include sp() {
    top: calc(65px + 38%);
    left: 50%;
    font-size: vmin_sp(126);
  }
}

.pickup-section-number {
  position: absolute;
  top: 0;
  right: 155px;

  @include sp() {
    right: 20px;
  }
}

.pickup-section-number-wrapper {
  position: absolute;
  top: 70px;
  right: 0;

  @include sp() {
    top: 72px;
    right: 0;
  }
}

.pickup-section-text {
  position: absolute;
  bottom: 0;
  left: 40px;

  @include sp() {
    left: 0;
    width: 100%;
  }
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

// @use "sass:math";
// $dist: pow((0 - var(--viewportWidth)}), 2);

.pickup-circle-bg-enter {
  display: block;
  position: absolute;
  top: -130px;
  right: 0;
  left: -10%;
  margin: 0 auto;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  pointer-events: none;

  // &.is-enter {
  //   width: $dist / 2;
  // }

  @include sp() {
    top: 50%;
    right: auto;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(0);
    width: 120vmax;
    height: 120vmax;
  }
}

.pickup-circle-bg-area {
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
  .is-pickup-scene-0#{$i} {
    & .pickup-title-wrapper-0#{$i} {
      z-index: 1;
    }

    .pickup-section-text-wrapper-0#{$i} {
      z-index: 1;
    }

    .pickup-section-number-wrapper-0#{$i} {
      z-index: 1;
    }

    & .pickup-link-0#{$i} {
      pointer-events: auto;
      user-select: auto;
    }
  }
}
</style>