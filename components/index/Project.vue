<template>
  <div ref="Project" class="project">
    <div ref="ProjectBg" class="project-bg">
      <span class="project-circle-bg-enter"
        ><span ref="ProjectCircleEnter" class="project-circle-bg-element"></span
      ></span>
      <div class="project-inner">
        <h2 ref="ProjectLoopTitle" class="project-loop-title">
          <span class="project-loop-title-read-area">
            <CommonSectionReadTitle
              modifier="project-section"
              :state="isTextSegmentState"
              :start="0"
              :text="['・', 'SELECTED', 'PROJECTS']"
            ></CommonSectionReadTitle>
          </span>
          <span
            class="project-loop-title-wrapper project-loop-title-wrapper-01"
          >
            <CommonTextUnderline
              modifier="index-project-01"
              :state="isTextUnderlineState"
              :start="0"
              :rotate="rotateLeft"
            >
            </CommonTextUnderline>
            <CommonTextUnderline
              modifier="index-project-02"
              :state="isTextUnderlineState"
              :start="0.12"
              :rotate="rotateRight"
            >
            </CommonTextUnderline>
            <CommonTextLoop
              :state="isTextSegmentState"
              :loop="isLoopTextState"
              :loopdirection="1.0"
              :start="-0.4"
              :rotate="rotateRight"
              text=" MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. "
            >
            </CommonTextLoop>
          </span>
          <span
            class="project-loop-title-wrapper project-loop-title-wrapper-01"
          >
            <CommonTextUnderline
              modifier="index-project-02"
              :state="isTextUnderlineState"
              :start="0.24"
              :rotate="rotateLeft"
            >
            </CommonTextUnderline>
            <CommonTextLoop
              :state="isTextSegmentState"
              :loop="isLoopTextState"
              :loopdirection="-1.0"
              :start="-0.2"
              :rotate="rotateRight"
              text=" MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON. "
            >
            </CommonTextLoop>
          </span>
        </h2>
        <div class="project-card-area">
          <div class="l-container">
            <div ref="projectCardAreaClip" class="project-card-area-clip">
              <div v-for="(data, index) in projectData" :key="data.id">
                <div
                  class="project-card-item"
                  :class="'project-card-item-0' + index"
                >
                  <CommonCardProject
                    :name="data.name"
                    :title="data.title"
                    :link="data.link"
                    :text="data.textArray"
                    :rotate="data.rotate"
                    :xspeed="data.xspeed"
                    :yspeed="data.yspeed"
                  ></CommonCardProject>
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
import projectData from '@/assets/json/project.json'

export default {
  data: () => {
    return {
      projectData: projectData,
      posts: {},
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
          this.$gsap.fromTo(
            this.$refs.ProjectCircleEnter,
            {
              y: -(
                window.innerHeight / 2 +
                this.$refs.ProjectCircleEnter.clientHeight / 2
              ),
              scale: 0,
            },
            {
              duration: this.$baseAnimationConfig.duration * 1.2,
              ease: this.$easing.transform,
              y: -window.innerHeight / 2,
              scale: 1.0,
            }
          )
          setTimeout(()=>{
            this.$refs.ProjectBg.style.backgroundColor = '#f0efeb';
          },this.$baseAnimationConfig.duration * 1000)
          break
        case 'end':
          this.$refs.ProjectBg.style.backgroundColor = '#ffabb7';
          this.$gsap.fromTo(
            this.$refs.ProjectCircleEnter,
            {
              y: -window.innerHeight / 2,
              scale: 1.0,
            },
            {
              duration: this.$baseAnimationConfig.duration * 1.2,
              ease: this.$easing.transform,
              y: -(
                window.innerHeight / 2 +
                this.$refs.ProjectCircleEnter.clientHeight / 2
              ),
              scale: 0.0,
            }
          )
          break
      }
    },
  },

  mounted() {
    /* circle */
    this.$nextTick(() => {
      this.$gsap.set(this.$refs.ProjectCircleEnter, {
        y: -(
          window.innerHeight / 2 +
          this.$refs.ProjectCircleEnter.clientHeight / 2
        ),
      })
    })

    /* text-animation */
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

    /* loop-text-animation */
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
    this.iObserverTextSegment.unobserve(this.observe)
    this.iObserverLoopText.unobserve(this.observe)
  },
}
</script>

<style scoped lang="scss">
:root {
  --viewportWidth: 0;
  --viewportHeight: 0;
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

  @include sp(){
    left: 50%;
    width: 120vmax;
    height: 120vmax;
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
  background-color: $thinPink;
}

.project-inner {
  position: relative;
  padding: 206px 0 0 0;
  overflow: hidden;

  @include sp() {
    padding: 150px 0 0 0;
  }
}

.project-loop-title {
  position: relative;
  color: $black;
  font-size: vw(140);
  font-family: 'Six Caps', sans-serif;
  white-space: nowrap;

  @include sp() {
    font-size: vw_sp(160);
  }
}

.project-loop-title-wrapper {
  display: block;
  position: relative;
  padding: 28px;

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
    top: -91px;
    right: 19px;
  }
}

.project-card-area {
  position: relative;
  height: 2000px;

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
    top: -1.2%;
    right: 69.6%;
  }
}

.project-card-item-01 {
  top: 16.3%;
  left: 34.5%;

  @include sp() {
    top: 20.3%;
    left: 34.5%;
  }
}

.project-card-item-02 {
  top: 32%;
  left: 11%;

  @include sp() {
    top: 31%;
  }
}

.project-card-item-03 {
  top: 10%;
  left: 3.4%;

  @include sp() {
    top: 9%;
    left: 0%;
  }
}

.project-card-item-04 {
  top: 31%;
  right: 27%;

  @include sp() {
    top: 40.5%;
  }
}

.project-card-item-05 {
  top: 43%;
  right: 58%;

  @include sp() {
    top: 51%;
    right: 72%;
  }
}

.project-card-item-06 {
  top: 58%;
  right: 32.8%;

  @include sp() {
    top: 62%;
    right: 44.8%;
  }
}

.project-card-item-07 {
  top: 61%;
  left: 22.4%;

  @include sp() {
    top: 72%;
    left: 33.4%;
  }
}

.project-card-item-08 {
  top: 74%;
  left: 4%;

  @include sp() {
    top: 83%;
    left: 9%;
  }
}
</style>