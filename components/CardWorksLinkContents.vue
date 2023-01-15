<template>
  <span>
    <span class="card-project-shadow" :style="`box-shadow: 0 30px 60px 0 ${shadowColor};`"></span>
    <a :href="externalLink" target="_blank" rel="noopener" class="card-project-link" :class="`card-project-link-${modifier}`">
      <span class="card-project-inner">
        <span class="card-project-title-wrapper-01">
          <span class="card-project-title-wrapper-01-block"> ・ </span>
          <span class="card-project-title-wrapper-01-block"> LIVE </span>
        </span>
        <span class="card-project-title-wrapper-02"> <span class="card-project-title-wrapper-02-block">YOU CAN SEE PROJECT NAME IS LIVE. AND IF YOU SEE IT, COME BACK HERE</span></span>
        <span class="card-project-title-wrapper-03">
          <span class="pc-only">
            <AppTextAnimation :state="state" :rotate="$BASEROTATE.left" :text="'VISIT SITE'" :sp-animation="false" />
          </span>
          <span class="sp-only"> VISIT SITE </span>
        </span>
      </span>
    </a>
  </span>
</template>

<script>
export default {
  props: {
    shadowColor: {
      type: String,
      default: '',
    },
    externalLink: {
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
