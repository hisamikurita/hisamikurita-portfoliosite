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
          class="contents-img-wrapper"
          :class="`contents-img-wrapper-${image.fieldId}`"
        >
          <!--
            画像タイプ defalt, full, split が入ってくるので出力するdomの条件分岐
            画像タイプが defalt, full の場合
          -->
          <span v-if="image.fieldId === 'default' || image.fieldId === 'full'">
            <picture>
              <img
                ref="ContentsImg"
                class="contents-img"
                :srcset="`${image.object.url}?fm=webp&w=2000&h=1248&q=50`"
                :width="`${image.object.width}`"
                :height="`${image.object.height}`"
                type="image/webp"
              />
            </picture>
          </span>

          <!--
            画像タイプが split の場合
          -->
          <span v-else class="contents-img-split">
            <picture>
              <img
                ref="ContentsImg"
                class="contents-img"
                :srcset="`${image.split1.url}?fm=webp&w=2000&h=1248&q=50`"
                :width="`${image.split1.width}`"
                :height="`${image.split1.height}`"
                type="image/webp"
              />
            </picture>
            <picture>
              <img
                ref="ContentsImg"
                class="contents-img"
                :srcset="`${image.split2.url}?fm=webp&w=2000&h=1248&q=50`"
                :width="`${image.split2.width}`"
                :height="`${image.split2.height}`"
                type="image/webp"
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
    // 画像アニメーション PCの場合有効
    if (this.$SITECONFIG.isPc) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.observer = this.$refs.ContentsImgWrapper
          this.iObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const imgWrapper = entry.target
                  const img = imgWrapper.querySelector('.contents-img')

                  this.$gsap.to(imgWrapper, {
                    duration: this.$SITECONFIG.baseDuration,
                    ease: this.$EASING.transform,
                    scale: 1.0,
                  })
                  this.$gsap.to(img, {
                    duration: this.$SITECONFIG.baseDuration,
                    ease: this.$EASING.transform,
                    scale: 1.0,
                  })
                  this.iObserver.unobserve(imgWrapper)
                }
              })
            },
            {
              rootMargin: '0%',
            }
          )
          for (let i = 0; i < this.observer.length; i++) {
            this.iObserver.observe(this.observer[i])
          }
        }, 200) // アニメーションが発火しないことがあるので処理を0.2秒遅らせる
      })
    }
  },
  beforeDestroy() {
    if (this.$SITECONFIG.isPc) {
      for (let i = 0; i < this.observer.length; i++) {
        this.iObserver.unobserve(this.observer[i]) // リセット
      }
    }
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

.contents-img-wrapper {
  position: relative;
  margin: 0 0 20px 0;
  transform: scale(0.7);
  overflow: hidden;
  border-radius: 10px;

  @include sp() {
    margin: 0 0 44px 0;
    transform: scale(1);
  }
}

// 画像タイプ defalt, full, split が入ってくるのでスタイルの条件分岐
.contents-img-wrapper-default {
  width: vw(1000);

  @include sp() {
    width: 100%;
  }
}

.contents-img-wrapper-full {
  width: calc(100% + 160px);
  margin: 0 0 20px -80px;

  @include sp() {
    width: calc(100% + #{vw_sp(80)});
    margin: 0 0 44px vw_sp(-40);
  }
}

.contents-img-wrapper-split {
  width: calc(100% + 160px);
  margin: 0 0 160px -80px;
}
/////////////////////////////////////////////////////////

.contents-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5);

  @include sp() {
    transform: scale(1);
  }
}

.contents-img-split {
  display: flex;
}
</style>