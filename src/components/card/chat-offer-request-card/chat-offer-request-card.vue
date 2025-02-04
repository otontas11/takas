<template>
  <div class="chat-offer-request-card">
    <ion-grid>

      <!--resimleri gosterme alanı - from to içinde resimler var-->
      <ion-row v-if="messageDetail.offer_detail.from.length||messageDetail.offer_detail.to.length"
               :class="isFrom?'from-user-img':'to-user-img'"
               class="offer-images-area">
        <ion-col size="5">
          <chat-swiper v-if="messageDetail.offer_detail.from.length" :offer-data="messageDetail.offer_detail.from"/>
        </ion-col>
        <ion-col class="direction-icon" size="2">
          <ion-img :src="directionImg" alt=""/>
        </ion-col>
        <ion-col size="5">
          <chat-swiper  v-if="messageDetail.offer_detail.to.length" :offer-data="messageDetail.offer_detail.to"/>
        </ion-col>
      </ion-row>

      <!-- paar teklifi, teklif incele, ütün mesajı alanalrı -->
      <ion-row :class="isFrom?'from-user':'to-user'" class="offer-review-area">
        <ion-col class="offer-review-area-wrapper" size="10">
          <ion-label class="offer-info">{{ getOfferInfo(messageDetail) }}</ion-label>
          <ion-button class="check-offer" fill="clear" @click="openCompareProductModal(messageDetail)">Teklifi İncele</ion-button>
        </ion-col>
        <ion-col size="10">
          <chat-text-area v-if="messageDetail.offer_detail?.productMessage"
                          :origin="origin" :text="messageDetail.offer_detail.productMessage" class="chat-area"/>
          <slot/>
        </ion-col>

      </ion-row>

      <!--resimlerin altındaki fiyat vs offer mesajları -  teklifi inclele alt kısmı-->
      <!--<ion-row v-else-if="message.offer_detail.price" class="price-text-area">
        <b>xx</b>
        <chat-text-area :text="getOfferInfo(message.offer_detail.price)" class="chat-area"/>
      </ion-row>-->

    </ion-grid>

    <!-- offer_response =   iptal texti-->
    <div class="offer-response">
      <ion-text v-if="messageDetail" :class="offerClass">{{ (messageDetail.offer_detail?.offer_response) }}
      </ion-text>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {IonGrid, IonCol, IonRow, IonImg, IonLabel, IonButton, IonText} from '@ionic/vue';
import ChatSwiper from "@/components/swiper/chat-swiper/chat-swiper.vue";
import ChatTextArea from "@/modules/chat/components/chat-text-area.vue";
import directionImg from '@/assets/yon.png'
import {computed, PropType, ref} from 'vue';
import {useAuthStore} from "@/stores/authStore";
import type {MessageData} from "@/types/chat.types";

const props = defineProps({
  message: {
    type: Object as PropType<MessageData>,
    default: () => ({})
  },
  origin: {
    type: String,
    default: 'from'
  },
  price: {
    type: String,
    default: null
  }
})

const emit = defineEmits<{
  (event: 'compare-products', product: MessageData): void;
}>();

const authStore = useAuthStore();
const myUserInfo = computed(() => authStore.user)

const offerClass = ref<string>('')

const isFrom = computed(() => props.origin === "from");
const messageDetail = computed(() => props.message as MessageData);


console.log("messageDetail",messageDetail.value)

const getOfferInfo = (message:MessageData) => {
  //message?.offer_detail.offer_type === 'offer'

  if (message?.offer_detail.offer_type === 'request' && myUserInfo.value.user_code === message._from) {
    return `${message?.offer_detail.price}₺ Para Talep ettiniz`
  } else if (message?.offer_detail.offer_type === 'request' && myUserInfo.value.user_code === message._to) {
    return `${message?.offer_detail.price}₺ Para Talep edildi`
  } else if (myUserInfo.value.user_code === message._from) {
    return `Ürün İçin ${message?.offer_detail.price}₺ Para Teklif Ettiniz`
  } else {
    return `Ürün İçin ${message?.offer_detail.price}₺ Para Teklif Edildi`
  }
}

const openCompareProductModal=(product:MessageData)=>{
  emit('compare-products',product)
}

</script>

<style lang="scss">
.chat-offer-request-card {

  .chat-text-area.chat-area {
    padding-top: initial;
    margin-top: 10px;
  }

  padding: initial;
  position: relative;

  ion-grid {
    padding: initial;
  }

  .price-text-area {
    .message {
      background-color: initial !important;
      color: black;
      font-weight: bold;

      img {
        display: none;
      }
    }
  }


  &.disabled {
    pointer-events: none;
    opacity: 0.6; /* Görsel olarak devre dışı görünüm */
  }

  .offer-response {
    text-align: center;

    .cancelled {
      color: #bc0f0f;
      font-weight: bold;
      margin-top: 4px;
    }

    .accepted {
      color: #0fa704;
      font-weight: bold;
      margin-top: 4px;
    }
  }


  .direction-icon {
    display: flex;
  }

  ion-grid {
    position: relative;
    z-index: 2;

    .offer-images-area {
      background-color: #E5E5E5;

      &.from-user-img {
        border-radius: 8px 8px 0 8px;
      }

      &.to-user-img {
        border-radius: 8px 8px 8px 0;
      }

    }
  }

  .chat-area {
    width: 100%;
    position: relative;
    z-index: 2;
    text-align: center;

    .message {
      max-width: 100% !important;
    }
  }

  .ribbon-connector {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: linear-gradient(to bottom, #901B6A, #901B6A);
    height: 32px;
    z-index: 1;


  }

  .ribbon-connector-bottom {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -55%) !important;
    width: 3px;
    background: linear-gradient(to bottom, #901B6A, #901B6A);
    height: 50px;
    z-index: 1;


    &::after {
      content: '';
      position: absolute;
      top: 40px;
      left: -4px;
      width: 10px;
      height: 20px;
      background-color: #901B6A;
    }
  }

  .offer-review-area {
    &.from-user {
      display: flex;
      justify-content: end;
    }

    &-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background-color: #E5E5E5;

      ion-button {
        color: white;
        font-weight: bold;
        margin-top: initial;
      }

      .offer-info {
        color: black;
      }

      .check-offer {
        color: purple;
        font-size: 13px;
        font-weight: bold;
      }
    }

    .chat-text-area {
      padding: initial !important;
      padding-bottom: 20px !important;
    }

    .offer-review-area-wrapper {
      border-radius: 0 0 8px 8px;
    }

    .accept-refuse-buttons-1, .accept-refuse-buttons-2 {
      padding: initial !important;
    }
  }


}
</style>