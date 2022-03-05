<template>
  <div
    class="hambergerMenu"
    :class="{
      'is-disable': hambergerMenuDisable,
      'is-open': hambergerMenuState,
    }"
  >
    <span ref="HambergerMenuOverlay01" class="hambergerMenu-overlay-01"></span>
    <span ref="HambergerMenuOverlay02" class="hambergerMenu-overlay-02">
      <span ref="HambergerMenuContents" class="hambergerMenu-contents">
        <div class="hambergerMenu-title">
          <span
            class="hambergerMenu-title-wrapper-01"
            @click="onClickSameUrl('index')"
          >
            <AppDefaultTransition url="/" color="#f0efeb">
              <AppTextSegment
                :state="isTextSegmentState"
                :rotate="$BASEROTATE.right"
                :text="'HISAMIKURITA'"
              />
            </AppDefaultTransition>
          </span>
          <span
            class="hambergerMenu-title-wrapper-02"
            @click="onClickSameUrl('about')"
          >
            <AppDefaultTransition url="/about" color="#f0efeb">
              <AppTextSegment
                :state="isTextSegmentState"
                :start="0.12"
                :rotate="$BASEROTATE.left"
                :text="'ABOUT'"
              />
            </AppDefaultTransition>
          </span>
        </div>
        <div class="hambergerMenu-section-title">
          <AppSectionReadTitle
            :state="isTextSegmentState"
            :start="0.24"
            :text="['・', 'WORKS']"
            :modifier="'section'"
          />
        </div>
        <div>
          <ul class="hambergerMenu-list">
            <li
              v-for="data in getProjectData"
              :key="data.id"
              class="hambergerMenu-item"
            >
              <div
                ref="HambergerMenuItemWrapper"
                class="hambergerMenu-item-wrapper"
                @click="onClickSameUrl(data.id)"
              >
                <AppDefaultTransition
                  :url="`/works/${data.id}`"
                  :color="data.siteColor.bodyContentsColor"
                  class="hambergerMenu-item-link"
                >
                  <div class="hambergerMenu-item-img">
                    <picture>
                      <source
                        :srcset="`${data.hambergerMenuImg.url}?fm=webp&w=360&h=360&q=50`"
                        :width="`${data.hambergerMenuImg.width}`"
                        :height="`${data.hambergerMenuImg.height}`"
                        type="image/webp"
                      />
                      <img
                        :src="`${data.hambergerMenuImg.url}?w=360&h=360&q=50`"
                        :width="`${data.hambergerMenuImg.width}`"
                        :height="`${data.hambergerMenuImg.height}`"
                      />
                    </picture>
                  </div>
                  <div>
                    <p class="hambergerMenu-item-title">
                      {{ data.title.short }}
                    </p>
                    <p class="hambergerMenu-item-desc">{{ data.desc }}</p>
                  </div>
                </AppDefaultTransition>
              </div>
            </li>
          </ul>
        </div>
      </span>
    </span>
    <button
      ref="HambergerMenuBtn"
      class="hambergerMenu-btn"
      @click="hambergerMenuOnClick"
    >
      <span ref="HambergerMenuBtnHover" class="hambergerMenu-hover">
        <span ref="hambergerMenuOpenarea" class="hambergerMenu-openarea">
          <span
            ref="hambergerMenuOpenareaLine01"
            class="hambergerMenu-openarea-line hambergerMenu-openarea-line-01"
          ></span>
          <span
            ref="hambergerMenuOpenareaLine02"
            class="hambergerMenu-openarea-line hambergerMenu-openarea-line-02"
          ></span>
        </span>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      projectData: '',
      isTextSegmentState: 'default',
    }
  },
  computed: {
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
    hambergerMenuDisable() {
      return this.$store.getters['hambergerMenu/disable']
    },
    getProjectData() {
      return this.$store.getters.projectData
    },
  },
  watch: {
    hambergerMenuState: function () {
      /**
       * ハンバガーメニューが開いた時
       */
      if (this.hambergerMenuState) {
        if (this.$SITECONFIG.isPc) {
          /**
           * contents
           */
          this.$gsap.set(this.$refs.HambergerMenuContents, {
            autoAlpha: 1.0,
          })
          this.$refs.HambergerMenuContents.style.pointerEvents = 'auto'
          /**
           * btn
           */
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$EASING.transform,
            x: -520,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$EASING.transform,
            width: 86,
            height: 86,
            borderRadius: 100,
            scale: 0.9,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtnHover, {
            duration: 0.2,
            ease: this.$EASING.colorAndOpacity,
            boxShadow: '0px 10px 20px 5px rgb(193 193 192 / 50%)',
          })
          /**
           * ico
           */
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine01, {
            duration: 0.2,
            ease: this.$EASING.transform,
            top: 3,
            height: 9,
            borderRadius: 4,
            rotate: 45,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine02, {
            duration: 0.2,
            ease: this.$EASING.transform,
            bottom: 2,
            height: 9,
            borderRadius: 4,
            rotate: -45,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenarea, {
            duration: 0.2,
            ease: this.$EASING.transform,
            scale: 0.6,
          })
          /**
           * bg
           */
          this.$gsap.to(this.$refs.HambergerMenuOverlay01, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$EASING.transform,
            scaleX: 5.1,
            scaleY: 1.1,
            x: 10,
            boxShadow: '0 0 3px 0.6px rgb(255 255 255 / 80%)',
          })
          this.$gsap.to(this.$refs.HambergerMenuOverlay02, {
            delay: 0.3,
            duration: 0.2,
            ease: this.$EASING.transform,
            scaleX: 1.0,
          })
          /**
           * text
           */
          setTimeout(() => {
            this.isTextSegmentState = 'center'
            this.itemLinkCenter = this.$gsap.to(
              this.$refs.HambergerMenuItemWrapper,
              {
                duration: this.$SITECONFIG.baseDuration,
                delay: 0.36,
                ease: this.$EASING.transform,
                stagger: {
                  each: 0.12,
                },
                y: 0,
              }
            )
          }, 300)
        } else if (this.$SITECONFIG.isMobile) {
          /**
           * contents
           */
          this.$gsap.set(this.$refs.HambergerMenuContents, {
            autoAlpha: 1.0,
          })
          this.$refs.HambergerMenuContents.style.pointerEvents = 'auto'
          /**
           * btn
           */
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$EASING.transform,
            x: -window.innerWidth / 2.0 + 30 + 20,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$EASING.transform,
            borderRadius: 100,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtnHover, {
            duration: 0.2,
            ease: this.$EASING.colorAndOpacity,
            boxShadow: 'none',
          })
          window.addEventListener('resize', this.hambergerMenuBtnOnResize)
          /**
           * ico
           */
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine01, {
            duration: 0.2,
            ease: this.$EASING.transform,
            top: 5,
            rotate: 45,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine02, {
            duration: 0.2,
            ease: this.$EASING.transform,
            bottom: 4,
            rotate: -45,
          })
          /**
           * bg
           */
          this.$gsap.to(this.$refs.HambergerMenuOverlay01, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$EASING.transform,
            scaleY: 1,
          })
          this.$gsap.to(this.$refs.HambergerMenuOverlay02, {
            delay: 0.4,
            duration: 0.2,
            ease: this.$EASING.transform,
            scaleY: 1,
          })
          /**
           * text
           */
          setTimeout(() => {
            this.isTextSegmentState = 'center'
            this.itemLinkCenter = this.$gsap.to(
              this.$refs.HambergerMenuItemWrapper,
              {
                duration: this.$SITECONFIG.baseDuration,
                delay: 0.36,
                ease: this.$EASING.transform,
                stagger: {
                  each: 0.12,
                },
                y: 0,
              }
            )
          }, 500)
        }
      } else if (!this.hambergerMenuState) {
        /**
         * ハンバガーメニューが閉じた時
         */
        if (this.$SITECONFIG.isPc) {
          /**
           * btn
           */
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$EASING.transform,
            x: 0,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$EASING.transform,
            width: '100%',
            height: '100%',
            borderRadius: 10,
            scale: 1.0,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtnHover, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$EASING.colorAndOpacity,
            boxShadow: 'none',
          })
          /**
           * ico
           */
          this.$gsap.to(this.$refs.hambergerMenuOpenarea, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$EASING.transform,
            scale: 1,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine01, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$EASING.transform,
            top: 0,
            height: 4,
            borderRadius: 2,
            rotate: 0,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine02, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$EASING.transform,
            bottom: 0,
            height: 4,
            borderRadius: 2,
            rotate: 0,
          })
          /**
           * text
           */
          this.isTextSegmentState = 'top'
          this.itemLinkBottom = this.$gsap.to(
            this.$refs.HambergerMenuItemWrapper,
            {
              duration: this.$SITECONFIG.baseDuration,
              delay: 0.36,
              ease: this.$EASING.transform,
              stagger: {
                each: 0.12,
              },
              y: -180,
            }
          )
          /**
           * bg
           */
          this.$gsap.to(this.$refs.HambergerMenuOverlay02, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$EASING.transform,
            scaleX: 0,
          })
          this.$gsap.to(this.$refs.HambergerMenuOverlay01, {
            delay: 0.3,
            duration: 0.2,
            ease: this.$EASING.transform,
            scaleX: 1.0,
            scaleY: 1.0,
            x: 0,
            boxShadow: 'none',
          })
          /**
           * init
           */
          setTimeout(() => {
            this.$refs.HambergerMenuContents.scrollTo(0, 0)
            this.isTextSegmentState = 'init'
            this.$gsap.set(this.$refs.HambergerMenuContents, {
              autoAlpha: 0.0,
            })
            if (this.itemLinkCenter) this.itemLinkCenter.kill()
            if (this.itemLinkBottom) this.itemLinkBottom.kill()
            this.$gsap.set(this.$refs.HambergerMenuItemWrapper, {
              y: 180,
            })
            this.$refs.HambergerMenuContents.style.pointerEvents = 'none'
          }, 300)
        } else if (this.$SITECONFIG.isMobile) {
          /**
           * btn
           */
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$EASING.transform,
            x: 0,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$EASING.transform,
            borderRadius: 10,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtnHover, {
            duration: 0.2,
            ease: this.$EASING.colorAndOpacity,
            boxShadow: 'none',
          })
          window.removeEventListener('resize', this.hambergerMenuBtnOnResize)
          /**
           * ico
           */
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine01, {
            duration: 0.2,
            ease: this.$EASING.transform,
            top: 0,
            rotate: 0,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine02, {
            duration: 0.2,
            ease: this.$EASING.transform,
            bottom: 0,
            rotate: 0,
          })
          /**
           * bg
           */
          this.$gsap.to(this.$refs.HambergerMenuOverlay01, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$EASING.transform,
            scaleY: 0,
          })
          this.$gsap.to(this.$refs.HambergerMenuOverlay02, {
            delay: 0.4,
            duration: 0.2,
            ease: this.$EASING.transform,
            scaleY: 0,
          })
          /**
           * text
           */
          // this.isTextSegmentState = 'top'
          // this.itemLinkBottom = this.$gsap.to(
          //   this.$refs.HambergerMenuItemWrapper,
          //   {
          //     duration: this.$SITECONFIG.baseDuration,
          //     delay: 0.36,
          //     ease: this.$EASING.transform,
          //     stagger: {
          //       each: 0.12,
          //     },
          //     y: -180,
          //   }
          // )
          /**
           * init
           */
          setTimeout(() => {
            this.$refs.HambergerMenuContents.scrollTo(0, 0)
            this.isTextSegmentState = 'init'
            this.$gsap.set(this.$refs.HambergerMenuContents, {
              autoAlpha: 0.0,
            })
            if (this.itemLinkCenter) this.itemLinkCenter.kill()
            if (this.itemLinkBottom) this.itemLinkBottom.kill()
            this.$gsap.set(this.$refs.HambergerMenuItemWrapper, {
              y: 180,
            })
            this.$refs.HambergerMenuContents.style.pointerEvents = 'none'
          }, 600)
        }
      }
    },
  },
  methods: {
    hambergerMenuOnClick() {
      /**
       * storeのハンバーガーメニューの真偽値を更新
       */
      if (this.hambergerMenuState) {
        this.$store.commit('hambergerMenu/close')
      } else if (!this.hambergerMenuState) {
        this.$store.commit('hambergerMenu/open')
      }
    },
    hambergerMenuBtnOnResize() {
      this.$gsap.set(this.$refs.HambergerMenuBtn, {
        x: -window.innerWidth / 2.0 + 30 + 20,
      })
    },
    onClickSameUrl(root) {
      if (this.$route.name === root || this.$route.params.slug) {
        this.$store.commit('hambergerMenu/close')
      }
    },
  },
}
</script>

<style scoped lang="scss">
:root {
  --viewportWidth: 0;
  --viewportHeight: 0;
}

.hambergerMenu {
  position: fixed;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 110px;
  height: calc(100% - 20px);
  margin: auto 0;
  z-index: 11;

  @include sp() {
    top: 10px;
    right: 20px;
    bottom: auto;
    width: 60px;
    height: 60px;
  }

  &.is-disable {
    pointer-events: none;
    user-select: none;
  }
}

.hambergerMenu-overlay-01 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #dfded9;
  border-radius: 10px;
  pointer-events: none;
  transform-origin: right;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 2px 35px 16px 5px rgb(24 23 13 / 20%);
    border-radius: 10px;
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity $base-duration $colorAndOpacity-easing;
  }

  @include sp() {
    top: 22px;
    left: calc(-100vw + 60px + 20px);
    width: 100vw;
    height: calc(var(--viewportHeight, 100vh) - 32px);
    border-radius: 0;
    transform: scaleY(0);
    transform-origin: top;
  }
}

.hambergerMenu.is-open .hambergerMenu-overlay-01 {
  &::before {
    opacity: 1;
  }
}

.hambergerMenu-overlay-02 {
  position: absolute;
  top: 0;
  right: 0;
  width: 510px;
  height: 100%;
  background-color: #bcbbb4;
  border-radius: 10px;
  pointer-events: none;
  transform-origin: right;
  transform: scaleX(0);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 35px 60px 50px 20px rgb(24 23 13 / 50%);
    border-radius: 10px;
    pointer-events: none;
    z-index: 1;
  }

  @include sp() {
    top: 42px;
    right: -10px;
    width: calc(100vw - 20px);
    height: calc(var(--viewportHeight) - 52px - 20px);
    transform: scaleY(0);
    transform-origin: top;
  }
}

.hambergerMenu-contents {
  position: absolute;
  top: 0;
  right: 0;
  width: 510px;
  height: 100%;
  padding: 50px 26px 50px 16px;
  overflow-y: scroll;
  opacity: 0;
  pointer-events: none;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #89877c;
    border-radius: 10px;
  }

  @include sp() {
    right: 0;
    width: 100%;
    padding: 38px 8px;
  }
}

.hambergerMenu-title {
  position: relative;
  margin: 0 0 36px 0;
  color: #302c1a;
  font-size: 120px;
  font-family: $sixcaps;
  letter-spacing: -0.002em;
  z-index: 2;

  @include sp() {
    margin: 0 0 46px 0;
    font-size: vw_sp(216);
  }
}

.hambergerMenu-section-title {
  position: relative;
  margin: 0 0 36px 0;
  z-index: 2;

  @include sp() {
    margin: 0 0 34px 0;
  }
}

.hambergerMenu-title-wrapper-01 {
  display: block;
  cursor: pointer;
}

.hambergerMenu-title-wrapper-02 {
  display: inline-block;
  cursor: pointer;
}

.hambergerMenu-item {
  position: relative;
  overflow: hidden;

  &:not(:last-of-type) {
    margin: 0 0 20px 0;

    @include sp() {
      margin: 0 0 17px 0;
    }
  }
}

.hambergerMenu-item-wrapper {
  transform: translateY(180px);
}

.hambergerMenu-item-link {
  display: flex;
  align-items: center;
}

.hambergerMenu-item-title {
  margin: -12px 0 20px 0;
  color: #302c1a;
  font-size: 56px;
  font-family: $sixcaps;
  text-align: center;

  @include sp() {
    margin: 0 0 12px 0;
    font-size: vw_sp(96);
  }
}

.hambergerMenu-item-desc {
  color: #302c1a;
  font-size: 10px;
  line-height: 1.3;
  letter-spacing: 0.02em;
  text-align: center;
}

.hambergerMenu-item-img {
  position: relative;
  flex-shrink: 0;
  width: 180px;
  height: 180px;
  margin: 0 20px 0 0;
  overflow: hidden;
  border-radius: 14px;

  @include sp() {
    width: vw_sp(215);
    height: vw_sp(215);
    border-radius: 4px;
  }

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.hambergerMenu-btn {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 10px;
  cursor: pointer;
}

.hambergerMenu-hover {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $white;
  transition: transform $base-duration * 0.25 $transform-easing;
  border-radius: inherit;

  @include hover() {
    transform: scale(0.9, 0.98);

    @include sp() {
      transform: scale(1, 1);
    }
  }
}

.hambergerMenu.is-open .hambergerMenu-hover {
  @include hover() {
    transform: scale(1.1, 1.1);

    @include sp() {
      transform: scale(1, 1);
    }
  }
}

.hambergerMenu-openarea {
  position: relative;
  width: 37px;
  height: 13px;

  @include sp() {
    width: 26px;
    height: 13px;
  }
}

.hambergerMenu-openarea-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: $black;
  border-radius: 2px;
  cursor: pointer;
}

.hambergerMenu-openarea-line-01 {
  top: 0;
}

.hambergerMenu-openarea-line-02 {
  bottom: 0;
}
</style>