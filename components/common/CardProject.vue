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
      <!-- リンクが存在するとき -->
      <span v-if="link">
        <!-- 外部リンクのとき -->
        <span v-if="blank">
          <a
            :href="link"
            target="_blank"
            rel="noopener"
            class="card-project-link"
          >
            <div class="card-project-inner">
              <span class="card-project-title-wrapper-01">
                <span
                  v-for="(char, index) of name"
                  :key="index"
                  v-text="char"
                ></span>
              </span>
              <span class="card-project-title-wrapper-02">
                <span
                  v-for="(char, index) of text"
                  :key="index"
                  v-text="char"
                ></span>
              </span>
              <span class="card-project-title-wrapper-03">
                <CommonTextSegment
                  :state="state"
                  :start="0"
                  :rotate="rotateLeft"
                  :text="title"
                ></CommonTextSegment>
                <span v-if="subtitle" class="card-project-sub-title">
                  <CommonTextSegment
                    :state="state"
                    :start="0.28"
                    :rotate="rotateLeft"
                    :text="subtitle"
                  ></CommonTextSegment>
                </span>
              </span>
            </div>
          </a>
        </span>
        <!-- 内部リンクのとき -->
        <span v-else>
          <NuxtLink :to="link" class="card-project-link">
            <div class="card-project-inner">
              <span class="card-project-title-wrapper-01">
                <span
                  v-for="(char, index) of name"
                  :key="index"
                  v-text="char"
                ></span>
              </span>
              <span class="card-project-title-wrapper-02">
                <span
                  v-for="(char, index) of text"
                  :key="index"
                  v-text="char"
                ></span>
              </span>
              <span class="card-project-title-wrapper-03">
                <CommonTextSegment
                  :state="state"
                  :start="0"
                  :rotate="rotateLeft"
                  :text="title"
                ></CommonTextSegment>
                <span v-if="subtitle" class="card-project-sub-title">
                  <CommonTextSegment
                    :state="state"
                    :start="0.28"
                    :rotate="rotateLeft"
                    :text="subtitle"
                  ></CommonTextSegment>
                </span>
              </span>
            </div>
          </NuxtLink>
        </span>
      </span>
      <!-- タイトルのみリンクが存在するとき -->
      <span v-else>
        <div class="card-project-inner">
          <span class="card-project-title-wrapper-01">
            <span
              v-for="(char, index) of name"
              :key="index"
              v-text="char"
            ></span>
          </span>
          <span class="card-project-title-wrapper-02">
            <span v-if="info">
              <span v-for="(char, index) of info" :key="index">
                <a :href="char.link" target="_blank" rel="noopener">{{
                  char.text
                }}</a>
              </span>
            </span>
          </span>
          <span class="card-project-title-wrapper-03">
            <a :href="title.link" target="_blank" rel="noopener">
              <CommonTextSegment
                :state="state"
                :start="0"
                :rotate="rotateLeft"
                :text="title.text"
              ></CommonTextSegment>
              <span v-if="title.subtext" class="card-project-sub-title">
                <CommonTextSegment
                  :state="state"
                  :start="0.28"
                  :rotate="rotateLeft"
                  :text="title.subtext"
                ></CommonTextSegment>
              </span>
            </a>
          </span>
        </div>
      </span>
    </article>
    <div ref="CardProjectObserver" class="card-project-observer"></div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: Array,
      required: true,
    },
    title: {
      type: [Object, String],
      required: true,
    },
    subtitle: {
      type: [Object, String],
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    blank: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Array,
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
            this.state = 'center'
            this.$gsap.to(this.$refs.CardProjectArticle, {
              duration: this.$baseAnimationConfig.duration * 2.0,
              ease: this.$easing.transform,
              rotate: 0,
            })
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
        x: this.$refs.CardProject.getBoundingClientRect().top * this.xspeed,
        y: this.$refs.CardProject.getBoundingClientRect().top * this.yspeed,
      })
    },
  },
}
</script>

<style scoped lang="scss">
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
  position: relative;
  width: 100%;
  height: 100%;
}

.card-project-link {
  display: block;
  width: 100%;
  height: 100%;
}

.card-project-title-wrapper-03 {
  position: absolute;
  bottom: -11px;
  left: 0;
  width: 100%;
  font-size: 120px;
  font-family: 'Six Caps', sans-serif;

  @include sp() {
    font-size: 108px;
  }

  & a {
    display: block;
  }

  & .card-project-sub-title {
    position: absolute;
    top: 12px;
    right: -4px;
    font-size: 12px;
    font-family: Helvetica, sans-serif;
    letter-spacing: 0.02em;

    @include sp() {
      font-size: 11px;
    }
  }
}

.card-project-title-wrapper-02 {
  & span {
    display: block;
    font-size: 12px;
    font-family: Helvetica, sans-serif;
    letter-spacing: 0.02em;
    line-height: 1.24;

    @include sp() {
      font-size: 11px;
    }
  }
}

.card-project-title-wrapper-01 {
  display: block;
  margin: 0 0 60px 0;

  @include sp() {
    margin: 0 0 52px 0;
  }

  & span {
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
        font-size: 32px;
      }
    }
  }
}

//modifier
.card-project-index-hero .card-project-article {
  background-color: $thinPink;
}

.card-project-index-hero .card-project-title-wrapper-01 {
  color: $white;
}

.card-project-index-hero .card-project-title-wrapper-02 {
  color: $darkPink;
}

.card-project-index-hero .card-project-title-wrapper-03 {
  color: $darkPink;
}

.card-project-about-hero .card-project-article {
  background-color: #d9d9d9;
}

.card-project-about-hero .card-project-title-wrapper-01 {
  color: $darkBlack;
}

.card-project-about-hero .card-project-title-wrapper-02 {
  color: $darkBlack;
}

.card-project-about-hero .card-project-title-wrapper-03 {
  color: $darkBlack;
}
</style>