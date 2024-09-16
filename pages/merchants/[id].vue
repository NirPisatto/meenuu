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

const calculateTotalPrice = computed(() => {
  return merchantStore.carts.reduce((acc, item) => {
    const price = 12;
    const quantity = item.quantity;
    return acc + (price * quantity);
  }, 0);
});

const calculateTotalPriceInRiel = computed(() => {
  return merchantStore.carts.reduce((acc, item) => {
    const price = 12;
    const quantity = item.quantity;
    return acc + (price * quantity);
  }, 0);
});

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
      <v-app min-height="100vh">
        <v-app-bar :elevation="0" class="px-3">
          <template v-slot:prepend>
            <v-btn color="primary" icon="mdi-arrow-left" @click="merchantStore.hideCartModal()"></v-btn>
          </template>
          <v-app-bar-title class="text-primary">
            {{ $t('cart') }}
          </v-app-bar-title>
        </v-app-bar>
        <v-container min-height="90vh" class="mt-10 w-100">
          <v-col cols="12">
            <v-virtual-scroll
                v-if="merchantStore.carts.length > 0"
                height="80vh"
                :items="merchantStore.carts">
              <template v-slot:default="{ item }" >
                <div class="pb-4">
                  <v-card variant="outlined" color="primary">
                    <div class="d-flex">
                      <div>
                        <v-img :src="item?.item?.photo" height="150px" width="150px" cover></v-img>
                      </div>

                      <v-col class="py-3 px-3">
                        <div class="col-12">
                          <v-card-subtitle class="text-caption-2 px-0 text-primary">
                            ID : {{ item?.item?.code || $t('N/A') }}
                          </v-card-subtitle>
                          <h2 class="text-h6 px-0 pt-0 pb-1 font-weight-regular text-black text-wrap">
                            {{ $i18n.locale === 'en' ? item?.item?.name_en : item?.item?.name_kh }}
                          </h2>
                        </div>

                        <span class="text-subtitle-1 font-weight-bold">
                      $ {{ item?.item?.price_en }} {{ item?.item?.price_kh ? `| R ${item?.item?.price_kh}` : '' }}
                    </span>

                        <div>
                          <v-number-input
                              v-model="item.quantity"
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
                </div>
              </template>
            </v-virtual-scroll>
            <v-row v-else>
              <v-col cols="12" class="text-center mt-10 mpt-10">
                <v-row justify="center" class="mt-10 mpt-10">
                  <v-icon size="34" color="primary">mdi-alert-circle-outline</v-icon>
                </v-row>
                <v-row justify="center">
                  <p class="text-subtitle-1 mt-3" color="primary">
                    You have no items in your cart.
                  </p>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <div class="py-3 px-3" v-if="merchantStore.carts.length != 0">
            <v-row>
              <v-col cols="8">
                <div>
                  <h2>Total</h2>
                  <h3 class="font-weight-bold">
                    $ {{ calculateTotalPrice }} | R {{ calculateTotalPriceInRiel }}
                  </h3>
                </div>
              </v-col>
              <div class="pt-8">
                <v-btn
                    size="large"
                    color="primary"
                >
                  {{ $t('checkout') }}
                </v-btn>
              </div>
            </v-row>
          </div>
        </v-container>
      </v-app>
    </v-dialog>
  </div>
</template>

<style scoped></style>