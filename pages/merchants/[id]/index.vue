<script lang="ts">
import {defineComponent} from "vue";
import BannerCarousel from "~/components/merchant/banner-carousel.vue";
import SearchCard from "~/components/merchant/search-card.vue";
import BannerWindow from "~/components/merchant/banner-window.vue";

definePageMeta({
  layout: "merchant",
});

export default defineComponent({
  name: "merchantDetailPage",
  components: {SearchCard, BannerCarousel, BannerWindow},
  setup() {
    const goTo = useGoTo()
    return {goTo}
  },
  data() {
    return {
      selectedCategory: 0,
      merchant: {
        name: "MeeNuu Demo Merchant",
      },
      banners: [
        {src: "/images/demo_banner_img.jpeg"},
        {src: "/images/demo_banner_img.jpeg"},
        {src: "/images/demo_banner_img.jpeg"},
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
          name: "Menu Name Long Long",
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
      options: {
        duration: 300,
        easing: 'easeInOutCubic',
        offset: 0,
      }
    };
  },
  created() {
  },
  mounted() {
    setTimeout(() => {
      this.selectedCategory = 0
    }, 2000);
  },
  methods: {
    go(id: string, index: number) {
      this.goTo(`#category_${id}`, {offset: -136})
      this.selectedCategory = index
    }
  },
});
</script>

<template>
  <div>
    <v-container>
      <v-app-bar :elevation="0" class="px-3" style="background-color: #FAFAFA">
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

      <BannerWindow :banners="banners" height="120px"></BannerWindow>

      <search-card class="mt-3">
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
    </v-container>

    <v-col col="12" class="overflow-x-auto py-6 position-sticky cus-bg Flipped">
      <v-item-group selected-class="bg-primary" v-model="selectedCategory" class="px-3 Content">
        <v-row class="d-flex flex-row flex-nowrap">
          <div v-for="(item, index) in categories" :key="item.slug">
            <v-item v-slot="{ isSelected, selectedClass, toggle }">
              <v-btn
                  :prepend-icon="item.icon"
                  size="large"
                  :color="isSelected ? 'primary' : 'grey'"
                  variant="outlined"
                  @click="go(item.slug, index)"
                  class="mr-3 rounded-lg"
              >
                {{ item.label_en }}
              </v-btn>
            </v-item>
          </div>
        </v-row>
      </v-item-group>
    </v-col>

    <div id="goto-container" v-for="category in categories" :key="category.slug">

      <div :id="`category_${category.slug}`" class="px-4">
        <p color="primary">{{ category.label_en }}</p>
      </div>
      <v-container class="pt-0">
        <v-row class="px-1 mt-0">
          <v-col
              cols="6"
              sm="4"
              md="4"
              lg="3"
              class="mb-0 px-2"
              v-for="(item,index) in menues"
              :key="item.id"
          >
            <v-card
                :to="`/merchants/${$route.params.id}/${item.id}`"
                class="rounded-lg py-2 px-2 d-flex flex-column justify-space-between"
                style="height: 100%"
                variant="outlined"
                color="primary"
                data-aos="fade-up"
                data-aos-offset="0"
                :data-aos-delay="20*index"
                data-aos-duration="300"
                data-aos-easing="ease-in-out"
                data-aos-once="true"
                data-aos-mirror="false"
            >
              <div>
                <v-img
                    :src="item.image"
                    height="160px"
                    cover
                    class="rounded-lg"
                ></v-img>

                <v-card-subtitle class="text-caption px-0 mt-2 text-primary">
                  ID : {{ item.id }}
                </v-card-subtitle>
                <v-card-title class="text-h6 px-0 pt-0 font-weight-regular text-black text-wrap">
                  {{ item.name }}
                </v-card-title>
              </div>

              <div class="px-3 my-3">
                <v-row>
                  <span class="text-subtitle-1 font-weight-regular">
                    $ {{ item.price_en }} | R {{ item.price_km }}
                  </span>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style>
.cus-bg {
  background: rgb(255, 255, 255);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5130427170868348) 0%, rgba(250, 250, 250, 1) 16%);
  top: 64px;
  left: 0px;
  right: 0px;
  z-index: 20001;
}

.Flipped, .Flipped .Content {
  transform: rotateX(180deg);
  -ms-transform: rotateX(180deg); /* IE 9 */
  -webkit-transform: rotateX(180deg); /* Safari and Chrome */
}

</style>
