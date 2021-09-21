<template>
  <div>
    <div ref="IndexHeroAndAbout">
      <IndexHeroAndAbout></IndexHeroAndAbout>
    </div>
    <IndexPickup :hero-and-about-dom="aa"></IndexPickup>
    <IndexProject></IndexProject>
    <IndexContact></IndexContact>
  </div>
</template>

<script>
export default {
  name: 'Index',
  // data: () => {
  //   return {
  //     a: this.$refs.IndexHeroAndAbout,
  //   }
  // },
  computed:{
    aa(){
      console.log()
      return this.$refs.IndexHeroAndAbout;
    }
  }
}
</script>