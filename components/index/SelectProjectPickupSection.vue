<template>
  <div ref="Pickup" class="pickup is-pickup-scene-00">
    <!--背景サークルー(侵入時の背景サークルとDOMを分ける)-->
    <span ref="PickupCircleEnter" class="pickup-circle-bg-enter" :class="{ 'is-enter': indexPickupState }" :style="`background-color:${pickupData[0].siteColor.bodyContentsColor};`"></span>
    <span class="pickup-circle-bg-area">
      <AppCircleBg :state="isCircleBgState02" :modifier="'pickup-02'" :color="pickupData[1].siteColor.bodyContentsColor" />
      <AppCircleBg :state="isCircleBgState03" :modifier="'pickup-03'" :color="pickupData[2].siteColor.bodyContentsColor" />
    </span>
    <!--シーンごとのセクションナンバー-->
    <p class="pickup-section-number">
      <span v-for="num in pickupData.length" :key="num.id" class="pickup-section-number-wrapper" :class="'pickup-section-number-wrapper-0' + num">
        <AppReadTitle :state="isTextSegmentState[num]" :text="['・', 'SELECTED', 'PROJECT', '0' + num]" :modifier="'pickup-section'" />
      </span>
    </p>
    <!--シーンごとのセクションテキスト-->
    <p class="pickup-section-text">
      <span
        v-for="(data, index) in pickupData"
        :key="data.id"
        class="pickup-section-text-wrapper"
        :class="`pickup-section-text-wrapper-0${index + 1}`"
        :style="`color:${data.siteColor.allTextColor};`"
      >
        <span class="pickup-section-text-title">
          <AppTextAnimation :state="isTextSegmentState[Number(index + 1)]" :rotate="$BASEROTATE.right" :text="data.title.full" />
        </span>
        <span>
          <span v-for="tIndex of Object.keys(data.pickup.text[0]).length - 1" :key="tIndex">
            <AppTextAnimation :state="isTextSegmentState[index + 1]" :start="tIndex * 0.12" :text="`${data.pickup.text[0]['text0' + tIndex]}`" />
          </span>
        </span>
      </span>
    </p>
    <!--シーンごとのセクションタイトル-->
    <div class="pickup-bg">
      <div ref="PickupInner" class="pickup-inner">
        <div class="l-container">
          <button v-for="(data, index) in pickupData" :key="data.id" class="pickup-link js-click-target" :class="`pickup-link-0${index + 1}`" aria-label="pickup page" @click="nextPage(data)"></button>
          <div class="pickup-clip">
            <h2 class="pickup-title">
              <span v-for="(data, index) in pickupData" :key="data.id" class="pickup-title-wrapper" :class="`pickup-title-wrapper-0${index + 1}`" :style="`color:${data.siteColor.allTextColor};`">
                <span v-for="tIndex of Object.keys(data.pickup.title[0]).length - 1" :key="tIndex">
                  <AppTextAnimation
                    :state="isTextSegmentState[Number(index + 1)]"
                    :start="tIndex * 0.12"
                    :rotate="tIndex % 2 != 0 ? $BASEROTATE.left : $BASEROTATE.right"
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
      wheelInterval: 0.75,
      disableTime: 1360,
      scrollBuffer: 0,
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
    hambergerMenuPickupState: function () {
      return this.$store.getters['hambergerMenu/pickup']
    },
    indexPickupState: function () {
      return this.$store.getters['indexPickup/state']
    },
    indexPickupPos: function () {
      return this.$store.getters['indexPickup/pos']
    },
  },

  watch: {
    hambergerMenuState: function () {
      if (this.indexPickupState) {
        if (this.hambergerMenuState) {
          this.resetDefaultPreEvent()
        } else {
          this.stopDefaultPreEvent()
          window.removeEventListener('touchstart', preEventTouch, {
            passive: false,
          })
        }
      }
    },
  },

  mounted() {
    this.scrollDuartion = this.$SITECONFIG.isPc ? this.$SITECONFIG.baseDuration : this.$SITECONFIG.baseDuration * 1.2
    this.scrollBuffer = 160.0
    this.animationInterval = this.wheelInterval * (this.disableTime / 2.0)
    this.$store.commit('indexPickup/setCurrentNumber', 1.0)

    setTimeout(() => {
      this.$gsap.ticker.add(this.pickupToTopEnterScroll)
    }, 100)
  },

  beforeDestroy() {
    this.$store.commit('hambergerMenu/pickupClose')
    this.$store.commit('indexPickup/leave')
    this.$store.commit('indexPickup/setProjectAnimationState', 'end')
    this.$store.commit('indexPickup/setCurrentNumber', this.pickupSectionCurrentNum)

    // ページを離れる時にピックアップのアニメーションをremoveする
    this.$store.commit('indexPickup/setScene', '')
    this.$gsap.ticker.remove(this.pickupToTopEnterScroll)
    this.$gsap.ticker.remove(this.pickupToBottomEnterScroll)
    this.$gsap.ticker.remove(this.setPos)
    if (this.$SITECONFIG.isMobile) this.$gsap.ticker.remove(this.setHeight)
    // this.$gsap.ticker.remove(this.pRaf)
    this.removeSceneEvent()
    this.resetDefaultPreEvent()
    window.removeEventListener('resize', this.pResize)
  },

  methods: {
    /**
     * ピックアップセクションに上から侵入する時
     */
    pickupToTopEnterScroll() {
      // ターゲットの領域を計算
      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupTopPos = pickupPos - window.innerHeight

      if (this.$asscroll.targetPos > pickupTopPos) {
        if (this.$SITECONFIG.isMobile) this.$gsap.ticker.add(this.setHeight)
        if (this.pickupToTopLeaveScrollAnimation) this.pickupToTopLeaveScrollAnimation.kill()
        // 上から侵入する監視をストップ
        this.$gsap.ticker.remove(this.pickupToTopEnterScroll)
        // 慣性スクロールを無効にする
        this.$asscroll.disable({ inputOnly: true })
        // デフォルトのイベントをストップする
        this.stopDefaultPreEvent()
        // ホイールイベント不可、デフォルトの操作不可時間より長くしておく
        this.disable(1700)
        // 既存の処理とバッティングするので、ハンバーガーメニューを操作不能にしておく
        this.$store.commit('hambergerMenu/disable')
        // ピックアップに入ったことを知らせる
        this.$store.commit('indexPickup/enter')
        this.$store.commit('indexPickup/sceneAnimationState', true)
        // this.$store.commit('indexPickup/setPickupPos', pickupPos)

        // スクロール処理
        this.pickupToTopEnterScrollAnimation = this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.scrollDuartion,
          ease: this.$EASING.transform,
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete: () => {
            // タッチデバイスの時、背景固定
            // setTimeout(() => {
            //   if (this.$SITECONFIG.isTouch) this.$backfaceScroll(false)
            // }, 100)
            // 次のシーンへ移動させる
            this.pickupSceneNext()
            // シーン用のイベントを付与する
            this.addSceneEvent()
            this.$gsap.ticker.add(this.setPos)
            // ハンバーガーメニューを操作可能にする
            this.$store.commit('hambergerMenu/enable')
            // タッチはできるようにする
            window.removeEventListener('touchstart', preEventTouch, {
              passive: false,
            })
          },
        })

        // 侵入した時の最初のサークルアニメーション
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
      if (this.pickupToTopEnterScrollAnimation) this.pickupToTopEnterScrollAnimation.kill()
      // タッチデバイスの時、背景固定解除
      // if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
      if (this.$SITECONFIG.isMobile) this.$gsap.ticker.remove(this.setHeight)
      // ホイールイベント不可、デフォルトの操作不可時間より長くしておく
      this.disable(3000)
      // ハンバーガーメニューを操作不能にする
      this.$store.commit('hambergerMenu/disable')
      // ピックアップを出たことを知らせる
      this.$store.commit('indexPickup/leave')
      // シーン用のイベントを削除する
      this.removeSceneEvent()
      this.$gsap.ticker.remove(this.setPos)

      // ターゲットの領域を計算
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupTopPos = pickupPos - window.innerHeight

      // スクロール処理
      this.pickupToTopLeaveScrollAnimation = this.$gsap.to(this.scroll, {
        value: pickupTopPos - this.scrollBuffer, // 領域判定がシビアなので離れる時にバッファーを設けてスクロールさせる
        duration: this.scrollDuartion,
        ease: this.$EASING.transform,
        onUpdate: () => {
          this.$asscroll.scrollTo(this.scroll.value)
        },
        onComplete: () => {
          setTimeout(() => {
            // 慣性スクロール有効
            this.$asscroll.enable()
            setTimeout(() => {
              // ハンバーガーメニューを操作可能にする
              this.$store.commit('hambergerMenu/enable')
            }, 500)
            // 上から侵入する監視を加える
            this.$gsap.ticker.add(this.pickupToTopEnterScroll)
            // デフォルトのイベントを戻す
            this.resetDefaultPreEvent()
            // ピックアップを出たことを知らせる
            this.$store.commit('indexPickup/sceneAnimationState', false)
          }, 200)
        },
      })

      // 侵入した時の最初のサークルアニメーション
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
      // ターゲットの領域を計算
      this.scroll.value = this.$asscroll.targetPos
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupBottomPos = pickupPos + window.innerHeight

      if (this.$asscroll.targetPos < pickupBottomPos) {
        if (this.hambergerMenuState || this.hambergerMenuPickupState) return
        if (this.$SITECONFIG.isMobile) this.$gsap.ticker.add(this.setHeight)
        if (this.pickupToBottomLeaveScrollAnimation) this.pickupToBottomLeaveScrollAnimation.kill()
        // 下から侵入する監視をストップ
        this.$gsap.ticker.remove(this.pickupToBottomEnterScroll)
        // 慣性スクロールを無効にする
        this.$asscroll.disable({ inputOnly: true })
        // デフォルトのイベントをストップする
        this.stopDefaultPreEvent()
        // ホイールイベント不可、デフォルトの操作不可時間より長くしておく
        this.disable(1700)
        // 既存の処理とバッティングするので、ハンバーガーメニューを操作不能にしておく
        this.$store.commit('hambergerMenu/disable')
        // ピックアップに入ったことを知らせる
        this.$store.commit('indexPickup/enter')
        this.$store.commit('indexPickup/sceneAnimationState', true)
        // this.$store.commit('indexPickup/setPickupPos', pickupPos)
        // プロジェクトセクションにアニメーションが終わったことを知らせる
        this.$store.commit('indexPickup/setProjectAnimationState', 'end')

        // スクロール処理
        this.pickupToBottomEnterScrollAnimation = this.$gsap.to(this.scroll, {
          value: pickupPos,
          duration: this.scrollDuartion,
          ease: this.$EASING.transform,
          onUpdate: () => {
            this.$asscroll.scrollTo(this.scroll.value)
          },
          onComplete: () => {
            // タッチデバイスの時、背景固定
            // setTimeout(() => {
            //   if (this.$SITECONFIG.isTouch) this.$backfaceScroll(false)
            // }, 100)
            // 前のシーンへ移動させる
            this.pickupScenePrev()
            // シーン用のイベントを付与する
            this.addSceneEvent()
            this.$gsap.ticker.add(this.setPos)
            setTimeout(() => {
              // ハンバーガーメニューを操作可能にする
              this.$store.commit('hambergerMenu/enable')
            }, 500)
            // タッチはできるようにする
            window.removeEventListener('touchstart', preEventTouch, {
              passive: false,
            })
          },
        })

        // 下から侵入する時にサイズと位置を更新しておく
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
      if (this.pickupToBottomEnterScrollAnimation) this.pickupToBottomEnterScrollAnimation.kill()
      // タッチデバイスの時、背景固定解除
      // if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
      if (this.$SITECONFIG.isMobile) this.$gsap.ticker.remove(this.setHeight)
      // ホイールイベント不可、デフォルトの操作不可時間より長くしておく
      this.disable(3000)
      // ハンバーガーメニューを操作不能にする
      this.$store.commit('hambergerMenu/disable')
      // ピックアップを出たことを知らせる
      this.$store.commit('indexPickup/leave')
      // シーン用のイベントを削除する
      this.removeSceneEvent()
      this.$gsap.ticker.remove(this.setPos)

      // ターゲットの領域を計算
      const pickupPos = this.$refs.Pickup.offsetTop
      const pickupBottomPos = pickupPos + window.innerHeight

      // スクロール処理
      this.pickupToBottomLeaveScrollAnimation = this.$gsap.to(this.scroll, {
        value: pickupBottomPos + this.scrollBuffer, // 領域判定がシビアなので離れる時にバッファーを設けてスクロールさせる
        duration: this.scrollDuartion,
        ease: this.$EASING.transform,
        onUpdate: () => {
          this.$asscroll.scrollTo(this.scroll.value)
        },
        onComplete: () => {
          setTimeout(() => {
            // 慣性スクロール有効
            this.$asscroll.enable()
            // 下から侵入する監視を加える
            this.$gsap.ticker.add(this.pickupToBottomEnterScroll)
            // デフォルトのイベントを戻す
            this.resetDefaultPreEvent()
            // ハンバーガーメニューを操作可能にする
            this.$store.commit('hambergerMenu/enable')
            // ピックアップを出たことを知らせる
            this.$store.commit('indexPickup/sceneAnimationState', false)
          }, 200)
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

          break
        case 2.0:
          this.$store.commit('indexPickup/setScene', 'next02')
          this.isTextSegmentState[1] = 'top'

          setTimeout(() => {
            this.isTextSegmentState[2] = 'center'
            this.isCircleBgState02 = 'extend'
          }, this.animationInterval)
          break
        case 3.0:
          this.$store.commit('indexPickup/setScene', 'next03')
          this.isTextSegmentState[2] = 'top'

          setTimeout(() => {
            this.isTextSegmentState[3] = 'center'
            this.isCircleBgState03 = 'extend'
          }, this.animationInterval)
          break
        case 4.0:
          this.$store.commit('indexPickup/setScene', 'next04')
          this.isTextSegmentState[3] = 'top'

          setTimeout(() => {
            // プロジェクトセクションにアニメーションが開始することを知らせる
            this.$store.commit('indexPickup/setProjectAnimationState', 'start')
            // ピックアップセクションの下に離れる時のmメソッド実行
            this.pickupToBottomLeaveScroll()
          }, this.animationInterval)
          break
      }

      // ルート要素のクラスの切り替え
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
          this.isTextSegmentState[1] = 'bottom'
          // ピックアップセクションの上に離れる時のmメソッド実行
          this.pickupToTopLeaveScroll()
          break
        case 1.0:
          this.$store.commit('indexPickup/setScene', 'prev01')
          this.isTextSegmentState[2] = 'bottom'

          setTimeout(() => {
            this.isTextSegmentState[1] = 'center'
            this.isCircleBgState02 = 'shrink'
          }, this.animationInterval)
          break
        case 2.0:
          this.$store.commit('indexPickup/setScene', 'prev02')
          this.isTextSegmentState[3] = 'bottom'

          setTimeout(() => {
            this.isTextSegmentState[2] = 'center'
            this.isCircleBgState03 = 'shrink'
          }, this.animationInterval)
          break
        case 3.0:
          this.$store.commit('indexPickup/setScene', 'prev03')
          this.isTextSegmentState[3] = 'center'
          break
      }

      // ルート要素のクラスの切り替え
      this.pickupSceneClassToggle()
    },

    /**
     * 全体のシーン管理(タッチデバイスではない時)
     */
    pickupSceneWheelManager(e) {
      if (this.isScrollAnimation || this.hambergerMenuState) return

      if (e.deltaY > this.wheelRatio || e.key === 'ArrowDown') {
        this.pickupSceneNext()
        this.disable()
      } else if (e.deltaY < -this.wheelRatio || e.key === 'ArrowUp') {
        this.pickupScenePrev()
        this.disable()
      }
    },

    /**
     * 全体のシーン管理(タッチデバイスの時)
     */
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

    /**
     * ルート要素のクラスの切り替え
     */
    pickupSceneClassToggle() {
      this.$refs.Pickup.classList.remove(`is-pickup-scene-0${this.pickupSectionOldCurrentNum}`)
      this.$refs.Pickup.classList.add(`is-pickup-scene-0${this.pickupSectionCurrentNum}`)
    },

    setHeight() {
      this.$gsap.set(this.$refs.PickupInner, {
        height: window.innerHeight,
      })
    },

    setTouchY(e) {
      this.prevTouchY = e.touches[0].clientY
    },

    setPos() {
      const pickupPos = this.$refs.Pickup.offsetTop
      this.scroll.value = pickupPos
      this.$asscroll.scrollTo(this.scroll.value)
    },

    /**
     * リサイズ
     */
    pickupResize() {
      // リサイズした時に一番目の円の位置と大きさを更新する
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

      // リサイズした時に位置を更新する
      // const pickupPos = this.$refs.Pickup.offsetTop
      // this.scroll.value = pickupPos
      // this.$asscroll.scrollTo(this.scroll.value)
      // 背景固定の位置も更新
      // if (this.$SITECONFIG.isTouch)
      //   this.$backfaceScroll(false, this.scroll.value, 0)

      // if (this.$SITECONFIG.isTouch) this.$store.commit('indexPickup/setPickupPos', pickupPos)
    },

    /**
     * 進む戻るの操作不能
     */
    disable(interval = this.disableTime) {
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
    stopDefaultPreEvent() {
      window.addEventListener('touchstart', preEventTouch, { passive: false })
      window.addEventListener('touchmove', preEventTouch, { passive: false })
      window.addEventListener('wheel', preEvent, { passive: false })
      window.addEventListener('scroll', preEvent, { passive: false })
    },

    /**
     * シーンイベントをセットする
     */
    addSceneEvent() {
      window.addEventListener('touchstart', this.setTouchY)
      window.addEventListener('touchmove', this.pickupSceneTouchManager)
      window.addEventListener('wheel', this.pickupSceneWheelManager, {
        passive: false,
      })
      window.addEventListener('resize', this.pickupResize)
      window.addEventListener('keydown', this.pickupSceneWheelManager)
    },

    /**
     * デフォルトのイベントを戻す
     */
    resetDefaultPreEvent() {
      window.removeEventListener('touchstart', preEventTouch, {
        passive: false,
      })
      window.removeEventListener('touchmove', preEventTouch, { passive: false })
      window.removeEventListener('wheel', preEvent, { passive: false })
      window.removeEventListener('scroll', preEvent, { passive: false })
    },

    /**
     * シーンイベントを削除する
     */
    removeSceneEvent() {
      window.removeEventListener('touchstart', this.setTouchY)
      window.removeEventListener('touchmove', this.pickupSceneTouchManager)
      window.removeEventListener('wheel', this.pickupSceneWheelManager, {
        passive: false,
      })
      window.removeEventListener('keydown', this.pickupSceneWheelManager)
      window.removeEventListener('resize', this.pickupResize)
    },

    /**
     * 次のページに移動するとき
     */
    nextPage(data) {
      this.resetDefaultPreEvent()
      this.removeSceneEvent()
      this.$store.commit('indexPickup/setCurrentNumber', this.pickupSectionCurrentNum)
      this.$store.commit('indexPickup/transition', true)

      setTimeout(() => {
        this.$router.push(`/works/${data.id}`)
      }, 500)
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
  font-size: vmin(206);
  font-family: $sixcaps;
  text-align: center;
  line-height: 0.98;

  @include tab-vertical() {
    left: 44%;
    font-size: vmin(160);
  }

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
  font-size: 12px;

  @include sp() {
    left: 0;
    width: 100%;
    font-size: 10px;
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
