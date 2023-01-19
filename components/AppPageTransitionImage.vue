<template>
  <button @click="onClick"><slot></slot></button>
</template>

<script>
export default {
  props: {
    /**
     * url : 遷移先
     * index : 案件に固有に振り渡している番号
     */
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

      // 同一URLは処理を返す
      if (this.url === this.$route.path) return

      this.$preDefaultEvent(true)
      this.$asscroll.disable()
      this.$store.commit('image-transition/start', this.index)
      this.$store.commit('mouse/loading')

      setTimeout(() => {
        this.$router.push(`${this.url}`)
        if (this.$SITECONFIG.isNoTouch) this.$store.commit('mouse/loadend')
      }, this.$SITECONFIG.pageTransitionDuration)
    },
  },
}
</script>
