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
    index: {
      type: Number,
      required: true,
    },
  },

  methods: {
    onClick(e) {
      e.preventDefault()

      if (this.url === this.$route.path) return

        this.$preDefaultEvent(true);
        this.$asscroll.disable()
        this.$store.commit('image-transition/start', this.index)

        setTimeout(() => {
          this.$router.push(`${this.url}`)
        }, this.$SITECONFIG.baseDuration * 0.8 * 1000)
    },
  },
}
</script>