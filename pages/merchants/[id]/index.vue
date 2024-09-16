<script lang="ts" setup>
import {ref, watch, onMounted, onUnmounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useHead, useGoTo} from '#imports';
import BannerCarousel from "~/components/merchant/banner-carousel.vue";
import SearchCard from "~/components/merchant/search-card.vue";
import BannerWindow from "~/components/merchant/banner-window.vue";
import {useMenuStore} from '~/store/merchant'
import type {Category} from "~/types";

const merchantStore = useMenuStore()
const merchant = merchantStore.merchant
const categories = merchantStore.categories
const banners = merchantStore.getBanners


const tabData = ref(0);
const search = ref('');
const internalCategories = ref<Category[]>([]);
const scrollTop = ref(0);
const scrollBlocker = ref(false);
const selectedCategory = ref(0);
const firstLoad = ref(true);
const searching = ref(false);

const route = useRoute();
const router = useRouter();
const goTo = useGoTo();

useHead({
  title: merchant?.name_en || merchant?.name_kh || "Merchant Details",
  meta: [
    {
      name: "description",
      content: `Explore the offerings of ${merchant?.name_en || merchant?.name_kh}.`,
    },
    {
      property: "og:title",
      content: merchant?.name_en || merchant?.name_kh,
    },
    {
      property: "og:description",
      content: `Check out the products and services offered by ${merchant?.name_en || merchant?.name_kh}.`,
    },
    {
      property: "og:image",
      content: merchant?.logo || "/images/default-logo.jpeg",
    },
  ],
});

definePageMeta({
  layout: "merchant",
});

const filterMenuItems = (data: Array<any>, searchString: string) => {
  const lowerCaseSearchString = searchString.toLowerCase();

  return data
      .map((category) => {
        const filteredMenus = category.menus.filter((menu: any) => {
          const nameEnMatches = menu.name_en && menu.name_en.toLowerCase().includes(lowerCaseSearchString);
          const nameKhMatches = menu.name_km && menu.name_km.toLowerCase().includes(lowerCaseSearchString);
          const idMatches = menu.id.toString().includes(searchString);
          return nameEnMatches || nameKhMatches || idMatches;
        });

        return {
          ...category,
          menus: filteredMenus,
        };
      })
      .filter((category) => category.menus.length > 0);
};

const findIndex = (arr: number[], current: number) => {
  for (let i = 0; i < arr.length; i++) {
    if (current >= arr[i] && current < arr[i + 1]) {
      return i;
    }
  }
  return 0;
};

const handleScroll = () => {
  if (scrollBlocker.value) return;
  scrollTop.value = document.documentElement.scrollTop;
  selectedCategory.value = findIndex(
      [...categories.map((item: any) => item.top), 100000],
      scrollTop.value
  );
  tabData.value = selectedCategory.value;
};


const switchLang = (val: string) => {
  $i18n.setLocale(val)
}

const go = (id: string, index: number) => {
  scrollBlocker.value = true;
  tabData.value = index;
  setTimeout(() => {
    scrollBlocker.value = false;
  }, 600);
  goTo(`#category_${id}`, {offset: -136, duration: 600, easing: 'easeInOutCubic'});
  selectedCategory.value = index;
};

const getOffsetById = (id: string) => {
  const item = document.getElementById(id);
  if (!item) return;
  const rect = item.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
};

onMounted(() => {
  setTimeout(() => {
    selectedCategory.value = 0;
    categories.forEach((item: any) => {
      const position = getOffsetById(`category_${item.id}`);
      item.top = <number>position?.top - 138;
    });
  }, 1000);

  window.addEventListener('scroll', handleScroll);
  internalCategories.value = categories as Category[];
});

watch(
    () => categories,
    (val) => {
      if (firstLoad.value) {
        internalCategories.value = val as Category[];
        firstLoad.value = false;
      }
    }
);

watch(search, (val: string) => {
  if (val) {
    if (searching.value == false) {
      searching.value = true;
      setTimeout(() => {
        internalCategories.value = filterMenuItems(categories, val);
        categories.forEach((item: any) => {
          const position = getOffsetById(`category_${item.id}`);
          item.top = <number>position?.top - 138;
        });
        searching.value = false;
      }, 500);
    }
    return;
  }
  internalCategories.value = categories as Category[];
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});


const handleOnClickCard = (item: any) => {
  merchantStore.setCurrentMenu(item);
  router.push(`/merchants/${route.params.id}/${item.id}`);
};

</script>

<template>
  <div>
    <div v-if="!merchantStore.getIsLoading">
      <v-container>
        <v-app-bar :elevation="0" class="px-3" style="background-color: #FAFAFA">
          <template v-slot:prepend>
            <nuxt-link to="/" class="text-decoration-none">
              <v-avatar border="0">
                <v-img alt="merchant logo" :src="merchant?.logo || '/images/logo.jpeg'"></v-img>
              </v-avatar>
            </nuxt-link>
          </template>
          <v-app-bar-title class="text-primary">
            {{ merchant?.name_en || merchant?.name_kh || 'N/A' }}
          </v-app-bar-title>
          <template v-slot:append>
            <v-btn v-if="merchant?.allow_order" color="primary" @click="merchantStore.showCartModal()" class="text-none" icon size="large">
              <v-badge color="error" :content="merchantStore.carts.length">
                <v-icon>mdi-cart-outline</v-icon>
              </v-badge>
            </v-btn>
          </template>
        </v-app-bar>

        <v-spacer class="my-4 py-3"></v-spacer>
        <BannerWindow :banners="banners as any" height="120px"></BannerWindow>
        <search-card class="mt-3">
          <v-text-field v-model="search" :placeholder="$t('merchant?.search')" color="primary" variant="outlined"
                        clearable hide-details
                        bg-color="white" prepend-inner-icon="mdi-magnify" density="compact"
                        class="mb-2 rounded text-title-case">
          </v-text-field>
        </search-card>
      </v-container>
      <v-col ref="categoryBtnContainer" id="category-btn-container" col="12"
             class="overflow-x-auto py-3 position-sticky cus-bg Flipped" style="z-index: 100">
        <v-tabs
            v-model="tabData"
            center-active
        >
          <v-tab v-for="(item, index) in internalCategories" class="mx-1 cus-tab-class"
                 selected-class="cus-selected-class" rounded :key="index" :value="index" border="flase"
                 color="primary" @click="go(item.id, index)">
            {{ $i18n.locale === 'en' ? item.name_en : item.name_kh }}
          </v-tab>
        </v-tabs>


        <!--        <v-item-group selected-class="bg-primary" v-model="selectedCategory" class="px-3 Content">-->
        <!--          <v-row class="d-flex flex-row flex-nowrap">-->
        <!--            <div v-for="(item, index) in internalCategories" :key="item.id">-->
        <!--              <v-item v-slot="{ isSelected, selectedClass, toggle }">-->
        <!--                <v-btn :prepend-icon="item.icon" size="large" :color="isSelected ? 'primary' : 'grey'" variant="outlined"-->
        <!--                  @click="go(item.id, index)" class="mr-3 rounded-lg">-->
        <!--                  {{ item.name_en }}-->
        <!--                </v-btn>-->
        <!--              </v-item>-->
        <!--            </div>-->
        <!--          </v-row>-->
        <!--        </v-item-group>-->
      </v-col>
      <div id="goto-container" v-for="category in internalCategories" :key="category.id">
        <div :id="`category_${category.id}`" class="px-4">
          <p color="primary"> {{ $i18n.locale === 'en' ? category.name_en : category.name_kh }} </p>
        </div>
        <v-container class="pt-0">
          <v-row class="px-1 mt-0">
            <v-col cols="6" sm="4" md="4" lg="3" class="mb-0 px-2" v-for="(item, index) in category.menus"
                   :key="item.id">
              <v-card @click="handleOnClickCard(item)"
                      class="rounded-lg py-2 px-2 d-flex flex-column justify-space-between" style="height: 100%"
                      variant="outlined" color="primary" data-aos="fade-up" data-aos-offset="0"
                      :data-aos-delay="20 * index"
                      data-aos-duration="400" data-aos-easing="ease-in-out" data-aos-once="true"
                      data-aos-mirror="false">
                <div>
                  <v-img :src="item.photo" height="160px" cover class="rounded-lg"></v-img>

                  <v-card-subtitle class="text-caption px-0 mt-2 text-primary">
                    ID : {{ item.code || $t('N/A') }}
                  </v-card-subtitle>
                  <v-card-title class="text-h6 px-0 pt-0 font-weight-regular text-black text-wrap">
                    {{ $i18n.locale === 'en' ? item.name_en : item.name_kh }}
                  </v-card-title>
                </div>
                <div>
                    <span class="text-subtitle-1 font-weight-regular py-0">
                      $ {{ item.price_en }} {{ item.price_kh ? `| R ${item.price_kh}` : '' }}
                    </span>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div v-if="internalCategories.length <= 0" class="mt-6">
        <v-row>
          <v-col cols="12" class="text-center mt-10">
            <v-row justify="center">
              <v-icon size="34" color="primary">mdi-alert-circle-outline</v-icon>
            </v-row>
            <v-row justify="center">
              <p class="text-subtitle-1 mt-3" color="primary">
                No items found
              </p>
            </v-row>
            <v-row justify="center">
              <v-btn color="primary" variant="flat" class="mt-3" @click="search = ''">Clear Search</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-spacer class="my-16 py-16">
        <v-spacer class="my-16 py-6"></v-spacer>
      </v-spacer>
    </div>
    <div v-else>
      <v-container content="center">
        <v-row justify="center" class="mt-16 pt-16">
          <v-progress-circular color="primary" model-value="20" :size="128" :width="12"
                               indeterminate></v-progress-circular>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style>
.cus-bg {
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.5130427170868348) 0%, rgba(250, 250, 250, 1) 16%);
  top: 64px;
  left: 0px;
  right: 0px;
  z-index: 20001;
}

.cus-tab-class {
  border-radius: 8px !important;
  border: 1px solid rgba(0, 0, 0, 0.30) !important;
}


.cus-selected-class {
  border-radius: 8px !important;
  border: 1px solid #5581B0 !important;
}

</style>
