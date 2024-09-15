// Type for menu items
interface MenuItem {
    id: number;
    code: string | null;
    tags: string | null;
    photo: string;
    name_en: string;
    name_kh: string | null;
    price_en: string;
    price_kh: string;
    created_at: string;
    updated_at: string;
    category_id: number;
    description_en: string;
    description_kh: string;
}

// Type for categories
interface Category {
    id: number;
    icon: string | null;
    menus: MenuItem[];
    name_en: string;
    name_kh: string | null;
    shop_id: number;
    created_at: string;
    updated_at: string;
}

// Type for the main shop data
interface Merchant {
    id: number;
    name_en: string;
    name_kh: string | null;
    intro_en: string;
    intro_kh: string | null;
    logo: string;
    slug: string;
    lat: number | null;
    log: number | null;
    contact: string;
    phone: string;
    allow_order: boolean;
    allow_item: number;
    created_at: string;
    updated_at: string;
    promotion_banner: string;
    qr: string;
    order_telegram: string | null;
    categories: Category[];
}

interface CartItem {
    menu_id: number;
    quantity: number;
    item: MenuItem;
}

export type {MenuItem, Category, Merchant, CartItem};