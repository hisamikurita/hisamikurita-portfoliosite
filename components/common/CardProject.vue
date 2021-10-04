<template>
  <div ref="CardProject" class="card-project">
    <article ref="CardProjectArticle" class="card-project-article">
      <NuxtLink :to="link">
        <div class="card-project-inner">
            <span class="card-project-title-wrapper-01">
              <CommonSectionReadTitle
                modifier="card-section"
                :state="state"
                :start="0"
                :text="[
                  '・',
                  name,
                ]"
              ></CommonSectionReadTitle>
            </span>
            <span class="card-project-title-wrapper-02">
              <CommonSectionReadTitle
                :state="state"
                :start="0.36"
                :text="text"
              ></CommonSectionReadTitle>
            </span>
            <span class="card-project-title-wrapper-03">
              <CommonTextSegment
                :state="state"
                :start="0.72"
                :rotate="rotateLeft"
                :text="title"
              ></CommonTextSegment>
            </span>
        </div>
      </NuxtLink>
    </article>
    <div ref="CardProjectObserver" class="card-project-observer"></div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    text: {
      type: Array,
      required: true,
    },
    speed: {
      type: Number,
      default: 0.10,
    },
  },
  data: () => {
    return {
      state: '',
    }
  },
  mounted() {
    this.drag = this.$Draggable.create(this.$refs.CardProjectArticle,{
      type:"x,y",
      bounds:this.$parent.$el,
      edgeResistance: 0.9,
      inertia:true,

      onThrowUpdate:() =>{
        this.$gsap.set(this.$refs.CardProjectObserver,{
          x: this.drag[0].x,
          y: this.drag[0].y,
        })
      }
    })

    this.observe = this.$refs.CardProjectObserver;
    this.iObserverTextSegment = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.state = 'center'
            this.iObserverTextSegment.unobserve(this.observe)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserverTextSegment.observe(this.observe)

    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.$asscroll.on('scroll', this.cardPallax)
          } else {
            this.$asscroll.off('scroll', this.cardPallax)
          }
        })
      },
      {
        rootMargin: '0%',
      }
    ).observe(this.observe)
  },

  beforeDestroy() {
    this.$asscroll.off('scroll', this.cardPallax)
  },

  methods: {
    cardPallax() {
      this.$gsap.to(this.$refs.CardProject, {
        duration: this.$baseAnimationConfig.duration / 3.0,
        ease: 'none',
        y: this.$refs.CardProject.getBoundingClientRect().top * this.speed,
      })
    },
  }
}
</script>

<style scoped lang="scss">
.card-project{
  position: relative;
}

.card-project-observer{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.card-project-article{
  width: 293px;
  height: 400px;
  padding: 33px 20px;
  background-color: $white;
  color: $black;
  border-radius: 14px;
}

.card-project-inner{
  position: relative;
  width: 100%;
  height: 100%;
}

.card-project-title-wrapper-01{
  display: block;
  margin: 0 0 60px 0;
}

.card-project-title-wrapper-03{
  position: absolute;
  bottom: -11px;
  left: 0;
  font-size: 120px;
  font-family: 'Six Caps', sans-serif;
}

</style>