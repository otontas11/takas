<template>
    <ion-page>
        <Header />
       

        <ion-segment :value="selectedTab" @ionChange="changeTab">
            <ion-segment-button :value="tab.value" v-for="(tab, tabKey) in tabs" :key="tabKey" @click=item(tab)>
                <ion-label>{{ tab.label }}</ion-label>
            </ion-segment-button>
        </ion-segment>
        <ion-content>
            <AllMessages v-if="selectedTab === 'all'" />
            <!-- <outGoingOffers v-if="selectedTab === 'to'" />
            <IncomingOffers v-if="selectedTab === 'from'" />  -->
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton } from '@ionic/vue';
import AllMessages from "../components/AllMessages.vue"
//import { useRoute, useRouter } from 'vue-router';
import IncomingOffers from '../components/IncomingOffers.vue';
import outGoingOffers from '../components/outGoingOffers.vue';

import { useRoute, useRouter } from "vue-router";
import { useMessageStore } from '@/stores/messageStore';
import messageCount from "@/services/messageCount";


import 'vue-toast-notification/dist/theme-sugar.css';
import { useToast } from 'vue-toast-notification';
const $toast = useToast();

import Header from "@/components/Header.vue";
import authApi from '@/services/authApi';
import { FetchMessageList } from '@/helpers/messageCount';
// Components

const route = useRoute();
const router = useRouter();

// Pages

// Data
const selectedTab = ref<string>('favorite-ads');
const tabs = ref<any[]>([
    // {
    //     value: 'all',
    //     label: 'Mesaj Kutum'
    // },
    // {
    //     value: 'from',
    //     label: 'Gelen Teklifler'
    // },
    // {
    //     value: 'to',
    //     label: 'Giden Teklifler'
    // }
]);



// Function
const changeTab = (e: any) => {
    selectedTab.value = e?.detail?.value;
    //console.log(e)
}

const item = (e: any) => {
    console.log(e)
}

watch(() => route.path, (newPath) => {
    if (newPath === '/messages') {
        selectedTab.value = 'all';
        messageCount.getMessageLength().then((res) => {
                console.log("mesaj sayısı", res.data);
                useMessageStore().setMessageCount(res.data);
                console.log(res.data);
            })
    }
});

const checkAuth = async () => {
    try {
        const response = await authApi.me();
        console.log(response.data); // Başarılı yanıt alındığında veriyi konsola yazdır
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            // 401 hatası alındığında giriş sayfasına yönlendir
            try {
                $toast.error('Oturumunuz sonlandırıldı giriş ekranına yönlendiriliyorsunuz.!', { position: 'top-right' });
                setTimeout(() => {
                    router.push('/login'); // Yönlendirme işlemini bekleyin
                }, 2000)
            } catch (routingError) {
                console.error('Yönlendirme hatası:', routingError);
            }
        } else {
            console.error('Auth API çağrısı sırasında bir hata oluştu:', error);
        }
    }
};



// OnMounted
onMounted(() => {
    messageCount.getMessageLength().then((res) => {
                console.log("mesaj sayısı", res.data);
                useMessageStore().setMessageCount(res.data);
                console.log(res.data);
            })
    selectedTab.value = 'all';
    checkAuth();
    // let user_code = ''
    // authApi.me().then(res => {
    //     user_code = res.data.user_code
    // }).then(() => {
    //     messageApi.getMessageList(user_code).then(res => {
    //     console.log(res)
    //     fromMessages.value = res.data
    // })
    // })

   



})
</script>

<style lang="scss" scoped>
ion-segment {
    --background: var(--white);

    ion-segment-button {
        --indicator-height: 4px;
        text-transform: none;
        letter-spacing: 0;
        font-family: var(--font-medium), sans-serif;
        color: var(--black);
        border-bottom: 1px solid #e9e9e9;
        border-radius: 0;

        ion-label {
            --margin-top: 8px;
            --margin-bottom: 8px;
        }
    }
}
</style>
