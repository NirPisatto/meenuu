<style lang="scss">
$body-font-family: 'Abel';
$title-font: 'Abel';

.v-application {
  font-family: 'Abel', sans-serif, 'Noto Sans Khmer' !important;
  .title {
    font-family: 'Abel', sans-serif, 'Noto Sans Khmer' !important;
  }
}

html{
  font-family: 'Abel', sans-serif, 'Noto Sans Khmer' !important;
}
</style>

<template>
  <div>
    <NuxtLoadingIndicator color="#27639c" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
