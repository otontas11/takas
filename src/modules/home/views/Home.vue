<template>
    <ion-page>
        <Header showSearchBar />
        <ion-content class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>

            <!-- Slider İçeriği -->
            <template v-if="sliderLoading">
                <ion-skeleton-text class="slider-loading" :animated="true" />
            </template>
            <template v-else>
                <swiper class="m-b-5">
                    <swiper-slide>
                        <img src="../assets/banner/1.png" class="swiper-slide-image">
                    </swiper-slide>
                    <swiper-slide @click="router.push('/categories')">
                        <img src="../assets/banner/1.png" class="swiper-slide-image">
                    </swiper-slide>
                </swiper>
            </template>

            <!-- Ürün Kartları -->
            <div class="products-wrapper m-t-10">
              <template v-for="(product, productKey) in products"  :key="productKey" >
                <ProductCard :product="product"/>
              </template>
            </div>

            <!-- Sonsuz Kaydırma -->
            <ion-infinite-scroll @ionInfinite="getMoreProduct">
                <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
    </ion-page>
</template>


<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonButton, IonRefresher, IonRefresherContent, IonModal, IonLabel, IonSkeletonText } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import notification from "@/services/notification";
import { useMessageStore } from "@/stores/messageStore";
import { useNotificationStore } from "@/stores/notificationCount";

import { useBreadCrumbStore } from "@/stores/breadCrumb";
//BreadCrumb store
const BreadCrumb = useBreadCrumbStore()

import messageCount from "@/services/messageCount";

// CSS
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';

// Components
import Header from "@/components/Header.vue";
import ProductCard from "@/modules/product/components/ProductCard.vue";
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();

// Services
import productApi from "@/services/productApi";
import sliderApi from "@/services/sliderApi";

// Other
import router from "@/router";

// Data
const currentPage = ref<number>(1);
const totalPage = ref<number>(1);
const sliders = ref<any[]>([]);
const sliderLoading = ref<boolean>(false);
const products = ref<any[]>([]);
const productsLoading = ref<boolean>(false);
const loading = ref(false);
const lastPage=ref(null)

// Functions
const getSliders = () => {
    sliderLoading.value = true;
    sliders.value = [];
    return sliderApi.homepageSlider('1')
        .then((res: any) => {
            const responseData: any[] = res?.data ?? null;
            //  console.log(responseData)
        })
        .finally(() => {
            setTimeout(() => {
                sliderLoading.value = false;
            }, 1000)

        })
}

const getProducts = async (page: number = 1) => {
    try {
      productsLoading.value = true;
      const productList = await productApi.getMoreProduct(page);
      const { data: responseData = [], last_page, current_page } = productList?.data ?? {};
      lastPage.value=last_page

      console.log("productList",productList)

      if (responseData.length) {
        // Yeni ürünleri ekle ve sıralamayı düzelt
        products.value = [...products.value, ...responseData];
      }

        // Sayfa ve toplam sayfa bilgilerini güncelle
        totalPage.value =  last_page ?? 1;

        // İkinci API isteği: Doping showcase ürünlerini almak
        const dopingProducts = await productApi.getProductDopingShowcase();
        const newShowcaseProducts = dopingProducts?.data ?? [];

        if(newShowcaseProducts.length){
          // Mevcut ürünlerden tekrar edenleri filtrele
          const filteredExistingProducts = products.value.filter(existingProduct =>
              !newShowcaseProducts.some((newProduct: { product_code: any }) =>
                  newProduct.product_code === existingProduct.product_code
              )
          );
          // Yeni ürünleri en başa ekle
          products.value = [...newShowcaseProducts, ...filteredExistingProducts];
        }



    } catch (error) {
        console.error("Veri çekme hatası:", error);
    } finally {
        productsLoading.value = false;
    }
};

const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
        // Any calls to load data go here
        (event.target as HTMLIonRefresherElement).complete();
        getSliders();
        currentPage.value = 1;
        getProducts(currentPage.value)
    }, 2000);
};

const getMoreProduct = (event: any) => {

    loading.value = true;
    if(currentPage.value=== (lastPage.value)){
      currentPage.value = 1
    }else {
      currentPage.value =currentPage.value+ 1
    }

    getProducts(currentPage.value)
        .then((newProducts) => {
            // Yeni ürünleri ekleyin
        })
        .catch((error) => {
            console.error("Veri yükleme hatası:", error);
        })
        .finally(() => {
            loading.value = false;
            event.target.complete();
        });
};

watch(() => route.path, (newPath) => {
    // meProduct.value = [];
    // targetProduct.value = [];
    if (newPath === '/') {
        getProducts(currentPage.value)
        // FetchMessageList()
        // FetchMessageList().then(() => {
        //     console.log("Mesaj listesi başarıyla alındı.");
        // }).catch(error => {
        //     console.error("Mesaj listesi alınırken hata oluştu:", error);
        // });

        messageCount.getMessageLength().then((res) => {

        useMessageStore().setMessageCount(res.data)
    })

        if (localStorage.getItem('success-alert')) {
            setTimeout(() => {
                isFirstModalOpen.value = true;
                localStorage.removeItem('success-alert');
            }, 1500);
        }

        BreadCrumb.breadCrumbs = []
    }
});

const isFirstModalOpen = ref<boolean>(false);

// On Mounted
onMounted(() => {
  if (currentPage.value === 1) {
    products.value = [];
  }

  getProducts(currentPage.value)

    messageCount.getMessageLength().then((res) => {
        useMessageStore().setMessageCount(res.data)
    })

    notification.getNotificationCount().then((res) => {
        useNotificationStore().setNotificationsCount(res.data)
    })



    if ((window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    }

    if (localStorage.getItem('success-alert')) {
        setTimeout(() => {
            isFirstModalOpen.value = true;
            localStorage.removeItem('success-alert');
        }, 1500);
    }

    // Script yüklendikten sonra reklamı tetikleme
    if (localStorage.getItem('success-alert')) {
        setTimeout(() => {
            isFirstModalOpen.value = true;

            // İşlem bitiminde localStorage'daki veriyi sıfırla
            localStorage.removeItem('success-alert');
        }, 1500);
    }
    BreadCrumb.breadCrumbs = []
    getSliders()

})
</script>

<style lang="scss" scoped>
.swiper-slide-image {
    border-radius: 20px;
    cursor: pointer;
}

.slider-loading {
    border-radius: 20px;
    width: 100%;
    height: 140px;
}

ion-modal#product-detail-modal-alert {
    --width: 350px;
    --height: fit-content;
    --border-radius: 30px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
    --overflow: visible;

    .wrapper {
        padding: 0px 0px 0px 0px;

        .modal-close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 20003;
            cursor: pointer;
            height: 32px;
            width: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .label1 {
            font-size: 14px;
            font-family: var(--font-medium), sans-serif;
            text-align: center;
            line-height: 18px;
            margin-bottom: 10px;
        }

        .label2 {
            font-size: 18px;
            font-family: var(--font-bold), sans-serif;
            margin-bottom: 20px;
            text-align: center;
        }

        ion-button {
            --background: #901B6A;
            color: white;
            margin-bottom: 20px;
            --padding-top: 10px;
            --padding-bottom: 10px;
            --padding-start: 60px;
            --padding-end: 60px;
            --border-radius: 10px;
            --box-shadow: none;
            font-family: var(--font-bold), sans-serif;
            font-size: 16px;
        }
    }
}
</style>