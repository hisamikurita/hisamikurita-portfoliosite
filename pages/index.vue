<template>
  <div>
    <Hero></Hero>
    <About></About>
  </div>
</template>

<script>
import Hero from '~/components/index/Hero.vue'
import About from '~/components/index/About.vue'

export default {
  name: 'Index',
  components: {
    Hero,
    About,
  },
}
</script>
