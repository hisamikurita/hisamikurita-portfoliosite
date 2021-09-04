<template>
  <div class="about">
    <div class="about-inner">
      <div class="l-container">
        <p class="about-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <NuxtLink to="/about" class="about-link">アバウトページへ</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-inner{
  padding: 40px 0;
}

.about-title {
  font-size: vw(50);
  letter-spacing: 0.1em;
}

.about-link{
  color: #000;
  font-size: 20px;
}
</style>