<template>
  <div ref="Next" class="next">
    <div class="next-inner">
      <div class="l-container">
        <div class="next-contents">
          <div class="next-title-read-area" :style="`color:${currentProject.siteColor.mvTextColor};`">
            <AppSectionReadTitle
              :state="isTextSegmentState"
              :text="['・', 'NEXT', 'PROJECT']"
              :modifier="'works-section'"
            />
          </div>
          <AppDefaultTransition :url="`/works/${nextProject.id}`" :color="nextProject.siteColor.bodyContentsColor">
            <span
              ref="ContentsLoopTitleWrapper"
              class="next-loop-title-wrapper"
            >
              <AppTextUnderline
                :state="isTextUnderlineState"
                :color="currentProject.siteColor.allTextColor"
                :origin="'right'"
                :modifier="'works-next-01'"
              />
              <AppTextUnderline
                :state="isTextUnderlineState"
                :start="0.12"
                :color="currentProject.siteColor.allTextColor"
                :origin="'left'"
                :modifier="'works-next-02'"
              />
              <span class="next-loop-title">
                <AppTextLoop
                  :state="isTextSegmentState"
                  :loop="isLoopTextState"
                  :rotate="$BASEROTATE.right"
                  :text="'NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT NEXT'"
                >
                </AppTextLoop>
              </span>
            </span>
          </AppDefaultTransition>
          <div class="next-loop-card">
            <AppCardBase
              :component-name="'ProjectContents'"
              :name="nextProject.title.full"
              :next-color="nextProject.siteColor.bodyContentsColor"
              :title="nextProject.title.short"
              :link="nextProject.id"
              :text="nextProject.desc"
              :rotate="nextProject.projectNum.rotate"
              :xspeed="nextProject.projectNum.xspeed"
              :yspeed="nextProject.projectNum.yspeed - 0.10"
            />
          </div>
        </div>
        <p class="next-backbtn" :style="`color:${currentProject.siteColor.mvTextColor};`">
          <NuxtLink :to="'/'">(BACK TO HOME)</NuxtLink>
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
    this.iObserver.unobserve(this.observe)
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
  padding: 212px 0 290px;
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

.next-backbtn {
  padding: 0 0 20px 0;
  font-size: 14px;
  text-align: center;
  font-family: $helvetica;
}
</style>