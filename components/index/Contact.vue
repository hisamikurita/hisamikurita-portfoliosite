<template>
  <div ref="Contact" class="contact">
    <div class="contact-bg">
      <div class="contact-inner">
        <div class="l-container">
          <h2 class="contact-title">
            <span class="contact-title-read-area">
              <CommonSectionReadTitle
                modifier="section"
                :state="isTextSegmentState"
                :start="0"
                :text="['・', 'SAY HI']"
              ></CommonSectionReadTitle>
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-01">
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="0"
                :rotate="rotateRight"
                text="I AM CREATIVE DEVELOPER"
              >
              </CommonTextSegment>
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-02">
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="0.12"
                :rotate="rotateLeft"
                text="FOCUSED ON CREATING THINGS"
              >
              </CommonTextSegment>
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-03">
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="0.24"
                :rotate="rotateRight"
                text="WITH INTERACTION & ANIMATION"
              >
              </CommonTextSegment>
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-04">
              <CommonTextSegment
                :state="isTextSegmentState"
                :start="0.36"
                :rotate="rotateLeft"
                text="AS MY MAIN FOCUS."
              >
              </CommonTextSegment>
            </span>
          </h2>
          <div class="contact-info-area">
            <div class="contact-info-index-area">
              <span class="contact-info-index">
                <CommonSectionReadTitle
                  modifier="contact-section"
                  :state="isTextSegmentState"
                  :start="0.48"
                  :text="['・', 'INDEX']"
                ></CommonSectionReadTitle>
              </span>
              <span class="contact-info-list">
                <span v-for="(data, index) in projectData" :key="data.id">
                  <NuxtLink :to="data.link">
                    <CommonTextSegment
                      :state="isTextSegmentState"
                      :start="0.48 + index * 0.12"
                      :rotate="rotateLeft"
                      :text="data.name[1]"
                    >
                    </CommonTextSegment>
                  </NuxtLink>
                </span>
              </span>
            </div>
            <div class="contact-info-name-area">
              <p class="contact-name">
                <CommonTextSegment
                  :state="isTextSegmentState"
                  :start="0.48"
                  :rotate="rotateRight"
                  text="HISAMI KURITA"
                >
                </CommonTextSegment>
              </p>
            </div>
          </div>
          <span class="contact-card-item-01">
            <CommonCardProject
              :name="['・','DESIGNED BY','(KENTO ISHIDUKA)']"
              :info="[
                {
                  link : 'https://twitter.com/kentiy1229',
                  text : 'TWITTER @KENTIY1229',
                },
                {
                  link : '#',
                  text : 'DRIBBBLE @KEEEEENTISI',
                },
                {
                  link : '#',
                  text : 'LINKED IN @KENTOISHIDUKA',
                },
              ]"
              :title="{
                text: 'KNTISDK',
                link: 'https://www.awwwards.com/',
                subtext: '(VISIT SITE)',
              }"
              :speed="0.2"
            ></CommonCardProject>
          </span>
          <span class="contact-card-item-02">
            <CommonCardProject
              :name="['・','CODED BY','(HISAMI KURITA)']"
              :info="[
                {
                  link : 'https://twitter.com/AAA00832745',
                  text : 'TWITTER @AAA00832745',
                },
                {
                  link : 'https://github.com/hisamikurita',
                  text : 'GITHUB @HISAMIKURITA',
                },
                {
                  link : 'https://codepen.io/hisamikurita',
                  text : 'CODEPEN @HISAMIKURITA',
                },
              ]"
              :title="{
                text: 'HSMKRT',
                link: 'mailto:kuritahisami@gmail.com',
                subtext: '(CONTACT)',
              }"
              :speed="0.1"
            ></CommonCardProject>
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
    }
  },

  mounted() {
    /* text-animation */
    this.observe = this.$refs.Contact;
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center';
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
.contact{
  position: relative;
  overflow: hidden;
}

.contact-bg {
  background-color: $thinPink;
}

.contact-title{
  position: relative;
  margin: 0 0 140px 0;
  color: $darkPink;
  font-size: vw(180);
  font-family: 'Six Caps', sans-serif;
}

.contact-title-read-area {
  position: absolute;
  top: 8px;
  left: 2px;
  color: $white;
}

.contact-title-wrapper{
  display: block;
}

.contact-title-wrapper-01{
  padding: 0 0 0 290px;

  @include tab {
      padding: 0 0 0 vw(290);
  }
}

.contact-title-wrapper-02{
  padding: 0 0 0 33px;
}

.contact-title-wrapper-04{
  padding: 0 0 0 40px;
}

.contact-info-area{
  display: flex;
}

.contact-info-index-area{
  margin: 0 40px 0 0;
}

.contact-info-index{
  display: block;
  margin: 0 0 56px 0;
}

.contact-info-list{
  font-size: 12px;
}

.contact-name{
  margin: -26px 0 0 0;
  color: $darkPink;
  font-size: vw(400);
  font-family: 'Six Caps', sans-serif;
  letter-spacing: -0.02em;
}

.contact-card-item-01{
  position: absolute;
  top: 55.5%;
  left: 30%;
  transform: rotate(-10deg);
}

.contact-card-item-02{
  position: absolute;
  top: 39%;
  right: 15%;
  transform: rotate(10deg);
}

</style>