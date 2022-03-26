<template>
  <div :class="[isAndroid, isWindows]">
    <BaseOpenning />
    <BaseMouse />
    <div ref="AsscrollContainer" class="asscroll-container" asscroll-container>
      <div class="asscroll" asscroll>
        <nuxt />
      </div>
    </div>
    <div ref="LayoutsFix" class="layouts-fix">
      <div ref="Webgl" class="webgl"></div>
      <div class="particle"><canvas ref="Particle"></canvas></div>
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
              :srcset="`${data.heroImg.url}?fm=webp&w=2560&h=1600&q=50`"
              :width="`${data.heroImg.width}`"
              :height="`${data.heroImg.height}`"
              type="image/webp"
            />
            <img
              :src="`${data.heroImg.url}?w=2560&h=1600&q=50`"
              :width="`${data.heroImg.width}`"
              :height="`${data.heroImg.height}`"
            />
          </picture>
        </span>
        <span
          ref="LayoutsNormalTransitionColorBg"
          class="layouts-normal-transition-color-bg"
        ></span>
      </div>
    </div>
    <div ref="AsscrollContainerCover" class="asscroll-container-cover"></div>
    <BaseHeader />
    <BaseHambergerMenu />
  </div>
</template>

<script>
import Particle from '../components/canvas/index/pickup/particle'
import Mesh from '../components/canvas/index/pickup/metaball'
import Stage from '../components/canvas/stage'
import { preEvent } from '../assets/js/preEvent'

export default {
  data: () => {
    return {
      isAndroid: '',
      isWindows: '',
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
    pickupTransitionState() {
      return this.$store.getters['indexPickup/transition']
    },
    indexPickupScene() {
      return this.$store.getters['indexPickup/scene']
    },
    indexPickupPos() {
      return this.$store.getters['indexPickup/pos']
    },
  },
  watch: {
    defaultTransitionState: function () {
      if (this.defaultTransitionState) {
        this.$gsap.set(this.$refs.LayoutsNormalTransitionColorBg, {
          backgroundColor: this.defaultTransitionColor,
          opacity: 1,
        })
        this.onTransitionStart()
      } else {
        this.onTransitionEnd()
        this.$gsap.set(this.$refs.LayoutsNormalTransitionColorBg, {
          opacity: 0,
        })
      }
    },

    imageTransitionState: function () {
      if (this.imageTransitionState) {
        const index =
          this.imageTransitionIndex > this.getProjectData.length - 1
            ? 0
            : this.imageTransitionIndex

        for (let i = 0; i < this.$refs.LayoutsNormalTransitionImg.length; i++) {
          this.$gsap.set(this.$refs.LayoutsNormalTransitionImg[i], {
            opacity: 0,
          })
        }

        this.$gsap.set(this.$refs.LayoutsNormalTransitionImg[index], {
          opacity: 1.0,
        })

        this.onTransitionStart()
      } else {
        this.onTransitionEnd()
        for (let i = 0; i < this.$refs.LayoutsNormalTransitionImg.length; i++) {
          this.$gsap.set(this.$refs.LayoutsNormalTransitionImg[i], {
            opacity: 0,
          })
        }
      }
    },

    hambergerMenuState: function () {
      /**
       * ハンバガーメニューが開いた時
       */
      if (this.hambergerMenuState) {
        this.$refs.AsscrollContainerCover.style.pointerEvents = 'auto'

        if (this.$SITECONFIG.isPc) {
          this.$gsap.to(this.$refs.AsscrollContainer, {
            delay: 0.2,
            duration: this.$SITECONFIG.baseDuration / 3.0,
            ease: this.$EASING.transform,
            x: -560,
          })
          this.$gsap.to(this.$refs.LayoutsFix, {
            delay: 0.2,
            duration: this.$SITECONFIG.baseDuration / 3.0,
            ease: this.$EASING.transform,
            x: -560,
          })
        }

        if (this.$SITECONFIG.isTouch) {
          this.$backfaceScroll(false)
        } else if (this.$SITECONFIG.isNoTouch) {
          this.$asscroll.disable({ inputOnly: true })
          window.removeEventListener('wheel', preEvent, { passive: false })
        }
      } else if (!this.hambergerMenuState) {
        /**
         * ハンバガーメニューが閉じた時
         */
        this.$refs.AsscrollContainerCover.style.pointerEvents = 'none'

        if (this.$SITECONFIG.isPc) {
          this.$gsap.to(this.$refs.AsscrollContainer, {
            delay: 0.2,
            duration: this.$SITECONFIG.baseDuration / 3.0,
            ease: this.$EASING.transform,
            x: 0,
          })
          this.$gsap.to(this.$refs.LayoutsFix, {
            delay: 0.2,
            duration: this.$SITECONFIG.baseDuration / 3.0,
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
          if (this.indexPickupState) return
          this.$asscroll.enable()
        }
      }
    },
    pickupTransitionState: function () {
      if (this.pickupTransitionState) {
        this.particle.setNextPageStart()
        this.mesh.setNextPageStart()
      } else {
        console.log('発火')
        // setTimeout(()=>{
        this.particle.setNextPageEnd()
        this.mesh.setNextPageEnd()
        // },300)
        //     this.$gsap.ticker.remove(this.pRaf)
        // this.$gsap.ticker.remove(this.mRaf)
      }
    },
    indexPickupIsAnimation: function () {
      // current
      if (this.indexPickupIsAnimation) {
        this.$gsap.ticker.add(this.pRaf)
        this.$gsap.ticker.add(this.mRaf)
      }
      // no current
      else {
        // setTimeout(()=>{
        console.log('remove')
        this.$gsap.ticker.remove(this.pRaf)
        this.$gsap.ticker.remove(this.mRaf)
        // },1000)
      }
    },
    indexPickupScene: function () {
      switch (this.indexPickupScene) {
        case 'next01':
          // console.log('next1')
          this.particle.setSceneFirst()
          this.mesh.setSceneFirst()
          break
        case 'next02':
          // console.log('next2')
          this.particle.setScene(2)
          this.mesh.setScene(2)
          break
        case 'next03':
          // console.log('next3')
          this.particle.setScene(3)
          this.mesh.setScene(3)
          break
        case 'next04':
          this.particle.setSceneEnd()
          this.mesh.setSceneEnd()
          break
        case 'prev00':
          this.particle.setSceneEnd()
          this.mesh.setSceneEnd()
          break
        case 'prev01':
          this.particle.setScene(1)
          this.mesh.setScene(1)
          break
        case 'prev02':
          this.particle.setScene(2)
          this.mesh.setScene(2)
          break
        case 'prev03':
          this.particle.setSceneFirst()
          this.mesh.setSceneFirst()
          break
        // case 'nextpage':

        //   break
      }
    },
  },
  mounted() {
    console.log(`///////////////////////////////////////////////
///// Don't look at the source code (ﾟｰﾟ) /////
//////////////////////////////////////////////`)
    // checkdevice
    if (this.$checkDevice.isAndroid) {
      this.isAndroid = 'is-android'
    }
    if (this.$checkDevice.isWindows) {
      this.isWindows = 'is-windows'
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
    const imgPath = [
      `${this.pickupData[0].heroImg.url}?fm=webp&w=2560&h=1600&q=50`,
      `${this.pickupData[1].heroImg.url}?fm=webp&w=2560&h=1600&q=50`,
      `${this.pickupData[2].heroImg.url}?fm=webp&w=2560&h=1600&q=50`,
    ]

    const stage = new Stage(this.$refs.Webgl)
    stage.init()

    this.mesh = new Mesh(this.$SITECONFIG, stage, imgPath)
    this.mesh.init()

    window.addEventListener('resize', () => {
      this.mesh.onResize()
      stage.onResize()
    })

    // setTimeout(()=>{
    //   this.mesh.setNextPage();
    // },3000);

    this.mRaf = () => {
      stage.onRaf()
      this.mesh.onRaf()
    }
  },
  methods: {
    onTransitionStart() {
      this.$gsap.set(this.$refs.AsscrollContainer, {
        overflow: 'hidden',
      })
      this.scaleAnimation01 = this.$gsap.to(this.$refs.AsscrollContainer, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.transform,
        scaleX: 0.97,
        borderRadius: '14px',
      })
      this.scaleAnimation02 = this.$gsap.to(this.$refs.AsscrollContainer, {
        duration: this.$SITECONFIG.baseDuration * 0.92,
        ease: this.$EASING.transform,
        scaleY: 0.94,
      })
      this.bgAnimation = this.$gsap.to(this.$refs.LayoutsNormalTransitionBg, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.transform,
        clipPath: 'ellipse(70% 100% at 50% 50%)',
      })
    },
    onTransitionEnd() {
      this.scaleAnimation01.kill()
      this.scaleAnimation02.kill()
      this.bgAnimation.kill()
      this.$gsap.set(this.$refs.AsscrollContainer, {
        scale: 1.0,
        borderRadius: '0px',
        overflow: 'visible',
      })
      this.$gsap.set(this.$refs.LayoutsNormalTransitionBg, {
        clipPath: 'ellipse(70% 100% at 50% 200%)',
      })
    },
  },
}
</script>

<style scoped lang="scss">
:root {
  --viewportWidth: 0;
  --viewportHeight: 0;
}

.asscroll-container-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  @include sp() {
    display: none;
  }
}

.asscroll-container {
  background-color: $skinColor;
  overflow: hidden;
}

.layouts-translate {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.layouts-fix {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

// .layouts-normal-transition-bg {
//   display: block;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate3d(-50%, -50%, 0);
//   width: 100%;
//   height: 100%;
//   clip-path: ellipse(80% 0% at 50% 100%);
// }

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