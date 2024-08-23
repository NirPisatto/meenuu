<script lang="ts">
import { defineComponent } from "vue";
import BannerCarousel from "~/components/merchant/banner-carousel.vue";
import SearchCard from "~/components/merchant/search-card.vue";
import BannerWindow from "~/components/merchant/banner-window.vue";

definePageMeta({
  layout: "merchant",
});

export default defineComponent({
  name: "merchantDetailPage",
  components: { SearchCard, BannerCarousel, BannerWindow },
  data() {
    return {
      selectedCategory: 0,
      merchant: {
        name: "MeeNuu Demo Merchant",
      },
      banners: [
        { src: "/images/demo_banner_img.jpeg" },
        { src: "/images/demo_banner_img.jpeg" },
        { src: "/images/demo_banner_img.jpeg" },
      ],
      categories: [
        {
          label_en: "All",
          label_km: "ទាំងអស់",
          icon: "mdi-food",
          slug: "all",
        },
        {
          label_en: "Food",
          label_km: "អាហារ",
          icon: "mdi-food",
          slug: "food",
        },
        {
          label_en: "Drink",
          label_km: "ភេសជ្ជៈ",
          icon: "mdi-glass-cocktail",
          slug: "drink",
        },
        {
          label_en: "Bakery",
          label_km: "ប៊ីគោរ",
          icon: "mdi-bread-slice",
          slug: "grocery",
        },
        {
          label_en: "Lunch",
          label_km: "អាហារពេលព្រឹក",
          icon: "mdi-food",
          slug: "pharmacy",
        },
        {
          label_en: "Other",
          label_km: "ផ្សេងៗ",
          icon: "mdi-dots-horizontal",
          slug: "other",
        },
      ],
      menues: [
        {
          id: "0001",
          name: "Menu 1",
          price_en: 10,
          price_km: 10 * 4001,
          image: "/images/demo_banner_img.jpeg",
        },
        {
          id: "0002",
          name: "Menu 2",
          price_en: 20,
          price_km: 20 * 4001,
          image: "/images/02.jpeg",
        },
        {
          id: "0003",
          name: "Menu 3",
          price_en: 30,
          price_km: 30 * 4001,
          image: "/images/03.jpeg",
        },
        {
          id: "0004",
          name: "Menu 4",
          price_en: 40,
          price_km: 40 * 4001,
          image: "/images/04.jpeg",
        },
        {
          id: "0005",
          name: "Menu 5",
          price_en: 50,
          price_km: 50 * 4001,
          image: "/images/03.jpeg",
        },
        {
          id: "0006",
          name: "Menu 6",
          price_en: 60,
          price_km: 60 * 4001,
          image: "/images/02.jpeg",
        },
        {
          id: "0007",
          name: "Menu 7",
          price_en: 70,
          price_km: 70 * 4001,
          image: "/images/01.jpeg",
        },
        {
          id: "0008",
          name: "Menu 8",
          price_en: 80,
          price_km: 80 * 4001,
          image: "/images/demo_banner_img.jpeg",
        },
        {
          id: "0009",
          name: "Menu 9",
          price_en: 90,
          price_km: 90 * 4001,
          image: "/images/demo_banner_img.jpeg",
        },
        {
          id: "0010",
          name: "Menu 10",
          price_en: 100,
          price_km: 100 * 4001,
          image: "/images/demo_banner_img.jpeg",
        },
      ],
    };
  },
});
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
        {{ merchant.name }} - {{ $route.params.id }}
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn color="primary" icon="mdi-cart-outline"></v-btn>
      </template>
    </v-app-bar>

    <v-spacer class="my-4 py-3"></v-spacer>

    <BannerWindow :banners="banners"></BannerWindow>

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
      <v-item-group selected-class="bg-primary" v-model="selectedCategory">
        <v-row class="d-flex flex-row flex-nowrap">
          <div v-for="item in categories" :key="item.slug">
            <v-item v-slot="{ isSelected, selectedClass, toggle }">
              <v-btn
                :prepend-icon="item.icon"
                size="large"
                :color="isSelected ? 'primary' : 'grey'"
                variant="outlined"
                @click="toggle"
                class="mr-3 rounded-lg"
              >
                {{ item.label_en }}
              </v-btn>
            </v-item>
          </div>
        </v-row>
      </v-item-group>
    </v-col>

    <v-row class="px-1 mt-0">
      <v-col
        cols="6"
        sm="4"
        md="4"
        lg="3"
        class="mb-0 px-2"
        v-for="item in menues"
        :key="item.id"
      >
        <v-card
          :to="`/merchants/${$route.params.id}/${item.id}`"
          class="rounded-lg py-2 px-2"
          variant="outlined"
          color="primary"
        >
          <v-img
            :src="item.image"
            height="160px"
            cover
            class="rounded-lg"
          ></v-img>

          <v-card-subtitle class="text-caption px-0 mt-2 text-primary">
            ID : {{ item.id }}
          </v-card-subtitle>
          <v-card-title class="text-h6 px-0 font-weight-regular text-black">
            {{ item.name }}
          </v-card-title>

          <v-card-text class="px-3 mt-3">
            <v-row>
              <span class="text-subtitle-1 font-weight-regular">
                $ {{ item.price_en }} | R {{ item.price_km }}
              </span>
              <!-- <div>
                  <v-chip
                    class="rounded-lg mr-2"
                    color="primary"
                    text-color="white"
                  >
                    <v-icon left>mdi-star</v-icon>
                    4.5
                  </v-chip>
                  <v-chip
                    class="rounded-lg mr-2"
                    color="primary"
                    text-color="white"
                  >
                    <v-icon left>mdi-clock-time-four-outline</v-icon>
                    30-45 mins
                  </v-chip>
                </div> -->
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style></style>
