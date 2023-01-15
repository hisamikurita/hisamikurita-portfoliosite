<template>
  <div class="card-project-inner">
    <div class="card-project-title-wrapper-01">
      <span v-for="(char, index) of name" :key="index" class="card-project-title-wrapper-01-block" v-text="char"></span>
    </div>
    <ul class="card-project-title-wrapper-02">
      <li v-for="(char, index) of info" :key="index" class="card-project-title-wrapper-02-block">
        <a :href="char.link" target="_blank" rel="noopener">{{ char.text }}</a>
      </li>
    </ul>
    <div class="card-project-title-wrapper-03">
      <span class="pc-only">
        <a v-if="title.link" :href="title.link" target="_blank" rel="noopener" class="card-project-title-wrapper-03-link">
          <AppTextAnimation :state="state" :rotate="$BASEROTATE.left" :text="title.text" :sp-animation="false" />
          <span v-if="title.subtext" class="card-project-sub-title">
            <AppTextAnimation :state="state" :start="0.28" :rotate="$BASEROTATE.left" :text="title.subtext" :sp-animation="false" />
          </span>
        </a>
        <span v-else class="card-project-title-wrapper-03-link">
          <AppTextAnimation :state="state" :rotate="$BASEROTATE.left" :text="title.text" :sp-animation="false" />
          <span v-if="title.subtext" class="card-project-sub-title">
            <AppTextAnimation :state="state" :start="0.28" :rotate="$BASEROTATE.left" :text="title.subtext" :sp-animation="false" />
          </span>
        </span>
      </span>
      <span class="sp-only">
        <a :href="title.link" target="_blank" rel="noopener">
          {{ title.text }}
          <span v-if="title.subtext" class="card-project-sub-title">
            {{ title.subtext }}
          </span>
        </a>
      </span>
    </div>
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
