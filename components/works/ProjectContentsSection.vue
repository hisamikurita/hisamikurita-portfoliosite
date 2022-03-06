<template>
  <div ref="Contents" class="contents">
    <div class="l-container">
      <div class="contents-inner">
        <div class="contents-info">
          <dl class="contents-info-client">
            <dt>CLIENT</dt>
            <dd>{{ currentProject.client }}</dd>
          </dl>
          <div class="contents-info-desc">
            {{ currentProject.freeArea }}
          </div>
        </div>
        <div
          v-for="(image, index) in currentProject.contentsImg"
          :key="index"
          ref="ContentsImgWrapper"
          class="contents-img"
          :class="`contents-img-0${index + 1} ${image.fieldId}`"
        >
          <span v-if="image.fieldId === 'default' || image.fieldId === 'full'">
            <picture>
              <source
                :srcset="`${image.object.url}?fm=webp&w=2000&h=1248&q=50`"
                :width="`${image.object.width}`"
                :height="`${image.object.height}`"
                type="image/webp"
              />
              <img
                ref="ContentsImg"
                :src="`${image.object.url}?w=2000&h=1248&q=50`"
                :width="`${image.object.width}`"
                :height="`${image.object.height}`"
              />
            </picture>
          </span>
          <span v-else class="contents-img-split">
            <picture>
              <source
                :srcset="`${image.split1.url}?fm=webp&w=2000&h=1248&q=50`"
                :width="`${image.split1.width}`"
                :height="`${image.split1.height}`"
                type="image/webp"
              />
              <img
                ref="ContentsImg"
                :src="`${image.split1.url}?w=2000&h=1248&q=50`"
                :width="`${image.split1.width}`"
                :height="`${image.split1.height}`"
              />
            </picture>
            <picture>
              <source
                :srcset="`${image.split2.url}?fm=webp&w=2000&h=1248&q=50`"
                :width="`${image.split2.width}`"
                :height="`${image.split2.height}`"
                type="image/webp"
              />
              <img
                ref="ContentsImg"
                :src="`${image.split2.url}?w=2000&h=1248&q=50`"
                :width="`${image.split2.width}`"
                :height="`${image.split2.height}`"
              />
            </picture>
          </span>
        </div>
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
  },

  mounted() {
    console.log(this.currentProject)

    /* img-animation call */
    this.imgTriggerArray = []
    this.imgWrapper = this.$refs.ContentsImgWrapper
    this.img = this.$refs.ContentsImg

    this.$nextTick(() => {
      setTimeout(() => {
        this.imgWrapper.forEach((item, index) => {
          this.imgTriggerArray.push(
            this.$ScrollTrigger.create({
              trigger: item,
              start: 'top bottom',
              once: true,
              onEnter: () => {
                this.$gsap.to(this.imgWrapper[index], {
                  duration: this.$SITECONFIG.baseDuration,
                  ease: this.$EASING.transform,
                  scale: 1.0,
                })
                this.$gsap.to(this.img[index], {
                  duration: this.$SITECONFIG.baseDuration,
                  ease: this.$EASING.transform,
                  scale: 1.0,
                })
              },
            })
          )
        })
      }, 100)
    })
  },
  beforeDestroy() {
    this.imgTriggerArray.forEach((item) => {
      item.kill()
    })
  },
}
</script>

<style lang="scss" scoped>
.contents-inner {
  padding: 0 40px;

  @include sp() {
    padding: 0 vw_sp(20);
  }
}

.contents-info {
  display: flex;
  width: vw(1000);
  margin: 0 0 160px 0;
  padding: 38px 0 0 0;
  font-size: 12px;
  border-top: solid 1px;

  @include sp() {
    display: block;
    width: 100%;
    margin: 0 0 118px 0;
    padding: 22px 0 0 0;
    font-size: 10px;
  }
}

.contents-info-client {
  flex-shrink: 0;
  width: 250px;
  line-height: 1.2;

  @include sp() {
    width: 100%;
    margin: 0 0 33px 0;
  }
}

.contents-info-desc {
  margin: -2px 0 0 0;
  line-height: 1.36;
}

.contents-img {
  position: relative;
  margin: 0 0 160px 0;
  transform: scale(0.7);
  overflow: hidden;

  @include sp() {
    margin: 0 0 44px 0;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.5);
  }

  &.default {
    width: vw(1000);

    @include sp() {
      width: 100%;
    }
  }

  &.full {
    width: calc(100% + 160px);
    margin: 0 0 160px -80px;

    @include sp() {
      width: calc(100% + #{vw_sp(80)});
      margin: 0 0 44px vw_sp(-40);
    }
  }

  &.split {
    width: calc(100% + 160px);
    margin: 0 0 160px -80px;
  }
}

.contents-img-split {
  display: flex;
}
</style>