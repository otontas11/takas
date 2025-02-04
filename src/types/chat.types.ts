// latest_offer/from_to arraylarinin içinde City verii
export interface City {
    id: number;
    name: string;
    status: boolean;
    slug: string;
    lat: string;
    lng: string;
    sequence?: number;
    created_at?: string | null;
    elastic_id?: string | null;
    is_deleted: boolean;
    updated_at?: string | null;
}

// latest_offer/from_to arraylarinin içinde City verii
export interface District {
    id: number;
    name: string;
    status: boolean;
    slug: string;
    city_code: number;
    lat?: string;
    lng?: string;
    created_at?: string | null;
    elastic_id?: string | null;
    is_deleted: boolean;
    updated_at?: string | null;
}

// latest_offer/from_to arraylarinin içinde owner verisi
interface Owner {
    name: string;
    phone?: string;
    photo?: string | null;
    user_code: string;
    created_at?: string;
    updated_at?: string;
    product_code: string;
}

// latest_offer/from_to arraylerini tutar
interface ProductFromTo {
    city?: City;
    district?: District;
    name: string;
    image: string;
    owner?: Owner;
    product_code: string;
}

//lastest offer objesi {from:[],to:[],price:2 ....}
interface LatestOffer {
    to: ProductFromTo[];
    from: ProductFromTo[];
    price: string;
    message: string | null;
    currency: string;
    offer_type: string;
    swapStatus: boolean;
    meOwnerInfo?: Owner;
    offerStatus: boolean;
    productMessage?: string;
    targetOwnerInfo: Owner;
}

interface MessageData {
    message_code: string;
    _from: string;
    _to: string;
    latest_offer: LatestOffer;
    from_is_deleted: boolean;
    to_is_deleted: boolean;
    created_at: string;
    updated_at: string;
    show_case_image: string | null;
    unread_message: number;
}
