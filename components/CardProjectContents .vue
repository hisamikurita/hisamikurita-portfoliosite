<template>
  <AppImageTransition :url="`/works/${link}`" :index="index" class="card-project-link" :class="`card-project-link-${modifier}`">
    <span class="card-project-inner">
      <span class="card-project-title-wrapper-01">
        <span class="card-project-title-wrapper-01-block">
          ・
        </span>
        <span class="card-project-title-wrapper-01-block">
          {{ name }}
        </span>
      </span>
      <span class="card-project-title-wrapper-02">
        <span class="card-project-title-wrapper-02-block">{{text}}</span>
      </span>
      <span class="card-project-title-wrapper-03">
        <span class="pc-only">
          <AppTextSegment
            :state="state"
            :rotate="$BASEROTATE.left"
            :text="title"
            :sp-animation="false"
          />
        </span>
        <span class="sp-only">
          {{ title }}
        </span>
      </span>
    </span>
  </AppImageTransition>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
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
  //
</style>