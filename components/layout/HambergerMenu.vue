<template>
  <div class="hambergerMenu">
    <span ref="HambergerMenuOverlay01" class="hambergerMenu-overlay-01"></span>
    <span ref="HambergerMenuOverlay02" class="hambergerMenu-overlay-02">
      <span ref="HambergerMenuContents" class="hambergerMenu-contents">
        <div class="hambergerMenu-title">
          <span class="hambergerMenu-title-wrapper-01">
              <component :is="setRootTagName('index')" to="./" @click="onClickSameUrlReload('index')">
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="0"
                :rotate="rotateRight"
                :is-load-init="true"
                text="HISAMIKURITA"
              ></CommonTextSegment>
            </component>
          </span>
          <span class="hambergerMenu-title-wrapper-02">
            <component :is="setRootTagName('about')" to="/about" @click="onClickSameUrlReload('about')">
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="0.12"
                :rotate="rotateLeft"
                :is-load-init="true"
                text="ABOUT"
              ></CommonTextSegment>
            </component>
          </span>
        </div>
        <div class="hambergerMenu-section-title">
          <CommonSectionReadTitle
            modifier="section"
            :state="isTextSegmentState"
            :start="0.24"
            :text="['・', 'WORKS']"
          ></CommonSectionReadTitle>
        </div>
        <div>
          <ul class="hambergerMenu-list">
            <li
              v-for="data in projectData"
              :key="data.id"
              class="hambergerMenu-item"
            >
              <a
                ref="hambergerMenuItemLink"
                :href="data.link"
                class="hambergerMenu-item-link"
              >
                <div class="hambergerMenu-item-img">
                  <img :src="data.image" :alt="data.title" />
                </div>
                <div>
                  <p class="hambergerMenu-item-title">{{ data.title }}</p>
                  <p class="hambergerMenu-item-desc">{{ data.desc }}</p>
                </div>
              </a>
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
      <span
        ref="HambergerMenuBtnHover"
        class="hambergerMenu-hover"
        :class="{ isOpen: hambergerMenuState }"
      >
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
import projectData from '@/assets/json/project.json'

export default {
  data: () => {
    return {
      projectData: projectData,
      isTextSegmentState: '',
    }
  },
  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
    setRootTagName() {
      return function(root){
        return this.$route.name === root ? 'span' : 'nuxt-link';
      }
    },
  },
  watch: {
    hambergerMenuState: function () {
      /**
       * ハンバガーメニューが開いた時
       */
      if (this.hambergerMenuState) {
        if (this.$siteConfig.isPc) {
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
            ease: this.$easing.transform,
            x: -520,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$easing.transform,
            width: 86,
            height: 86,
            borderRadius: 100,
            scale: 0.9,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtnHover, {
            duration: 0.2,
            ease: this.$easing.colorAndOpacity,
            boxShadow: '0px 0px 10px 5px #bfbeb8',
          })
          /**
           * ico
           */
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine01, {
            duration: 0.2,
            ease: this.$easing.transform,
            top: 3,
            height: 9,
            borderRadius: 4,
            rotate: 45,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine02, {
            duration: 0.2,
            ease: this.$easing.transform,
            bottom: 2,
            height: 9,
            borderRadius: 4,
            rotate: -45,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenarea, {
            duration: 0.2,
            ease: this.$easing.transform,
            scale: 0.6,
          })
          /**
           * bg
           */
          this.$gsap.to(this.$refs.HambergerMenuOverlay01, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$easing.transform,
            scaleX: 5.1,
            scaleY: 1.1,
            x: 10,
          })
          this.$gsap.to(this.$refs.HambergerMenuOverlay02, {
            delay: 0.3,
            duration: 0.2,
            ease: this.$easing.transform,
            scaleX: 1.0,
          })
          /**
           * text
           */
          setTimeout(() => {
            this.isTextSegmentState = 'center'
            this.itemLinkCenter = this.$gsap.to(
              this.$refs.hambergerMenuItemLink,
              {
                duration: this.$baseAnimationConfig.duration,
                delay: 0.36,
                ease: this.$easing.transform,
                stagger: {
                  each: 0.12,
                },
                y: 0,
              }
            )
          }, 300)
        }
        else if (this.$siteConfig.isMobile) {
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
            ease: this.$easing.transform,
            x: (-window.innerWidth / 2.0) + 30 + 20,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$easing.transform,
            borderRadius: 100,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtnHover, {
            duration: 0.2,
            ease: this.$easing.colorAndOpacity,
            boxShadow: '0px 0px 5px 3px #bfbeb8',
          })
          window.addEventListener('resize', this.hambergerMenuBtnOnResize)
          /**
           * ico
           */
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine01, {
            duration: 0.2,
            ease: this.$easing.transform,
            top: 5,
            rotate: 45,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine02, {
            duration: 0.2,
            ease: this.$easing.transform,
            bottom: 4,
            rotate: -45,
          })
          /**
           * bg
           */
          this.$gsap.to(this.$refs.HambergerMenuOverlay01, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$easing.transform,
            scaleY: 1,
          })
          this.$gsap.to(this.$refs.HambergerMenuOverlay02, {
            delay: 0.4,
            duration: 0.2,
            ease: this.$easing.transform,
            scaleY: 1,
          })
          /**
           * text
           */
          setTimeout(() => {
            this.isTextSegmentState = 'center'
            this.itemLinkCenter = this.$gsap.to(
              this.$refs.hambergerMenuItemLink,
              {
                duration: this.$baseAnimationConfig.duration,
                delay: 0.36,
                ease: this.$easing.transform,
                stagger: {
                  each: 0.12,
                },
                y: 0,
              }
            )
          }, 500)
        }
      }
      else if (!this.hambergerMenuState) {
        /**
         * ハンバガーメニューが閉じた時
         */
        if (this.$siteConfig.isPc) {
          /**
           * btn
           */
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$easing.transform,
            x: 0,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$easing.transform,
            width: '100%',
            height: '100%',
            borderRadius: 10,
            scale: 1.0,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtnHover, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$easing.colorAndOpacity,
            boxShadow: 'none',
          })
          /**
           * ico
           */
          this.$gsap.to(this.$refs.hambergerMenuOpenarea, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$easing.transform,
            scale: 1,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine01, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$easing.transform,
            top: 0,
            height: 4,
            borderRadius: 2,
            rotate: 0,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine02, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$easing.transform,
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
            this.$refs.hambergerMenuItemLink,
            {
              duration: this.$baseAnimationConfig.duration,
              delay: 0.36,
              ease: this.$easing.transform,
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
            ease: this.$easing.transform,
            scaleX: 0,
          })
          this.$gsap.to(this.$refs.HambergerMenuOverlay01, {
            delay: 0.3,
            duration: 0.2,
            ease: this.$easing.transform,
            scaleX: 1.0,
            scaleY: 1.0,
            x: 0,
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
            this.$gsap.set(this.$refs.hambergerMenuItemLink, {
              y: 180,
            })
            this.$refs.HambergerMenuContents.style.pointerEvents = 'none'
          }, 300)
        }
        else if (this.$siteConfig.isMobile) {
          /**
           * btn
           */
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$easing.transform,
            x: 0,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtn, {
            duration: 0.2,
            ease: this.$easing.transform,
            borderRadius: 10,
          })
          this.$gsap.to(this.$refs.HambergerMenuBtnHover, {
            duration: 0.2,
            ease: this.$easing.colorAndOpacity,
            boxShadow: 'none',
          })
          window.removeEventListener('resize', this.hambergerMenuBtnOnResize)
          /**
           * ico
           */
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine01, {
            duration: 0.2,
            ease: this.$easing.transform,
            top: 0,
            rotate: 0,
          })
          this.$gsap.to(this.$refs.hambergerMenuOpenareaLine02, {
            duration: 0.2,
            ease: this.$easing.transform,
            bottom: 0,
            rotate: 0,
          })
          /**
           * bg
           */
          this.$gsap.to(this.$refs.HambergerMenuOverlay01, {
            delay: 0.2,
            duration: 0.2,
            ease: this.$easing.transform,
            scaleY: 0,
          })
          this.$gsap.to(this.$refs.HambergerMenuOverlay02, {
            delay: 0.4,
            duration: 0.2,
            ease: this.$easing.transform,
            scaleY: 0,
          })
          /**
           * text
           */
          // this.isTextSegmentState = 'top'
          // this.itemLinkBottom = this.$gsap.to(
          //   this.$refs.hambergerMenuItemLink,
          //   {
          //     duration: this.$baseAnimationConfig.duration,
          //     delay: 0.36,
          //     ease: this.$easing.transform,
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
            this.$gsap.set(this.$refs.hambergerMenuItemLink, {
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
    hambergerMenuBtnOnResize(){
      this.$gsap.set(this.$refs.HambergerMenuBtn, {
        x: (-window.innerWidth / 2.0) + 30 + 20,
      })
    },
    onClickSameUrlReload(root){
      if (this.$route.name === root) {
        this.$router.go({ path: this.$router.currentRoute.path, force: true })
      }
    }
  },
}
</script>

<style lang="scss">
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

  @include sp() {
    top: 22px;
    left: calc(-100vw + 60px + 20px);
    width: 100vw;
    height: calc(var(--viewportHeight) - 32px);
    border-radius: 0;
    transform: scaleY(0);
    transform-origin: top;
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
  box-shadow: 1px 1px 50px 77px #a4a39d inset;

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
  right: 10px;
  width: 510px;
  height: 100%;
  padding: 50px 26px;
  overflow: scroll;
  opacity: 0;
  pointer-events: none;

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
  font-family: 'Six Caps', sans-serif;
  letter-spacing: -0.002em;

  @include sp() {
    margin: 0 0 46px 0;
    font-size: vw_sp(216);
  }
}

.hambergerMenu-section-title {
  margin: 0 0 36px 0;

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

.hambergerMenu-item-link {
  display: flex;
  align-items: center;
  transform: translateY(180px);
}

.hambergerMenu-item-title {
  margin: -12px 0 20px 0;
  color: #302c1a;
  font-size: 56px;
  font-family: 'Six Caps', sans-serif;
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

  @include hover(){
    transform: scale(0.9, 0.98);

    @include sp() {
      transform: scale(1, 1);
    }
  }

  &.isOpen{
    @include hover(){
      transform: scale(1.1, 1.1);

      @include sp() {
        transform: scale(1, 1);
      }
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