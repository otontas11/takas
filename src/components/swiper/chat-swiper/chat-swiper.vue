<template>
  <div class="chat-swiper">
    <Swiper :modules="modules" :navigation="true" @slideChange="onSlideChange">
      <SwiperSlide v-for="(offer, index) in offerData" :key="index" class="sss">
        <ion-label class="owner-name">
          <ion-icon :icon="personCircleOutline" />
          {{ offer?.owner?.name }}
        </ion-label>

        <ion-card class="swiper-wrapper">
          <ion-avatar class="offer-count">{{ offerData.length }}</ion-avatar>

          <div class="img-area">
            <ion-img :src="setImage(offer.image)" />
          </div>
        </ion-card>

        <div class="image-info">
          <div class="offer-name">{{ offer?.name }}</div>
          <div class="city">
            {{ offer?.city?.name }}/{{ offer?.district?.name }}
          </div>
          <div v-if="offer?.price">{{ offer.price }} TL</div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { Navigation } from "swiper/modules";
import { IonAvatar, IonCard, IonImg, IonIcon, IonLabel } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { personCircleOutline } from "ionicons/icons";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { PropType } from "vue";
import type { ProductFromTo } from "@/types/chat.types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  offerData: {
    type: Array as PropType<ProductFromTo[]>,
    default: () => [],
  },
});

const modules = [Navigation];

const setImage = (img: string) => {
  return `https://takasimos3.s3.eu-north-1.amazonaws.com${img}`;
};

const onSlideChange = () => {
  console.log("slide change");
};
</script>

<style lang="scss" scoped>
.chat-swiper {
  //background-color: #E5E5E5;

  .swiper-wrapper {
    width: initial;
  }

  .owner-name {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    margin-top: 8px;

    ion-icon {
      margin-right: 5px;
      color: #901b6a;
    }
  }

  .swiper-slide {
    background: #e5e5e5 !important;
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
  }

  .image-info {
    padding: 4px 0;
    font-weight: bold;
    color: black;

    .offer-name {
      font-size: 14px;
    }

    .city {
      font-size: 10px;
    }
  }

  .swiper-wrapper {
    display: flex;
    flex-direction: column;
    box-shadow: initial;
  }

  .offer-count {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgb(144, 27, 106);
    color: white;
    font-weight: bold;
  }

  .img-area {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* Ensure content doesn't overflow the container */
    background-color: #e5e5e5;
  }

  ion-img {
    width: 120px;
    height: 120px;
    border-radius: 12px;
    overflow: hidden;
    object-fit: cover; /* Ensures the image covers the container */
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
