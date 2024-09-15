<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useFetch} from '#imports'; // Adjust the import based on your project's setup
import BannerCarousel from "~/components/merchant/banner-carousel.vue";
import { VNumberInput } from 'vuetify/labs/VNumberInput'

import {useMenuStore} from "~/store/merchant";
import type {CartItem, MenuItem} from "~/types";



const merchantStore = useMenuStore()
const count = ref(1);

interface Banner {
  src: string;
  photo: string;
}

definePageMeta({
  layout: "merchant",
});


const route = useRoute();
const router = useRouter();

const menuProps = defineProps({
  menuProps: {
    type: Object,
    required: false,
    default: () => null,
  },
});

const isPageloading = ref(false);
const onClickAnimation = ref(false);
const selectedCategory = ref(0);
const menu = ref({});
const merchant = ref({
  name: "MeeNuu Demo Merchant",
});
const banners = ref<Banner[]>([]);

// const getMenuById = async () => {
//   if (menuProps.menuProps) {
//     menu.value = menuProps.menuProps;
//     banners.value = [{ src: menu.value?.photo } as Banner];
//     return;
//   }
//
//   const { data } = await useFetch(`/api/merchants/${route.params.id}/${route.params.menuId}`, {
//     method: "GET",
//   });
//   // const {data} = await this.$supabase.from('shops').select('*,categories(*,menus(*))').eq('slug', route.params.id)
//
//   if (data.value) {
//     menu.value = data.value[0];
//     banners.value = [{ src: menu.value?.photo } as Banner];
//   }
//
//   // isPageloading.value = false;
// };

const {
  data: menuData,
  pending
} = await useFetch(`/api/merchants/${route.params.id}/${route.params.menuId}`, {lazy: true})

// const { data: menuData, pending, error } = useAsyncData(async () => {
//   const { data } = await useFetch(`/api/merchants/${route.params.id}/${route.params.menuId}`, {
//     method: "GET",
//   });
//
//   return data.value ? data.value[0] : null;
// }, { immediate: true });

// Watch for menuData changes and assign to menu ref
watch(menuData, (newValue) => {
  if (newValue) {
    menu.value = newValue[0];
    banners.value = [{src: menu.value?.photo} as Banner];
  }
});

if (menuData.value) {
  menu.value = menuData.value[0];
  banners.value = [{src: menu.value?.photo} as Banner];
}

const copyUrl = () => {
  if (process.client) {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
        .then(() => {
          onClickAnimation.value = true;
          setTimeout(() => {
            onClickAnimation.value = false;
          }, 1000);
        })
        .catch(err => {
          console.error('Failed to copy URL:', err);
        });
  }
};

const handleGoBack = () => {
  if (window.history.length > 2) {
    router.go(-1);
  } else {
    router.push(`/merchants/${route.params.id}`);
  }
};

const handleAddToCart = () => {
  const item: CartItem = { menu_id: menu.value.id as number, quantity: count.value, item: menu.value as MenuItem };
  merchantStore.addToCart(item);
  handleGoBack();
};

// onMounted(async () => {
//   await getMenuById();
// });
</script>
<template>
  <div v-if="!pending">

    <v-container height="100wh">
      <v-app-bar :elevation="0" class="px-3">
        <template v-slot:prepend>
          <v-btn color="primary" icon="mdi-arrow-left" @click="handleGoBack"></v-btn>
        </template>
        <v-app-bar-title class="text-primary">
          {{ $i18n.locale === 'en' ? menu.name_en : menu.name_km }}
        </v-app-bar-title>

        <!--          <template v-slot:append>-->
        <!--            <v-btn color="primary" @click="merchantStore.showCartModal()" class="text-none" icon size="large">-->
        <!--              <v-badge color="error" :content="merchantStore.carts.length">-->
        <!--                <v-icon>mdi-cart-outline</v-icon>-->
        <!--              </v-badge>-->
        <!--            </v-btn>-->
        <!--          </template>-->
      </v-app-bar>

      <v-spacer class="my-4 py-3"></v-spacer>

      <banner-carousel v-if="banners.length" :banners="banners" height="300px"></banner-carousel>
      <div class="py-3">
              <span class="text-h5 text-primary">
                ID : {{ menu.code }}
              </span>
      </div>

      <v-card elevation="0" class="px-6 py-6" color="#5581B04D">
        <v-row class="d-flex justify-between">
          <p> {{ $i18n.locale === 'en' ? menu.name_en : menu.name_km }}</p>
          <v-spacer></v-spacer>

          <v-btn size="small" variant="tonal" rounded :icon="onClickAnimation ? 'mdi-check' : 'mdi-link-variant'"
                 :color="onClickAnimation ? 'green green-accent-3' : 'primary'" @click="copyUrl">

          </v-btn>
          <v-btn class="ml-3" variant="tonal" color="primary" icon size="small"
                 @click.stop="merchantStore.addToCart(menu as MenuItem)">
            <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
        </v-row>

        <v-row class="mt-9">
                <span class="text-subtitle-1 font-weight-regular">
                  $ {{ menu.price_en }}
                </span>
        </v-row>
      </v-card>

      <h4 class="mt-3">Description</h4>
      <p>
        {{ $i18n.locale === 'en' ? menu.description_en : menu.description_km }}
      </p>


    </v-container>

  </div>
  <div v-else>
    <v-container content="center">
      <v-row justify="center" class="mt-16 pt-16">
        <v-progress-circular color="primary" model-value="20" :size="68" :width="6" indeterminate></v-progress-circular>
      </v-row>
    </v-container>
  </div>
  <div class="place-order-container py-3 px-3">
    <v-number-input
        v-model="count"
        :reverse="false"
        controlVariant="split"
        label=""
        :hideInput="false"
        :inset="false"
        hide-details
        :min="1"
        :max="100"
        color="primary"
        variant="outlined"
        density="compact"
        class="mr-3"
    ></v-number-input>
    <v-btn color="primary" @click="handleAddToCart" size="large">
      Add to cart
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.place-order-container {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>
