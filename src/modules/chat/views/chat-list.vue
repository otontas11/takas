<template>
  <ion-page>
    <Header />
    <ion-row class="header-row">
      <ion-col class="left-col" size="5">
        <ion-col class="back-section" size="9">
          <ion-label class="header-label">Mesajlar</ion-label>
        </ion-col>
      </ion-col>

      <ion-col class="right-col" size="7">
        <div class="search-container">
          <ion-input class="search-input" placeholder="Ara" />
        </div>
      </ion-col>
    </ion-row>

    <ion-content class="ion-padding">
      <template v-if="isLoading">
        <skeleton-message-list />
      </template>

      <template v-else>
        <template v-if="messageList.length">
          <template v-for="(message, index) in messageList" :key="index">
            <slider-chat-box :message="message" @on-clicked="openMessage" />
          </template>
        </template>
        <template v-else>
          <div class="no-message-box">
            <p>Hiç Mesajınız yok</p>
          </div>
        </template>
      </template>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  IonContent,
  IonPage,
  IonInput,
  IonCol,
  IonRow,
  IonLabel,
} from "@ionic/vue";

import Header from "@/components/Header.vue";
import SliderChatBox from "@/modules/chat/components/slider-chat-box.vue";
import SkeletonMessageList from "@/modules/chat/components/skeletonMessageList.vue";

import type { MessageData } from "@/types/chat.types";

import messageApi from "@/services/messageApi";
import router from "@/router";

const messageList = ref<MessageData[]>([]);
const isLoading = ref(true);

onMounted(() => {
  FetchMessageList();
});

const FetchMessageList = async () => {
  try {
    const messages = await messageApi.getMessageList();
    console.log("message",messages)
    messageList.value = messages.data?.data.filter(
      (item: MessageData) => !item.from_is_deleted || !item.to_is_deleted
    );
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const openMessage = (msg: MessageData) => {
  router.push({ name: "chat-detail", params: { id: msg.message_code } });
};
</script>

<style lang="scss" scoped>
.no-message-box {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #777;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-top: 20px;
}
</style>
