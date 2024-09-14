<script lang="ts" setup>
// import {ref} from 'vue';
// import {useRoute} from 'vue-router';
// import {useFetch, useAsyncData} from '#imports'; // Using Nuxt composables
//
//
// export interface Banner {
//   src: string;
// }
//
// const route = useRoute();
// const merchant = ref({});
// const categories = ref([]);
// const banners = ref<Banner[]>([]);
// const menu = ref({id: 3});
// const isPageLoading = ref(true);

// Using useAsyncData to fetch data server-side and client-side
// const {data: merchantData, pending} = await useAsyncData(async () => {
//   const {data} = await useFetch(`/api/merchants/${route.params.id}`, {
//     method: 'GET',
//   });
//
//   // const {data} = await this.$supabase.from('shops').select('*,categories(*,menus(*))').eq('slug', route.params.id)
//   return data.value ? data.value[0] : null;
// });

// When merchant data is available, populate the refs
// if (merchantData.value) {
//   merchant.value = merchantData.value;
//   banners.value = [{src: merchantData.value?.promotion_banner}];
//   categories.value = merchantData.value.categories;
//   isPageLoading.value = false
// }

import { useMenuStore } from '~/store/merchant'
const merchantStore = useMenuStore()

// Fetch data server-side with useAsyncData
const { data: merchantData, error } = await useAsyncData(
    "merchantData",
    async () => {
      await merchantStore.fetchData("freedomhealth");
      return merchantStore.merchant;
    }
);

</script>

<template>
  <div>
<!--    :merchant="merchant" :categories="categories" :isPageLoading="isPageLoading" :banners="banners"-->
    <NuxtPage/>
  </div>
</template>

<style scoped></style>