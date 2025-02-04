<template>
  <ion-modal
      id="product-detail-modal"
      ref="productModal"
      :is-open="isOpened"
      @did-present="fetchMeProduct"
      @did-dismiss="closeModal"
  >
    <swap-product-money-screen v-if="isProductMoneyVisible" :products="newProduct" @send-offer="sendNewOfferRequest"
                               @open-product-selection-modal="openProductSelectionModal"/>

    <swap-products-list v-if="isFromProductVisible" :products="meProduct" origin="from" @on-save="saveFromToProducts"/>
    <swap-products-list v-if="isToProductVisible" :products="targetUserProduct" origin="to"
                        @on-save="saveFromToProducts"/>


  </ion-modal>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {IonModal} from "@ionic/vue";
import SwapProductsList from "@/modules/chat/components/modal/swap-products-list.vue";
import SwapProductMoneyScreen from "@/modules/chat/components/modal/swap-product-money-screen.vue";
import authApi from "@/services/authApi";
import productApi from "@/services/productApi";
import {useAuthStore} from "@/stores/authStore";
import api from "@/services/api";
import {useRoute} from "vue-router";

//yeni teklif verilince eski teklifi iptal etmeliyiz
//product prop u içinde eski teklif verileri var
const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  }
});

const authStore = useAuthStore();
const route = useRoute()

const myUserInfo = computed(() => authStore.user);


//eski ürünü tut, yeni ürün eklendikten sonra bunu iptal et
const productToSwap = ref({})
const newProduct = ref({})
const isFromProductVisible = ref(true);
const isToProductVisible = ref(false);
const isProductMoneyVisible = ref(false);

console.log("productToSwap", productToSwap.value)

const isOpened = ref(false);
const meProduct = ref<any[]>([]);
const targetUserProduct = ref<any[]>([]);
const targetUserId = ref(null)

watch(() => props.product, (item) => {
  productToSwap.value = item
  targetUserId.value = item._to || []
}, {immediate: true})


const saveFromToProducts = (items) => {

  const {selectedItems, origin} = items

  if (origin === 'from' && selectedItems.from.length) {
    fetchToUserProduct()
    isFromProductVisible.value = false

    if (!newProduct.value.offer_detail) {
      newProduct.value.offer_detail = {};
    }

    newProduct.value.offer_detail.from = selectedItems.from
  } else if (origin === 'to' && selectedItems.to.length) {
    newProduct.value.offer_detail.to = selectedItems.to
    isToProductVisible.value = false
    isProductMoneyVisible.value = true
  }
  console.log("newProduct", newProduct.value)

};

const fetchMeProduct = async () => {
  try {
    const res = await authApi.meProducts();
    console.log("from product", res)
    meProduct.value = res.data.products || [];
  } catch (e) {
    console.error("API Hatası:", e);
  }
};

const fetchToUserProduct = async () => {
  if (!targetUserId.value) return;
  try {
    const res = await productApi.getOwnerProducts(targetUserId.value);
    targetUserProduct.value = res.data.data || [];
    console.log('to products', res);
    isToProductVisible.value = true;
  } catch (error) {
    console.error('Error fetching target user products:', error);
  }
};

const openModal = () => {
  isOpened.value = true
}

const sendNewOfferRequest = (item) => {
  newProduct.value = {
    ...newProduct.value,
    offer_detail: {
      ...newProduct.value.offer_detail,
      price: item.price,
      message: item.message,
      offer_type: item.offerType,
      swapStatus: true
    },
    _to: targetUserId.value,
    message_code: route.params.id
  }
  console.log("newProduct.value", newProduct.value)
  const res = api.post('message-detail', newProduct.value)
  console.log("res", res)
}

const closeModal = () => {
  isOpened.value = false


  productToSwap.value = {};
  newProduct.value = {};
  isFromProductVisible.value = true;
  isToProductVisible.value = false;
  isProductMoneyVisible.value = false;
  meProduct.value = [];
  targetUserProduct.value = [];
  targetUserId.value = null;

};

const openProductSelectionModal = (origin) => {
  isProductMoneyVisible.value = false
  isFromProductVisible.value = true

}

defineExpose({openModal, closeModal})

</script>

<style lang="scss" scoped>
ion-modal#product-detail-modal {
  --width: 100%;
  --height: fit-content;
  --border-radius: 30px;
  --overflow: visible;
}
</style>
