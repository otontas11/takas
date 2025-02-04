<template>
    <ion-page>

        <ion-content class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>

            <ion-row>
                <ion-col size="12" v-for="item in userAdsList">
                    <ion-row>
                        <ion-col size="8" style="display: flex; align-items: center; justify-content: flex-start;">
                            <img :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + (item.product?.showcase_image.replace('240', 'original'))"
                                style="width: 30%; height: 80px; border-radius: 8px; object-fit: contain;" />
                            <p style="margin-left: 10px; font-size: 13px;">{{ item.product?.name }}</p>
                        </ion-col>
                        <ion-col size="4" style="display: flex; align-items: center; justify-content: center;">
                            <ion-button @click="buyDoping(item.product)" style="height: 5px; ">Öne Çıkar</ion-button>
                        </ion-col>
                    </ion-row>
                    <ion-col size="12" style="width: 100%; display: block;">
                        <p style="margin: 10px; display: flex; flex-direction: column; font-size: 12px;"
                            v-for="doping in item.product?.doping" :key="doping.doping_code">
                            <span style="color: black;">Kalan Süre: UNDEFİNED Gün</span>
                            <span style="color: purple; font-size: 12px;">{{ doping.title }}</span>
                        </p>
                    </ion-col>

                </ion-col>
            </ion-row>

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { usePaymentStore } from '@/stores/paymentToken';
import { IonRefresher, IonRefresherContent } from '@ionic/vue';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";
import messageCount from "@/services/messageCount";
import { useMessageStore } from "@/stores/messageStore";
import { IonButton, IonCard, IonCardTitle, IonContent, IonPage } from '@ionic/vue';
import productApi from '@/services/productApi';
import { useProductsStore } from '@/stores/productsStore';


// CSS
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';

// Data
const userAdsList = ref<any[]>([]);


//other
const route = useRoute()
const router = useRouter();
const paymentToken = usePaymentStore()


const loadUserData = () => {
    productApi.myProducts().then(res => {
    const dopingList = res.data.doping;

    // Doping bilgisi olan ürünleri filtreliyoruz
    userAdsList.value = res.data.products
        .map((product: { product_code: any; product: any }) => {
            const dopingForProduct = dopingList.filter((dopingItem: { product_code: any }) =>
                product.product_code === dopingItem.product_code
            );

            // Eğer doping varsa ürüne ekle, yoksa null döndür
            if (dopingForProduct.length > 0) {
                return {
                    ...product,
                    product: {
                        ...product.product,
                        doping: dopingForProduct,
                    },
                };
            }
            return null; // Dopingsiz ürünleri elemek için
        })
        .filter((product: null) => product !== null); // Sadece null olmayanları tut
});

};

const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
        (event.target as HTMLIonRefresherElement).complete();
        productApi.myProducts().then(res => {
            userAdsList.value = res.data.products
            console.log(res.data)
        })
    }, 2000)
}



const generateRandomString = (length: any) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const buyDoping = (e: any) => {
    // 32 karakterlik rastgele string oluştur
    const randomString = generateRandomString(32);

    // e.order_code yerine randomString kullan
    useProductsStore().lastCreatedProduct = e;
    paymentToken.setCreatedOrderByDoping(randomString);
    router.push({ name: 'doping-select-plan', params: { code: e.product_code } });
};

watch(
    () => route.path, // route.path dinleniyor
    (newPath) => {
        if (newPath === '/my-ads') {
            messageCount.getMessageLength().then((res) => {
                useMessageStore().setMessageCount(res.data);
                console.log(res.data);
                loadUserData();
            });
            loadUserData();
            
        }
    }
);





onMounted(() => {
    productApi.myProducts().then(res => {
    const dopingList = res.data.doping;

    // Doping bilgisi olan ürünleri filtreliyoruz
    userAdsList.value = res.data.products
        .map((product: { product_code: any; product: any }) => {
            const dopingForProduct = dopingList.filter((dopingItem: { product_code: any }) =>
                product.product_code === dopingItem.product_code
            );

            // Eğer doping varsa ürüne ekle, yoksa null döndür
            if (dopingForProduct.length > 0) {
                return {
                    ...product,
                    product: {
                        ...product.product,
                        doping: dopingForProduct,
                    },
                };
            }
            return null; // Dopingsiz ürünleri elemek için
        })
        .filter((product: null) => product !== null); // Sadece null olmayanları tut
});

})
</script>


























<style lang="scss" scoped>
ion-button {
    text-transform: none;
    --padding-start: 20px;
    --padding-end: 20px;
    font-size: 14px;
}

.text-danger {
    background-color: rgb(241, 241, 241);
    opacity: 0.5;
}

.text-success {
    color: green;
    font-weight: bold;
}



ion-searchbar {
    padding-left: 10px;
    padding-right: 10px;
    --border-radius: 20px;
    --box-shadow: none;
    --background: var(--primary-gray);
    padding-top: 0;
    padding-bottom: 10px;
    min-height: 40px;
}

ion-card {
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 0px 10px 0px 10px;
    background: var(--primary-gray);
    border-radius: var(--border-radius-large);
    box-shadow: none;
    gap: 10;
    margin: 0 10px 10px 10px;

    .card-left {

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--border-radius-large);
            max-height: 111px;
            margin-top: 10px;
        }

        ion-skeleton-text.image {
            width: 100%;
            height: 140px;
            border-radius: var(--border-radius-large);
        }
    }

    .card-right {
        padding: 10px 0;

        ion-card-title {
            font-size: 15px;
            margin-bottom: 5px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            width: calc(100% - 36px);
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

ion-button span {
    text-wrap: nowrap;
}




ion-modal#product-detail-modal-notif {
    --width: 300px;
    --height: fit-content;
    --border-radius: 40px;

    --overflow: visible;
    --background: none;


    .wrapper {

        width: 300px;
        height: 450px;
        border-radius: 40px;
        background-color: white;

        img {

            margin-right: 10px;
            width: 300px;
        }

        #btn {
            --background: #d7d2d2;
            --color: var(--black);
            --padding-top: 15px;
            --padding-bottom: 15px;
            --padding-start: 60px;
            --padding-end: 60px;
            --border-radius: 30px;
            --box-shadow: none;
            font-family: var(--font-bold), sans-serif;
            font-size: 16px;
        }
    }
}
</style>