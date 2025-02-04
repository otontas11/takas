<template>
  <ion-modal id="product-detail-modal" ref="showChooseModal" :is-open="isOpened" @didDismiss="closeModal">
    <div class="wrapper">
      <div class="takasimo-logo">
        <ion-img :src="getImageUrl('takasimo-icon.png')"/>
      </div>
      <div class="modal-close-button ion-activatable ripple-parent">
        <ion-ripple-effect/>
      </div>

      <ion-label>
        <div class="label2">
          Hemen şimdi teklif ver!
        </div>
      </ion-label>
      <ion-button class="m-b-10" expand="block" @click="openBuyProductModal">
        Satın Al
      </ion-button>
      <ion-button expand="block" @click="openSwapModal">
        Takasla
      </ion-button>
    </div>
  </ion-modal>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

import {IonButton, IonLabel, IonModal, IonRippleEffect, IonImg} from "@ionic/vue";
import {getImageUrl} from "@/assets/helpers/getImageUrl";

const emit=defineEmits(['open-modal'])

const isOpened=ref(false)

const openModal=()=>{
  isOpened.value=true
}
const closeModal=()=>{
  isOpened.value=false
}
const openBuyProductModal = () => {
  emit("open-modal",{type:'buy'})
  closeModal()
}

const openSwapModal = () => {
  emit("open-modal",{type:'swap'})
  closeModal()
}

defineExpose({
  openModal,
})
</script>

<style lang="scss" scoped>
ion-modal#product-detail-modal {
  --width: 80%;
  /* background-color: red; */
  height: 100%;
  --height: fit-content;
  --border-radius: 30px;
  --overflow: visible;


  .wrapper {
    padding: 20px 10px 10px 20px;
    width: 100%;

    .takasimo-logo {
      position: absolute;
      top: -50px;
      left: calc(50% - 50px);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      background: var(--primary);
      width: 100px;
      height: 100px;
      border-radius: 50px;
      z-index: 20003;

      img, ion-img {
        width: 60px;
        height: 60px;
      }
    }

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

    ion-row {
      background-color: red;
      margin-bottom: 5px;
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
      margin-top: 30px;
      text-align: center;
      z-index: 999;
    }

  }
}
</style>