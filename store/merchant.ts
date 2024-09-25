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
        showCart: boolean,
        showPlaceOrder: boolean,
        note: string,
        isOrdering: boolean,
        customer: string
    } => ({
        menus: [],
        merchant: null,
        categories: [],
        currentMenu: null,
        isLoading: true,
        isError: false,
        carts: [],
        showCart: false,
        showPlaceOrder: false,
        note: '',
        isOrdering: false,
        customer: ''
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
        handleCleanCart() {
            this.carts = [...this.carts.filter(cart => cart.quantity > 0)]
        },
        addToCart(item: CartItem) {
            const cartItem = this.carts.find(cart => cart.menu_id === item.menu_id)
            if (cartItem) {
                cartItem.quantity = item.quantity + cartItem.quantity
            } else {
                this.carts.push(item)
            }
        },
        removeFromCart(item: CartItem) {
            const cartItem = this.carts.find(cart => cart.menu_id === item.menu_id)
            if (cartItem) {
                cartItem.quantity = cartItem.quantity - item.quantity
                if (cartItem.quantity <= 0) {
                    this.carts = this.carts.filter(cart => cart.menu_id !== item.menu_id)
                }
            }
        },
        showCartModal() {
            this.showCart = true
        },
        hideCartModal() {
            this.showCart = false
        },
        showPlaceOrderModel() {
            this.showPlaceOrder = true
        },
        hidePlaceOrderModel() {
            this.showPlaceOrder = false
        },
        async placeOrder() {
            this.isOrdering = true
            const {$supabase} = useNuxtApp();
            // Insert data into the 'orders' table

            const {data: orderData, error: orderError} = await $supabase
                .from('orders')
                .insert({
                    created_by: 1, // Assuming user_id is created_by in your schema
                    status: 'new', // Default status from the table
                    remark: this.note,  // Can be passed if needed
                    qty: this.carts.length, // Summing up the qty from cart items
                })
                .select(); // Retrieve the inserted order

            if (orderError) {
                console.error('Error inserting order:', orderError);
                return;
            }

            const orderId = orderData[0].id;

            // Insert cart items into 'order_items' table
            const orderItemsData = this.carts.map(item => ({
                menu_id: item.menu_id, // Assuming menu_id corresponds to items in the cart
                order_id: orderId,
                qty: item.quantity,
            }));

            const {data: itemsData, error: itemsError} = await $supabase
                .from('order_items')
                .insert(orderItemsData);

            if (itemsError) {
                console.error('Error inserting order items:', itemsError);
            } else {
                this.showPlaceOrder = false;
                this.showCart = false;
                if (!this.merchant?.order_telegram) {
                    this.isOrdering = false
                    this.carts = [];
                    this.note = '';
                    return;
                }
                ;

                fetch("https://jlyb4i.buildship.run/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        message: this.formatCartItemsForTelegram(),
                        // cID: this.merchant?.order_telegram
                        cID: '-4240441355'
                    })
                }).then(() => {
                    console.log('API called without waiting for response');
                }).catch((err) => {
                    console.error('Error calling external API:', err);
                }).finally(() => {
                    this.carts = [];
                    this.note = '';
                    this.isOrdering = false
                });
            }
        },
        formatCartItemsForTelegram(): string {
            const date = new Date().toLocaleString();  // Includes time
            const customerId = this.customer;  // Example customer ID
            const transactionId = 3;         // Example transaction ID
            let totalItems = 0;
            let totalAmount = 0;

            // Using manual padding and alignment
            let message = `
<b>Order Summary:</b>
${date}
<b>Customer:</b> ${customerId}
<b>T/L:</b> ${transactionId}\n
Qty  Desc                    Amt
------------------------------------------
`;

            // Loop through cart items
            this.carts.forEach((item) => {
                const itemName = item.item.name_en;
                const quantity = item.quantity;
                const price = 1;
                const amount = quantity * price;

                totalItems += quantity;
                totalAmount += amount;

                // Format each item without <pre>, adjusting spaces manually
                const formattedItem = `${quantity}\t${itemName}\t$${amount.toFixed(2)}`;
                message += `${formattedItem}\n`;
            });

            // Add total and note
            message += `
------------------------------------------
Total:  ${totalItems}                   $${totalAmount.toFixed(2)}\n
<b>Note:</b> ${this.note || 'No note provided'}
`;

            return message;
        }
    }
})
