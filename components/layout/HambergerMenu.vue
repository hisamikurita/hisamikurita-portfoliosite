<template>
  <div class="hambergerMenu" @click="hambergerMenuOnClick">
    <span class="hambergerMenu-overlay"></span>
    <button ref="HambergerMenuBtn" class="hambergerMenu-btn">
      <span class="hambergerMenu-openarea">
        <span class="hambergerMenu-openarea-line hambergerMenu-openarea-line-01"></span>
        <span class="hambergerMenu-openarea-line hambergerMenu-openarea-line-02"></span>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    hambergerMenuOnClick() {
      console.log('発火');
      this.$gsap.to(this.$refs.HambergerMenuBtn, {
        duration: this.$baseAnimationConfig.duration / 3.0,
        ease: this.$baseAnimationConfig.colorAndOpacity,
        width: 80,
        height: 80,
        borderRadius: 100,
      });
      this.$gsap.to(this.$refs.HambergerMenuBtn, {
        delay: this.$baseAnimationConfig.duration / 4.0,
        duration: this.$baseAnimationConfig.duration / 3.0,
        ease: this.$baseAnimationConfig.colorAndOpacity,
        x: -540,
      });
    }
  }
}
</script>

<style lang="scss">
  .hambergerMenu{
    position: fixed;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 110px;
    height: calc(100% - 20px);
    margin: auto 0;

    @include sp(){
      top: 10px;
      right: 20px;
      bottom: auto;
      width: 60px;
      height: 60px;
    }
  }

  .hambergerMenu-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #dfded9;
    border-radius: 10px;
    pointer-events: none;
  }

  .hambergerMenu-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    background-color: $white;
    border-radius: 10px;
    cursor: pointer;
    transition: transform $base-duration * 0.5 $transform-easing;

    &:hover{
      transform: scale(0.90, 0.98);
    }
  }

  .hambergerMenu-openarea{
    position: relative;
    width: 37px;
    height: 13px;

    @include sp(){
      width: 26px;
      height: 13px;
    }
  }

  .hambergerMenu-openarea-line{
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: $black;
    border-radius: 2px;
    cursor: pointer;
  }

  .hambergerMenu-openarea-line-01{
    top: 0;
  }

  .hambergerMenu-openarea-line-02{
    bottom: 0;
  }
</style>