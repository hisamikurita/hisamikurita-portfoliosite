<template>
  <div ref="Project" class="project">
    <div ref="ProjectWrapper" class="project-wrapper">
      <AppCircleBg
        ref="IntroCircleBg"
        :state="isCircleBgState"
        :modifier="'about-project'"
      />
      <div class="project-inner">
        <div class="l-container">
          <div class="project-contents">
            <div class="project-title-read-area">
              <AppSectionReadTitle
                :state="isTextSegmentState"
                :text="['・', 'SELECTED ', 'PROJECT']"
                :modifier="'about-project-section'"
              />
            </div>
            <div ref="ProjectTitleWrapper" class="project-title-wrapper">
              <AppTextUnderline
                :state="isTextUnderlineState"
                :origin="'right'"
                :modifier="'about-project-01'"
              />
              <AppTextUnderline
                :state="isTextUnderlineState"
                :start="0.12"
                :origin="'left'"
                :modifier="'about-project-02'"
              />
              <div
                ref="ProjectList"
                class="project-list"
                :class="{ isTextAnimationEnd: isTextAnimationState }"
              >
                <div
                  ref="ProjectItemWrapperRotate"
                  class="project-item-wrapper-rotate"
                >
                  <div
                    ref="ProjectItemWrapperTranslate"
                    class="project-item-wrapper-translate"
                  >
                    <div
                      v-for="data in projectData"
                      :key="data.id"
                      ref="ProjectItem"
                      class="project-item"
                      @mouseenter="onMouseEnter"
                      @mouseleave="onMouseLeave"
                    >
                      <span
                        ref="ProjectItemCircle"
                        class="project-item-circle"
                      ></span>
                      <span ref="ProjectItemImg01" class="project-item-img-01">
                        <nuxt-img
                          :src="'/'"
                          quality="80"
                          :alt="data.title.full"
                        />
                      </span>
                      <span ref="ProjectItemImg02" class="project-item-img-02">
                        <nuxt-img
                          :src="'/'"
                          quality="80"
                          :alt="data.title.full"
                        />
                      </span>
                      <span
                        ref="ProjectItemWrapper"
                        class="project-item-wraper"
                      >
                        <NuxtLink :to="`/works/${data.id}`" class="project-link">{{
                          data.title.full
                        }}</NuxtLink>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { vw } from '../../lib/vw'

export default {
  props: {
    projectData: {
      type: Array,
      required: true,
    },
  },

  data: () => {
    return {
      isTextSegmentState: '',
      isCircleBgState: '',
      isTextUnderlineState: '',
      isTextAnimationState: false,
    }
  },
  mounted() {
    this.wrapper = this.$refs.ProjectItemWrapperRotate
    this.text = this.$refs.ProjectItemWrapperTranslate
    this.$gsap.set(this.wrapper, {
      rotate: 3,
      transformOrigin: 'left',
    })
    this.$gsap.set(this.text, {
      yPercent: 103.8,
    })

    this.$nextTick(() => {
      setTimeout(() => {
        this.scrollFix()

        this.$gsap.to(
          {},
          {
            scrollTrigger: {
              once: true,
              trigger: this.$refs.ProjectWrapper,
              onEnter: () => {
                this.$gsap.to(this.wrapper, {
                  duration: this.$siteConfig.baseDuration * 2.0,
                  ease: this.$easing.transform,
                  rotate: 0,
                })
                this.$gsap.to(this.text, {
                  duration: this.$siteConfig.baseDuration,
                  ease: this.$easing.transform,
                  yPercent: 0,
                  onComplete: () => {
                    this.isTextAnimationState = true
                  },
                })
                this.isTextSegmentState = 'center'
                this.isCircleBgState = 'extend'
                this.isTextUnderlineState = 'extend'
              },
            },
          }
        )
      }, 100)
    })
  },

  beforeDestroy() {
    this.fixSec.kill()
    this.tl.kill()
  },

  methods: {
    scrollFix() {
      this.tl = this.$gsap.fromTo(
        this.$refs.ProjectList,
        {
          x: window.innerWidth - 80,
        },
        {
          x: () =>
            -(
              this.$refs.ProjectList.clientWidth -
              this.$refs.ProjectWrapper.clientWidth +
              80 +
              120 +
              80
            ),
          ease: 'none',
          scrollTrigger: {
            start: 'center center',
            end: () => `+=${3500 - window.innerHeight}px`,
            trigger: this.$refs.ProjectWrapper,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      )
      /**
       * セクション固定
       */
      this.fixSec = this.$gsap.to(this.$refs.ProjectWrapper, {
        ease: 'none',
        scrollTrigger: {
          pin: true,
          pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
          trigger: this.$refs.ProjectWrapper,
          start: 'end',
          end: () => `+=${5000 - window.innerHeight}px`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    },
    onMouseEnter(e) {
      const nextTarget = this.NextAll(e.target)
      const prevTarget = this.PrevAll(e.target)
      const currentCircle = e.target.querySelector('.project-item-circle')
      const currentImg01 = e.target.querySelector('.project-item-img-01')
      const currentImg02 = e.target.querySelector('.project-item-img-02')

      this.$gsap.to(currentCircle, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        x: vw(360),
      })
      this.$gsap.to(currentImg01, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        scale: 1,
        rotate: -8,
      })
      this.$gsap.to(currentImg02, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        scale: 1,
        rotate: 8,
      })
      this.$gsap.to(nextTarget.text, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        x: vw(360),
      })
      this.$gsap.to(nextTarget.circle, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        x: vw(360),
      })

      this.$gsap.to(prevTarget.text, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        x: vw(-360),
      })
      this.$gsap.to(prevTarget.circle, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        x: vw(-360),
      })
    },
    onMouseLeave() {
      this.$gsap.to(this.$refs.ProjectItemImg01, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        scale: 0,
        rotate: 0,
      })
      this.$gsap.to(this.$refs.ProjectItemImg02, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        scale: 0,
        rotate: 0,
      })
      this.$gsap.to(this.$refs.ProjectItemWrapper, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        x: 0,
      })
      this.$gsap.to(this.$refs.ProjectItemCircle, {
        duration: this.$siteConfig.halfBaseDuration,
        ease: this.$easing.transform,
        x: 0,
      })
    },
    NextAll(dom) {
      const textArray = []
      const circleArray = []

      let next = dom.nextElementSibling

      while (next && next.nodeType === 1) {
        const text = next.querySelector('.project-item-wraper')
        const circle = next.querySelector('.project-item-circle')

        textArray.push(text)
        circleArray.push(circle)
        next = next.nextElementSibling
      }

      return {
        text: textArray,
        circle: circleArray,
      }
    },
    PrevAll(dom) {
      const textArray = []
      const circleArray = []

      let prev = dom.previousElementSibling

      while (prev && prev.nodeType === 1) {
        const text = prev.querySelector('.project-item-wraper')
        const circle = prev.querySelector('.project-item-circle')

        textArray.push(text)
        circleArray.push(circle)
        prev = prev.previousElementSibling
      }

      return {
        text: textArray,
        circle: circleArray,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.project {
  position: relative;
  height: 3500px;
}

.project-wrapper {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--viewportHeight) !important;
  background-color: $darkBlack;
}

.project-inner {
  width: 100%;
  padding: 0 160px 0 40px;
}

.project-contents {
  margin: -90px 0 0 0;
}

.project-title-read-area {
  margin: 0 0 32px 0;
}

.project-title-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: vw(200);
  margin: 0 40px 0 0;
}

.project-list {
  position: absolute;
  top: auto;
  left: auto;
  overflow: hidden;

  &.isTextAnimationEnd {
    overflow: visible;
  }
}

.project-item-wrapper-translate {
  display: flex;
}

.project-item {
  position: relative;
  flex-shrink: 0;
  color: $black;
  font-size: vw(140);
  font-family: $sixcaps;
  white-space: nowrap;

  &:not(:last-of-type) {
    margin: 0 vw(100) 0 0;
  }
}

.project-item-circle {
  position: absolute;
  top: 50%;
  right: vw(-60);
  transform: translate3d(0, -50%, 0);
  width: vw(20);
  height: vw(20);
  border-radius: 50%;
  background-color: $black;
  pointer-events: none;
}

.project-item-wraper {
  display: block;
  position: relative;
}

.project-item-img-01 {
  position: absolute;
  top: vw(-40);
  left: vw(-340);
  width: vw(280);
  transform: scale(0);
  pointer-events: none;
}

.project-item-img-02 {
  position: absolute;
  top: vw(-40);
  right: vw(-340);
  width: vw(280);
  transform: scale(0);
  pointer-events: none;
}
</style>