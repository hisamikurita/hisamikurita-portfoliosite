<template>
  <AppBgTransition url="/about" color="#f0efeb" class="card-project-link" :class="`card-project-link-${modifier}`">
    <span class="card-project-inner">
      <span class="card-project-title-wrapper-01">
        <span v-for="(char, index) of name" :key="index" class="card-project-title-wrapper-01-block" v-text="char"></span>
      </span>
      <span class="card-project-title-wrapper-02">
        <span v-for="(char, index) of text" :key="index" class="card-project-title-wrapper-02-block" v-text="char"></span>
      </span>
      <span class="card-project-title-wrapper-03">
        <span class="pc-only">
          <span>{{ title }}</span>
          <span class="card-project-sub-title">
          <span>{{ subtitle }}</span>
          </span>
        </span>
        <span class="sp-only">
          {{ title }}
          <span class="card-project-sub-title">
            {{ subtitle }}
          </span>
        </span>
      </span>
    </span>
  </AppBgTransition>
</template>

<script>
export default {
  props: {
    name: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    text: {
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

<style scoped lang="scss">
.card-project-link-index-hero .card-project-title-wrapper-01 {
  color: $white;
}

.card-project-link-index-hero .card-project-title-wrapper-02 {
  color: $darkPink;
}

.card-project-link-index-hero .card-project-title-wrapper-03 {
  color: $darkPink;
}
</style>