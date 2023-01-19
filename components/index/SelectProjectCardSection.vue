<template>
  <div ref="Project" class="project">
    <div ref="ProjectBg" class="project-bg" :style="`background-color:${pickupEndData.siteColor.bodyContentsColor};`">
      <span class="project-circle-bg-enter"><span ref="ProjectCircleEnter" class="project-circle-bg-element"></span></span>
      <div class="project-inner">
        <h2 ref="ProjectLoopTitle" class="project-loop-title">
          <span class="project-loop-title-read-area">
            <AppReadTitle :state="isTextSegmentState" :text="['・', 'SELECTED', 'PROJECTS']" :modifier="'project-section'" />
          </span>
          <span class="project-loop-title-wrapper project-loop-title-wrapper-01">
            <AppBounceLine :state="isTextUnderlineState" :width="1280" :origin="'right'" :modifier="'index-project-01'" />
            <AppBounceLine :state="isTextUnderlineState" :start="0.12" :width="1280" :origin="'left'" :modifier="'index-project-02'" />
            <AppLoopText :loop="isLoopTextState" :text="'MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON.'" />
          </span>
          <span class="project-loop-title-wrapper project-loop-title-wrapper-01">
            <AppBounceLine :state="isTextUnderlineState" :start="0.24" :width="1280" :origin="'right'" :modifier="'index-project-02'" />
            <AppLoopText :loop="isLoopTextState" :direction="'left'" :text="'MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON.'" />
          </span>
        </h2>
        <div class="project-card-area">
          <div class="l-container">
            <div ref="projectCardAreaClip" class="project-card-area-clip">
              <div v-for="(data, index) in projectData" :key="data.id">
                <div class="project-card-item" :class="`project-card-item-0${index}`">
                  <AppCard
                    :id="data.id"
                    :component-name="'project'"
                    :type="'works'"
                    :index="index"
                    :name="data.title.full"
                    :title="data.title.short"
                    :desc="data.desc"
                    :rotate="data.projectNum.rotate"
                    :xspeed="data.projectNum.xspeed"
                    :yspeed="data.projectNum.yspeed"
                  />
                </div>
              </div>
              <div>
                <div class="project-card-item" :class="`project-card-item-0${projectData.length}`">
                  <AppCard
                    :component-name="'project'"
                    :type="'archive'"
                    :name="'ARCHIVE'"
                    :title="'ARCVE'"
                    :desc="`I'M PUTTING TOGETHER A DYNAMIC ARCHIVE PAGE OF THE WORK I'M SUBMITTING TO CODEPEN.`"
                    :rotate="8"
                    :xspeed="0.18"
                    :yspeed="0.17"
                  />
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
export default {
  props: {
    projectData: {
      type: Array,
      required: true,
    },
    pickupEndData: {
      type: Object,
      required: true,
    },
  },

  data: () => {
    return {
      isCardSegmentState: '',
      isTextSegmentState: '',
      isTextUnderlineState: '',
      isLoopTextState: '',
    }
  },

  computed: {
    ProjectAnimationState: function () {
      return this.$store.getters['indexPickup/projectAnimationState']
    },
  },

  watch: {
    ProjectAnimationState: function () {
      switch (this.ProjectAnimationState) {
        case 'start':
          // 円の縮小
          this.$gsap.fromTo(
            this.$refs.ProjectCircleEnter,
            {
              y: -(window.innerHeight / 2 + this.$refs.ProjectCircleEnter.clientHeight / 2),
              scale: 0,
            },
            {
              duration: this.$SITECONFIG.baseDuration * 1.2,
              ease: this.$EASING.transform,
              y: this.$SITECONFIG.isPc ? -window.innerWidth / 4 : 0,
              scale: 1.0,
            }
          )

          // 背景色変更
          setTimeout(() => {
            this.$refs.ProjectBg.style.backgroundColor = '#f0efeb'
          }, this.$SITECONFIG.baseDuration * 1000)
          break
        case 'end':
          // 動きをスムーズに見せるために背景色変更の処理を遅らせる
          setTimeout(() => {
            this.$refs.ProjectBg.style.backgroundColor = this.pickupEndData.siteColor.bodyContentsColor
          }, 300)

          // 円の縮小
          this.$gsap.fromTo(
            this.$refs.ProjectCircleEnter,
            {
              y: window.innerWidth > 767 ? -window.innerWidth / 2 : -200,
              scale: 1.0,
            },
            {
              duration: this.$SITECONFIG.baseDuration * 1.2,
              // delay: 1.0,
              ease: this.$EASING.transform,
              y: -(window.innerHeight / 2 + this.$refs.ProjectCircleEnter.clientHeight / 2),
              scale: 0.0,
            }
          )
          break
      }
    },
  },

  mounted() {
    // 円の位置をセットする
    this.$nextTick(() => {
      this.$gsap.set(this.$refs.ProjectCircleEnter, {
        y: -(window.innerHeight / 2 + this.$refs.ProjectCircleEnter.clientHeight / 2),
      })
    })

    // テキストアニメーション
    this.observe = this.$refs.ProjectLoopTitle
    this.iObserverTextSegment = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.isTextSegmentState = 'center'
              this.isTextUnderlineState = 'extend'
              this.iObserverTextSegment.unobserve(this.observe)
            }, 300)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserverTextSegment.observe(this.observe)

    // ループテキストアニメーションの発火の管理
    this.iObserverLoopText = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isLoopTextState = 'isActive'
          } else {
            this.isLoopTextState = 'isNoActive'
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserverLoopText.observe(this.observe)
  },

  beforeDestroy() {
    // リセット
    this.iObserverTextSegment.unobserve(this.observe)
    this.iObserverTextSegment = null
    this.iObserverLoopText.unobserve(this.observe)
    this.iObserverLoopText = null
  },
}
</script>

<style scoped lang="scss">
:root {
  --viewportWidth: 100vw;
  --viewportHeight: 100vh;
}

.project {
  position: relative;
}

.project-circle-bg-enter {
  position: absolute;
  top: 0;
  left: 45%;
  transform: translate3d(-50%, 0, 0);
  width: 142vmax;
  height: 142vmax;
  pointer-events: none;

  @include sp() {
    left: 50%;
    width: 142vmax;
    height: 142vmax;
  }
}

.project-circle-bg-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $skinColor;
  border-radius: 50%;
  transform: scale(0);
  transform-origin: center;
}

.project-bg {
  position: relative;
}

.project-inner {
  position: relative;
  padding: 356px 0 0 0;

  @include sp() {
    padding: 340px 0 0 0;
  }
}

.project-loop-title {
  position: relative;
  color: $black;
  font-size: vw(140);
  font-family: $sixcaps;
  white-space: nowrap;

  @include sp() {
    font-size: vw_sp(160);
  }
}

.project-loop-title-wrapper {
  display: block;
  position: relative;
  padding: 28px 0;

  @include sp() {
    padding: 10px 0 8px;
  }
}

.project-loop-title-read-area {
  position: absolute;
  top: -96px;
  right: 160px;
  text-align: right;

  @include sp() {
    top: -81px;
    right: 19px;
  }
}

.project-card-area {
  position: relative;
  height: 2000px;
  z-index: 1;

  @include sp() {
    height: 3000px;
  }
}

.project .l-container {
  height: 100%;
  padding: 0 160px 0 40px;

  @include sp() {
    padding: 0 20px;
  }
}

.project-card-area-clip {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 160px 0 0;

  @include sp() {
    margin: 0;
  }
}

.project-card-item {
  position: absolute;
  width: 0;
  height: 0;
}

.project-card-item-00 {
  top: 3.2%;
  right: 34.6%;

  @include sp() {
    top: 3.8%;
    right: 69.6%;
  }
}

.project-card-item-01 {
  top: 16.3%;
  left: 34.5%;

  @include sp() {
    top: 25.3%;
    left: 34.5%;
  }
}

.project-card-item-02 {
  top: 32%;
  left: 11%;

  @include sp() {
    top: 36%;
  }
}

.project-card-item-03 {
  top: 10%;
  left: 3.4%;

  @include sp() {
    top: 14%;
    left: 20%;
  }
}

.project-card-item-04 {
  top: 31%;
  right: 27%;

  @include sp() {
    top: 44.5%;
    right: 30%;
  }
}

.project-card-item-05 {
  top: 43%;
  right: 58%;

  @include sp() {
    top: 56%;
    right: 92%;
  }
}

.project-card-item-06 {
  top: 58%;
  right: 32.8%;

  @include sp() {
    top: 67%;
    right: 44.8%;
  }
}

.project-card-item-07 {
  top: 61%;
  left: 22.4%;

  @include sp() {
    top: 77%;
    left: 2.4%;
  }
}

.project-card-item-08 {
  top: 74%;
  left: 4%;

  @include sp() {
    top: 88%;
    left: 9%;
  }
}
</style>
