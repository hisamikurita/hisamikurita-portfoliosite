<template>
  <span class="card-project-inner">
    <span class="card-project-title-wrapper-01">
      <span v-for="(char, index) of name" :key="index" class="card-project-title-wrapper-01-block" v-text="char"></span>
    </span>
    <span class="card-project-title-wrapper-02">
      <span v-for="(char, index) of info" :key="index" class="card-project-title-wrapper-02-block">
        <a :href="char.link" target="_blank" rel="noopener">{{ char.text }}</a>
      </span>
    </span>
    <span class="card-project-title-wrapper-03">
      <span class="pc-only">
        <a :href="title.link" target="_blank" rel="noopener" class="card-project-title-wrapper-03-link">
          <AppTextSegment
            :state="state"
            :rotate="$BASEROTATE.left"
            :text="title.text"
            :sp-animation="false"
          />
          <span v-if="title.subtext" class="card-project-sub-title">
            <AppTextSegment
              :state="state"
              :start="0.28"
              :rotate="$BASEROTATE.left"
              :text="title.subtext"
              :sp-animation="false"
            />
          </span>
        </a>
      </span>
      <span class="sp-only">
        <a :href="title.link" target="_blank" rel="noopener">
          {{ title.text }}
          <span v-if="title.subtext" class="card-project-sub-title">
            {{ title.subtext }}
          </span>
        </a>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: Array,
      required: true,
    },
    title: {
      type: Object,
      required: true,
    },
    info: {
      type: Array,
      required: true,
    },
    modifier: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
  },
}
</script>