<template>
  <ion-page>
    <ion-content>
      <Header />
      <PageHeader :title="title">
        <template #start-action>
          <ion-button @click="handleGoToBack()">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" />
          </ion-button>
        </template>
      </PageHeader>
      <div class="delete-data">
        <ion-grid>
          <div class="wrapper" style="height: 100vh;">
            <div class="text">
              <p>Geliştirme ve destek ihtiyaçlarınız için her zaman yanınızdayız! Takasimo olarak, siz değerli
                kullanıcılarımızın her türlü sorusuna, önerisine ve ihtiyaçlarına hızlı bir şekilde yanıt vermeyi
                önemsiyoruz.
                Sorularınızı, teknik destek taleplerinizi veya iş birliği önerilerinizi bizimle paylaşmak için lütfen
                iletisim@takasimo.com adresine e-posta gönderin. Size yardımcı olmaktan mutluluk duyarız!</p>
            </div>
          </div>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import PageHeader from '@/components/page/PageHeader.vue';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';
import { ref } from 'vue';
import router from '@/router';



let title = ref<string>('İletişim');


const handleGoToBack = () => {
  router.push("/support")
}

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .text{
    width: 90%;
    text-align: center;
  }
}
</style>