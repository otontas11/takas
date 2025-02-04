<template>
    <ion-page>
        <Header />
        <PageHeader title="İlanlarım">
            <template #start-action>
                <ion-button class="back-button" @click="handleGoToBack()">
                    <ion-icon slot="icon-only" :icon="chevronBackOutline" />
                </ion-button>
            </template>
        </PageHeader>
        <ion-content class="ion-padding">
            <template v-if="myProductsLoading">
                <ion-card v-for="i in 3" :key="i">
                    <div class="card-left">
                        <ion-skeleton-text :animated="true" class="image" />
                    </div>
                    <div class="card-right">
                        <ion-skeleton-text :animated="true" />
                        <ion-skeleton-text :animated="true" />
                        <ion-skeleton-text :animated="true" />
                        <ion-skeleton-text :animated="true" />
                        <ion-skeleton-text :animated="true" />
                    </div>
                </ion-card>
            </template>
            <template v-else>
                <ion-searchbar show-cancel-button="never" placeholder="Marka, ürün adı, kategori arayın"
                    v-model="searchValue" />
                <ion-card v-for="(productItem, productKey) in computedMyProducts()" :key="productKey">
                    <div class="card-left">
                        <template v-if="productItem?.product?.showcase_image">
                            <img
                                :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + productItem.product.showcase_image" />
                        </template>
                        <template v-else>
                            <img src="@/assets/no-avatar.png">
                        </template>
                    </div>
                    <div class="card-right">
                        <ion-card-title class="is-font-bold">
                            {{ productItem?.product?.name }}
                        </ion-card-title>
                        <ion-card-title>Fiyat: {{ productItem?.product?.price ?? 0 }}</ion-card-title>
                        <!-- <ion-card-title>Favorileme: {{ productItem?.product?.favorite_count ?? 0 }}</ion-card-title> -->
                        <ion-button size="small" shape="round" @click="buyDoping(productItem)">
                            İlan Seç
                        </ion-button>
                    </div>
                </ion-card>
            </template>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import { IonButton, IonCard, IonCardTitle, IonContent, IonIcon, IonPage, IonSearchbar, IonSkeletonText } from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';

import { useDopingStore } from "@/stores/dopingStore";
import { usePaymentStore } from '@/stores/paymentToken';
import { useProductsStore } from '@/stores/productsStore';
import dopingApi from '@/services/dopingApi';
const paymentToken = usePaymentStore()
const dopingStore = useDopingStore();

// Components
import Header from "@/components/Header.vue";
import PageHeader from "@/components/page/PageHeader.vue";

// Services
import productApi from "@/services/productApi";

// Other
const router = useRouter();

// Data
const myProductsLoading = ref<boolean>(false);
const myProducts = ref<any[]>([]);
const searchValue = ref<string>('');



// Function
const handleGoToBack = () => {
    //router.push({name: 'dopings'})
    console.log("sdfsdf", myProducts.value)
}
const getProductions = () => {
    myProductsLoading.value = true;
    return productApi.myProducts()
        .then((res: any) => {
            myProducts.value = res?.data?.products ?? [];
            console.log("myProducts", myProducts.value)
        })

        .finally(() => {
            myProductsLoading.value = false;
        })
}






const generateRandomString = (length: any) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};




const buyDoping = async (e: any) => {
    const randomString = generateRandomString(32);
    paymentToken.setCreatedOrderByDoping(randomString);

    try {
        // LocalStorage'dan selectedPeriods array'ini alıyoruz
        const selectedPeriods = JSON.parse(localStorage.getItem('selected-dopings') || '[]');
        
        // Dopings için gerekli formatta veriyi oluşturuyoruz
        const dopings = selectedPeriods.map((item: any) => ({
            price: item.selectedPeriod.price,
            title: item.title,
            doping_code: item.doping_code,
            time: item.selectedPeriod.time
        }));

        const orderResponse = await dopingApi.createOrderCode(e.product_code);
        const orderCode = orderResponse.data.order_code;

        // API'ye dopings verisini gönderiyoruz
        const dopingResponse = await dopingApi.createProductDopings({
            order_code: orderCode,
            dopings,
        });

        paymentToken.setCreatedProductDoping(dopingResponse.data.token);

        // Ödeme sayfasına yönlendirme (isteğe bağlı)
         router.push({ name: 'doping-payment', params: { code: e.product_code } });
    } catch (error) {
        console.error("Hata oluştu:", error);
    }
};





// Computed
const computedMyProducts = () => {
    if (searchValue.value) {
        return myProducts.value.filter((item) => {
            return item?.product?.name.toLowerCase().includes(searchValue?.value?.toLowerCase())
        })
    }
    return myProducts.value
}

// On Mounted
onMounted(() => {
    getProductions();
    console.log("sdfsdf", myProducts.value)
})
</script>

<style lang="scss" scoped>
ion-button.back-button {
    --background: transparent;
    --background-hover: red;
    --box-shadow: none;
    --border-width: 0px;

    ion-icon {
        color: var(--primary);
    }
}


ion-button {
    text-transform: none;
    --padding-start: 20px;
    --padding-end: 20px;
    font-size: 14px;
}

ion-searchbar {
    padding-left: 10px;
    padding-right: 10px;
    --border-radius: 20px;
    --box-shadow: none;
    --background: var(--primary-gray);
}

ion-card {
    display: grid;
    grid-template-columns: 2fr 3fr;
    padding: 20px 20px 20px 20px;
    background: var(--primary-gray);
    border-radius: var(--border-radius-large);
    box-shadow: none;
    gap: 20px;
    align-items: center;

    .card-left {
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--border-radius-large);
        }

        ion-skeleton-text.image {
            width: 100%;
            height: 140px;
            border-radius: var(--border-radius-large);
        }
    }

    .card-right {
        ion-card-title {
            font-size: 15px;
            margin-bottom: 5px;
        }

        ion-skeleton-text {
            border-radius: var(--border-radius);
            height: 20px;
            margin-bottom: 5px;

            &:nth-child(1) {
                width: 60%;
            }

            &:nth-child(2) {
                width: 50%;
            }

            &:nth-child(3) {
                width: 50%;
            }

            &:nth-child(5) {
                border-radius: 20px;
                width: 100px;
                height: 30px;
            }
        }

        .card-action {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }
}
</style>
