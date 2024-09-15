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
import {VNumberInput} from "vuetify/lib/labs/VNumberInput";

const route = useRoute();
import {useMenuStore} from '~/store/merchant'

const merchantStore = useMenuStore()

// Fetch data server-side with useAsyncData
const {data: merchantData, error} = await useAsyncData(
    async () => {
      await merchantStore.fetchData(route.params.id as string);
      return merchantStore.merchant;
    }
);

</script>

<template>
  <div>
    <!--    :merchant="merchant" :categories="categories" :isPageLoading="isPageLoading" :banners="banners"-->
    <NuxtPage/>

    <v-dialog
        v-model="merchantStore.showCart"
        fullscreen
        persistent
    >
      <v-app>
        <v-app-bar :elevation="0" class="px-3">
          <template v-slot:prepend>
            <v-btn color="primary" icon="mdi-arrow-left" @click="merchantStore.hideCartModal()"></v-btn>
          </template>
          <v-app-bar-title class="text-primary">
            {{ $t('cart') }}
          </v-app-bar-title>
        </v-app-bar>
        <v-container class="pt-10 mt-10">
          <v-row>
            <v-col cols="12" v-for="cart in merchantStore.carts">
              <v-card variant="outlined" color="primary">
                <div class="d-flex">
                  <div>
                    <v-img :src="cart?.item?.photo" height="150px" width="150px" cover></v-img>
                  </div>

                  <v-col class="py-3 px-3">
                    <div class="col-12">
                      <v-card-subtitle class="text-caption-2 px-0 text-primary">
                        ID : {{ cart?.item?.code || $t('N/A') }}
                      </v-card-subtitle>
                      <v-card-title class="text-h6 px-0 pt-0 pb-1 font-weight-regular text-black text-wrap">
                        {{ $i18n.locale === 'en' ? cart?.item?.name_en : cart?.item?.name_kh }}
                      </v-card-title>
                    </div>

                    <span class="text-subtitle-1 font-weight-bold">
                      $ {{ cart?.item?.price_en }}
                    </span>

                    <div>
                      <v-number-input
                          v-model="cart.quantity"
                          :reverse="false"
                          controlVariant="split"
                          label=""
                          :hideInput="false"
                          :inset="false"
                          hide-details
                          :min="0"
                          :max="100"
                          color="primary"
                          variant="outlined"
                          density="compact"
                          class="mr-3"
                      ></v-number-input>
                    </div>


                  </v-col>
                </div>


              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-app>
    </v-dialog>
  </div>
</template>

<style scoped></style>