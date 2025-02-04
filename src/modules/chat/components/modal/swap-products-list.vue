<template>
  <div class="swap-products-list wrapper">
    <ion-icon
        :icon="closeOutline"
        class="close-text"
        @click="closeModal"
    />

    <div class="header-text">
      <p>Takaslamak istediğin ilanını seç ?</p>
      <p>{{ origin === 'from' ? 'Benim Ürünlerim' : 'Takaslanacak Ürün Listesi' }}</p>
    </div>

    <swiper
        :modules="modules"
        :navigation="true"
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true, hide:true }"
        :slides-per-view="Math.min(products.length, 3)"
        :space-between="12"
    >
      <swiper-slide v-for="(item, index) in products" :key="`${props.origin}-${index}`">
        <ion-card v-if="item.product.status" class="product-card">
          <ion-card-content>
            <ion-img
                :src="`https://takasimos3.s3.eu-north-1.amazonaws.com${item.product.showcase_image}`"
                class="product-image"
            />
          </ion-card-content>
          <ion-card-header>
            <div class="card-text">
              <ion-card-subtitle>{{ item.product.name }}</ion-card-subtitle>
              <ion-card-title>{{ item.product.price }}₺</ion-card-title>
            </div>
            <ion-checkbox
                :id="`checkbox-${item.product_code}`"
                v-model="selectedProducts[item.product_code]"
                :data-product-code="item.product_code"
                @ionChange="updateSelectedItems(item)"
            />
          </ion-card-header>
        </ion-card>
      </swiper-slide>
    </swiper>

    <div v-if="warningMessage" class="warning-message">
      <p>{{ warningMessage }}</p>
    </div>

    <div class="selected-count">
      <p>{{ selectedCount }}</p>
      <span>İlan seçildi</span>
    </div>

    <div class="modal-ok-button">
      <ion-button class="primary" @click="saveProducts">Tamam</ion-button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {ref, computed} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonIcon,
  IonImg
} from "@ionic/vue";
import {Navigation, Scrollbar} from "swiper/modules";
import {closeOutline} from "ionicons/icons";

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  origin: {
    type: String,
    default: 'from'
  },
});

const emit = defineEmits(['onClose', 'onSave']);

const modules = [Navigation, Scrollbar];
const selectedProducts = ref<Record<string, boolean>>({});
const selectedItems = ref<any[]>([]); // Array to hold the selected item objects
const warningMessage = ref<string>("");

const selectedCount = computed(() => {
  return selectedItems.value[props.origin]?.length || 0;
});

const updateSelectedItems = (item: any) => {
  if (!selectedItems.value[props.origin]) {
    selectedItems.value[props.origin] = [];
  }

  const originArray = selectedItems.value[props.origin];

  const index = originArray.findIndex((i) => i.product_code === item.product.product_code);

  if (index !== -1) {
    originArray.splice(index, 1);
  } else {
    const newItem = {
      product_code: item.product.product_code,
      name: item.product.name,
      image: item.product.showcase_image,
      city: item.product.city,
      district: item.product.district,
      owner: item.product?.owner,
    };

    originArray.push(newItem);
  }
  console.log("selectedItems", selectedItems.value);
};

const saveProducts = () => {
  const originItems = selectedItems.value[props.origin] || [];
  if (originItems.length === 0) {
    warningMessage.value = "Lütfen en az bir ürün seçin!"; // Show warning if no item is selected
    return;
  }

  warningMessage.value = ""; // Clear warning if at least one product is selected
  emit('onSave', { selectedItems: selectedItems.value, origin: props.origin });
};


const closeModal = () => {
  emit('onClose');
};


</script>


<style lang="scss" scoped>
.swap-products-list {
  padding: 20px 10px 10px 20px;
  width: 100%;

  .warning-message {
    color: red;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
  }
}

.close-text {
  text-align: center;
  font-weight: bold;
  color: purple;
  font-size: 24px;
  cursor: pointer;
}

.header-text {
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: black;
  border-bottom: 1px solid gainsboro;
  margin-bottom: 10px;
}

.product-card {
  height: auto; // Daha büyük yükseklik
  max-height: 100%;
  background-color: #d9d9d9;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

ion-card-subtitle {
  white-space: nowrap; // Satır atlamasını önler
  overflow: hidden; // Taşan metni gizler
  text-overflow: ellipsis; // Üç nokta ile keser
  display: block;
  max-width: 100%; // Kart genişliğini aşmasını önler
}

.product-image {
  border-radius: 1vh;
  height: 80px;
  width: 100px;
  object-fit: cover;
}

.see-all-card {
  height: 200px;
  background-color: gainsboro;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.plus-icon {
  font-size: 40px;
  font-weight: bold;
  color: #901b6a;
}

.selected-count {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;

  p {
    color: white;
    font-weight: bold;
  }

}

.selected-count p {
  background-color: #901b6a;
  border-radius: 50%;
  padding: 3px 6px;
  text-align: center;
  font-size: 12px;
  margin: 0 6px;
}

.modal-ok-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
