import { ref } from 'vue';

interface Merchant {
    name: string;
}

export function useGlobalStore() {
    const merchant = ref<Merchant | null>(null);

    function setMerchant(newUser: Merchant) {
        merchant.value = newUser;
    }

    return { merchant, setMerchant };
}
