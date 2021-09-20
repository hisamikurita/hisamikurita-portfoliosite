<template>
  <div ref="Project" class="project">
    <div class="project-bg">
      <div class="project-inner">
        <div class="l-container">
          <h1 class="project-title">PROJECT</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$asscroll.on('update', this.projectScroll)
  },
  methods: {
    projectScroll() {
      // console.log(this.$asscroll.targetPos);
      // console.log(this.$refs.Project.getBoundingClientRect().top + this.$asscroll.targetPos - window.innerHeight * 2.0)
      // const projectTopPos = this.$refs.Project.getBoundingClientRect().top + this.$asscroll.targetPos - window.innerHeight * 2.0;
      // if(this.$asscroll.targetPos > projectTopPos ){
      //   this.$asscroll.disable();
      // }
    },
  },
}
</script>

<style scoped lang="scss">
.project-inner {
  height: 100vh;
}
</style>