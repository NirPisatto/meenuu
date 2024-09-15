export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            welcome: 'Welcome',
            merchant: {
                find_your_favorite_food: 'Find your favorite food',
                search: 'Search'
            },
            'N/A': 'N/A',
            cart: 'Cart',
        },
        km: {
            welcome: 'សួស្តី',
            merchant: {
                find_your_favorite_food: 'ស្វែងរកអាហារដែលអ្នកចូលចិត្ត',
                search: 'ស្វែងរក'
            },
            'N/A': 'N/A',
            cart: 'រទេះ',
        }
    }
}))
