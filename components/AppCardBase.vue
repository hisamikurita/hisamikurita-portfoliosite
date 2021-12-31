<template>
  <div
    ref="CardProject"
    class="card-project"
    :class="`card-project-${modifier}`"
  >
    <article
      ref="CardProjectArticle"
      :style="{ transform: 'rotate(' + rotate + 'deg' + ')' }"
      class="card-project-article"
    >
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
        :title="title"
        :link="link"
        :text="text"
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
    </article>
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
  mounted() {
    if (!this.spAnimation && this.$siteConfig.isMobile) return

    this.drag = this.$Draggable.create(this.$refs.CardProjectArticle, {
      type: 'x,y',
      bounds: this.$parent.$el,
      edgeResistance: 0.9,
      inertia: true,
      allowEventDefault: true,

      onThrowUpdate: () => {
        this.$gsap.set(this.$refs.CardProjectObserver, {
          x: this.drag[0].x,
          y: this.drag[0].y,
        })
      },
    })

    this.observe = this.$refs.CardProjectObserver
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

    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.$gsap.ticker.add(this.cardPallax);
          } else {
            this.$gsap.ticker.remove(this.cardPallax);
          }
        })
      },
      {
        rootMargin: '0%',
      }
    ).observe(this.observe)
  },

  beforeDestroy() {
    this.$gsap.ticker.remove(this.cardPallax);
  },

  methods: {
    cardViewAnimation() {
      this.state = 'center'
      this.$gsap.to(this.$refs.CardProjectArticle, {
        duration: this.$siteConfig.baseDuration * 1.5,
        ease: this.$easing.transform,
        y: -280,
        rotate: 0,
      })
    },

    cardPallax() {
      this.$gsap.to(this.$refs.CardProject, {
        duration: this.$siteConfig.baseDuration / 3.0,
        ease: 'none',
        x: this.$refs.CardProject.getBoundingClientRect().top * this.xspeed,
        y: this.$refs.CardProject.getBoundingClientRect().top * this.yspeed,
      })
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.card-project-article {
  width: 293px;
  height: 400px;
  padding: 28px 18px;
  background-color: $white;
  color: $black;
  border-radius: 14px;

  @include sp() {
    width: 264px;
    height: 360px;
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
}

.card-project-title-wrapper-01 {
  display: block;
  margin: 0 0 60px 0;

  @include sp() {
    margin: 0 0 52px 0;
  }
}

.card-project-title-wrapper-01-block {
  display: block;
  font-size: 20px;
  line-height: 1.2;

  @include sp() {
    font-size: 18px;
  }

  &:first-of-type {
    font-size: 36px;
    text-indent: -4px;
    line-height: 1;

    @include sp() {
      display: inline-block;
      margin: 0 0 0 -4px;
      font-size: 32px;
      text-indent: 0;
    }
  }
}

.card-project-title-wrapper-02-block {
  display: block;
  width: 200px;
  font-size: 12px;
  font-family: Helvetica, sans-serif;
  letter-spacing: 0.02em;
  line-height: 1.24;

  @include sp() {
    font-size: 11px;
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
    font-size: 108px;
  }

  & .card-project-sub-title {
    position: absolute;
    top: 12px;
    right: -4px;
    font-size: 12px;
    font-family: $helvetica;
    letter-spacing: 0.02em;

    @include sp() {
      font-size: 11px;
    }
  }
}

.card-project-title-wrapper-03-link {
  display: block;
}

//modifier
.card-project-index-hero .card-project-article {
  background-color: $thinPink;
}

.card-project-about-hero .card-project-article {
  background-color: #d9d9d9;
}
</style>