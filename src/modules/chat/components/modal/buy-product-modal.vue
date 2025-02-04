<template>
  <ion-modal id="product-buy-modal" ref="showBuyModal" :is-open="isOpened" @did-dismiss="closeModal">

    <ion-header class="ion-padding">
      <b> Teklif Bilgileri </b>
      <ion-icon slot="icon-only"
                :icon="closeOutline"
                style="color:purple; font-weight:bold; font-size:24px;"
                @click="closeModal"/>
    </ion-header>

    <ion-content class="content ion-padding">
      <ion-grid>

        <ion-row v-if="product?.offer_detail?.to" class="buy-container">
          <ion-col v-for="(item,index) in product?.offer_detail?.to" :key="index" class="item-scroll" size="3">
            <div>
              <ion-img v-if="product?.offer_detail?.to"
                       :src="`https://takasimos3.s3.eu-north-1.amazonaws.com${item.image}`"
                       style=" height:70px; object-fit:contain;"/>
              <div class="userInfo">
                <b>{{ item.name }} </b>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <div class="priceNameInfo">
          <b>Önceki Teklif (₺) : {{ product.offer_detail?.price }} ₺ </b>
        </div>

        <ion-row>
          <ion-col size="12">
            <ion-item>
              <ion-input label="Teklif (₺)" v-model.trim="offerPrice" placeholder="Örn 13.000 ₺" type="number"></ion-input>
            </ion-item>

            <ion-item>
              <ion-input label="Mesaj" v-model.trim="offerMessage" placeholder="Mesaj"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>


      </ion-grid>
    </ion-content>
    <ion-footer>
      <ion-row class="check-container">
        <ion-col size="12">
          <ion-radio-group>
            <p style="margin:0px;">Kişisel verilerin işlenmesine dair aydınlatma metni</p>
            <ion-item @click="toggleRadio">
              <ion-radio slot="start" :checked="isTermsAccepted" />
              <p style="font-size: 12px;"> İlan verme kurallarını kabul ediyorum</p>
            </ion-item>

          </ion-radio-group>
          <ion-button expand="full" @click="sendOffer" :disabled="isSendOfferDisabled">
            Teklif ver
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-footer>
  </ion-modal>
</template>


<script lang="ts" setup>
import { ref, computed } from 'vue';
import { closeOutline } from "ionicons/icons";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonFooter,
  IonHeader,
  IonImg
} from "@ionic/vue";

const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  }
});

const offerPrice = ref<any>(null);
const offerMessage = ref('');
const isOpened = ref(false);
const isTermsAccepted = ref(false); // ion-radio toggle için

const openModal = () => {
  isOpened.value = true;
};

const closeModal = () => {
  isOpened.value = false;
};

const toggleRadio = () => {
  isTermsAccepted.value = !isTermsAccepted.value;
};

const isSendOfferDisabled = computed(() => {
  return !offerPrice.value || !offerMessage.value || !isTermsAccepted.value;
});

const sendOffer = () => {
  if (!isSendOfferDisabled.value) {


    console.log("Teklif gönderildi:", offerPrice.value, offerMessage.value);
  }
};

defineExpose({
  openModal,
  closeModal
});
</script>



<style lang="scss" scoped>
ion-modal#product-buy-modal {
  ion-header {
    box-shadow: initial;
    border-bottom: 1px solid #a59d9c;
    display: flex;
    justify-content: space-between;


  }

  .modalClose {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: white;
  }

  .offerInfo {
    width: 100%;
    height: 30px;
    background-color: rgb(233, 233, 233);
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
  }

  .flex-col {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 10px;
  }

  .custom-label {
    color: black;
    margin: 0;
    padding: 0;
  }

  .content {
    --padding-bottom: env(safe-area-inset-bottom);
    background-color: blue !important;
    display: flex;
    flex-direction: column;
  }

  .buy-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    /* Dikey düzenleme */
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    overflow-y: scroll;
    /* Ortalamak için */

    .item-scroll {
      display: flex;

      .priceNameInfo {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        left: 20px;
        font-weight: bold;

        p, b {
          margin: 0px;
        }
      }


      img {
        height: 150px;
        width: 100%;
        object-fit: contain;
        display: block;
        /* Blok seviyesine al */
      }
    }
  }

  .message-container {
    margin: 20 20px;
    margin-top: 30px;
    /* Kenar boşluklarını düzenle */
    display: flex;
    align-items: center;

    ion-label {
      display: flex;
      align-items: center;
      margin-right: 10px;
      /* Label ve input arasına boşluk bırak */
    }

    ion-input {
      flex: 1;
      --padding-start: 0;
      --padding-end: 0;
      --padding-top: 0;
      --padding-bottom: 0;
      border: none;
    }
  }


  .check-container {
    background-color: rgb(229, 226, 226);
    border-radius: 10px 10px 0 0;
    padding: 10px;
    position: fixed;
    bottom: 0px;
    width: 100%;

    p {
      font-size: 10px;
    }

    ion-button {
      margin-top: 10px;
    }
  }

}
</style>