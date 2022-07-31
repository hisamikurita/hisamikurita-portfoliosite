<template>
  <div :class="[bodyClass,isAndroid, isWindows, isSafari]">
    <BaseOpenning />
    <BaseMouse />
    <BaseLoading />
    <BaseHeader />
    <BaseHambergerMenu />
    <!--transition-->
    <div class="transition">
      <div
        ref="LayoutsNormalTransitionBg"
        class="layouts-normal-transition-img-wrapper"
      >
        <span
          v-for="data in getProjectData"
          :key="data.id"
          ref="LayoutsNormalTransitionImg"
          class="layouts-normal-transition-img"
        >
          <picture>
            <source
              :srcset="`${data.heroImg.sp.url}`"
              type="image/webp"
              media="(max-width: 767px)"
            />
            <img
              :src="`${data.heroImg.pc.url}`"
              :width="`${data.heroImg.pc.width}`"
              :height="`${data.heroImg.pc.height}`"
              :alt="`${data.id}`"
            />
          </picture>
        </span>
        <span
          ref="LayoutsNormalTransitionColorBg"
          class="layouts-normal-transition-color-bg"
        ></span>
      </div>
    </div>
    <!--canvas-->
    <div ref="CanvasFix" class="canvas-fix">
      <div ref="CanvasFixContents" class="canavs-fix-contents">
        <!--metaball-->
        <div ref="Webgl" class="webgl"></div>
        <!--particle-->
        <div class="particle"><canvas ref="Particle"></canvas></div>
      </div>
    </div>
    <!--asscroll-->
    <div ref="AsscrollContainer" class="asscroll-container">
      <div class="asscroll">
        <div ref="AsscrollContents" class="asscroll-contents">
          <nuxt />
        </div>
      </div>
    </div>
    <!--ハンバーガーメニューを閉じるための空dom-->
    <div
      ref="AsscrollContainerCover"
      class="asscroll-container-cover"
      @click="hambergerMenuOnClose"
    >
    </div>
  </div>
</template>

<script>
import Particle from '../components/canvas/index/pickup/particle'
import Mesh from '../components/canvas/index/pickup/metaball'
import Stage from '../components/canvas/stage'
import { preEvent } from '../assets/js/preEvent'
import { metaballSceneList } from '../assets/js/metaball'

export default {
  data: () => {
    return {
      isAndroid: '',
      isWindows: '',
      isSafari: '',
    }
  },

  computed: {
    pickupData() {
      return this.$store.getters.pickupData
    },
    getProjectData() {
      return this.$store.getters.projectData
    },
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    defaultTransitionColor() {
      return this.$store.getters['bg-transition/color']
    },
    imageTransitionState() {
      return this.$store.getters['image-transition/state']
    },
    imageTransitionIndex() {
      return this.$store.getters['image-transition/index']
    },
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
    indexPickupState() {
      return this.$store.getters['indexPickup/state']
    },
    indexPickupIsAnimation() {
      return this.$store.getters['indexPickup/sceneAnimationState']
    },
    pickupCurrentNumber() {
      return this.$store.getters['indexPickup/currnetNumber']
    },
    pickupTransitionState() {
      return this.$store.getters['indexPickup/transition']
    },
    indexPickupScene() {
      return this.$store.getters['indexPickup/scene']
    },
    indexPickupPos() {
      return this.$store.getters['indexPickup/pos']
    },
    bodyClass() {
      return this.$store.getters['body-class/state']
    },
  },
  watch: {
    /**
     * 背景色が変わる遷移
     */
    defaultTransitionState: function () {
      // アニメーション開始
      if (this.defaultTransitionState) {
        this.$gsap.set(this.$refs.LayoutsNormalTransitionColorBg, {
          backgroundColor: this.defaultTransitionColor,
          opacity: 1,
        })
        this.onTransitionStart()
      }
      // アニメーション終わり
      else {
        this.onTransitionEnd()
        this.$gsap.set(this.$refs.LayoutsNormalTransitionColorBg, {
          opacity: 0,
        })
      }
    },

    /**
     * 画像が変わる遷移
     */
    imageTransitionState: function () {
      // アニメーション開始
      if (this.imageTransitionState) {
        const index = this.imageTransitionIndex > this.getProjectData.length - 1 ? 0 : this.imageTransitionIndex

        for (let i = 0; i < this.$refs.LayoutsNormalTransitionImg.length; i++) {
          this.$gsap.set(this.$refs.LayoutsNormalTransitionImg[i], {
            opacity: 0,
          })
        }
        this.$gsap.set(this.$refs.LayoutsNormalTransitionImg[index], {
          opacity: 1.0,
        })
        this.onTransitionStart()
      }
      // アニメーション終わり
      else {
        this.onTransitionEnd()
        for (let i = 0; i < this.$refs.LayoutsNormalTransitionImg.length; i++) {
          this.$gsap.set(this.$refs.LayoutsNormalTransitionImg[i], {
            opacity: 0,
          })
        }
      }
    },

    /**
     * ハンバーガーメニュー
     */
    hambergerMenuState: function () {
      // ハンバガーメニューが開いた時
      if (this.hambergerMenuState) {
        this.$preDefaultEvent(false)
        // 無効にしていたクリックエリアを有効にする
        this.$refs.AsscrollContainerCover.style.pointerEvents = 'auto'

        if (this.$SITECONFIG.isPc) {
          this.$gsap.to(this.container, {
            delay: 0.16,
            duration: 0.3,
            ease: this.$EASING.transform,
            x: -560,
          })
        }

        if (this.$SITECONFIG.isTouch) {
          // スクロール無効
          setTimeout(() => {
            this.$backfaceScroll(false)
          }, 300)
        } else if (this.$SITECONFIG.isNoTouch) {
          // スクロール無効
          this.$asscroll.disable({ inputOnly: true })
          // デフォルトのホイールイベントを戻す
          window.removeEventListener('wheel', preEvent, { passive: false })
        }
      }
      // ハンバガーメニューが閉じた時
      else if (!this.hambergerMenuState) {
        this.$refs.AsscrollContainerCover.style.pointerEvents = 'none'

        if (this.$SITECONFIG.isPc) {
          this.$gsap.to(this.container, {
            delay: 0,
            duration: 0.3,
            ease: this.$EASING.transform,
            x: 0,
          })
        }

        if (this.$SITECONFIG.isTouch) {
          /**
           * ピックアップセクションだった場合はスクロール固定を解除しない
           */
          // if (this.indexPickupState) return;
          this.$backfaceScroll(true)
        } else if (this.$SITECONFIG.isNoTouch) {
          window.addEventListener('wheel', preEvent, { passive: false })
          /**
           * ピックアップセクションだった場合はasscrollを有効しない、それ以外は有効にする
           */
          if (this.indexPickupState || this.$route.name === 'archive') return
          this.$asscroll.enable()
        }
      }
    },

    /**
     * ページ遷移のアニメーション発火管理
     */
    pickupTransitionState: function () {
      const index = this.pickupCurrentNumber - 1.0

      if (this.pickupTransitionState) {
        this.particle.setNextPageStart()

        this.meshList[index].setNextPageStart()
      } else {
        this.meshList[index].delete()
      }
    },
    /**
     * ピックアップ管理
     */
    indexPickupIsAnimation: function () {
      const index = this.pickupCurrentNumber - 1.0

      // current
      if (this.indexPickupIsAnimation) {
        setTimeout(() => {
          this.$gsap.ticker.add(this.pRaf)
          this.$gsap.ticker.add(this.mRaf)
        }, 50) // メタボールの描画が残っている時があるので処理を0.05s遅らせる
      }
      // no current
      else {
        if (this.particle) this.particle.delete()
        if (this.meshList[index]) this.meshList[index].delete()
        window.removeEventListener('mousemove', this.m1Mouse)
        window.removeEventListener('mousemove', this.m2Mouse)
        window.removeEventListener('mousemove', this.m3Mouse)

        setTimeout(() => {
          this.$gsap.ticker.remove(this.pRaf)
          this.$gsap.ticker.remove(this.mRaf)
        }, 50) // メタボールの描画が残っている時があるので処理を0.05s遅らせる
      }
    },
    /**
     * ピックアップのシーン管理
     */
    indexPickupScene: function () {
      switch (this.indexPickupScene) {
        case 'next01':
          this.particle.setSceneFirst(1)
          this.meshList[0].setCenter()
          window.addEventListener('mousemove', this.m1Mouse)
          break
        case 'next02':
          this.particle.setScene(2)
          this.meshList[1].setCenter()
          window.addEventListener('mousemove', this.m2Mouse)
          this.meshList[0].setShrink()
          window.removeEventListener('mousemove', this.m1Mouse)
          break
        case 'next03':
          this.particle.setScene(3)
          this.meshList[2].setCenter()
          window.addEventListener('mousemove', this.m3Mouse)
          this.meshList[1].setShrink()
          window.removeEventListener('mousemove', this.m2Mouse)
          break
        case 'next04':
          this.particle.setSceneEnd(3)
          this.meshList[2].setShrink()
          window.removeEventListener('mousemove', this.m3Mouse)
          break
        case 'prev00':
          this.particle.setSceneEnd(1)
          this.meshList[0].setShrink()
          window.removeEventListener('mousemove', this.m1Mouse)
          break
        case 'prev01':
          this.particle.setScene(1)
          this.meshList[0].setCenter()
          window.addEventListener('mousemove', this.m1Mouse)
          this.meshList[1].setShrink()
          window.removeEventListener('mousemove', this.m2Mouse)
          break
        case 'prev02':
          this.particle.setScene(2)
          this.meshList[1].setCenter()
          window.addEventListener('mousemove', this.m2Mouse)
          this.meshList[2].setShrink()
          window.removeEventListener('mousemove', this.m3Mouse)
          break
        case 'prev03':
          this.particle.setSceneFirst(3)
          this.meshList[2].setCenter()
          window.addEventListener('mousemove', this.m3Mouse)
          break
      }
    },
  },
  mounted() {
    // checkdevice
    if (this.$checkDevice.isAndroid) {
      this.isAndroid = 'is-android'
    }
    if (this.$checkDevice.isWindows) {
      this.isWindows = 'is-windows'
    }
    if (this.$checkDevice.isSafari) {
      this.isSafari = 'is-safari'
    }

    // particle
    const color = [
      {
        dark: this.pickupData[0].pickup.color01,
        light: this.pickupData[0].pickup.color02,
      },
      {
        dark: this.pickupData[1].pickup.color01,
        light: this.pickupData[1].pickup.color02,
      },
      {
        dark: this.pickupData[2].pickup.color01,
        light: this.pickupData[2].pickup.color02,
      },
    ]
    this.particle = new Particle(this.$SITECONFIG, this.$refs.Particle, color)
    this.particle.init()

    this.pResize = () => {
      this.particle.onResize()
    }

    window.addEventListener('resize', this.pResize)

    this.pRaf = () => {
      this.particle._drawParticles()
    }

    // metaball
    const imgPath = []
    imgPath.push(
      {
        pc: `${this.pickupData[0].heroImg.pc.url}`,
        sp: `${this.pickupData[0].heroImg.sp.url}`,
      },
      {
        pc: `${this.pickupData[1].heroImg.pc.url}`,
        sp: `${this.pickupData[1].heroImg.sp.url}`,
      },
      {
        pc: `${this.pickupData[2].heroImg.pc.url}`,
        sp: `${this.pickupData[2].heroImg.sp.url}`,
      }
    )

    const stage = new Stage(this.$refs.Webgl)
    stage.init()

    this.meshList = []

    for (let i = 0; i < 3.0; i++) {
      this.meshList.push(
        (this.mesh = new Mesh(
          this.$SITECONFIG,
          stage,
          metaballSceneList[i],
          imgPath[i]
        ))
      )
      this.meshList[i].init()
    }

    this.m1Mouse = (e) => {
      if(this.hambergerMenuState) return;

      this.meshList[0].onMouseMove(e)
    }

    this.m2Mouse = (e) => {
      if(this.hambergerMenuState) return;

      this.meshList[1].onMouseMove(e)
    }

    this.m3Mouse = (e) => {
      if(this.hambergerMenuState) return;

      this.meshList[2].onMouseMove(e)
    }

    window.addEventListener('resize', () => {
      for (let i = 0; i < 3.0; i++) {
        this.meshList[i].onResize()
      }
      stage.onResize()
    })

    this.mRaf = () => {
      stage.onRaf()
      for (let i = 0; i < 3.0; i++) {
        this.meshList[i].onRaf()
      }
    }

    // pickupに侵入する時にかくつかないようにRAFを1秒間まわしておく
    this.$gsap.ticker.add(this.pRaf)
    this.$gsap.ticker.add(this.mRaf)
    setTimeout(() => {
      this.$gsap.ticker.remove(this.pRaf)
      this.$gsap.ticker.remove(this.mRaf)
    }, 1000)

    // ページ遷移のために要素を配列にまとめて取得しておく
    this.container = this.$gsap.utils.toArray([
      this.$refs.CanvasFix,
      this.$refs.AsscrollContainer,
    ])
    this.contents = this.$gsap.utils.toArray([
      this.$refs.CanvasFixContents,
      this.$refs.AsscrollContents,
    ])

    // PC/SPでclippathの値を変える
    this.curveDeviceRatio = this.$SITECONFIG.isPc ? '70%' : '130%'
  },
  methods: {
    /**
     * ハンバーガーメニューを閉じる
     */
    hambergerMenuOnClose() {
      this.$store.commit('hambergerMenu/close')
    },
    /**
     * transition start animation
     */
    onTransitionStart() {
      if (this.$SITECONFIG.isNoTouch) {
        this.$gsap.set(this.container, {
          overflow: 'hidden',
        })
        this.scaleAnimation01 = this.$gsap.to(this.container, {
          duration: this.$SITECONFIG.baseDuration,
          ease: this.$EASING.transform,
          scaleX: 0.97,
          borderRadius: '14px',
        })
        this.scaleAnimation02 = this.$gsap.to(this.container, {
          duration: this.$SITECONFIG.baseDuration * 0.92,
          ease: this.$EASING.transform,
          scaleY: 0.94,
        })
        this.pageTranslateAnimation = this.$gsap.to(this.contents, {
          duration: this.$SITECONFIG.baseDuration * 0.92,
          ease: this.$EASING.transform,
          y: -500,
        })
      }
      this.bgAnimation = this.$gsap.to(this.$refs.LayoutsNormalTransitionBg, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.transform,
        clipPath: `ellipse(${this.curveDeviceRatio} 100% at 50% 50%)`,
      })
    },
    /**
     * transition end setting
     */
    onTransitionEnd() {
      if (this.indexPickupIsAnimation) this.$store.commit('indexPickup/sceneAnimationState', false)
      if (this.scaleAnimation01) this.scaleAnimation01.kill()
      if (this.scaleAnimation02) this.scaleAnimation02.kill()
      if (this.pageTranslateAnimation) this.pageTranslateAnimation.kill()
      if (this.bgAnimation) this.bgAnimation.kill()

      if (this.$SITECONFIG.isNoTouch) {
        this.$gsap.set(this.container, {
          scale: 1.0,
          borderRadius: '0px',
          overflow: 'visible',
        })
        this.$gsap.set(this.contents, {
          y: 0,
          clearProps: 'y', // fixedが効かなくなるのでstyleをremoveしておく
        })
      }
      this.$gsap.set(this.$refs.LayoutsNormalTransitionBg, {
        clipPath: `ellipse(${this.curveDeviceRatio} 100% at 50% 200%)`,
      })
    },
  },
}
</script>

<style scoped lang="scss">
:root {
  --viewportWidth: 100vw;
  --viewportHeight: 100vh;
}

// asscroll

.asscroll-container-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.asscroll{
  position: relative;
  width: 100%;
  height: 100%;
}

.asscroll-container {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.asscroll-contents {
  background-color: $skinColor;
}

.layouts-translate {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

// transition
.transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
  overflow: hidden;
}

.layouts-normal-transition-img-wrapper {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: ellipse(70% 100% at 50% 200%);
  backface-visibility: hidden;
  transform: translateZ(0);
  z-index: 10;

  @include sp() {
    clip-path: ellipse(130% 100% at 50% 200%);
  }
}

.layouts-normal-transition-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

    @include tab-vertical() {
      object-position: right;
    }

    @include sp() {
      object-position: center;
    }
  }
}

.layouts-normal-transition-color-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

// canvas

.canvas-fix {
  // display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  & canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.particle {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  & canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
