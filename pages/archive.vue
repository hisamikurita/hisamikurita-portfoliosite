<template>
  <div class="archive">
    <ul ref="ArchiveList" class="archive-list">
      <li
        v-for="(archive, index) in archives"
        :key="index"
        ref="ArchiveItem"
        class="archive-item"
      >
        <a :href="`${archive.link}`" class="archive-link" target="_blank" rel="noopener">
          <span class="archive-textarea">
            <span class="archive-circle">・</span>
            <span class="archive-fulltitle">{{ archive.fullTitle }}</span>
            <span class="archive-index">#{{ sortNumber(index) }}</span>
            <span class="archive-shorttitle">{{ archive.shortTitle }}</span>
          </span>
          <img
            class="archive-img"
            :src="`/images/${archive.image}`"
            width="440"
            height="680"
            :alt="`${archive.fullTitle}`"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'
import { preEvent } from '../assets/js/preEvent'
import archives from '@/assets/json/archive.json'

export default {
  name: 'Archive',

  data() {
    return {
      archives: archives,
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
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
    sortNumber() {
      return function (number) {
        return ('00' + (number + 1.0)).slice(-2)
      }
    },
  },

  watch: {
    openningEnd: function () {
      setTimeout(() => {
        this.$asscroll.enable({ reset: true })
        this.$asscroll.disable()
      }, 1200)
    },
    imageLoaded: function () {
      if (this.imageLoaded) {
        if (!this.openningEnd) return

        this.$asscroll.enable({ reset: true })
        this.$asscroll.disable()
      }
    },
  },

  mounted() {
    // init
    this.isDown = false
    this.x = {
      start: 0,
      end: 0,
      distance: 0,
      allDistance: 0,
      target: 0,
      current: 0,
      lerp: 0.1,
    }
    this.y = {
      start: 0,
      end: 0,
      distance: 0,
      allDistance: 0,
      target: 0,
      current: 0,
      lerp: 0.1,
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
      y: 0,
    }

    // update
    this.setWrapPosition()
    this.$gsap.ticker.add(this.updatePosition)

    // events
    window.addEventListener('resize', this.setWrapPosition)
    window.removeEventListener('wheel', preEvent, { passive: false })
    window.addEventListener('mousedown', this.onTouchDown)
    window.addEventListener('mousemove', this.onTouchMove)
    window.addEventListener('mouseup', this.onTouchUp)
    window.addEventListener('touchstart', this.onTouchDown)
    window.addEventListener('touchmove', this.onTouchMove)
    window.addEventListener('touchend', this.onTouchUp)
    window.addEventListener('wheel', this.onMouseWheel)

    this.$nextTick(() => {
      const images = document.querySelectorAll('.archive img')
      const imagesLoaded = ImagesLoaded(images)

      imagesLoaded.on('always', () => {
        if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
        if (this.imageTransitionState) this.$store.commit('image-transition/end')
        if (this.pickupTransitionState) this.$store.commit('indexPickup/transition', false)
        if (this.$SITECONFIG.isNoTouch) this.$store.commit('mouse/loadend')

        this.$store.commit('imageLoaded/loaded')
      })
    })
  },

  beforeDestroy() {
    window.addEventListener('wheel', preEvent, { passive: false })
    window.removeEventListener('resize', this.setWrapPosition)
    window.removeEventListener('mousedown', this.onTouchDown)
    window.removeEventListener('mousemove', this.onTouchMove)
    window.removeEventListener('mouseup', this.onTouchUp)
    window.removeEventListener('touchstart', this.onTouchDown)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchUp)
    this.$gsap.ticker.remove(this.updatePosition)
    this.$preDefaultEvent(false)
    this.$asscroll.disable()
    this.$store.commit('imageLoaded/init')
  },

  methods: {
    setWrapPosition() {
      const x =
        window.innerWidth / 2.0 - this.$refs.ArchiveList.clientWidth / 2.0
      const y =
        window.innerHeight / 2.0 - this.$refs.ArchiveList.clientHeight / 2.0
      this.$refs.ArchiveList.style.transform = `translate(${x}px, ${y}px)`
    },
    updatePosition() {
      this.x.current = this.$gsap.utils.interpolate(this.x.current, this.x.target, this.x.lerp)
      this.y.current = this.$gsap.utils.interpolate(this.y.current, this.y.target, this.y.lerp)

      this.save.x = this.x.current
      this.save.y = this.y.current

      for (let i = 0; i < this.$refs.ArchiveItem.length; i++) {
        this.$refs.ArchiveItem[i].style.transform = `translate(${-this.x.current}px, ${-this.y.current}px)`
      }
    },
    onTouchDown(e) {
      this.isDown = true

      this.x.start = e.touches ? e.touches[0].clientX : e.clientX
      this.y.start = e.touches ? e.touches[0].clientY : e.clientY

      this.scrollCurrent.x = this.save.x
      this.scrollCurrent.y = this.save.y
    },
    onTouchMove(e) {
      if (!this.isDown) return
      this.$refs.ArchiveList.style.pointerEvents = 'none'

      const x = e.touches ? e.touches[0].clientX : e.clientX
      const y = e.touches ? e.touches[0].clientY : e.clientY

      this.x.end = x
      this.y.end = y

      this.x.distance = this.x.start - this.x.end
      this.y.distance = this.y.start - this.y.end

      this.x.target = this.x.distance + this.scrollCurrent.x
      this.y.target = this.y.distance + this.scrollCurrent.y
    },
    onTouchUp(e) {
      this.isDown = false
      this.$refs.ArchiveList.style.pointerEvents = 'auto'

      const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
      const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY

      this.x.end = x
      this.y.end = y

      this.x.distance = this.x.start - this.x.end
      this.y.distance = this.y.start - this.y.end

      this.x.allDistance += this.x.distance
      this.y.allDistance += this.y.distance

      this.x.target = this.x.distance + this.scrollCurrent.x
      this.y.target = this.y.distance + this.scrollCurrent.y
    },
    onMouseWheel(e) {
      this.wheel.x += e.deltaX
      this.wheel.y += e.deltaY
      this.x.target = this.wheel.x + this.x.allDistance
      this.y.target = this.wheel.y + this.y.allDistance
    },
  },
}
</script>

<style lang="scss" scoped>
.archive {
  background-color: $darkBlack;
}

.archive * {
  user-select: none;
}

.archive-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, #{vw(220)});
  grid-row-gap: 40px;
  grid-column-gap: 40px;
  width: calc((#{vw(220)} * 6) + (40px * 5));
}

.archive-item {
  position: relative;
  width: vw(220);
  height: vw(340);
}

.archive-link{
  display: block;
}

.archive-textarea {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.archive-circle {
  display: block;
  font-size: 36px;
  text-indent: -4px;
  line-height: 1;
}

.archive-fulltitle {
  display: block;
  margin: 0 0 2px 0;
  font-size: 20px;
  font-family: $helvetica;
  line-height: 1.2;
}

.archive-index {
  display: block;
  font-size: 20px;
  font-family: $helvetica;
  line-height: 1.2;
}

.archive-shorttitle {
  position: absolute;
  bottom: 26px;
  left: 20px;
  width: 100%;
  font-size: 120px;
  font-family: 'Six Caps', sans-serif;
}

.archive-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
