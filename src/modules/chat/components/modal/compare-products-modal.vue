<template>
  <ion-modal @did-dismiss="closeModal" id="product-detail-modal-inspect" ref="offerModal" :is-open="isOpened">
    <ion-row class="swap-container">
      <ion-col size="12" class="modal-header">
        <p class="title">Teklifi İnceliyorsun</p>
        <p @click="closeModal" class="close-button">X</p>
      </ion-col>

      <ion-col size="5" class="item-scroll">
        <div v-if="productDetail?.offer_detail?.from?.length" class="scrollable-container">
          <p class="item-count">{{ productDetail.offer_detail.from.length }}</p>
          <div class="item-container" v-for="(product, itemIndex) in productDetail.offer_detail.from" :key="itemIndex">
            <div class="img-content">
              <img :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + product.image" alt="Image" />
            </div>
            <p class="item-name">{{ product.name }}</p>
            <p class="item-price">{{ product.price }}</p>
            <p class="item-location">{{ product?.city?.name }} / {{ product?.district?.name }}</p>
          </div>
        </div>
        <div v-else>
          <p>No items in 'from'</p>
        </div>
      </ion-col>

      <ion-col size="2" class="center-icon ion-align-self-center">
        <img src="@/assets/yon.png" alt="" />
      </ion-col>

      <ion-col size="5" class="item-scroll">
        <div v-if="productDetail?.offer_detail?.to?.length" class="scrollable-container">
          <p class="item-count">{{ productDetail.offer_detail.to.length }}</p>
          <div class="item-container" v-for="(product, itemIndex) in productDetail.offer_detail.to" :key="itemIndex">
            <div class="img-content">
              <img :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + product.image" alt="Image" />
            </div>
            <p class="item-name">{{ product.name }}</p>
            <p class="item-price">{{ product.price }}</p>
            <p class="item-location">{{ product?.city?.name }} / {{ product?.district?.name }}</p>
          </div>
        </div>
        <div v-else>
          <p>No items in 'to'</p>
        </div>
      </ion-col>

      <ion-col size="12" class="offer-info">
        <p class="offer-price">{{ productDetail?.offer_detail?.price }} ₺ Para Teklifinde bulunuldu</p>
        <p class="offer-message">{{ productDetail?.offer_detail?.productMessage }}</p>
        <img v-if="productDetail?.offer_detail?.productMessage" src="../../../assets/mask.png" alt="" class="offer-image" />
      </ion-col>
    </ion-row>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonCol, IonModal, IonRow } from "@ionic/vue";

const props = defineProps({
  productDetail: {
    type: Object,
    default: () => ({})
  }
});

const isOpened = ref(false);
const closeModal = () => {};
</script>

<style lang="scss" scoped>
ion-modal#product-detail-modal-inspect {
  --width: 95%;
  --height: 590px;
  --border-radius: 30px;
  --overflow: visible;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.title {
  font-weight: bold;
  text-align: center;
  margin: 0;
}

.close-button {
  position: absolute;
  right: 20px;
  color: #901B6A;
  cursor: pointer;
  margin: 0;
}

.item-scroll {
  display: flex;
  flex-direction: column;
}

.scrollable-container {
  position: relative;
}

.item-count {
  position: absolute;
  top: 0;
  background-color: #901B6A;
  color: white;
  padding: 0 10px;
  border-radius: 15px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  min-width: 25px;
}

.img-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 1vh;
}

.img-content img {
  width: 100px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 5px;
}

.item-name, .item-price, .item-location {
  font-size: 10px;
  text-align: center;
  margin: 0;
}

.offer-info {
  text-align: center;
  position: relative;
  height: 100px;
}

.offer-price {
  color: black;
  font-size: 12px;
}

.offer-message {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);
  color: white;
  padding: 20px;
  border-radius: 1vh;
}

.offer-image {
  width: 90%;
  height: auto;
  margin: auto;
  display: block;
}
</style>
