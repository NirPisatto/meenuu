import {defineStore} from 'pinia'
import {useNuxtApp} from '#app';
import type {MenuItem, Merchant, Category} from "~/types";


export const useMenuStore = defineStore("menu", {
    state: (): {
        menus: MenuItem[];
        merchant: Merchant | null;
        categories: Category[];
        isLoading: boolean,
        isError: boolean
    } => ({
        menus: [],
        merchant: null,
        categories: [],
        isLoading: true,
        isError: false
    }),
    getters: {
        allMenus: (state) => state.menus,
        getMerchant: (state) => state.merchant,
        getIsLoading: (state) => state.isLoading,
        getBanners: (state) => [{src: state.merchant?.promotion_banner}],
    },
    actions: {
        async fetchData(merchantSlug: string) {
            this.isLoading = true
            const {$supabase} = useNuxtApp();

            const {data, error} = await $supabase.from('shops')
                .select('*,categories(*,menus(*))')
                .eq('slug', merchantSlug);
            if (error) {
                this.isError = true
                console.error('Error fetching users:', error)
            } else {
                this.merchant = data[0]
                this.categories = data?.map((shop: any) => shop.categories).flat(1)
                this.menus = data?.map((shop: any) => shop.categories.map((category: any) => category.menus)).flat(2)

                this.isLoading = false
            }
        },
    }
})
