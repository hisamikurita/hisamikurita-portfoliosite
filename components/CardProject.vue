<template>
  <div class="card-article">
    <component :is="setTagName" :url="setUrl" :index="setIndex" :color="setColor" class="card-link">
      <span class="card-inner">
        <span class="card-title-wrapper-01">
          <span class="card-title-wrapper-01-block"> ・ </span>
          <span class="card-title-wrapper-01-block">
            {{ name }}
          </span>
        </span>
        <span class="card-title-wrapper-02">
          <span class="card-title-wrapper-02-block">{{ desc }}</span>
        </span>
        <span class="card-title-wrapper-03">
          <span class="pc-only">
            <AppTextAnimation :state="state" :rotate="$BASEROTATE.left" :text="title" :sp-animation="false" />
          </span>
          <span class="sp-only">
            {{ title }}
          </span>
        </span>
      </span>
    </component>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * type : works/archiveで処理を切り替える
     * index : 案件に固有に振り渡している番号
     * id : 案件ID
     * name : 案件名
     * title : 案件タイトル
     * desc : 案件説明
     * modifier : 見た目を変更するクラス
     * state : テキストアニメーションの状態を変更するprops
     */
    type: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
  },
  computed: {
    setTagName() {
      if (this.type === 'works') {
        return 'AppPageTransitionImage'
      } else if (this.type === 'archive') {
        return 'AppPageTransitionBg'
      } else {
        return ''
      }
    },
    setUrl() {
      if (this.type === 'works') {
        return `/works/${this.id}`
      } else if (this.type === 'archive') {
        return '/archive'
      } else {
        return ''
      }
    },
    setIndex() {
      if (this.type === 'works') {
        return this.index
      } else {
        return ''
      }
    },
    setColor() {
      if (this.type === 'archive') {
        return '#000000'
      } else {
        return ''
      }
    },
  },
}
</script>

<style scoped lang="scss">
.card-article {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 28px 18px;
  background-color: $white;
  color: $black;
  border-radius: 14px;

  @include sp() {
    padding: 20px 16px;
    border-radius: 7px;
  }
}

.card-inner {
  display: block;
  position: relative;
  height: 100%;
}

.card-link {
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;
  line-height: 1;
}

.card-title-wrapper-01 {
  display: block;
  margin: 0 0 60px 0;

  @include sp() {
    margin: 0 0 40px 0;
  }
}

.card-title-wrapper-01-block {
  display: block;
  font-size: 20px;
  font-family: $helvetica;
  line-height: 1.2;

  @include sp() {
    font-size: 17px;
  }

  &:first-of-type {
    font-size: 36px;
    text-indent: -4px;
    line-height: 1;

    @include sp() {
      display: inline-block;
      margin: 0 0 0 -4px;
      font-size: 28px;
      line-height: 0.9;
      text-indent: 0;
    }
  }
}

.card-title-wrapper-02-block {
  display: block;
  width: 200px;
  font-size: 12px;
  font-family: $helvetica;
  letter-spacing: 0.02em;
  line-height: 1.24;

  @include sp() {
    width: 180px;
    font-size: 10px;
  }
}

.card-title-wrapper-03 {
  position: absolute;
  bottom: -11px;
  left: 0;
  width: 100%;
  font-size: 120px;
  font-family: $sixcaps;

  @include sp() {
    bottom: -5px;
    font-size: 80px;
  }
}

/* stylelint-disable */
.is-windows .card-title-wrapper-01-block {
  &:first-of-type {
    position: relative;
    left: -8px;
  }
}
/* stylelint-enable */
</style>
