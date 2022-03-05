<template>
  <a @click="onClick"><slot></slot></a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#ffffff',
    },
  },

  methods: {
    onClick(e) {
      e.preventDefault()
      this.$store.commit('normal-transition/start', this.color)

      setTimeout(() => {
        this.$router.push(`${this.url}`)
      }, this.$SITECONFIG.baseDuration * 0.8 * 1000)
    },
  },
}
</script>