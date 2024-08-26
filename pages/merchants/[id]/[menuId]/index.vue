<script lang="ts">
import {defineComponent} from "vue";
import BannerCarousel from "~/components/merchant/banner-carousel.vue";
import SearchCard from "~/components/merchant/search-card.vue";

definePageMeta({
  layout: "merchant",
});

export default defineComponent({
  name: "merchantDetailPage",
  components: {SearchCard, BannerCarousel},
  head() {
    return {
      title: `Menu Detail - ` + this.$route.params.menuId,
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'none',
        image: '/images/01.jpeg'
      }]
    }
  },
  data() {
    return {
      onClickAnimation: false,
      selectedCategory: 0,
      merchant: {
        name: "MeeNuu Demo Merchant",
      },
      banners: [
        {src: "/images/01.jpeg"},
        {src: "/images/02.jpeg"},
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
  methods: {
    copyUrl() {
      if (process.client) {

        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
          this.onClickAnimation = true
          setTimeout(() => {
            this.onClickAnimation = false;
          }, 1000);
        }).catch(err => {
          console.error('Failed to copy URL:', err);
        });
      }
    }
  },
});
</script>

<template>
  <div>
    <v-container>

      <v-app-bar :elevation="0" class="px-3">
        <template v-slot:prepend>
          <v-btn
              color="primary"
              icon="mdi-arrow-left"
              :to="`/merchants/${$route.params.id}`"
          ></v-btn>
        </template>
        <v-app-bar-title class="text-primary">
          Menu Detail - {{ $route.params.menuId }}
        </v-app-bar-title>

        <template v-slot:append>
          <v-btn color="primary" icon="mdi-cart-outline"></v-btn>
        </template>
      </v-app-bar>

      <v-spacer class="my-4 py-3"></v-spacer>

      <banner-carousel :banners="banners" height="300px"></banner-carousel>

      <div class="py-3">
      <span class="text-h5 text-primary">
        {{ $route.params.menuId }}
      </span>
      </div>

      <v-card elevation="0" class="px-6 py-6" color="#5581B04D">
        <v-row class="d-flex justify-between">
          <p>Grilled Chicken with Apple</p>
          <v-spacer></v-spacer>
          <v-btn variant="tonal" rounded :icon="onClickAnimation ? 'mdi-check' : 'mdi-link-variant'" density="compact"
                 class="px-3"
                 :color="onClickAnimation ? 'green green-accent-3':'primary'"
                 @click="copyUrl">

          </v-btn>
        </v-row>

        <v-row class="mt-9">
          <span class="text-subtitle-1 font-weight-regular">
            13 $
          </span>
        </v-row>
      </v-card>

      <h4 class="mt-3">Description</h4>
      <p>Cras pellentesque fermentum magna, a gravida arcu enam aliquet sit amet. Orci varius natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus.</p>
    </v-container>
  </div>
</template>

<style></style>
