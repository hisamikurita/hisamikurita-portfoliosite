<template>
  <span ref="root" class="app-loop-text">
    <span ref="wrapper" class="app-loop-text-wrapper">
      <span ref="rotate" class="app-loop-text-rotate">
        <span ref="translate" class="app-loop-text-translate">
          <span ref="block" class="app-loop-text-block">
            {{ text }}
          </span>
        </span>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  /**
   * text : 中身のテキスト
   * start : 数値分アニメーションをdelayさせる
   * loop : 親コンポーネントから監視されているアニメーションの状態管理用のprops
   * direction : テキストが流れる方向、(right,left)
   */
  props: {
    text: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      default: 0,
    },
    loop: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: 'right',
    },
  },

  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
  },

  watch: {
    /**
     * 親コンポーネントからアニメーションの状態管理をする
     */
    loop() {
      if (this.loop === 'isActive') {
        this.tweenPosition.value = this.$asscroll.currentPos
        this.$asscroll.on('scroll', this.onScroll)
        this.$gsap.ticker.add(this.render)
      } else if (this.loop === 'isNoActive') {
        this.$asscroll.off('scroll', this.onScroll)
        this.$gsap.ticker.remove(this.render)
      }
    },
  },

  mounted() {
    this.position = { value: 0 }
    this.tweenPosition = { value: 0 }
    this.initDirection = 0
    this.scrollDirection = { value: -1 }
    this.scrollDirectionFlag = false
    this.startPos = 0
    this.scrollSpeed = 0
    this.tweenScrollSpeed = 0
    this.iObserver = null
    this.observer = null
    this.rootEl = this.$refs.root
    this.wrapperEl = this.$refs.wrapper
    this.rotateEl = this.$refs.rotate
    this.translateEl = this.$refs.translate
    this.blockEl = this.$refs.block
    this.textValue = ''
    this.cloneTextEl = null

    // PCとSPで速度を出し分ける
    if (this.$SITECONFIG.isPc) {
      this.scrollSpeed = 2.0
      this.tweenScrollSpeed = 0.04
    } else {
      this.scrollSpeed = 1.0
      this.tweenScrollSpeed = 0.02
    }

    // propsから最初のテキストが流れる方向を決める
    if (this.direction === 'right') {
      this.initDirection = -1.0
    } else if (this.direction === 'left') {
      this.initDirection = 1.0
    }

    // アニメーションさせる要素の初期値を設定する
    this.$gsap.set(this.rotateEl, {
      rotate: 3,
      transformOrigin: 'left',
    })
    this.$gsap.set(this.translateEl, {
      yPercent: 103.8,
    })

    this.initText()
    this.observe()
  },

  beforeDestroy() {
    this.$asscroll.off('scroll', this.onScroll)
    this.$gsap.ticker.remove(this.render)
    this.iObserver.unobserve(this.observer)
  },

  methods: {
    /**
     * テキストを複製して親要素に追加する
     */
    cloneText() {
      this.cloneTextEl = document.createElement('span')
      this.cloneTextEl.className = this.blockEl.className
      this.cloneTextEl.innerHTML = this.blockEl.textContent
      this.translateEl.append(this.cloneTextEl)
    },
    /**
     * テキストをウィンドウの横幅を超えるまで生成する
     */
    createText() {
      while (window.innerWidth > this.blockEl.getBoundingClientRect().width) {
        this.textValue += `${this.blockEl.textContent} `
        this.blockEl.innerHTML = this.textValue
      }
    },
    initText() {
      this.createText()
      for (let i = 0; i < 2; i++) {
        this.cloneText()
      }
    },
    /**
     * 上下のスクロールでテキストが左右に流れる方向を変更する
     */
    getScrollDirection() {
      if (this.scrollDirectionFlag || this.hambergerMenuState) return

      const currentPos = this.$asscroll.currentPos

      // 下スクロール
      if (currentPos > this.startPos) {
        this.$gsap.to(this.scrollDirection, {
          duration: this.$SITECONFIG.shortDuration,
          ease: 'none',
          value: -1,
        })
      }
      // 上スクロール
      else {
        this.$gsap.to(this.scrollDirection, {
          duration: this.$SITECONFIG.shortDuration,
          ease: 'none',
          value: 1,
        })
      }
      this.startPos = currentPos

      // 急に切り替えずにゆったりと方向を切り替えさせたいので、
      // 発火したらインターバルを作成する
      this.scrollDirectionFlag = true
      setTimeout(() => {
        this.scrollDirectionFlag = false
      }, 600)
    },

    /**
     * 現在のスクロール位置に、補完される値を取得する
     */
    getScrollTweenPosition() {
      if (this.hambergerMenuState) return

      this.$gsap.to(this.tweenPosition, {
        duration: this.$SITECONFIG.baseDuration,
        ease: 'none',
        value: this.$asscroll.currentPos,
      })
    },

    onScroll() {
      this.getScrollDirection()
      this.getScrollTweenPosition()
    },

    render() {
      if (this.hambergerMenuState) return

      // 基準となるテキストブロックの横幅を取得
      const standard = this.blockEl.getBoundingClientRect().width
      this.position.value += Math.floor(this.initDirection * (this.scrollSpeed * this.scrollDirection.value - (this.$asscroll.currentPos - this.tweenPosition.value) * this.tweenScrollSpeed))

      // テキストブロックの横幅分、移動したら中心に戻す
      if (this.position.value < -standard) {
        this.position.value = 0
      } else if (this.position.value > standard) {
        this.position.value = 0
      }

      // ルートは常に中心に来るようにする
      this.rootEl.style.transform = `translate3d(${-standard}px, 0, 0)`
      this.wrapperEl.style.transform = `translate3d(${this.position.value}px, 0, 0)`
    },

    fadeInAnimation() {
      this.$gsap.to(this.rotateEl, {
        duration: this.$SITECONFIG.shortDuration,
        delay: this.start,
        ease: this.$EASING.transform,
        rotate: 0,
      })
      this.$gsap.to(this.translateEl, {
        duration: this.$SITECONFIG.baseDuration,
        delay: this.start,
        ease: this.$EASING.transform,
        yPercent: 0,
      })
    },

    /**
     * 画面内に表示された時に一度だけ発火
     */
    observe() {
      this.observer = this.rootEl
      this.iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.fadeInAnimation()
              this.iObserver.unobserve(this.observer)
            }
          })
        },
        { rootMargin: '0%' }
      )
      this.iObserver.observe(this.observer)
    },
  },
}
</script>

<style scoped lang="scss">
.app-loop-text {
  display: block;
  width: max-content;
  overflow: hidden;
}

.app-loop-text-wrapper {
  display: block;
  will-change: transform;
}

.app-loop-text-translate {
  display: flex;
  position: relative;
}
</style>

<!-- クローンを動的に生成するクラスはscopedから外す -->
<style lang="scss">
.app-loop-text-block {
  padding: 0 vw(6);
}
</style>
