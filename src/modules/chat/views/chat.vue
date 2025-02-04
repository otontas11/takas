<template>
  <ion-page>
    <main-header/>

    <ion-content :scroll-y="false">
      <div class="chat">
        <chat-header :total-message-count=" chatMessageList.length"/>

        <div id="chat-container" class="chat-history">
          <ul id="chat-history">
            <loading-spinner v-if="isLoading"/>

            <template v-for="(message,index) in chatMessageList" :key="'ee-'+ index">
              <b>index: {{ index }} ---</b>
              <b>{{ chatMessageList.length }}</b>--

              <!--from- bana gelen mesajlar=>  message._from===myUserInfo.user_code-->
              <li v-if="message._from===myUserInfo.user_code" class="msg-info clearfix msg-from">
                <!--sadece mesajları goster teklif vs yok-->
                <div v-if="message.offer_detail?.message">
                  <chat-text-area :text="message.offer_detail.message" class="float-right" origin="from"/>
                </div>
                <!--resimli mesajlar veya teklifleriiçerir-->
                <div v-else>
                  <chat-offer-request-card :message="message" :price="message.offer_detail.price" origin="from">
                    <div class="accept-refuse-buttons-1">
                      <ion-button :disabled="isProcessing" expand="full"
                                  @click="sendOfferResponse({ offerType: 'new_offer', message })">
                        Yeni Teklif Ver
                      </ion-button>
                      <ion-button :disabled="isProcessing" expand="full"
                                  @click="sendOfferResponse({offerType:'cancel_offer', message})">
                        Teklifi İptal Et
                      </ion-button>
                    </div>
                  </chat-offer-request-card>
                </div>
              </li>


              <!--to- karsıya giden mesajlar-->
              <li v-else class="msg-info msg-to">
                <div v-if="message.offer_detail?.message">
                  <chat-text-area :text="message.offer_detail.message" origin="to"/>
                </div>
                <div v-else>
                  <chat-offer-request-card :message="message" :price="message.offer_detail.price" origin="to">
                    <div class="accept-refuse-buttons-2">
                      <ion-button expand="full" @click="sendOfferResponse({ offerType: 'accepted', message })"> Kabul
                        Et
                      </ion-button>
                      <ion-button expand="full" @click="sendOfferResponse({ offerType: 'rejected', message })"> Reddet
                      </ion-button>
                    </div>
                  </chat-offer-request-card>
                </div>
              </li>

              <li>{{selectedProduct}}</li>

            </template>
          </ul>
        </div>
        <div class="chat-message clearfix">
          <ion-grid>
            <ion-row>
              <ion-col size="10">
                <ion-textarea v-model="formData.offer_detail.message" fill="outline"
                              placeholder="Mesaj Yaz"></ion-textarea>
              </ion-col>
              <ion-col size="2">
                <ion-button @click="sendDirectMessage">Gönder</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>

        </div>
      </div>

      <offer-modal ref="offerModalRef" @open-modal="openBuyOrSwapModal"/>
      <buy-product-modal ref="buyProductModalRef" :product="selectedProduct"/>
      <compare-products-modal ref="compareProductsModalRef"/>
      <swap-products-modal ref="swapProductModalRef" :product="selectedProduct"/>

      <b> selectedProduct {{selectedProduct}}</b>

    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {IonContent, IonPage, IonButton, IonTextarea, IonGrid, IonRow, IonCol} from '@ionic/vue';
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/authStore";
import {useChat} from "@/modules/chat/useChat";

const {connectSocketConnection, cleanupSocketConnections, scrollToEnd, handleScroll, currentPage, isLoading} = useChat()

import ChatTextArea from "@/modules/chat/components/chat-text-area.vue";
import LoadingSpinner from "@/modules/chat/components/loading-spinner.vue";
import ChatHeader from "@/modules/chat/components/chat-header.vue";
import MainHeader from "@/components/Header.vue";
import ChatOfferRequestCard from "@/components/card/chat-offer-request-card/chat-offer-request-card.vue";
import OfferModal from "@/modules/chat/components/modal/offer-modal.vue";
import BuyProductModal from "@/modules/chat/components/modal/buy-product-modal.vue";
import CompareProductsModal from "@/modules/chat/components/modal/compare-products-modal.vue";
import SwapProductsModal from "@/modules/chat/components/modal/swap-products-modal.vue";

import messageApi from "@/services/messageApi";
import socket from "@/plugins/socket";
import api from '@/services/api';

const route = useRoute()
const authStore = useAuthStore();

const chatMessageList = ref<any[]>([]);
const myUserInfo = computed(() => authStore.user)
const toUserInfoId = ref('')
const selectedProduct = ref({})
const isProcessing = ref(false);

const offerModalRef = ref(null)
const compareProductsModalRef = ref(null)
const buyProductModalRef = ref(null)
const swapProductModalRef = ref(null)


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formData = ref<any>({
  message_code: route.params.id,
  _to: "",
  message: "test",
  offer_detail: {
    offer_type: "offer",
    price: "",
    message: "",
    productMessage: "",
    swapStatus: true,
    offerStatus: true,
    readStatus: false,
    currency: "TRY",
    from: [],
    to: [],
    // message: "test mesaji",
  },
  to_is_deleted: false
})

onMounted(() => {
  connectSocket()
  scrollToEnd()
  document.getElementById("chat-container")?.addEventListener("scroll", handleScroll);
})

onUnmounted(() => {
  cleanupSocketConnections()
  document.getElementById("chat-container")?.removeEventListener("scroll", handleScroll);
});

const connectSocket = () => {
  connectSocketConnection()

  //   mesajalrı getirir
  socket.on('messages', (messages) => {
    console.log("mesages list", messages)
    if (currentPage.value === 1) {
      chatMessageList.value = messages.reverse();
    } else {
      chatMessageList.value = [...messages.reverse(), ...chatMessageList.value];
    }
    setUserIds(chatMessageList.value[0]);
  });

  // yeni mesajları getirir -  notification
  socket.on('new_message', (newMessage) => {
    console.log("new message", newMessage[0])
    chatMessageList.value.push(newMessage[0]);
    scrollToEnd()
  });

  // güncellenene mesajlar
  socket.on('latest_messages', (newMessage) => {
    console.log("  dinleme - guncelleme", newMessage)
  });

  socket.on('roomJoined', (data) => {
    console.log('Odaya başarıyla  katıldınız:', data);
  });

  socket.on('connect_error', (err) => {
    console.log('Bağlantı hatası :', err.message);
  });
};

const sendOfferResponse = async (params: { offerType: string; message: any }) => {
  const {offerType, message} = params;
  console.log("offerType",offerType)


  isProcessing.value = true;

  selectedProduct.value = message

  console.log("selectedProduct", selectedProduct.value)

  try {
    if (offerType === 'cancel_offer') {
      //teklifi iptal et
      const updateData = {
        ...message,
        _to: toUserInfoId.value,
        offer_detail: {
          ...message.offer_detail,
          offer_action: 'cancel_offer',
          offer_response: "Teklif İptal Edildi  .sd.ddsd.. ?",
        }
      };

      const res = await api.put('message-detail', updateData)

      if (res) {
        //await updateChangedMessage({message: res?.data})
        // socket i bekle
      }

    } else if (offerType === 'rejected') {
      //teklifi reddet
      const updateData = {
        ...message,
        _to: toUserInfoId.value,
        offer_detail: {
          ...message.offer_detail,
          offer_action: 'rejected',
          offer_response: "Teklif Red Edildi",
        }
      };

      await api.put('message-detail', updateData)

    } else if (offerType === 'new_offer') {

      offerModalRef.value?.openModal()
    }
  } catch (e) {
    console.error("hata", e)
  } finally {
    setTimeout(() => {
      isProcessing.value = false;
    }, 500)
  }
}

const setUserIds = (msg) => {
  //amac ilk mesajı gönderen kişiyi bulup _to-id degerini bulmak , to id degeri zorunlu alan
  if (msg._from === myUserInfo.value.user_code) {
    toUserInfoId.value = msg._to
  } else {
    toUserInfoId.value = msg._from
  }
}

const sendDirectMessage = async () => {
  const directMessageData = {
    ...formData.value,
    _to: toUserInfoId.value,
    offer_detail: {
      ...formData.value.offer_detail,
      offer_type: "request"
    }
  }

  try {
    const res = await messageApi.sendSingleMessage(directMessageData);
    formData.value.offer_detail.message = "";

  } catch (e) {
    console.error("Mesaj gönderme hatası:", e);
  }
  await scrollToEnd()
}

const openBuyOrSwapModal = (item) => {
  if (item.type === 'buy') {
    console.log("içerde")
    buyProductModalRef.value?.openModal()
  }else if(item.type==='swap'){
    swapProductModalRef.value?.openModal()
  }
}

const updateChangedMessage = async ({message}) => {

  const index = chatMessageList.value.findIndex(
      (msg) => msg.message_detail_code === message.message_detail_code
  );

  if (index !== -1) {
    // bul ve chatMessageList içinde guncelle
    chatMessageList.value[index] = {...chatMessageList.value[index], ...message};

  } else {
    console.warn("Güncellenen mesaj listede bulunamadı.");
  }
};


</script>

<style lang="scss" src="./chat-page.scss">

</style>
