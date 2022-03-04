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
  },

  methods: {
    onClick(e) {
      e.preventDefault()
      this.$store.commit('normal-transition/start')

      setTimeout(()=>{
        this.$router.push(`${this.url}`)
      },this.$SITECONFIG.baseDuration * 0.80 * 1000);
    },
  },
}
</script>