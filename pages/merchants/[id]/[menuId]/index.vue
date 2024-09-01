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
  props: {
    menuProps: {
      type: Object,
      required: false,
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      isPageloading: true,
      onClickAnimation: false,
      selectedCategory: 0,
      menu: {},
      merchant: {
        name: "MeeNuu Demo Merchant",
      },
      banners: [],
    };
  },
  async created() {
    await this.getMenuById();
  },
  methods: {
    async getMenuById() {
      if (this.menuProps) {
        this.menu = this.menuProps;
        this.banners = [{src: this.menu?.photo}];
        return
      }
      const {data} = await useFetch(`/api/merchants/${this.$route.params.id}/${this.$route.params.menuId}`, {
        method: "GET",
      });
      // const {data} = await this.$supabase.from('shops').select('*,categories(*,menus(*))').eq('slug', this.$route.params.id)
      if (data.value) {
        this.menu = data.value[0]
        this.banners = [{src: this.menu?.photo}]
      }

      this.isPageloading = false;

    },
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
    }, handleGoBack() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.push(`/merchants/${this.$route.params.id}`);
      }
    },
  },
});
</script>

<template>

  <div v-if="!isPageloading">
    <div>
      <v-container>
        <v-app-bar :elevation="0" class="px-3">
          <template v-slot:prepend>
            <v-btn
                color="primary"
                icon="mdi-arrow-left"
                @click="handleGoBack"
            ></v-btn>
          </template>
          <v-app-bar-title class="text-primary">
            {{ menu.name_en }}
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
            <p>{{ menu.name_en }}</p>
            <v-spacer></v-spacer>
            <v-btn variant="tonal" rounded :icon="onClickAnimation ? 'mdi-check' : 'mdi-link-variant'" density="compact"
                   class="px-3"
                   :color="onClickAnimation ? 'green green-accent-3':'primary'"
                   @click="copyUrl">

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
          {{ menu.description_en }}
        </p>
      </v-container>
    </div>
  </div>
  <div v-else>
    <v-container content="center">
      <v-row justify="center" class="mt-16 pt-16">
        <v-progress-circular
            color="primary"
            model-value="20"
            :size="128"
            :width="12"
            indeterminate
        ></v-progress-circular>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
