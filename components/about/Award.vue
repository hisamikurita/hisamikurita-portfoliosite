<template>
  <div ref="Award" class="award">
    <span ref="AwardCardArea" class="award-card-area">
      <div
        v-for="award in awardData"
        :key="award.id"
        ref="AwardCardItem"
        class="award-card-item"
      >
        <CommonCardAward
          :group="award.group"
          :title="award.title"
          :rank="award.rank"
          :date="award.date"
          :modifier="award.modifier"
          :rotate="0"
        ></CommonCardAward>
      </div>
    </span>
    <div class="award-bg">
      <div class="award-inner">
        <div class="l-container">
          <span class="award-title-read-area">
            <CommonSectionReadTitle
              modifier="award-section"
              :state="isTextSegmentState"
              :start="0"
              :text="['・', 'AWARDS']"
            ></CommonSectionReadTitle>
          </span>
          <div class="award-list-wrapper">
            <div class="award-list">
              <div
                v-for="(award, index) in awardData"
                :key="award.id"
                ref="AwardItem"
                class="award-item"
                :data-id="index"
              >
                <p class="award-group">{{ award.group }}</p>
                <p class="award-title">{{ award.title }}</p>
                <p class="award-rank">{{ award.rank }}</p>
              </div>
            </div>
          </div>
          <span class="pc-only">
            <ul class="award-total-list">
              <li class="award-total-item">AWWWARDS*6</li>
              <li class="award-total-item">CSSDA*16</li>
              <li class="award-total-item">CSSWINNER*2</li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import awardData from '@/assets/json/award.json'

export default {
  data: () => {
    return {
      awardData: awardData,
      isTextSegmentState: '',
    }
  },
  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
  },
  mounted() {
    this.award = this.$refs.Award
    this.cards = this.$refs.AwardCardItem
    this.items = this.$refs.AwardItem
    this.itemsHeight = this.items[0].getBoundingClientRect().height
    this.cardHalfWidth = 117
    this.cardHalfHeight = 160
    this.animationFlags = []
    for (let i = 0; i < this.items.length; i++) {
      this.animationFlags.push(false)
    }
    this.observe = this.$refs.Award

    /* text-animation */
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center'
            this.iObserver.unobserve(this.observe)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserver.observe(this.observe)

    if (this.$siteConfig.isNoTouch) {
      this.$gsap.ticker.add(this.cardScrollPos)
      this.$gsap.ticker.add(this.cardScrollAnimation)
      window.addEventListener('mousemove', this.onMousemove)
    }
  },

  beforeDestroy() {
    this.iObserver.unobserve(this.observe)
    if (this.$siteConfig.isNoTouch) {
      this.$gsap.ticker.remove(this.cardScrollPos)
      this.$gsap.ticker.remove(this.cardScrollAnimation)
      window.removeEventListener('mousemove', this.onMousemove)
    }
  },

  methods: {
    cardScrollPos() {
      if (this.hambergerMenuState) return

      this.currentY = this.mouseY + this.$asscroll.targetPos

      this.$gsap.to(this.$refs.AwardCardArea, {
        duration: 0.4,
        ease: 'none',
        x: this.mouseX,
        y: this.currentY,
      })
    },
    cardScrollAnimation() {
      if (this.hambergerMenuState) return

      for (let i = 0; i < this.items.length; i++) {
        const target = this.items[i]
        const rect = target.getBoundingClientRect()
        const startPosY =
          this.award.offsetTop + target.offsetTop - this.cardHalfHeight
        const startPosX = rect.left - this.cardHalfWidth
        const endPosY = startPosY + rect.height
        const endPosX = startPosX + rect.width

        if (this.currentY < startPosY || this.mouseX < startPosX) {
          this.colorFadeOut(target)
          this.cardFadeOut(this.cards[i], i)
        } else if (
          this.currentY >= startPosY &&
          this.currentY < endPosY &&
          this.mouseX >= startPosX &&
          this.mouseX < endPosX
        ) {
          this.colorFadeIn(target)
          this.cardFadeIn(this.cards[i], i)
        } else {
          this.colorFadeOut(target)
          this.cardFadeOut(this.cards[i], i)
        }
      }
    },
    onMousemove(e) {
      if (this.hambergerMenuState) return

      this.mouseX = e.clientX - this.cardHalfWidth
      this.mouseY = e.clientY - this.cardHalfHeight
      this.currentY = this.mouseY + this.$asscroll.targetPos

      this.$gsap.to(this.$refs.AwardCardArea, {
        duration: 0.4,
        ease: 'none',
        x: this.mouseX,
        y: this.currentY,
      })
    },
    cardFadeIn(target, index) {
      if (this.animationFlags[index]) return
      this.animationFlags[index] = true

      this.$gsap.set(target,{
        zIndex: 2,
      })
      this.$gsap.fromTo(target,
      {
        clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)'
      },
      {
        duration: this.$baseAnimationConfig.duration,
        ease: this.$easing.transform,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
      })
    },
    cardFadeOut(target, index) {
      if (!this.animationFlags[index]) return
      this.animationFlags[index] = false

      this.$gsap.set(target,{
        zIndex: 1,
      })
      this.$gsap.fromTo(target,
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
      },
      {
        duration: this.$baseAnimationConfig.duration,
        delay: 0,
        ease: this.$easing.transform,
        clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)'
      })
    },
    colorFadeIn(target) {
      this.$gsap.to(target, {
        duration: 0.4,
        ease: this.$easing.colorAndOpacity,
        color: '#ffffff',
      })
    },
    colorFadeOut(target) {
      this.$gsap.to(target, {
        duration: 0.4,
        ease: this.$easing.colorAndOpacity,
        color: '#828282',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.award {
  position: relative;
  overflow: hidden;
}

.award-bg {
  position: relative;
  background-color: $darkBlack;
}

.award-inner {
  padding: 152px 40px;

  @include sp() {
    padding: 63px vw_sp(20);
  }
}

.award-card-area {
  position: fixed;
  top: 0;
  left: 150px;
  width: 293px;
  height: 400px;
  pointer-events: none;
  z-index: 1;
}

.award-card-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 0% 0, 0% 100%, 0% 100%);
}

.award-title-read-area {
  display: block;
  margin: 0 0 36px 0;

  @include sp() {
    margin: 0 0 40px 0;
  }
}

.award-list-wrapper {
  margin: 0 0 40px 0;
}

.award-list {
  width: vw(1000);

  @include sp() {
    width: 100%;
  }
}

.award-item {
  display: flex;
  padding: 15px 0;
  border-top: solid 1px $gray;
  color: $gray;

  &:last-of-type {
    border-bottom: solid 1px $gray;
  }

  @include sp() {
    display: block;
    padding: 18px 0;
  }
}

.award-group {
  position: relative;
  top: 2px;
  flex-shrink: 0;
  width: vw(238);
  color: $white;
  font-size: 14px;
  letter-spacing: 0.02em;

  @include sp() {
    top: auto;
    width: auto;
    margin: 0 0 10px 0;
    font-size: 10px;
  }
}

.award-title {
  flex-shrink: 0;
  width: vw(440);
  font-size: 60px;
  font-family: 'Six Caps', sans-serif;
  letter-spacing: 0.02em;

  @include sp() {
    width: auto;
    margin: 0 0 8px 0;
    font-size: vw_sp(100);
    text-align: right;
  }
}

.award-rank {
  flex-shrink: 0;
  font-size: 60px;
  font-family: 'Six Caps', sans-serif;
  letter-spacing: 0.02em;

  @include sp() {
    width: auto;
    font-size: vw_sp(100);
  }
}

.award-total-item {
  color: $gray;
  font-size: 12px;
  letter-spacing: 0.02em;

  &:not(:last-of-type) {
    margin: 0 0 4px 0;
  }
}
</style>