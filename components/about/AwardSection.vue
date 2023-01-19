<template>
  <div ref="Award" class="award">
    <div ref="AwardCardArea" class="award-card-area">
      <div v-for="award in awardData" :key="award.id" ref="AwardCardItem" class="award-card-item">
        <CardAward :group="award.group" :title="award.title" :rank="award.rank" :date="award.date" :modifier="award.modifier" />
      </div>
    </div>
    <div class="award-bg">
      <div class="award-inner">
        <div class="l-container">
          <span class="award-title-read-area">
            <AppReadTitle :state="isTextSegmentState" :text="['・', 'AWARDS']" :modifier="'award-section'" />
          </span>
          <div class="award-list-wrapper">
            <div ref="AwardList" class="award-list">
              <div v-for="(award, index) in awardData" :key="award.id" ref="AwardItem" class="award-item" :data-id="index">
                <AppBounceLine :state="'expand'" :pc-animation="false" :sp-animation="false" :width="1000" :modifier="'about-award'" />
                <p class="award-group">{{ award.group }}</p>
                <p class="award-title">{{ award.title }}</p>
                <p class="award-rank">{{ award.rank }}</p>
              </div>
              <div class="award-list-bottom-line">
                <AppBounceLine :state="'expand'" :pc-animation="false" :sp-animation="false" :width="1000" :modifier="'about-award-last'" />
              </div>
            </div>
          </div>
          <div class="pc-only">
            <ul class="award-total-list">
              <li class="award-total-item">AWWWARDS*{{ awardDataLength.awwwwardsTotalLength }}</li>
              <li class="award-total-item">CSSDA*{{ awardDataLength.cssdesignawardsTotalLength }}</li>
              <li class="award-total-item">CSSWINNER*{{ awardDataLength.csswinnerTotalLength }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    awardData: {
      type: Array,
      required: true,
    },
    awardDataLength: {
      type: Object,
      required: true,
    },
  },

  data: () => {
    return {
      isTextSegmentState: 'default',
      count: 0,
    }
  },
  computed: {
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
  },
  mounted() {
    // init
    this.award = this.$refs.Award
    this.cards = this.$refs.AwardCardItem
    this.items = this.$refs.AwardItem
    this.itemsHeight = this.items[0].getBoundingClientRect().height
    this.cardHalfWidth = 117
    this.cardHalfHeight = 160
    this.animationFlags = []
    this.isAllResetAnimation = false
    this.mouseX = window.innerWidth / 2
    this.mouseY = 0
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

    if (this.$SITECONFIG.isNoTouch) {
      this.animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.$gsap.ticker.add(this.cardScrollPos)
              this.$gsap.ticker.add(this.cardScrollAnimation)
              window.removeEventListener('mousemove', this.saveMousemove)
              window.addEventListener('mousemove', this.onMousemove)
            } else {
              this.$gsap.ticker.remove(this.cardScrollPos)
              this.$gsap.ticker.remove(this.cardScrollAnimation)
              window.addEventListener('mousemove', this.saveMousemove)
              window.removeEventListener('mousemove', this.onMousemove)
            }
          })
        },
        { rootMargin: '0%' }
      )
      this.animationObserver.observe(this.observe)
    }
  },

  beforeDestroy() {
    this.iObserver.unobserve(this.observe)
    this.iObserver = null
    if (this.$SITECONFIG.isNoTouch) {
      this.$gsap.ticker.remove(this.cardScrollPos)
      this.$gsap.ticker.remove(this.cardScrollAnimation)
      window.removeEventListener('mousemove', this.onMousemove)
      window.removeEventListener('mousemove', this.saveMousemove)
      this.animationObserver.unobserve(this.observe)
      this.animationObserver = null
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

      const list = this.$refs.AwardList
      const rect = list.getBoundingClientRect()
      const startPosY = this.award.offsetTop + list.offsetTop - this.cardHalfHeight
      const startPosX = rect.left - this.cardHalfWidth
      const endPosY = startPosY + rect.height
      const endPosX = startPosX + rect.width
      // prettier-ignore
      if (this.currentY < startPosY || this.mouseX < startPosX) {
        this.allCardFadeOut()
      } else if (this.currentY >= startPosY && this.currentY < endPosY && this.mouseX >= startPosX && this.mouseX < endPosX) {
        ; // 何もしない
      } else {
        this.allCardFadeOut()
      }

      for (let i = 0; i < this.items.length; i++) {
        const target = this.items[i]
        const rect = target.getBoundingClientRect()
        const startPosY = this.award.offsetTop + target.offsetTop - this.cardHalfHeight
        const startPosX = rect.left - this.cardHalfWidth
        const endPosY = startPosY + rect.height
        const endPosX = startPosX + rect.width

        if (this.currentY < startPosY || this.mouseX < startPosX) {
          this.colorFadeOut(target)
          this.cardFadeOut(i)
        } else if (this.currentY >= startPosY && this.currentY < endPosY && this.mouseX >= startPosX && this.mouseX < endPosX) {
          this.colorFadeIn(target)
          this.cardFadeIn(this.cards[i], i)
        } else {
          this.colorFadeOut(target)
          this.cardFadeOut(i)
        }
      }
    },
    saveMousemove(e) {
      this.mouseY = e.clientY - this.cardHalfHeight
      this.mouseX = e.clientX - this.cardHalfWidth
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
      this.hover = true
      this.count++

      this.$gsap.set(target, {
        zIndex: this.count,
      })
      this.$gsap.fromTo(
        target,
        {
          clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)',
        },
        {
          duration: this.$SITECONFIG.halfBaseDuration,
          ease: this.$EASING.transform,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        }
      )
    },
    cardFadeOut(index) {
      if (!this.animationFlags[index]) return
      this.animationFlags[index] = false
      this.hover = false
    },
    allCardFadeOut() {
      if (!this.hover && this.isAllResetAnimation) return
      this.isAllResetAnimation = true

      this.$gsap.to(this.cards, {
        duration: this.$SITECONFIG.halfBaseDuration,
        ease: this.$EASING.transform,
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        onComplete: () => {
          setTimeout(() => {
            this.isAllResetAnimation = false
          }, 100)
        },
      })
    },
    colorFadeIn(target) {
      this.$gsap.to(target, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.colorAndOpacity,
        color: '#ffffff',
      })
      this.$gsap.set(target, {
        zIndex: 2,
      })
    },
    colorFadeOut(target) {
      this.$gsap.to(target, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.colorAndOpacity,
        color: '#828282',
      })
      this.$gsap.set(target, {
        zIndex: 1,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.award {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.award-bg {
  position: relative;
  padding: 0 0 vw(600) 0;
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
  z-index: 3;
}

.award-card-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 0% 0, 0% 100%, 0% 100%);
  z-index: 10;
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

  @include tab-vertical() {
    width: vw(840);
  }

  @include sp() {
    width: 100%;
  }
}

.award-item {
  display: flex;
  position: relative;
  padding: 15px 0;
  color: $gray;

  @include sp() {
    display: block;
    padding: 18px 0;
  }
}

.award-list-bottom-line {
  display: flex;
  position: relative;
  width: 100%;
  height: 1px;
  z-index: 1;
}

.award-group {
  position: relative;
  top: 2px;
  flex-shrink: 0;
  width: vw(238);
  color: $white;
  font-size: 14px;
  letter-spacing: 0.02em;

  @include tab-vertical() {
    width: vw(218);
    font-size: 10px;
  }

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
  font-family: $sixcaps;
  letter-spacing: 0.02em;

  @include tab-vertical() {
    width: vw(360);
    font-size: 32px;
  }

  @include sp() {
    width: auto;
    margin: 0 0 8px 0;
    font-size: vw_sp(100);
  }
}

.award-rank {
  flex-shrink: 0;
  font-size: 60px;
  font-family: $sixcaps;
  letter-spacing: 0.02em;

  @include tab-vertical() {
    font-size: 32px;
  }

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
