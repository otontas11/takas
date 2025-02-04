<template>
  <ion-list class="slider-chat-box" lines="none">
    <ion-item-sliding v-for="n in 5" :key="n">
      <ion-item>
        <ion-grid>
          <ion-row>
            <ion-col size="auto">
              <ion-avatar>
                <ion-skeleton-text animated style="width: 50px; height: 50px; border-radius: 50%;" />
              </ion-avatar>
            </ion-col>
            <ion-col>
              <div class="chat-box-detail">
                <div class="left-side">
                  <ion-label class="skeleton-text">
                    <ion-skeleton-text animated style="width: 120px; height: 12px;" />
                  </ion-label>
                  <ion-label class="skeleton-text">
                    <ion-skeleton-text animated style="width: 180px; height: 10px;" />
                  </ion-label>
                  <ion-label class="skeleton-text">
                    <ion-skeleton-text animated style="width: 90px; height: 10px;" />
                  </ion-label>
                </div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    </ion-item-sliding>
  </ion-list>
</template>

<script setup>
import { IonList, IonItemSliding, IonItem, IonGrid, IonRow, IonCol, IonAvatar, IonSkeletonText, IonLabel } from '@ionic/vue';
</script>

<style lang="scss" scoped>
.skeleton-text {
  margin-bottom: 6px;
}

ion-skeleton-text {
  --border-radius: 5px;
  --background: rgba(0, 0, 0, 0.1);
}

ion-item-sliding {
  margin-bottom: 8px;
}
</style>
