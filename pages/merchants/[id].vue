<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "maerchants",
  data() {
    return {
      merchant: {},
      categories: [],
      banners: [],
      menu: {"id": 3},
      isPageLoading: true,
    }
  },
  async created() {
    await this.getMenuByMerchant()
  },
  methods: {
    async getMenuByMerchant() {
      const {data} = await useFetch(`/api/merchants/${this.$route.params.id}`, {
        method: "GET",
      });
      // const {data} = await this.$supabase.from('shops').select('*,categories(*,menus(*))').eq('slug', this.$route.params.id)
      if (data.value) {
        const merchant = data.value[0]
        this.merchant = merchant
        this.banners = [{src: merchant?.promotion_banner}]
        this.categories = merchant.categories
      }
      this.isPageLoading = false
    },
  },
})
</script>

<template>
  <div>
    <NuxtPage :merchant="merchant" :categories="categories" :isPageLoading="isPageLoading" :banners="banners" />
  </div>
</template>

<style scoped>

</style>