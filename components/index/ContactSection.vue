<template>
  <div ref="Contact" class="contact">
    <AppCircleBg :state="isCircleBgState" :modifier="'index-contact'" />
    <div class="contact-bg">
      <div class="contact-inner">
        <div class="l-container">
          <h2 class="contact-title">
            <span class="contact-title-read-area">
              <AppSectionReadTitle
                :state="isTextSegmentState"
                :text="['・', 'SAY HI']"
                :modifier="'section'"
              />
            </span>
            <span class="pc-only">
              <span class="contact-title-wrapper contact-title-wrapper-01">
                <AppTextSegment
                  :state="isTextSegmentState"
                  :rotate="rotateRight"
                  :text="'I AM CREATIVE DEVELOPER'"
                  :sp-animation="false"
                />
              </span>
              <span class="contact-title-wrapper contact-title-wrapper-02">
                <AppTextSegment
                  :state="isTextSegmentState"
                  :start="0.12"
                  :rotate="rotateLeft"
                  :text="'FOCUSED ON CREATING THINGS'"
                  :sp-animation="false"
                />
              </span>
              <span class="contact-title-wrapper contact-title-wrapper-03">
                <AppTextSegment
                  :state="isTextSegmentState"
                  :start="0.24"
                  :rotate="rotateRight"
                  :text="'WITH INTERACTION & ANIMATION'"
                  :sp-animation="false"
                />
              </span>
              <span class="contact-title-wrapper contact-title-wrapper-04">
                <AppTextSegment
                  :state="isTextSegmentState"
                  :start="0.36"
                  :rotate="rotateLeft"
                  :text="'AS MY MAIN FOCUS.'"
                  :sp-animation="false"
                />
              </span>
            </span>
            <span class="sp-only">
              <span class="contact-title-wrapper contact-title-wrapper-01-sp">
                I AM CREATIVE
              </span>
              <span class="contact-title-wrapper contact-title-wrapper-02-sp">
                DEVELOPER
              </span>
              <span class="contact-title-wrapper contact-title-wrapper-03-sp">
                FOCUSED ON
              </span>
              <span class="contact-title-wrapper contact-title-wrapper-04-sp">
                CREATING THINGS
              </span>
              <span class="contact-title-wrapper contact-title-wrapper-05-sp">
                WITH INTERACTION
              </span>
              <span class="contact-title-wrapper contact-title-wrapper-06-sp">
                & ANIMATION
              </span>
              <span class="contact-title-wrapper contact-title-wrapper-07-sp">
                AS MY MAINN FOCUS.
              </span>
            </span>
          </h2>
          <div class="contact-info-area">
            <div class="contact-info-index-area">
              <span class="contact-info-index">
                <AppSectionReadTitle
                  :state="isTextSegmentState"
                  :start="0.48"
                  :text="['・', 'INDEX']"
                  :modifier="'contact-section'"
                />
              </span>
              <span class="contact-info-list">
                <span
                  v-for="(data, index) in projectData"
                  :key="data.id"
                  class="contact-info-item"
                >
                  <NuxtLink :to="data.link">
                    <AppTextSegment
                      :state="isTextSegmentState"
                      :start="0.48 + index * 0.12"
                      :rotate="rotateLeft"
                      :text="data.name[1]"
                    />
                  </NuxtLink>
                </span>
              </span>
            </div>
            <div class="contact-info-name-area">
              <span class="pc-only">
                <span class="contact-name">
                  <AppTextSegment
                    :state="isTextSegmentState"
                    :start="0.48"
                    :rotate="rotateRight"
                    :text="'HISAMI KURITA'"
                    :sp-animation="false"
                  />
                </span>
              </span>
              <span class="sp-only">
                <span class="contact-name"> HISAMI<br />KURITA </span>
              </span>
            </div>
          </div>
          <span class="contact-card-item-01">
            <AppCardBase
              :component-name="'ContactContents'"
              :name="['・', 'DESIGNED BY', '(KENTO ISHIDUKA)']"
              :info="[
                {
                  link: 'https://twitter.com/kentiy1229',
                  text: 'TWITTER @KENTIY1229',
                },
                {
                  link: 'https://dribbble.com/keeeeentisi',
                  text: 'DRIBBBLE @KEEEEENTISI',
                },
                {
                  link: 'https://www.linkedin.com/in/kento-ishiduka-84bb26135',
                  text: 'LINKED IN @KENTOISHIDUKA',
                },
              ]"
              :title="{
                text: 'KNTISDK',
                link: 'https://www.awwwards.com/',
                subtext: '(VISIT SITE)',
              }"
              :rotate="-10"
              :xspeed="-0.08"
              :yspeed="0.2"
            />
          </span>
          <span class="contact-card-item-02">
            <AppCardBase
              :component-name="'ContactContents'"
              :name="['・', 'CODED BY', '(HISAMI KURITA)']"
              :info="[
                {
                  link: 'https://twitter.com/AAA00832745',
                  text: 'TWITTER @AAA00832745',
                },
                {
                  link: 'https://github.com/hisamikurita',
                  text: 'GITHUB @HISAMIKURITA',
                },
                {
                  link: 'https://codepen.io/hisamikurita',
                  text: 'CODEPEN @HISAMIKURITA',
                },
              ]"
              :title="{
                text: 'HSMKRT',
                link: 'mailto:kuritahisami@gmail.com',
                subtext: '(CONTACT)',
              }"
              :rotate="8"
              :xspeed="0.051"
              :yspeed="0.1"
            />
          </span>
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
      isTextSegmentState: '',
      isCircleBgState: '',
    }
  },

  mounted() {
    /* text-animation */
    this.observe = this.$refs.Contact
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center'
            this.isCircleBgState = 'extend'
            this.iObserver.unobserve(this.observe)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserver.observe(this.observe)
  },

  beforeDestroy() {
    this.iObserver.unobserve(this.observe)
  },
}
</script>

<style scoped lang="scss">
.contact {
  position: relative;
  overflow: hidden;
}

.contact-bg {
  padding: 450px 0 0 0;

  @include tab() {
    padding: 335px 0 0 0;
  }

  @include sp() {
    padding: 225px 0 80px 0;
  }
}

.contact-title {
  position: relative;
  margin: 0 0 140px 0;
  color: $darkPink;
  font-size: vw(180);
  font-family: $sixcaps;

  @include sp() {
    margin: 0 0 58px 0;
    font-size: vw_sp(180);
  }
}

.contact-title-read-area {
  position: absolute;
  top: 8px;
  left: 2px;
  color: $white;

  @include sp() {
    top: 2px;
    left: 0;
  }
}

.contact-title-wrapper {
  display: block;

  @include sp() {
    white-space: nowrap;
  }
}

.contact-title-wrapper-01 {
  padding: 0 0 0 290px;

  @include tab {
    padding: 0 0 0 vw(290);
  }
}

.contact-title-wrapper-02 {
  padding: 0 0 0 33px;
}

.contact-title-wrapper-04 {
  padding: 0 0 0 40px;
}

.contact-title-wrapper-01-sp {
  margin: 0 0 0 48px;
}

.contact-info-area {
  display: flex;

  @include sp() {
    justify-content: space-between;
  }
}

.contact-info-index-area {
  margin: 0 40px 0 0;

  @include sp() {
    margin: 10px 40px 0 0;
  }
}

.contact-info-index {
  display: block;
  margin: 0 0 56px 0;

  @include sp() {
    margin: 0 0 59px 0;
  }
}

.contact-info-list {
  font-size: 12px;

  @include sp() {
    font-size: 10px;
  }
}

.contact-info-item {
  @include sp() {
    display: block;
    margin: 0 0 2px 0;
  }
}

.contact-info-name-area {
  position: relative;
}

.contact-name {
  margin: -26px 0 0 0;
  color: $darkPink;
  font-size: vw(400);
  font-family: $sixcaps;
  letter-spacing: -0.02em;

  @include sp() {
    font-size: vw_sp(400);
    white-space: nowrap;
  }
}

.contact-card-item-01 {
  position: absolute;
  top: 69.5%;
  left: 24%;
  transform: rotate(-10deg);
  width: 0;
  height: 0;

  @include sp() {
    top: 48%;
    left: 41%;
  }
}

.contact-card-item-02 {
  position: absolute;
  top: 60%;
  right: 38%;
  transform: rotate(10deg);
  width: 0;
  height: 0;

  @include sp() {
    top: 46%;
    right: 32%;
  }
}
</style>