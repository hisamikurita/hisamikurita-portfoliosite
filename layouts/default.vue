<template>
  <div>
    <BaseMouse />
    <div ref="AsscrollContainer" class="asscroll-container" asscroll-container>
      <div class="asscroll" asscroll>
        <nuxt />
      </div>
    </div>
    <div ref="Webgl" class="webgl"></div>
    <div class="particle"><canvas ref="Particle"></canvas></div>
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
  computed: {
    pickupData() {
      return this.$store.getters.pickupData
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
    indexPickupScene() {
      return this.$store.getters['indexPickup/scene']
    },
    indexPickupPos() {
      return this.$store.getters['indexPickup/pos']
    },
  },
  watch: {
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
    indexPickupIsAnimation: function () {
      // current
      if (this.indexPickupIsAnimation) {
        this.$gsap.ticker.add(this.pRaf)
      }
      // no current
      else {
        this.$gsap.ticker.remove(this.pRaf)
      }
    },
    indexPickupScene: function () {
      switch (this.indexPickupScene) {
        case 'next01':
          this.particle.setNextScene01()
          this.mesh.setSceneFirst()
          break
        case 'next02':
          this.particle.setNextScene02()
          this.mesh.setScene(2)
          break
        case 'next03':
          this.particle.setNextScene03()
          this.mesh.setScene(3)
          break
        case 'next04':
          this.particle.setNextScene04()
          this.mesh.setSceneEnd()
          break
        case 'prev00':
          this.particle.setPrevScene00()
          this.mesh.setSceneEnd()
          break
        case 'prev01':
          this.particle.setPrevScene01()
          this.mesh.setScene(1)
          break
        case 'prev02':
          this.particle.setPrevScene02()
          this.mesh.setScene(2)
          break
        case 'prev03':
          this.particle.setPrevScene03()
          this.mesh.setSceneFirst()
          break
      }
    },
  },
  mounted() {
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

    this._raf = () => {
      stage.onRaf()
      this.mesh.onRaf()
    }

    this.$gsap.ticker.add(this._raf)
  },
}
</script>

<style scoped lang="scss">
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

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;

  & canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.particle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;

  & canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>