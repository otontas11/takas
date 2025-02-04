<template>
  <div class="swap-product-money-screen">
    <ion-row class="swap-container">
      <!-- Left Column: "From" Products -->
      <ion-col class="item-scroll" size="5">
        <chat-swiper
            v-if="productFromTo.offer_detail && productFromTo.offer_detail.from && productFromTo.offer_detail.from.length"
            :offer-data="productFromTo.offer_detail.from"
        />
        <ion-button color="light" expand="full" @click="openProductSelectionModal">
          İlan ekle - Kaldır
        </ion-button>
      </ion-col>

      <!-- Middle Column: Direction Image -->
      <ion-col class="center-icon ion-align-self-center" size="2">
        <ion-img :src="directionImg" alt="Direction"/>
      </ion-col>

      <!-- Right Column: "To" Products -->
      <ion-col class="item-scroll" size="5">
        <chat-swiper
            v-if="productFromTo.offer_detail && productFromTo.offer_detail.to && productFromTo.offer_detail.to.length"
            :offer-data="productFromTo.offer_detail.to"
        />
        <ion-button color="light" expand="full" @click="openProductSelectionModal">
          İlan ekle - Kaldır
        </ion-button>
      </ion-col>
    </ion-row>

    <!-- Offer Settings Section -->
    <ion-row class="offer-settings ion-align-items-start ion-justify-content-start">
      <ion-col size="12">
        <ion-grid>
          <!-- Offer / Request Buttons -->
          <ion-row
              class="ion-align-items-center ion-justify-content-center"
              style="margin-bottom: 50px; position: relative; height: 10px;"
          >
            <ion-col style="position: relative; display: flex; justify-content: center;">
              <button
                  :style="{ backgroundColor: selected === 'offer' ? 'purple' : 'gainsboro' }"
                  class="action-button left-button"
                  @click="selectButton('offer')"

              >
                Para Teklif Et
              </button>
              <button
                  :style="{ backgroundColor: selected === 'request' ? 'purple' : 'gainsboro' }"
                  class="action-button right-button"
                  @click="selectButton('request')"
              >
                Para Talep Et
              </button>
            </ion-col>
          </ion-row>


          <ion-row class="message-container ion-align-items-center">
            <ion-col class="ion-text-center" size="4">
              <ion-label>Fiyat</ion-label>
            </ion-col>
            <ion-col class="offer-price-container" size="8">
              <ion-input
                  v-model="form.price"
                  class="offer-input"
                  placeholder="Para Miktarı Giriniz"
                  type="number"
              />
            </ion-col>
          </ion-row>

          <ion-row class="message-container ion-align-items-center">
            <ion-col class="ion-text-center" size="4">
              <ion-label>Mesaj</ion-label>
            </ion-col>
            <ion-col class="offer-price-container" size="8">
              <ion-input
                  v-model="form.message"
                  class="offer-input"
                  placeholder="Açıklama Girin"
                  type="text"
              />
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>
    </ion-row>

    <ion-row class="check-container">
      <ion-col size="12">
        <ion-radio-group v-model="isTermsAccepted">
          <ion-item>
            <ion-radio slot="start" value="accepted"/>
            <p style="font-size: 10px;">İlan verme kurallarını kabul ediyorum</p>
          </ion-item>
        </ion-radio-group>

        <!-- Buton, ilan verme kuralları kabul edilmeden aktif olmayacak -->
        <ion-button expand="full" :disabled="!isTermsAccepted || !form.price" @click="sendOffer">
          Teklif ver
        </ion-button>
      </ion-col>
    </ion-row>

  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {
  IonCol,
  IonRow,
  IonImg,
  IonButton,
  IonGrid,
  IonInput,
  IonLabel,
  IonContent,
  IonItem,
  IonRadioGroup, IonRadio
} from '@ionic/vue';
import ChatSwiper from '@/components/swiper/chat-swiper/chat-swiper.vue';
import directionImg from '@/assets/yon.png';

// Define the products prop (no strict TS checks)
const props = defineProps({
  products: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['open-product-selection-modal','send-offer'])

const productFromTo = ref({});
const form=ref({
  price:null,
  message:null
})


watch(
    () => props.products,
    (newProducts) => {
      productFromTo.value = newProducts;
      console.log('money product', productFromTo.value);
    },
    {immediate: true}
);

const selected = ref('offer');
const isTermsAccepted = ref(false);

const selectButton = (type) => {
  selected.value = type;
};


const openProductSelectionModal = () => {
  emit('open-product-selection-modal')
}

const sendOffer = () => {
  if (!isTermsAccepted.value) {
    alert('Lütfen ilan verme kurallarını kabul edin.');
    return;
  }

  if (!form.value.price) {
    alert('Lütfen bir fiyat girin.');
    return;
  }

  emit('send-offer', {
    price: form.value.price,
    message: form.value.message,
    offerType: selected.value
  });
};


</script>

<style lang="scss">
.swap-product-money-screen {
  padding: 12px;

  .chat-swiper {
    border-radius: 30px;
    overflow: hidden;
  }

  .swiper-slider {
    background: black !important;
  }

  .action-button {
    width: 50%;
    color: white;
    font-weight: bold;
    height: 40px;
    border-radius: 2vh;
    position: absolute;
  }

  .left-button {
    left: 20px;
    z-index: 1;
    width: 50%;
    color: white;
    position: absolute;
    font-weight: bold;
    height: 40px;
    border-radius: 2vh;
  }

  .right-button {
    right: 25px;
    z-index: 0;
    width: 50%;
    height: 40px;
    color: white;
    border-radius: 2vh;
    position: absolute;
  }

  .offer-price-container {
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .offer-input {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>
