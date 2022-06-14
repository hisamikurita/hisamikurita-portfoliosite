<template>
  <div
    ref="CardProject"
    class="card-project"
    :class="`card-project-${modifier}`"
  >
    <div
      ref="CardProjectArticle"
      :style="`color:${color}; transform: rotate(${rotate}deg); color:${color};`"
      class="card-project-article"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    >
      <!--
        任意の名前から出力するコンポーネントを出し分ける
      -->
      <CardMainVisualContents
        v-if="componentName === 'MainVisualContents'"
        :name="name"
        :title="title"
        :subtitle="subtitle"
        :link="link"
        :text="text"
        :modifier="modifier"
        :state="state"
      />
      <CardProjectContents
        v-if="componentName === 'ProjectContents'"
        :name="name"
        :index="index"
        :title="title"
        :link="link"
        :text="text"
        :modifier="modifier"
        :state="state"
      />
      <CardWorksContents
        v-if="componentName === 'WorksContents'"
        :name="name"
        :title="title"
        :link="link"
        :text="text"
        :modifier="modifier"
        :state="state"
      />
      <CardWorksLinkContents
        v-if="componentName === 'WorksLinkContents'"
        :shadow-color="shadowColor"
        :external-link="externalLink"
        :modifier="modifier"
        :state="state"
      />
      <CardContactContents
        v-if="componentName === 'ContactContents'"
        :name="name"
        :title="title"
        :info="info"
        :modifier="modifier"
        :state="state"
      />
      <CardCompanyContents
        v-if="componentName === 'CompanyContents'"
        :name="name"
        :title="title"
        :subtitle="subtitle"
        :text="text"
        :link="link"
        :modifier="modifier"
        :state="state"
      />
      <CardArchiveContents
        v-if="componentName === 'ArchiveContents'"
        :name="name"
        :title="title"
        :subtitle="subtitle"
        :text="text"
        :modifier="modifier"
        :state="state"
      />
    </div>

    <!--
      intersection-obsereverで監視する用の空dom
    -->
    <div ref="CardProjectObserver" class="card-project-observer"></div>
  </div>
</template>

<script>
export default {
  props: {
    componentName: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '',
    },
    shadowColor: {
      type: String,
      default: '',
    },
    name: {
      type: [Array, String],
      default: null,
    },
    title: {
      type: [Object, String],
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    externalLink: {
      type: String,
      default: null,
    },
    text: {
      type: [Array, String],
      default: null,
    },
    info: {
      type: Array,
      default: null,
    },
    xspeed: {
      type: Number,
      default: 0.1,
    },
    yspeed: {
      type: Number,
      default: 0.1,
    },
    rotate: {
      type: Number,
      default: 8,
    },
    spAnimation: {
      type: Boolean,
      default: true,
    },
    dragAnimation: {
      type: Boolean,
      default: true,
    },
    viewAnimation: {
      type: Boolean,
      default: true,
    },
    modifier: {
      type: String,
      default: '',
    },
  },
  data: () => {
    return {
      state: '',
    }
  },

  computed: {
    mouseDown() {
      return this.$store.getters['mouse/isDown']
    },
  },

  watch: {
    dragAnimation: function () {
      if (this.dragAnimation) {
        this.createDragAnimation()
      }
    },
  },

  mounted() {
    // SPの時は任意(spAnimation = false)で,処理を返す
    // デフォルトではSPもアニメーションする
    if (!this.spAnimation && this.$SITECONFIG.isMobile) return

    this.$nextTick(() => {
      setTimeout(() => {
        // ドラッグアニメーション
        if (this.dragAnimation) {
          this.createDragAnimation()
        }

        // 出現アニメーション 監視
        this.observe = this.$refs.CardProjectObserver

        if (this.viewAnimation) {
          this.iObserverTextSegment = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  this.cardViewAnimation()
                  this.iObserverTextSegment.unobserve(this.observe)
                }
              })
            },
            { rootMargin: '0%' }
          )
          this.iObserverTextSegment.observe(this.observe)
        }

        // パララックス 監視
        this.iObserverAnimation = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.$gsap.ticker.add(this.cardPallax)
              } else {
                this.$gsap.ticker.remove(this.cardPallax)
              }
            })
          },
          {
            rootMargin: '0%',
          }
        )
        this.iObserverAnimation.observe(this.observe)
      }, 200) // アニメーションが発火しないことがあるので処理を0.2秒遅らせる
    })
  },

  beforeDestroy() {
    // SPの時は任意(spAnimation = false)で処理を返す
    // デフォルトではSPもアニメーションする
    if (!this.spAnimation && this.$SITECONFIG.isMobile) return

    // リセット
    if (this.dragAnimation) {
      this.drag[0].kill()
      this.drag = null
    }
    this.$store.commit('mouse/mouseleave')
    this.$gsap.ticker.remove(this.cardPallax)
    if (this.viewAnimation) {
      this.iObserverTextSegment.unobserve(this.observe)
      this.iObserverTextSegment = null
    }
    this.iObserverAnimation.unobserve(this.observe)
    this.iObserverAnimation = null
  },

  methods: {
    createDragAnimation() {
      this.cardAngle = 0
      this.drag = this.$Draggable.create(this.$refs.CardProjectArticle, {
        type: 'x,y',
        bounds: this.$parent.$el,
        edgeResistance: 0.6,
        inertia: true,
        allowEventDefault: true,

        onThrowUpdate: () => {
          this.cardAngle += (this.drag[0].deltaX + this.drag[0].deltaY) / 3.0
          this.$gsap.to(this.$refs.CardProjectArticle, {
            duration: 0.01,
            ease: 'none',
            rotate: this.cardAngle,
          })
          this.$gsap.set(this.$refs.CardProjectObserver, {
            x: this.drag[0].x,
            y: this.drag[0].y,
          })
        },
      })
    },

    cardViewAnimation() {
      this.state = 'center'
      this.$gsap.to(this.$refs.CardProjectArticle, {
        duration: this.$SITECONFIG.baseDuration * 1.5,
        ease: this.$EASING.transform,
        y: -280,
        rotate: 0,
      })
    },

    cardPallax() {
      this.$gsap.to(this.$refs.CardProject, {
        duration: this.$SITECONFIG.baseDuration / 3.0,
        ease: 'none',
        x: this.$refs.CardProject.getBoundingClientRect().top * this.xspeed,
        y: this.$refs.CardProject.getBoundingClientRect().top * this.yspeed,
      })
    },

    onMouseEnter() {
      if (this.mouseDown || this.$SITECONFIG.isTouch) return
      this.$store.commit('mouse/mouseenter')
    },

    onMouseLeave() {
      if (this.$SITECONFIG.isTouch) return
      this.$store.commit('mouse/mouseleave')
    },
    onMouseDown() {
      if (this.$SITECONFIG.isTouch) return
      this.$store.commit('mouse/mousedown')
    },
    onMouseUp() {
      if (this.$SITECONFIG.isTouch) return
      this.$store.commit('mouse/mouseup')
    },
  },
}
</script>

<style lang="scss">
.card-project {
  position: relative;
}

.card-project-observer {
  position: absolute;
  top: -14px;
  left: 0;
  width: 293px;
  height: 400px;
  pointer-events: none;
}

.card-project-article {
  position: relative;
  width: 293px;
  height: 400px;
  padding: 28px 18px;
  background-color: $white;
  color: $black;
  border-radius: 14px;

  @include sp() {
    width: 212px;
    height: 302px;
    padding: 20px 16px;
    border-radius: 7px;
  }
}

.card-project-inner {
  display: block;
  position: relative;
  height: 100%;
}

.card-project-link {
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;
  line-height: 1;
}

.card-project-title-wrapper-01 {
  display: block;
  margin: 0 0 60px 0;

  @include sp() {
    margin: 0 0 40px 0;
  }
}

.card-project-title-wrapper-01-block {
  display: block;
  font-size: 20px;
  font-family: $helvetica;
  line-height: 1.2;

  @include sp() {
    font-size: 17px;
  }

  &:first-of-type {
    font-size: 36px;
    text-indent: -4px;
    line-height: 1;

    @include sp() {
      display: inline-block;
      margin: 0 0 0 -4px;
      font-size: 28px;
      line-height: 0.9;
      text-indent: 0;
    }
  }
}

.card-project-title-wrapper-02-block {
  display: block;
  width: 200px;
  font-size: 12px;
  font-family: $helvetica;
  letter-spacing: 0.02em;
  line-height: 1.24;

  @include sp() {
    width: 180px;
    font-size: 10px;
  }
}

.card-project-title-wrapper-03 {
  position: absolute;
  bottom: -11px;
  left: 0;
  width: 100%;
  font-size: 120px;
  font-family: $sixcaps;

  @include sp() {
    bottom: -5px;
    font-size: 80px;
  }

  & .card-project-sub-title {
    position: absolute;
    top: 12px;
    right: -4px;
    font-size: 12px;
    font-family: $helvetica;
    letter-spacing: 0.02em;

    @include sp() {
      top: 7px;
      font-size: 10px;
    }
  }
}

.card-project-title-wrapper-03-link {
  display: block;
}

////////////// モディファイアー //////////////////////////////
.card-project-index-hero .card-project-article {
  background-color: $thinPink;
}

.card-project-about-hero .card-project-article {
  background-color: #d9d9d9;
}

.card-project-works-contents-external {
  & .card-project-article {
    width: 147px;
    height: 220px;
    padding: 12px 13px;
    border-radius: 7px;
  }

  & .card-project-title-wrapper-01 {
    margin: 0 0 10px 0;
  }

  & .card-project-title-wrapper-01-block {
    font-size: 12px;

    &:first-of-type {
      font-size: 36px;
      line-height: 0.6;
    }
  }

  & .card-project-title-wrapper-02 {
    font-size: 10px;
  }

  & .card-project-title-wrapper-02-block {
    width: 110%;
    font-size: 11px;
    line-height: 1.4;
    transform: scale(0.82);
    transform-origin: left;
  }

  & .card-project-title-wrapper-03 {
    bottom: 0;
    left: 0;
    font-size: 50px;
  }
}
///////////////////////////////////////////////////////////

.card-project-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 30px 60px 0 #101237;
  border-radius: 12px;
  opacity: 0.3;
}

/* stylelint-disable */
.is-windows .card-project-title-wrapper-01-block {
  &:first-of-type {
    position: relative;
    left: -8px;
  }
}

// .is-android .card-project-title-wrapper-01-block {
//   &:first-of-type {
//     @include sp() {
//       position: relative;
//       left: -8px;
//     }
//   }
// }
/* stylelint-enable */
</style>
