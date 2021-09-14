<template>
  <div>
    <Header></Header>
    <HambergerMenu></HambergerMenu>
    <Hero></Hero>
    <About></About>
  </div>
</template>

<script>
import Header from '~/components/common/Header.vue'
import HambergerMenu from '~/components/common/HambergerMenu.vue'
import Hero from '~/components/index/Hero.vue'
import About from '~/components/index/About.vue'

export default {
  name: 'Index',
  components: {
    Header,
    HambergerMenu,
    Hero,
    About,
  },
}
</script>
