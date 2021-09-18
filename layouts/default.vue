<template>
<div>
  <div asscroll-container>
    <div>
      <nuxt/>
    </div>
  </div>
  <Header></Header>
  <HambergerMenu></HambergerMenu>
</div>
</template>
<script>
// import LocomotiveScroll from "locomotive-scroll";
// import asscroll from ""
import Header from '~/components/common/Header.vue'
import HambergerMenu from '~/components/common/HambergerMenu.vue'

export default {
  components: {
    Header,
    HambergerMenu,
  },
  //   data() {
  //   return {
  //     lmS: null
  //   };
  // },
  mounted() {
  this.a = new this.$asscroll();
  this.a.enable();

    //  this.lmS = new this.LocomotiveScroll({
    //   el: document.querySelector("#js-scroll"),
    //   smooth: true
    // });
    // console.log("lmS", this.lmS);

    // setTimeout(()=>{
      // this.$asscroll.enable({
      //   ease: 0.08,
      // });
    // setTimeout(()=>{
    //   console.log(this.$refs.a)
    // this.lmS = new this.$asscroll({el: this.$refs.a,smooth: true});
    // // as.enable();
    // console.log(this.lmS)
    // },2000)
    // const a = this.$asscroll;

    // },3000)
    // console.log(this.$refs.dataScrollContainer)
    // const scroll = new this.$locomotiveScroll({
    //   el: this.$refs.dataScrollContainer,
    //   smooth: true,
    // })
    // console.log(scroll);
  },
}
</script>