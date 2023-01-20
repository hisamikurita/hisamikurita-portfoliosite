<template>
  <div ref="Project" class="project">
    <div ref="ProjectWrapper" class="project-wrapper">
      <div class="project-canvas">
        <canvas ref="Canvas"></canvas>
      </div>
      <AppCircleBg ref="IntroCircleBg" :state="isCircleBgState" :modifier="'about-project'" />
      <div class="project-inner">
        <div class="l-container">
          <div class="project-contents">
            <div class="project-title-read-area">
              <AppReadTitle :state="isTextSegmentState" :text="['・', 'SELECTED ', 'PROJECT']" :modifier="'about-project-section'" />
            </div>
            <div ref="ProjectTitleWrapper" class="project-title-wrapper">
              <AppBounceLine :state="isTextUnderlineState" :origin="'right'" :width="1280" :modifier="'about-project-01'" />
              <AppBounceLine :state="isTextUnderlineState" :start="0.12" :origin="'left'" :width="1280" :modifier="'about-project-02'" />
              <div ref="ProjectList" class="project-list" :class="{ 'is-text-animation-end': isTextAnimationState }">
                <div ref="ProjectItemWrapperRotate" class="project-item-wrapper-rotate">
                  <div ref="ProjectItemWrapperTranslate" class="project-item-wrapper-translate">
                    <div
                      v-for="(data, index) in projectAndArchiveDatas"
                      :key="index"
                      ref="ProjectItem"
                      class="project-item js-click-target"
                      @mousemove="onMouseEnter(index)"
                      @mouseleave="onMouseLeave"
                    >
                      <span ref="ProjectItemCircle" class="project-item-circle"></span>
                      <span ref="ProjectItemWrapper" class="project-item-wraper">
                        <!--アーカイブページの時-->
                        <AppPageTransitionBg v-if="index === projectAndArchiveData.length - 1.0" :url="`/archive`" :color="'#000000'" class="project-link">ARCHIVE </AppPageTransitionBg>
                        <!--アーカイブページ以外の時-->
                        <AppPageTransitionImage v-else :url="`/works/${data.id}`" :index="index" class="project-link">{{ data.title.full }} </AppPageTransitionImage>
                      </span>
                      <span ref="ProjectItemImg01" class="project-item-img-wrapper project-item-img-wrapper-01">
                        <span class="project-item-img">
                          <!--アーカイブページの時-->
                          <picture v-if="index === projectAndArchiveData.length - 1.0">
                            <source :srcset="`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`" media="(max-width: 767px)" />
                            <img :src="`/images/about-sidescroll-archive-01.webp`" :width="`560`" :height="`410`" :alt="`archive`" />
                          </picture>
                          <!--アーカイブページ以外の時-->
                          <picture v-else>
                            <source :srcset="`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`" media="(max-width: 767px)" />
                            <img :src="`${data.aboutImages.img01.url}`" :width="`${data.aboutImages.img01.width}`" :height="`${data.aboutImages.img01.height}`" :alt="`${data.id}`" />
                          </picture>
                        </span>
                      </span>
                      <span ref="ProjectItemImg02" class="project-item-img-wrapper project-item-img-wrapper-02">
                        <span class="project-item-img">
                          <!--アーカイブページの時-->
                          <picture v-if="index === projectAndArchiveData.length - 1.0">
                            <source :srcset="`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`" media="(max-width: 767px)" />
                            <img :src="`/images/about-sidescroll-archive-02.webp`" :width="`560`" :height="`410`" :alt="`archive`" />
                          </picture>
                          <!--アーカイブページ以外の時-->
                          <picture v-else>
                            <source :srcset="`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`" media="(max-width: 767px)" />
                            <img :src="`${data.aboutImages.img02.url}`" :width="`${data.aboutImages.img02.width}`" :height="`${data.aboutImages.img02.height}`" :alt="`${data.id}`" />
                          </picture>
                        </span>
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
import Particle from '../canvas/about/sidescroll/particle'

export default {
  props: {
    projectData: {
      type: Array,
      required: true,
    },
  },

  data: () => {
    return {
      projectAndArchiveData: [],
      isTextSegmentState: '',
      isCircleBgState: '',
      isTextUnderlineState: '',
      isTextAnimationState: false,
    }
  },

  computed: {
    projectAndArchiveDatas() {
      this.directSubstitution()
      return this.projectAndArchiveData
    },
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
  },

  watch: {
    hambergerMenuState: function () {
      /**
       * ハンバガーメニューが開いた時
       */
      if (this.hambergerMenuState) {
        this.fixSection.pause()
        //
      } else if (!this.hambergerMenuState) {
        /**
         * ハンバガーメニューが閉じた時
         */
      }
    },
    imageLoaded: function () {
      if (this.imageLoaded) {
        setTimeout(() => {
          this.setupScrollAnimation()
        }, 200)
      }
    },
  },

  mounted() {
    // 初期宣言
    this.deveiceOffsetStart = this.$SITECONFIG.isPc ? 80 : 0
    this.deveiceOffsetWidth = this.$SITECONFIG.isPc ? 80 + 120 + 80 : 0
    this.deveiceOffsetRatio = this.$SITECONFIG.isPc ? 1.12 : 1.026
    this.wrapper = this.$refs.ProjectItemWrapperRotate
    this.text = this.$refs.ProjectItemWrapperTranslate
    this.$gsap.set(this.wrapper, {
      rotate: 3,
      transformOrigin: 'left',
    })
    this.$gsap.set(this.text, {
      yPercent: 103.8,
    })
    this.enterflag = false
    this.leaveflag = false

    // パーティクル作成
    this.particle = new Particle(this.$SITECONFIG, this.$refs.Canvas)
    this.particle.init()

    const tweenPosition = {
      value: 0,
    }

    // パーティクルRAF
    this.pRaf = () => {
      this.$gsap.to(tweenPosition, {
        duration: 1.0,
        ease: 'none',
        value: this.$asscroll.currentPos,
      })
      this.particle._drawParticles(this.$asscroll.currentPos, tweenPosition.value)
    }

    // パーティクルオブザーバー
    this.observe = this.$refs.ProjectWrapper
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.$gsap.ticker.add(this.pRaf)
          } else {
            this.$gsap.ticker.remove(this.pRaf)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.pObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.particle._fadeIn()

            this.pObserver.unobserve(this.observe)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.pObserver.observe(this.observe)
    this.iObserver.observe(this.observe)

    // パーティクルリサイズ
    this.pResize = () => {
      this.particle.onResize()
    }

    window.addEventListener('resize', this.pResize)
  },

  beforeDestroy() {
    // リセット
    this.fixSection.kill()
    this.synchronousScroll.kill()
    this.textAnimation.kill()
    this.iObserver.unobserve(this.observe)
    this.iObserver = null

    // パーティクル削除
    window.removeEventListener('resize', this.pResize)
    this.pObserver.unobserve(this.observe)
    this.pObserver = null
    this.$gsap.ticker.remove(this.pRaf)
    this.particle.destroy()
    this.particle = null
  },

  methods: {
    setupScrollAnimation() {
      // セクション固定 グローバル関数(fixSection)
      this.fixSection = this.$fixSection(this.$refs.ProjectWrapper, this.$SITECONFIG.isTouch, 3500)

      // リストをスクロール量に応じてx軸を移動させる
      this.synchronousScroll = this.$gsap.fromTo(
        this.$refs.ProjectList,
        {
          x: () => window.innerWidth - this.deveiceOffsetStart,
        },
        {
          x: () => -(this.$refs.ProjectList.clientWidth * this.deveiceOffsetRatio - this.$refs.ProjectWrapper.clientWidth + this.deveiceOffsetWidth),
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

      // テキストアニメーション
      this.textAnimation = this.$gsap.to(
        {},
        {
          scrollTrigger: {
            once: true,
            trigger: this.$refs.ProjectWrapper,
            onEnter: () => {
              this.$gsap.to(this.wrapper, {
                duration: this.$SITECONFIG.fullDuration,
                ease: this.$EASING.transform,
                rotate: 0,
              })
              this.$gsap.to(this.text, {
                duration: this.$SITECONFIG.baseDuration,
                ease: this.$EASING.transform,
                yPercent: 0,
                onComplete: () => {
                  setTimeout(() => {
                    this.isTextAnimationState = true
                  }, 300)
                },
              })
              this.isTextSegmentState = 'center'
              this.isCircleBgState = 'extend'
              this.isTextUnderlineState = 'extend'
            },
          },
        }
      )
    },
    /**
     * アーカイブページ用に空のオブジェクトを追加してインデックスを一つ増やす
     */
    directSubstitution() {
      this.projectAndArchiveData = Array.from(this.projectData)
      this.projectAndArchiveData.push({})
    },
    onMouseEnter: function (index) {
      if (this.enterflag || this.$SITECONFIG.isTouch || !this.isTextAnimationState) return
      this.enterflag = true
      this.leaveflag = false
      this.target = this.$refs.ProjectItem[index]

      if (this.target) this.target.classList.add('is-current-hover')
      if (this.target) this.target.classList.add('is-overlay')
      for (let i = 0; i < this.$refs.ProjectItem.length; i++) {
        if (!this.$refs.ProjectItem[i].classList.contains('is-current-hover')) {
          if (this.$refs.ProjectItem[i]) this.$refs.ProjectItem[i].classList.add('is-hover')
        }
      }
    },
    onMouseLeave() {
      if (this.leaveflag || this.$SITECONFIG.isTouch || !this.isTextAnimationState) return

      this.leaveflag = true
      if (this.target) this.target.classList.remove('is-current-hover')
      for (let i = 0; i < this.$refs.ProjectItem.length; i++) {
        if (!this.$refs.ProjectItem[i].classList.contains('is-current-hover')) {
          if (this.$refs.ProjectItem[i]) this.$refs.ProjectItem[i].classList.remove('is-hover')
        }
      }
      setTimeout(() => {
        this.enterflag = false
        if (this.target) this.target.classList.remove('is-overlay')
      }, 100)
    },
  },
}
</script>

<style lang="scss" scoped>
:root {
  --viewportWidth: 100vw;
  --viewportHeight: 100vh;
  --viewportSpHeight: 100vh;
}

.project {
  position: relative;
  height: 3500px;
  z-index: 1;
}

.project-wrapper {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--viewportHeight, 100vh) !important;
  background-color: $darkBlack;

  @include sp() {
    height: var(--viewportSpHeight, 100vh) !important;
  }
}

.project-canvas {
  position: absolute;
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

.project-inner {
  position: relative;
  width: 100%;
  padding: 0 160px 0 40px;
  z-index: 1;

  @include sp() {
    padding: 0 vw_sp(20);
  }
}

.project-contents {
  margin: -90px 0 0 0;

  @include sp() {
    margin: 0;
  }
}

.project-title-read-area {
  margin: 0 0 32px 0;

  @include sp() {
    margin: 0 0 35px 0;
  }
}

.project-title-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: vw(200);
  margin: 0 40px 0 0;

  @include sp() {
    height: vw_sp(200);
  }
}

.project-list {
  position: absolute;
  top: auto;
  left: auto;
  overflow: hidden;
  z-index: 1;

  &.is-text-animation-end {
    overflow: visible;
  }
}

.project-item-wrapper-translate {
  display: flex;
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
  transition: transform $half-base-duration $transform-easing;
  z-index: 1;

  @include sp() {
    right: vw_sp(-72);
    width: vw_sp(20);
    height: vw_sp(20);
  }
}

.project-item-wraper {
  display: block;
  position: relative;
}

.project-item-img-wrapper {
  position: absolute;
  top: vw(-30);
  width: vw(300);
  height: vw(220);
  transform: scale(0);
  pointer-events: none;
  transition: transform $half-base-duration $transform-easing;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  z-index: 10;
}

.project-item-img {
  display: block;
  transform: rotateX(180deg);
  transition: transform $half-base-duration $transform-easing;
  transform-style: preserve-3d;

  & img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
    overflow: hidden;
  }
}

.project-item-img-wrapper-01 {
  left: vw(-320);
}

.is-current-hover .project-item-img-wrapper-01 {
  transform: scale(1) rotate(-8deg);
}

.project-item-img-wrapper-02 {
  right: vw(-320);
}

.is-current-hover .project-item-img-wrapper-02 {
  transform: scale(1) rotate(8deg);
}

.is-current-hover .project-item-img {
  transform: rotateX(0deg);
}

.project-item {
  position: relative;
  flex-shrink: 0;
  color: $black;
  font-size: vw(140);
  font-family: $sixcaps;
  white-space: nowrap;
  perspective: 1000px;
  transition: opacity $half-base-duration $colorAndOpacity-easing;

  &.is-hover {
    opacity: 0.5;
  }

  &.is-overlay {
    z-index: 10;
  }

  @include sp() {
    font-size: vw_sp(160);
  }

  &:not(:last-of-type) {
    margin: 0 vw(100) 0 0;

    @include sp() {
      margin: 0 vw_sp(130) 0 0;
    }
  }

  &:last-of-type {
    & .project-item-circle {
      display: none;
    }
  }
}
</style>
