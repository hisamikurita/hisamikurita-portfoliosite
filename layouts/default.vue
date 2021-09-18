<template>
  <div>
    <div asscroll-container>
      <div>
        <nuxt />
      </div>
    </div>
    <Header></Header>
    <HambergerMenu></HambergerMenu>
  </div>
</template>
<script>
import Header from '~/components/common/Header.vue'
import HambergerMenu from '~/components/common/HambergerMenu.vue'

export default {
  components: {
    Header,
    HambergerMenu,
  },
  mounted() {
    this.$asscroll.enable()
  },
}
</script>