<template>
  <div class="archive js-hold-target">
    <ul ref="ArchiveList" class="archive-list">
      <li v-for="(archive, index) in archives" :key="index" ref="ArchiveItem" class="archive-item" :data-pcimg="`/images/${archive.image.pc}`" :data-spimg="`/images/${archive.image.sp}`">
        <a :href="`${archive.link}`" class="archive-link" target="_blank" rel="noopener">
          <picture>
            <source :srcset="`/images/${archive.image.sp}`" media="(max-width: 767px)" />
            <img class="archive-img" :src="`/images/${archive.image.pc}`" width="440" height="680" :alt="`${archive.fullTitle}`" />
          </picture>
        </a>
      </li>
    </ul>
    <div ref="ArchiveCanvas" class="archive-canvas"></div>
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'
import Mesh from '../components/canvas/archive/mesh'
import GlElements from '../components/canvas/archive/gl-elements'
import Stage from '../components/canvas/stage'
import archives from '@/assets/json/archive.json'

export default {
  name: 'Archive',

  data() {
    return {
      archives: archives,
    }
  },

  head() {
    return {
      title: 'Hisami Kurita Portfolio | ARCHIVE',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Hisami Kurita Portfolio | ARCHIVE' },
      ]
    }
  },

  computed: {
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    imageTransitionState() {
      return this.$store.getters['image-transition/state']
    },
    pickupTransitionState() {
      return this.$store.getters['indexPickup/transition']
    },
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
    sortNumber() {
      return function (number) {
        return ('0' + (number + 1.0)).slice(-3)
      }
    },
  },

  watch: {
    openningEnd() {
      // update
      this.setWrapPosition()

      this.crateMesh()

      setTimeout(() => {
        this.$gsap.ticker.add(this.updatePosition)
        this.onOpening()
      }, 100)

      setTimeout(() => {
        // スクロール可能にする
        if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
        this.$asscroll.enable({ reset: true })
        this.$asscroll.disable()
      }, 1200)
    },
    imageLoaded() {
      if (this.imageLoaded) {
        if (!this.openningEnd) return

        this.$store.commit('mouse/loadend')
        // スクロール可能にする
        if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)

        this.$asscroll.enable({ reset: true })
        this.$asscroll.disable()

        // update
        this.setWrapPosition()

        this.crateMesh()

        setTimeout(() => {
          this.raf = this.$gsap.ticker.add(this.updatePosition)
          this.onOpening()
        }, 100)
      }
    },
  },

  mounted() {
    this.$preDefaultEvent(true)

    this.deviceRatioLerp = this.$SITECONFIG.isPc ? 1.0 : 2.0
    this.deviceRatioMove = this.$SITECONFIG.isPc ? 1.0 : 2.5
    this.wrapper = this.$refs.ArchiveList
    this.wrapperRect = this.wrapper.getBoundingClientRect()
    this.raf = null

    // init
    this.medias = []
    for (let i = 0; i < this.$refs.ArchiveItem.length; i++) {
      this.medias[i] = {}
      this.medias[i].elm = this.$refs.ArchiveItem[i]
      this.medias[i].extra = {
        x: 0,
        y: 0,
      }
    }

    this.isOpenningEnd = false
    this.opOffset = {
      value: this.wrapperRect.height * 1.2,
      end: this.wrapperRect.height,
    }

    this.isDown = false
    this.x = {
      start: 0,
      end: 0,
      distance: 0,
      allDistance: 0,
      target: 0,
      current: 0,
      lerp: 0.075 / this.deviceRatioLerp,
      direction: '',
    }
    this.y = {
      start: 0,
      end: 0,
      distance: 0,
      allDistance: 0,
      target: -this.opOffset.value,
      current: 0,
      lerp: 0.075 / this.deviceRatioLerp,
      direction: '',
    }
    this.scrollCurrent = {
      x: 0,
      y: 0,
    }
    this.save = {
      x: 0,
      y: 0,
    }
    this.wheel = {
      x: 0,
      y: this.opOffset.end,
    }
    this.key = {
      x: 0,
      y: 0,
      strength: 0,
    }
    this.extra = {
      x: 0,
      y: 0,
    }
    this.width = window.innerWidth

    this.$nextTick(() => {
      const images = document.querySelectorAll('.archive img')
      const imagesLoaded = ImagesLoaded(images)

      imagesLoaded.on('always', () => {
        if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
        if (this.imageTransitionState) this.$store.commit('image-transition/end')
        if (this.pickupTransitionState) this.$store.commit('indexPickup/transition', false)

        this.$store.commit('imageLoaded/loaded')
      })
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('resize', this.setWrapPosition)
    window.removeEventListener('mousedown', this.onTouchDown)
    window.removeEventListener('mousemove', this.onTouchMove)
    window.removeEventListener('mouseup', this.onTouchUp)
    window.removeEventListener('touchstart', this.onTouchDown, { passive: false })
    window.removeEventListener('touchmove', this.onTouchMove, { passive: false })
    window.removeEventListener('touchend', this.onTouchUp, { passive: false })
    window.removeEventListener('wheel', this.onMouseWheel, { passive: false })
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('keydown', this.onKeyDown)
    this.$gsap.ticker.remove(this.updatePosition)
    this.stage._destroy()
    this.stage = null
    for (let i = 0; i < this.medias.length; i++) {
      this.meshArray[i]._destroy()
      this.meshArray[i] = null
    }
    this.glElements = null
    this.$preDefaultEvent(false)
    this.$asscroll.disable()
    this.$store.commit('imageLoaded/init')
  },

  methods: {
    crateMesh() {
      this.stage = new Stage(this.$refs.ArchiveCanvas)
      this.stage.init()

      this.meshArray = []

      this.glElements = new GlElements(this.$refs.ArchiveItem)
      this.glElements.init()

      this.glElements.optionList.forEach((item, i) => {
        this.meshArray[i] = new Mesh(this.stage, item, this.$SITECONFIG)
        this.meshArray[i].init()
      })
    },

    setWrapPosition() {
      this.wrapperRect = this.wrapper.getBoundingClientRect()

      const x = window.innerWidth / 2.0 - this.wrapperRect.width / 2.0
      const y = window.innerHeight / 2.0 - this.wrapperRect.height / 2.0
      this.$gsap.set(this.wrapper, {
        x: x,
        y: y,
      })
    },
    updatePosition() {
      if (this.hambergerMenuState) return

      this.x.current = this.$gsap.utils.interpolate(this.x.current, this.x.target, this.x.lerp)
      this.y.current = this.$gsap.utils.interpolate(this.y.current, this.y.target, this.y.lerp)

      if (this.save.x < this.x.current) {
        this.x.direction = 'right'
      } else if (this.save.x > this.x.current) {
        this.x.direction = 'left'
      }

      if (this.save.y < this.y.current) {
        this.y.direction = 'bottom'
      } else if (this.save.y > this.y.current) {
        this.y.direction = 'top'
      }

      this.save.x = this.x.current
      this.save.y = this.y.current

      for (let i = 0; i < this.medias.length; i++) {
        if (this.isOpenningEnd) {
          const rect = this.medias[i].elm.getBoundingClientRect()

          if (this.x.direction === 'right' && rect.left < -rect.width) {
            this.medias[i].extra.x += this.wrapperRect.width
          } else if (this.x.direction === 'left' && window.innerWidth < rect.left) {
            this.medias[i].extra.x -= this.wrapperRect.width
          }

          if (this.y.direction === 'top' && window.innerHeight < rect.top) {
            this.medias[i].extra.y -= this.wrapperRect.height
          } else if (this.y.direction === 'bottom' && rect.top < -rect.height) {
            this.medias[i].extra.y += this.wrapperRect.height
          }
        }

        this.medias[i].elm.style.transform = `translate(${-this.x.current + this.medias[i].extra.x}px, ${-this.y.current + this.medias[i].extra.y + this.opOffset.value}px)`
      }

      // webgl
      this.stage.onRaf()
      this.glElements.onResize()
      for (let i = 0; i < this.medias.length; i++) {
        const strengthX = ((this.x.current - this.x.target) / window.innerWidth) * 1.8
        const strengthY = ((this.y.current - this.y.target) / window.innerWidth) * 1.8
        const rotateValue = (strengthX + strengthY) / 16.0
        this.meshArray[i]._setStrength(strengthX, strengthY)
        this.meshArray[i]._setRotate(rotateValue)
        this.meshArray[i].onRaf()
      }
    },
    onTouchDown(e) {
      if (this.hambergerMenuState) return

      this.isDown = true

      this.x.start = e.touches ? e.touches[0].clientX : e.clientX
      this.y.start = e.touches ? e.touches[0].clientY : e.clientY

      this.scrollCurrent.x = this.save.x
      this.scrollCurrent.y = this.save.y
    },
    onTouchMove(e) {
      if (this.hambergerMenuState || !this.isDown) return

      this.$refs.ArchiveList.style.pointerEvents = 'none'

      const x = e.touches ? e.touches[0].clientX : e.clientX
      const y = e.touches ? e.touches[0].clientY : e.clientY

      this.x.end = x
      this.y.end = y

      this.x.distance = (this.x.start - this.x.end) * this.deviceRatioMove
      this.y.distance = (this.y.start - this.y.end) * this.deviceRatioMove

      this.x.target = this.x.distance + this.scrollCurrent.x
      this.y.target = this.y.distance + this.scrollCurrent.y
    },
    onTouchUp(e) {
      if (this.hambergerMenuState) return

      this.isDown = false
      this.$refs.ArchiveList.style.pointerEvents = 'auto'

      const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
      const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY

      this.x.end = x
      this.y.end = y

      this.x.distance = (this.x.start - this.x.end) * this.deviceRatioMove
      this.y.distance = (this.y.start - this.y.end) * this.deviceRatioMove

      this.x.allDistance += this.x.distance
      this.y.allDistance += this.y.distance

      this.x.target = this.x.distance + this.scrollCurrent.x
      this.y.target = this.y.distance + this.scrollCurrent.y
    },
    onMouseWheel(e) {
      if (this.hambergerMenuState) return

      this.wheel.x += e.deltaX
      this.wheel.y += e.deltaY
      this.x.target = this.wheel.x + this.key.x + this.x.allDistance
      this.y.target = this.wheel.y + this.key.y + this.y.allDistance
    },
    onKeyUp() {
      this.key.strength = 0
    },
    onKeyDown(e) {
      if (this.hambergerMenuState) return

      if (this.key.strength < 140) this.key.strength += 12.0

      if (e.key === 'ArrowDown') {
        this.key.y += this.key.strength
      }
      if (e.key === 'ArrowUp') {
        this.key.y += -this.key.strength
      }
      if (e.key === 'ArrowRight') {
        this.key.x += this.key.strength
      }
      if (e.key === 'ArrowLeft') {
        this.key.x += -this.key.strength
      }

      this.x.target = this.key.x + this.wheel.x + this.x.allDistance
      this.y.target = this.key.y + this.wheel.y + this.y.allDistance
    },
    onResize() {
      if (this.width !== window.innerWidth) {
        this.width = window.innerWidth

        this.x.current = 0
        this.y.current = 0
        this.wheel.x = 0
        this.wheel.y = 0
        this.x.allDistance = 0
        this.y.allDistance = 0
        this.save.x = 0
        this.save.y = 0
        this.x.target = 0
        this.y.target = 0

        for (let i = 0; i < this.medias.length; i++) {
          this.medias[i].extra.x = 0
          this.medias[i].extra.y = 0
        }
      }

      this.stage.onResize()

      for (let i = 0; i < this.medias.length; i++) {
        this.meshArray[i].onResize()
      }
    },
    onOpening() {
      this.$gsap.to(this.opOffset, {
        duration: this.$SITECONFIG.fullDuration + 0.8,
        ease: this.$EASING.transform,
        value: -this.opOffset.end,
        onUpdate: () => {
          this.y.target = -this.opOffset.value

          if (this.y.target > 0) {
            this.isOpenningEnd = true
          }
        },
        onComplete: () => {
          // events
          setTimeout(() => {
            window.addEventListener('resize', this.onResize)
            window.addEventListener('resize', this.setWrapPosition)
            window.addEventListener('mousedown', this.onTouchDown)
            window.addEventListener('mousemove', this.onTouchMove)
            window.addEventListener('mouseup', this.onTouchUp)
            window.addEventListener('touchstart', this.onTouchDown, { passive: false })
            window.addEventListener('touchmove', this.onTouchMove, { passive: false })
            window.addEventListener('touchend', this.onTouchUp, { passive: false })
            window.addEventListener('wheel', this.onMouseWheel, { passive: false })
            window.addEventListener('keyup', this.onKeyUp)
            window.addEventListener('keydown', this.onKeyDown)
          }, 100)
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$gap: 60px;
$gap-sp: 26px;

.archive {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $darkBlack;
}

.archive-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $darkBlack;
  z-index: 100;
  pointer-events: none;
}

.archive * {
  user-select: none;
}

.archive-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, #{vw(220)});
  grid-row-gap: $gap;
  grid-column-gap: $gap;
  position: relative;
  width: calc((#{vw(220)} * 6) + (#{$gap} * 5));
  padding: $gap * 0.5;
  box-sizing: content-box;
  z-index: 1;

  @include sp() {
    grid-template-columns: repeat(auto-fit, #{vw_sp(352)});
    grid-row-gap: $gap-sp;
    grid-column-gap: $gap-sp;
    padding: $gap-sp * 0.5;
    width: calc((#{vw_sp(352)} * 4) + (#{$gap-sp} * 3));
  }
}

.archive-item {
  position: relative;
  width: vw(220);
  height: vw(300);
  border-radius: 6px;
  overflow: hidden;
  opacity: 0;
  transform: translate(0, 9999px);

  @include sp() {
    width: vw_sp(352);
    height: vw_sp(528);
  }
}

.archive-item:nth-of-type(even) {
  margin: vw(-190) 0 0 0;

  @include sp() {
    margin: vw_sp(-300) 0 0 0;
  }
}

// SPで余が出ないように消しておく
.archive-item:nth-of-type(17),
.archive-item:nth-of-type(18) {
  @include sp() {
    display: none;
  }
}

.archive-link {
  display: block;
  width: 100%;
  height: 100%;
}

.archive-textarea {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  z-index: 1;
  pointer-events: none;

  @include sp() {
    padding: 14px;
  }
}

.archive-circle {
  display: block;
  font-size: 36px;
  text-indent: -4px;
  line-height: 1;

  @include sp() {
    font-size: 28px;
  }
}

.archive-fulltitle {
  display: block;
  margin: 0 0 2px 0;
  font-size: 20px;
  font-family: $helvetica;
  line-height: 1.2;

  @include sp() {
    font-size: 16px;
  }
}

.archive-index {
  display: block;
  font-size: 20px;
  font-family: $helvetica;
  line-height: 1.2;

  @include sp() {
    font-size: 16px;
  }
}

.archive-shorttitle {
  position: absolute;
  bottom: 26px;
  left: 20px;
  width: 100%;
  font-size: 120px;
  font-family: 'Six Caps', sans-serif;

  @include sp() {
    bottom: 18px;
    left: 14px;
    font-size: 76px;
  }
}

.archive-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 1;
  pointer-events: none;
}

.archive-canvas {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
