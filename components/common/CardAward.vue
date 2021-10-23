<template>
  <div ref="CardAward" class="card-award">
    <article class="card-award-article">
      <div class="card-award-inner">
        <span class="card-award-title-wrapper-01">W</span>
        <span class="card-award-title-wrapper-02">SITE OF THE DAY</span>
        <span class="card-award-title-wrapper-03">OCTOBER</span>
        <span class="card-award-title-wrapper-04">M-TRUST</span>
        <span class="card-award-title-wrapper-05">SOTD</span>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.card-award {
  position: absolute;
  top: 0;
  left: 0;
}

.card-award-article {
  width: 293px;
  height: 400px;
  padding: 28px 18px;
  background-color: $white;
  color: $black;
  border-radius: 14px;
}

.card-award-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.card-award-title-wrapper-01{
  display: block;
}

.card-award-title-wrapper-02,.card-award-title-wrapper-03,.card-award-title-wrapper-04{
  display: block;
  font-size: 12px;
  letter-spacing: 0.02em;
}

.card-award-title-wrapper-05 {
  position: absolute;
  bottom: -11px;
  left: 0;
  width: 100%;
  font-size: 120px;
  font-family: 'Six Caps', sans-serif;
}

</style>