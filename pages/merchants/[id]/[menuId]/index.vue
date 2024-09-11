<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetch } from '#imports'; // Adjust the import based on your project's setup
import BannerCarousel from "~/components/merchant/banner-carousel.vue";


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

const { data: menuData, pending, error } = useAsyncData(async () => {
  if (menuProps.menuProps) {
    menu.value = menuProps.menuProps;
    banners.value = [{ src: menu.value?.photo } as Banner];
    return menu.value;
  }

  const { data } = await useFetch(`/api/merchants/${route.params.id}/${route.params.menuId}`, {
    method: "GET",
  });

  return data.value ? data.value[0] : null;
});

// watch(menuData, (newMenuData) => {
//   if (newMenuData) {
//     menu.value = newMenuData;
//     banners.value = [{ src: menu.value?.photo } as Banner];
//   }
// });

// When merchant data is available, populate the refs
if (menuData.value) {
  menu.value = menuData.value;
  banners.value = [{ src: menu.value?.photo } as Banner];
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

// onMounted(async () => {
//   await getMenuById();
// });
</script>
<template>
  <div v-if="!isPageloading">
    <div>
      <v-container>
        <v-app-bar :elevation="0" class="px-3">
          <template v-slot:prepend>
            <v-btn color="primary" icon="mdi-arrow-left" @click="handleGoBack"></v-btn>
          </template>
          <v-app-bar-title class="text-primary">
            {{ $i18n.locale === 'en' ? menu.name_en : menu.name_km }}
          </v-app-bar-title>

          <template v-slot:append>
            <v-btn color="primary" icon="mdi-cart-outline"></v-btn>
          </template>
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
            <v-btn variant="tonal" rounded :icon="onClickAnimation ? 'mdi-check' : 'mdi-link-variant'" density="compact"
              class="px-3" :color="onClickAnimation ? 'green green-accent-3' : 'primary'" @click="copyUrl">

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
  </div>
  <div v-else>
    <v-container content="center">
      <v-row justify="center" class="mt-16 pt-16">
        <v-progress-circular color="primary" model-value="20" :size="68" :width="6" indeterminate></v-progress-circular>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
