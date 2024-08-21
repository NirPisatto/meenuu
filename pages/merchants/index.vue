<script lang="ts">
import {defineComponent} from 'vue'
import BannerCarousel from "~/components/merchant/banner-carousel.vue";
import SearchCard from "~/components/merchant/search-card.vue";

definePageMeta({
  layout: 'merchant',
});

export default defineComponent({
  name: "merchantDetailPage",
  components: {SearchCard, BannerCarousel},
  data() {
    return {
      selectedCategory: 0,
      merchant: {
        name: 'MeeNuu Demo Merchant',
      },
      banners: [
        {src: '/images/demo_banner_img.jpeg'},
        {src: '/images/demo_banner_img.jpeg'},
        {src: '/images/demo_banner_img.jpeg'},
      ],
      categories: [
        {
          label_en: 'All',
          label_km: 'ទាំងអស់',
          icon: 'mdi-food',
          slug: 'all',
        },
        {
          label_en: 'Food',
          label_km: 'អាហារ',
          icon: 'mdi-food',
          slug: 'food',
        },
        {
          label_en: 'Drink',
          label_km: 'ភេសជ្ជៈ',
          icon: 'mdi-glass-cocktail',
          slug: 'drink',
        },
        {
          label_en: 'Bakery',
          label_km: 'ប៊ីគោរ',
          icon: 'mdi-bread-slice',
          slug: 'grocery',
        },
        {
          label_en: 'Lunch',
          label_km: 'អាហារពេលព្រឹក',
          icon: 'mdi-food',
          slug: 'pharmacy',
        },
        {
          label_en: 'Other',
          label_km: 'ផ្សេងៗ',
          icon: 'mdi-dots-horizontal',
          slug: 'other',
        },
      ],
    }
  },
})
</script>

<template>
  <div>
    <v-app-bar :elevation="0" class="px-3">
      <template v-slot:prepend>
        <v-avatar border="0">
          <v-img alt="merchantnpm  logo" src="/images/logo.jpeg"></v-img>
        </v-avatar>
      </template>
      <v-app-bar-title class="text-primary">
        {{ merchant.name }}
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn color="primary" icon="mdi-cart-outline"></v-btn>
      </template>
    </v-app-bar>

    <v-spacer class="my-4 py-3"></v-spacer>


    <banner-carousel :banners="banners"></banner-carousel>

    <search-card class="mt-6">
      <v-text-field
          placeholder="Search"
          color="primary"
          variant="outlined"
          clearable
          hide-details
          bg-color="white"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          class="mb-2 rounded text-title-case"
      >
      </v-text-field>
    </search-card>


    <v-col col="12" class="overflow-x-auto py-6">
      <!--      <div class="d-flex align-center flex-column pa-6">-->
      <!--        -->
      <!--            v-model="toggle"-->
      <!--            variant="outlined"-->
      <!--            divided-->
      <!--        >-->
      <!--          <v-btn icon="mdi-format-align-left"></v-btn>-->
      <!--          <v-btn icon="mdi-format-align-center"></v-btn>-->
      <!--          <v-btn icon="mdi-format-align-right"></v-btn>-->
      <!--          <v-btn icon="mdi-format-align-justify"></v-btn>-->
      <!--        </v-btn-toggle>-->
      <!--      </div>-->
      <v-item-group selected-class="bg-primary" v-model="selectedCategory">
        <v-row class="d-flex flex-row flex-nowrap">
          <div
              v-for="item in categories"
              :key="item.slug"
          >
            <v-item v-slot="{ isSelected, selectedClass, toggle }">
              <v-btn
                  :prepend-icon="item.icon"
                  size="large"
                  :color="isSelected ? 'primary' : 'grey'"
                  variant="outlined"
                  @click="toggle"
                  class="mr-3 rounded-lg">
                {{ item.label_en }}
              </v-btn>
            </v-item>
          </div>
        </v-row>
      </v-item-group>


<!--      <v-row class="d-flex flex-row flex-nowrap">-->
<!--        <v-btn-toggle divided>-->
<!--          <v-btn v-for="(item, index) in categories" key="index"-->
<!--                 :prepend-icon="item.icon"-->
<!--                 size="large"-->
<!--                 color="primary"-->
<!--                 variant="outlined"-->
<!--                 class="mr-3 rounded-lg">-->
<!--            {{ item.label_en }}-->
<!--          </v-btn>-->
<!--        </v-btn-toggle>-->
<!--      </v-row>-->
    </v-col>
  </div>
</template>

<style>

</style>