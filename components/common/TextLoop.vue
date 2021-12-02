<template>
  <div ref="CmnLoopTextBlock" class="cmn-loop-text-block">
    <div ref="CmnLoopTextWrapper" class="cmn-loop-text-wrapper">
      <CommonTextSegment
        :state="state"
        :start="Number(start)"
        :rotate="rotate"
        :text="text"
      ></CommonTextSegment>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    start: {
      type: [String, Number],
      required: true,
    },
    rotate: {
      type: [String, Number],
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    loop: {
      type: String,
      required: true,
    },
    loopdirection: {
      type: Number,
      required: true,
    },
  },
  data: () => {
    return {
      position: { value: 0 },
      tweenPosition: { value: 0 },
      isScrollDirection: { value: -1 },
      scrollDirectionFlag: false,
      startPos: 0,
      scrollSpeed: 2.0,
      tweenScrollSpeed: 0.04,
    }
  },

  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
  },

  watch: {
    loop: function () {
      switch (this.loop) {
        case 'isActive':
          this.tweenPosition.value = this.$asscroll.currentPos;
          this.$asscroll.on('scroll', this.onScrollDirection);
          this.$asscroll.on('scroll', this.onScrollTween);
          this.render();
          break
        case 'isNoActive':
          this.$asscroll.off('scroll', this.onScrollDirection);
          this.$asscroll.off('scroll', this.onScrollTween);
          cancelAnimationFrame(this.raf);
          break
      }
    },
  },

  beforeDestroy() {
    this.$asscroll.off('scroll', this.onScrollDirection);
    this.$asscroll.off('scroll', this.onScrollTween);
    cancelAnimationFrame(this.raf);
  },

  methods: {
    onScrollDirection: function () {
      if(this.scrollDirectionFlag || this.hambergerMenuState) return;

      const currentPos = this.$asscroll.targetPos;
      if (currentPos > this.startPos) {
        this.$gsap.to(this.isScrollDirection, {
          duration: this.$baseAnimationConfig.duration / 2.0,
          ease: 'none',
          value: -1,
        });
      } else {
        this.$gsap.to(this.isScrollDirection, {
          duration: this.$baseAnimationConfig.duration / 2.0,
          ease: 'none',
          value: 1,
        });
      }
      this.startPos = currentPos;

      this.scrollDirectionFlag = true;
      setTimeout(()=>{
        this.scrollDirectionFlag = false;
      },500)
    },

    onScrollTween: function(){
      if(this.hambergerMenuState) return;

      this.$gsap.to(this.tweenPosition, {
        duration: this.$baseAnimationConfig.duration * 0.5,
        ease: 'none',
        value: this.$asscroll.currentPos,
      });
    },

    render: function () {
      this.raf = window.requestAnimationFrame(this.render)

      if(this.hambergerMenuState) return;

      this.position.value += this.loopdirection * ((this.scrollSpeed * this.isScrollDirection.value) - (this.$asscroll.currentPos - this.tweenPosition.value) * this.tweenScrollSpeed)

      if (this.position.value < -this.$refs.CmnLoopTextBlock.clientWidth / 3.01) {
        this.position.value = 0
      }
      else if(this.position.value > this.$refs.CmnLoopTextBlock.clientWidth / 3.01){
        this.position.value = 0
      }

      this.$refs.CmnLoopTextBlock.style.transform = `translate3d(${-this.$refs.CmnLoopTextBlock.clientWidth / 3}px, 0, 0)`
      this.$refs.CmnLoopTextWrapper.style.transform = `translate3d(${this.position.value}px, 0, 0)`
    },
  },
}
</script>

<style lang="scss">
.cmn-loop-text-block {
  width: max-content;
  overflow: hidden;
}
</style>