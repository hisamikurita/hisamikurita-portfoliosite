<template>
  <div class="notfound">
    <div class="notfound-bg">
      <div class="l-container">
        <h1>404</h1>
        <p>
          申し訳ございません。 お客様がお探しのページが見つかりませんでした。
          削除されたか、入力したURLが間違っている可能性があります。
          お手数ですが、下部のボタンからTOPへお戻りください。
        </p>
        <NuxtLink :to="'/'">TOPへ戻る</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  // layout: 'default',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 40px;
}
</style>
