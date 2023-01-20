<template>
  <div ref="Next" class="next">
    <div class="next-inner">
      <div class="l-container">
        <div class="next-contents">
          <div class="next-title-read-area" :style="`color:${currentProject.siteColor.allTextColor};`">
            <AppReadTitle :state="isTextSegmentState" :text="['・', 'NEXT', 'PROJECT']" :modifier="'works-section'" />
          </div>
          <AppPageTransitionImage class="next-loop-title-btn" :url="`/works/${nextProject.id}`" :index="currentProject.index">
            <span ref="ContentsLoopTitleWrapper" class="next-loop-title-wrapper js-click-target" :style="`stroke:${currentProject.siteColor.allTextColor};`">
              <AppBounceLine :state="isTextUnderlineState" :color="currentProject.siteColor.allTextColor" :origin="'right'" :width="1280" :modifier="'works-next-01'" />
              <AppBounceLine :state="isTextUnderlineState" :start="0.12" :color="currentProject.siteColor.allTextColor" :origin="'left'" :width="1280" :modifier="'works-next-02'" />
              <span class="next-loop-title">
                <AppLoopText :loop="isLoopTextState" :text="'NEXT'" />
              </span>
            </span>
          </AppPageTransitionImage>
          <div class="next-loop-card" :class="`next-loop-card-${nextProject.id}`">
            <AppCard
              :id="nextProject.id"
              :component-name="'project'"
              :type="'works'"
              :index="currentProject.index"
              :name="nextProject.title.full"
              :title="nextProject.title.short"
              :desc="nextProject.desc"
              :rotate="nextProject.projectNum.rotate"
              :xspeed="nextProject.projectNum.xspeed"
              :yspeed="nextProject.projectNum.yspeed - 0.1"
            />
          </div>
        </div>
        <p class="next-backbtn js-click-target" :style="`color:${currentProject.siteColor.allTextColor};`">
          <AppPageTransitionBg url="/" color="#f0efeb">(BACK TO HOME)</AppPageTransitionBg>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentProject: {
      type: Object,
      required: true,
    },
    nextProject: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      isTextSegmentState: 'default',
      isTextUnderlineState: 'default',
      isLoopTextState: 'default',
    }
  },
  mounted() {
    this.$nextTick(() => {
      /* loop-text-animation */
      this.observe = this.$refs.ContentsLoopTitleWrapper
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

      this.iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isTextSegmentState = 'center'
              this.isTextUnderlineState = 'extend'
              this.iObserver.unobserve(this.observe)
            }
          })
        },
        { rootMargin: '0%' }
      )
      this.iObserver.observe(this.observe)
    })
  },

  beforeDestroy() {
    this.iObserverLoopText.unobserve(this.observe)
    this.iObserverLoopText = null
    this.iObserver.unobserve(this.observe)
    this.iObserver = null
  },
}
</script>

<style lang="scss" scoped>
.next-inner {
  width: 100%;
  padding: 0 160px 0 40px;

  @include sp() {
    padding: 0 vw_sp(20);
  }
}

.next-contents {
  position: relative;
  margin: 160px 0 0 0;
  padding: 212px 0 290px;

  @include sp() {
    margin: 0;
  }
}

.next-title-read-area {
  margin: 0 0 34px 0;

  @include sp() {
    margin: 0 0 36px 0;
  }
}

.next-loop-title-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: vw(200);
  font-size: vw(140);
  font-family: $sixcaps;

  @include sp() {
    height: vw_sp(202);
    font-size: vw_sp(160);
  }
}

.next-loop-title-btn {
  width: 100%;
}

.next-loop-title {
  position: absolute;
  top: auto;
  left: -80px;
}

.next-loop-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 0;
  height: 0;
  z-index: 10;

  @include sp() {
    top: 55%;
    left: calc(50% - #{vw_sp(100)});
  }
}

.next-loop-card-mtrust {
  @include sp() {
    top: 59%;
    left: calc(50% - #{vw_sp(350)});
  }
}

.next-loop-card-ketakuma {
  @include sp() {
    top: 57%;
    left: calc(50% - #{vw_sp(130)});
  }
}

.next-loop-card-redandgreen {
  @include sp() {
    top: 61%;
    left: calc(50% - #{vw_sp(370)});
  }
}

.next-loop-card-asovision {
  @include sp() {
    left: calc(50% - #{vw_sp(80)});
  }
}

.next-loop-card-basta {
  @include sp() {
    top: 58%;
    left: calc(50% - #{vw_sp(250)});
  }
}

.next-loop-card-frontier {
  @include sp() {
    top: 61%;
    left: calc(50% - #{vw_sp(400)});
  }
}

.next-loop-card-yakudoh {
  @include sp() {
    top: 61%;
    left: calc(50% - #{vw_sp(-40)});
  }
}

.next-backbtn {
  padding: 0 0 20px 0;
  font-size: 14px;
  text-align: center;
  font-family: $helvetica;
}
</style>
