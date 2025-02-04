<template>
  <ion-list class="slider-chat-box" lines="none"  >
    <ion-item-sliding>
      <ion-item @click="emit('onClicked',message)">
        <ion-grid>
          <ion-row>
            <ion-col  size="auto">
              <ion-avatar >
                <ion-img :src="imageSrc"/>
              </ion-avatar>
            </ion-col>
            <ion-col  >
              <div class="chat-box-detail">
                <div class="left-side">
                  <ion-label class="username-text">{{ userName }}</ion-label>
                  <ion-label class="product-text">{{ productName }}{{ productName }}{{ productName }}</ion-label>
                  <ion-label class="date-text">{{ message.created_at.substring(0,10) }}</ion-label>
                </div>
                <div class="slide-text">
                  <ion-label class="delete-text">silmek için kaydırın</ion-label>
                </div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>

      <ion-item-options side="end">
        <ion-item-option color="danger">Sil</ion-item-option>
      </ion-item-options>

    </ion-item-sliding>
  </ion-list>
</template>

<script lang="ts" setup>
import {
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonAvatar,
  IonImg,
  IonList,
  IonLabel, IonRow, IonCol, IonGrid
} from '@ionic/vue';
import {computed, PropType} from "vue";
import {useAuthStore} from "@/stores/authStore";
import  type {MessageData} from "@/types/chat.types";

const props = defineProps({
  message:{
    type:Object as PropType<MessageData>,
    required:true
  }
})

const emit = defineEmits<{
  (event: 'onClicked', message: MessageData): void;
}>();

const userInfo = computed(()=>useAuthStore().user)

const imageSrc=computed(()=>{
  const baseUrl = 'https://takasimos3.s3.eu-north-1.amazonaws.com';
  const toImage = props.message.latest_offer.to[0]?.image;
  const showcaseImage = props.message.latest_offer.showcase_image;
  return baseUrl + (toImage || showcaseImage || '');
})

const userName=computed(()=>{
  const { targetOwnerInfo, meOwnerInfo, meName } = props.message.latest_offer

  if (userInfo.value?.user_code !== targetOwnerInfo?.user_code) {
    return targetOwnerInfo?.name;
  }
  return meOwnerInfo?.name || meName;
})

const productName=computed(()=>{
  return props.message.latest_offer.to[0]?.name || props.message.latest_offer.product_name;
})
</script>


<style lang="scss">
.slider-chat-box {
   ion-grid {
    background-color: #F3F2F7 !important;
     border-radius: 10px;
     padding: 10px;
  }
  .chat-box-detail {
    display: flex;
    justify-content: space-between;
  }
  .slide-text {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
  }
  .date-text {
    font-size: 12px;
    padding-top: 4px;
  }
  .product-text {
    padding-top: 4px;
  }
}
</style>