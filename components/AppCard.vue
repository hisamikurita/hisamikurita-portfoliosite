<template>
  <div ref="root" class="app-card">
    <div
      ref="wrapper"
      :style="`color:${color}; transform: rotate(${rotate}deg);`"
      class="app-card-wrapper js-hold-target"
      :class="`app-card-wrapper-${componentName}`"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    >
      <!-- 任意の名前から出力するコンポーネントを出し分ける -->
      <CardMv v-if="componentName === 'mv'" :name="name" :title="title" :subtitle="subtitle" :desc="desc" :state="state" />
      <CardProject v-else-if="componentName === 'project'" :id="id" :type="type" :index="index" :name="name" :title="title" :desc="desc" :state="state" />
      <CardContact v-else-if="componentName === 'contact'" :name="name" :title="title" :info="info" :state="state" />
      <CardCompany v-else-if="componentName === 'company'" :name="name" :title="title" :subtitle="subtitle" :link="link" :desc="desc" :state="state" />
      <CardWorks v-else-if="componentName === 'works'" :shadow-color="shadowColor" :external-link="externalLink" :state="state" />
    </div>
    <!-- intersectionObserverで監視する用の空dom -->
    <div ref="observer" class="app-card-observer"></div>
  </div>
</template>

<script>
export default {
  /**
   * componentName : 出力するコンポーネント名
   * type : CardProjectコンポーネントで works/archive で処理を切り替える
   * id : 案件ID
   * index : 案件に固有に振り渡している番号
   * color : 案件に固有に振り渡している色
   * shadowColor : 案件に固有に振り渡している影の色
   * name : 名前
   * title : タイトル
   * subtitle : サブタイトル
   * externalLink : 外部リンク
   * link : リンク
   * desc : 説明
   * info : 各種SNS
   * xspeed : X軸のパララックスの値を調整する
   * yspeed : Y軸のパララックスの値を調整する
   * rotate : 回転の初期値
   * spAnimation : SPをアニメーションを有効にさせるか
   * dragAnimation: ドラッグのアニメーションを有効にさせるか
   * viewAnimation : 表示アニメーションを有効にさせるか
   */
  props: {
    componentName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
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
    externalLink: {
      type: String,
      default: null,
    },
    desc: {
      type: [Array, String],
      default: null,
    },
    link: {
      type: String,
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
    dragAnimation() {
      if (this.dragAnimation) this.createDragAnimation()
    },
  },

  mounted() {
    this.root = this.$refs.root
    this.wrapper = this.$refs.wrapper
    this.observer = this.$refs.observer
    this.drag = null
    this.cardAngle = 0
    this.iObserverFadeIn = null
    this.iObserverParallax = null

    // SPの時は任意(spAnimation = false)で,処理を返す
    // デフォルトではSPもアニメーションする
    if (!this.spAnimation && this.$SITECONFIG.isMobile) return

    this.$nextTick(() => {
      setTimeout(() => {
        if (this.dragAnimation) this.createDragAnimation()
        this.observe()
      }, 400) // アニメーションが発火しないことがあるので処理を0.4秒遅らせる
    })
  },

  beforeDestroy() {
    // SPの時は任意(spAnimation = false)で処理を返す
    // デフォルトではSPもアニメーションする
    if (!this.spAnimation && this.$SITECONFIG.isMobile) return
    if (this.dragAnimation) {
      this.drag[0].kill()
      this.drag = null
    }
    this.$store.commit('mouse/mouseleave')
    this.$gsap.ticker.remove(this.parallax)
    if (this.viewAnimation) {
      this.iObserverFadeIn.unobserve(this.observer)
      this.iObserverFadeIn = null
    }
    this.iObserverParallax.unobserve(this.observer)
    this.iObserverParallax = null
  },

  methods: {
    createDragAnimation() {
      this.drag = this.$Draggable.create(this.wrapper, {
        type: 'x,y',
        bounds: this.$parent.$el,
        edgeResistance: 0.6,
        inertia: true,
        allowEventDefault: true,

        onThrowUpdate: () => {
          this.cardAngle += (this.drag[0].deltaX + this.drag[0].deltaY) / 3.0
          this.$gsap.to(this.wrapper, {
            duration: 0.01,
            ease: 'none',
            rotate: this.cardAngle,
          })
          this.$gsap.set(this.observer, {
            x: this.drag[0].x,
            y: this.drag[0].y,
          })
        },
      })
    },

    fadeInAnimation() {
      this.state = 'center'
      this.$gsap.to(this.wrapper, {
        duration: 1.5,
        ease: this.$EASING.transform,
        y: -280,
        rotate: 0,
      })
    },

    parallax() {
      this.$gsap.to(this.root, {
        duration: 0.333,
        ease: 'none',
        x: this.root.getBoundingClientRect().top * this.xspeed,
        y: this.root.getBoundingClientRect().top * this.yspeed,
      })
    },

    observe() {
      if (this.viewAnimation) {
        this.iObserverFadeIn = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.fadeInAnimation()
                this.iObserverFadeIn.unobserve(this.observer)
              }
            })
          },
          { rootMargin: '0%' }
        )
        this.iObserverFadeIn.observe(this.observer)
      }

      this.iObserverParallax = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.$gsap.ticker.add(this.parallax)
            } else {
              this.$gsap.ticker.remove(this.parallax)
            }
          })
        },
        {
          rootMargin: '0%',
        }
      )
      this.iObserverParallax.observe(this.observer)
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

<style lang="scss" scoped>
.app-card {
  position: relative;
}

.app-card-wrapper {
  width: 293px;
  height: 400px;

  @include sp() {
    width: 212px;
    height: 302px;
  }
}

.app-card-wrapper-works {
  width: 147px;
  height: 220px;
}

.app-card-observer {
  position: absolute;
  top: -14px;
  left: 0;
  width: 293px;
  height: 400px;
  pointer-events: none;
}
</style>
