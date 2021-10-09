<template>
  <button class="hambergerMenu">
    <span class="hambergerMenu-openarea">
      <span class="hambergerMenu-openarea-line hambergerMenu-openarea-line-01"></span>
      <span class="hambergerMenu-openarea-line hambergerMenu-openarea-line-02"></span>
    </span>
  </button>
</template>

<style lang="scss">
  .hambergerMenu{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 110px;
    height: calc(100% - 20px);
    margin: auto 0;
    background-color: $white;
    border-radius: 10px;
    cursor: pointer;
  }

  .hambergerMenu-openarea{
    position: relative;
    width: 37px;
    height: 13px;
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