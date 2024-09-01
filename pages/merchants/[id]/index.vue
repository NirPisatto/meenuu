<script lang="ts">
import {defineComponent} from "vue";
import BannerCarousel from "~/components/merchant/banner-carousel.vue";
import SearchCard from "~/components/merchant/search-card.vue";
import BannerWindow from "~/components/merchant/banner-window.vue";
// import {supabase} from "~/utils/supabase";
// import {useGlobalStore} from "~/composables/useGlobalStore";

// import {createClient} from '@supabase/supabase-js'
// // // const config = useRuntimeConfig()
// const supabase = createClient('https://bslarolteafwcomkvyxx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzbGFyb2x0ZWFmd2NvbWt2eXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5NzMzMjMsImV4cCI6MjAzNTU0OTMyM30.WXPSObkaj1FF7tbFMlvo2_j5RFMzoKTprnJxavlbKVg')


export default defineComponent({
  name: "merchantDetailPage",
  components: {SearchCard, BannerCarousel, BannerWindow},
  setup() {
    definePageMeta({
      layout: "merchant",
    });
    const goTo = useGoTo()
    return {goTo}
  },
  props: {
    merchant: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isPageLoading: true,
      scrollTop: 0,
      scrollBlocker: false,
      selectedCategory: 0,
      banners: [],
      options: {
        duration: 300,
        easing: 'easeInOutCubic',
        offset: 0,
      },
    };
  },
  created() {
    // this.getMenuByMerchant()
  },
  mounted() {

    setTimeout(() => {
      this.selectedCategory = 0
    }, 2000);

    window.addEventListener('scroll', this.handleScroll);

    this.categories.forEach((item) => {
      const position = this.getOffsetById(`category_${item.id}`)
      item.top = <number>position?.top - 138
    })
  },
  unmounted() {
    // Remove scroll event listener when the component is destroyed
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    findIndex(arr: number[], current: number) {
      for (let i = 0; i < arr.length; i++) {
        if (current >= arr[i] && current < arr[i + 1]) {
          return i;
        }
      }
      return 0;
    },
    handleScroll() {
      if (this.scrollBlocker) return
      this.scrollTop = document.documentElement.scrollTop;
      this.selectedCategory = this.findIndex([...this.categories.map((item) => item.top), 100000], this.scrollTop)
    },
    go(id: string, index: number) {
      this.scrollBlocker = true
      setTimeout(() => {
        this.scrollBlocker = false
      }, 600)
      this.goTo(`#category_${id}`, {offset: -136, duration: 600, easing: 'easeInOutCubic'})
      this.selectedCategory = index
    },
    getOffsetById(id: string) {
      const item = document.getElementById(id)
      if (!item) return
      const rect = item.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      };
    }
  },
});
</script>

<template>
  <div>
    <div>
      <v-container>
        <v-app-bar :elevation="0" class="px-3" style="background-color: #FAFAFA">
          <template v-slot:prepend>
            <nuxt-link to="/" class="text-decoration-none">
              <v-avatar border="0">
                <v-img alt="merchant logo" :src="merchant.logo || '/images/logo.jpeg'"></v-img>
              </v-avatar>
            </nuxt-link>
          </template>
          <v-app-bar-title class="text-primary">
            {{ merchant.name_en || merchant.name_km || 'N/A' }}
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
      <v-col ref="categoryBtnContainer" id="category-btn-container" col="12"
             class="overflow-x-auto py-6 position-sticky cus-bg Flipped">
        <v-item-group selected-class="bg-primary" v-model="selectedCategory" class="px-3 Content">
          <v-row class="d-flex flex-row flex-nowrap">
            <div v-for="(item, index) in categories" :key="item.id">
              <v-item v-slot="{ isSelected, selectedClass, toggle }">
                <v-btn
                    :prepend-icon="item.icon"
                    size="large"
                    :color="isSelected ? 'primary' : 'grey'"
                    variant="outlined"
                    @click="go(item.id, index)"
                    class="mr-3 rounded-lg"
                >
                  {{ item.name_en }}
                </v-btn>
              </v-item>
            </div>
          </v-row>
        </v-item-group>
      </v-col>
      <div id="goto-container" v-for="category in categories" :key="category.id">

        <div :id="`category_${category.id}`" class="px-4">
          <p color="primary">{{ category.name_en }}</p>
        </div>
        <v-container class="pt-0">
          <v-row class="px-1 mt-0">
            <v-col
                cols="6"
                sm="4"
                md="4"
                lg="3"
                class="mb-0 px-2"
                v-for="(item,index) in category.menus"
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
                  data-aos-duration="400"
                  data-aos-easing="ease-in-out"
                  data-aos-once="true"
                  data-aos-mirror="false"
              >
                <div>
                  <v-img
                      :src="item.photo"
                      height="160px"
                      cover
                      class="rounded-lg"
                  ></v-img>

                  <v-card-subtitle class="text-caption px-0 mt-2 text-primary">
                    ID : {{ item.code }}
                  </v-card-subtitle>
                  <v-card-title class="text-h6 px-0 pt-0 font-weight-regular text-black text-wrap">
                    {{ item.name_en }}
                  </v-card-title>
                </div>

                <div class="px-3 my-3">
                  <v-row>
                  <span class="text-subtitle-1 font-weight-regular">
                    $ {{ item.price_en }} | R {{ item.price_kh }}
                  </span>
                  </v-row>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <div>

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
