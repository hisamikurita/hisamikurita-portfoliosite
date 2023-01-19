<template>
  <div class="card-article">
    <AppPageTransitionBg url="/about" color="#f0efeb" class="card-link">
      <span class="card-inner">
        <span class="card-title-wrapper-01">
          <span v-for="(char, index) of name" :key="index" class="card-title-wrapper-01-block" v-text="char"></span>
        </span>
        <span class="card-title-wrapper-02">
          <span v-for="(char, index) of desc" :key="index" class="card-title-wrapper-02-block" v-text="char"></span>
        </span>
        <span class="card-title-wrapper-03">
          <span class="pc-only">
            <span>{{ title }}</span>
            <span class="card-sub-title">
              <span>{{ subtitle }}</span>
            </span>
          </span>
          <span class="sp-only">
            {{ title }}
            <span class="card-sub-title">
              {{ subtitle }}
            </span>
          </span>
        </span>
      </span>
    </AppPageTransitionBg>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * name : 案件名
     * title : 案件タイトル
     * subtitle : 案件サブタイトル
     * desc : 案件説明
     * state : テキストアニメーションの状態を変更するprops
     */
    name: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    desc: {
      type: Array,
      required: true,
    },
    state: {
      type: String,
      default: '',
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
  background-color: $thinPink;
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
  color: $white;

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

.card-title-wrapper-02 {
  color: $darkPink;
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
  color: $darkPink;
  font-size: 120px;
  font-family: $sixcaps;

  @include sp() {
    bottom: -5px;
    font-size: 80px;
  }

  & .card-sub-title {
    position: absolute;
    top: 12px;
    right: -4px;
    font-size: 12px;
    font-family: $helvetica;
    letter-spacing: 0.02em;

    @include sp() {
      top: 7px;
      font-size: 10px;
    }
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
