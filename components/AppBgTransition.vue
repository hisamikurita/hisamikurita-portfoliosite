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

      if (this.url === '/' && this.$route.name === 'index') return
      if (this.url === '/about' && this.$route.name === 'about') return

        this.$preDefaultEvent(true);
        this.$asscroll.disable()
        this.$store.commit('bg-transition/start', this.color)

        setTimeout(() => {
          this.$router.push(`${this.url}`)
        }, this.$SITECONFIG.pageTransitionDuration)
    },
  },
}
</script>
