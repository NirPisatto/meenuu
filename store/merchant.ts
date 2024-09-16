import {defineStore} from 'pinia'
import {useNuxtApp} from '#app';
import type {MenuItem, Merchant, Category, CartItem} from "~/types";


export const useMenuStore = defineStore("menu", {
    state: (): {
        menus: MenuItem[],
        merchant: Merchant | null,
        categories: Category[],
        currentMenu: MenuItem | null,
        isLoading: boolean,
        isError: boolean,
        carts: CartItem[],
        showCart: boolean
    } => ({
        menus: [],
        merchant: null,
        categories: [],
        currentMenu: null,
        isLoading: true,
        isError: false,
        carts: [],
        showCart: false
    }),
    getters: {
        allMenus: (state) => state.menus,
        getMerchant: (state) => state.merchant,
        getIsLoading: (state) => state.isLoading,
        getBanners: (state) => [{src: state.merchant?.promotion_banner}],
    },
    actions: {
        async fetchMenu(menuId: string) {
            this.isLoading = true
            const {$supabase} = useNuxtApp();

            const {data, error} = await $supabase
                .from('menus')
                .select('*')
                .eq('id', menuId);

            if (error) {
                this.isError = true
                console.error('Error fetching users:', error)
            } else {
                this.menus = data
                this.currentMenu = data[0]
                this.isLoading = false
            }

        },
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
        setCurrentMenu(menu: MenuItem) {
            this.currentMenu = menu
        },
        addToCart(item: CartItem){
            const cartItem = this.carts.find(cart => cart.menu_id === item.menu_id)
            if (cartItem) {
                cartItem.quantity = item.quantity + cartItem.quantity
            } else {
                this.carts.push(item)
            }
        },
        removeFromCart(item: CartItem){
            const cartItem = this.carts.find(cart => cart.menu_id === item.menu_id)
            if (cartItem) {
                cartItem.quantity = cartItem.quantity - item.quantity
                if (cartItem.quantity <= 0) {
                    this.carts = this.carts.filter(cart => cart.menu_id !== item.menu_id)
                }
            }
        },
        showCartModal(){
            this.showCart = true
        },
        hideCartModal(){
            this.showCart = false
        }
    }
})
