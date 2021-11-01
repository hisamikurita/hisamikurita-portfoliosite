<template>
  <div ref="Project" class="project">
    <div class="project-bg">
      <div class="project-inner">
        <h2 ref="ProjectLoopTitle" class="project-loop-title">
          <span class="project-loop-title-read-area">
            <CommonSectionReadTitle
              modifier="project-section"
              :state="isTextSegmentState"
              :start="0"
              :text="[
                '・',
                'SELECTED',
                'PROJECTS',
              ]"
            ></CommonSectionReadTitle>
          </span>
          <span class="project-loop-title-wrapper project-loop-title-wrapper-01">
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
          <span class="project-loop-title-wrapper project-loop-title-wrapper-01">
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
                <div class="project-card-item" :class="'project-card-item-0' + index">
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

  beforeMount(){
  },

  mounted() {
    /* card-animation */
    // this.CardTextSegment = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //         const index = CommonCardProjectArray.indexOf(entry.target);

    //         this.$refs.CommonCardProject[index].state = 'center';
    //         this.CardTextSegment.unobserve(entry.target)
    //       }
    //     })
    //   },
    //   { rootMargin: '0%' }
    // )
    // const CommonCardProjectArray = [];
    // for (let i = 0; i < this.$refs.CommonCardProject.length; i++) {
    //   CommonCardProjectArray.push(this.$refs.CommonCardProject[i].observe);
    //   this.CardTextSegment.observe(this.$refs.CommonCardProject[i].observe);
    // }

    /* text-animation */
    this.observe = this.$refs.ProjectLoopTitle;
    this.iObserverTextSegment = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center';
            this.isTextUnderlineState = 'extend';
            this.iObserverTextSegment.unobserve(this.observe)
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
            this.isLoopTextState = 'isActive';
          }
          else{
            this.isLoopTextState = 'isNoActive';
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
.project-bg{
  position: relative;
  // background-color: $thinPink;

  @include sp(){
    overflow: hidden;
  }
}

.project-inner {
  padding: 206px 0 0 0;

  @include sp(){
    padding: 150px 0 0 0;
  }
}

.project-loop-title{
  position: relative;
  color: $black;
  font-size: vw(140);
  font-family: 'Six Caps', sans-serif;
  white-space: nowrap;

  @include sp(){
    font-size: vw_sp(160);
  }
}

.project-loop-title-wrapper{
  display: block;
  position: relative;
  padding: 28px;

  @include sp(){
    padding: 10px 0 8px;
  }
}

.project-loop-title-read-area{
  position: absolute;
  top: -96px;
  right: 160px;
  text-align: right;
}

.project-card-area{
  position: relative;
  height: 2000px;
}

.project .l-container{
  height: 100%;
  padding: 0 160px 0 40px;
}

.project-card-area-clip{
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 160px 0 0;
}

.project-card-item{
  position: absolute;
  width: 0;
  height: 0;
}

.project-card-item-00{
  top: -5.2%;
  right: 34.6%;
}

.project-card-item-01{
  top: 8.3%;
  left: 34.5%;
}

.project-card-item-02{
  top: 24%;
  left: 11%;
}

.project-card-item-03{
  top: 2%;
  left: 3.4%;
}

.project-card-item-04{
  top: 23%;
  right: 27%;
}

.project-card-item-05{
  top: 35%;
  right: 58%;
}

.project-card-item-06{
  top: 49%;
  right: 32.8%;
}

.project-card-item-07{
  top: 53%;
  left: 22.4%;
}

.project-card-item-08{
  top: 66%;
  left: 4%;
}


.box{
  width: 200px;
  height: 100px;
  background-color: #fff;
}

</style>