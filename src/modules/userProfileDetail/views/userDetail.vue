<template>
    <ion-page>
        <Header />
        <ion-content>
            <ion-grid>
                <ion-row style="margin-bottom: 30px;">
                    <ion-col size="2" style="position: relative; display: inline-block;">
                        <img v-if="profilPhoto == null" src="@/assets/no-avatar.png" alt="Avatar"
                            style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" />
                        <img v-else :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + profilPhoto"
                            style=" min-height: 50px; width: 50px;  max-height: 50px; border-radius: 50%; object-fit: cover;" />
                        <img v-if="isEditButton" @click="profilSection = !profilSection" src="@/assets/edit.png"
                            alt="Edit"
                            style="position: absolute; bottom: 10px; right: 4px; width: 20px; height: 20px; cursor: pointer;" />
                    </ion-col>


                    <ion-col size="10" class="userInfo">


                        <ion-label style="font-weight: bold; margin-left: 5px; display: flex;  margin-bottom: 0px;">
                            <p style="margin-right: 15px; margin-top: 0px; margin-bottom: 0px">{{ name }} </p>
                            <ion-icon color="primary" style="margin-top: 0px; font-size:20px;" :icon="heart"
                                v-if="isLiked == true && isAuthenticated " @click="deleteFavorites()" />
                            <ion-icon color="primary" :icon="heartOutline" style="margin-top: 0px; font-size:20px;"
                                v-if="isLiked == false && isAuthenticated " @click="addFavorite()" />
                        </ion-label>
                        <ion-label v-if="userInfo.owner?.phone != null"
                            style="font-size: 11px; margin-left: 5px; color: purple; border-radius: 10px; display: flex; align-items: center;">
                            Doğrulanmış
                            <img src="../../../assets/tik.png" alt=""
                                style="width: 12px; height: 12px; margin-left: 5px;">
                        </ion-label>

                        <ion-label v-else style="font-size: 11px; margin-left: 5px; color: purple;">
                            Doğrulanmamış
                        </ion-label>


                    </ion-col>
                </ion-row>

                <ion-row style="margin-bottom: 10px;">
                    <ion-col size="12" style="background-color: #F3F2F7; padding-left: 30px;">
                        <ion-label style="font-weight: bold;">Kullanıcının tüm İlanları</ion-label>
                    </ion-col>
                </ion-row>

                <ion-row style="margin-bottom: 10px;">
                    <ion-col size="12"
                        style="background-color: #F3F2F7; border-radius: 1vh; height: 35px; padding-left: 30px; position: relative;">
                        <img src="../assets/search.png" alt=""
                            style="position: absolute; left: 10px; top: 35%; transform: translateY(-50%); height: 50px;">
                        <input v-model="searchQuery" placeholder="Ürün ara..."
                            style="font-weight: bold; height: 100%; border: none; background-color: transparent; width: 100%; outline: none; padding-left: 30px;">
                        </input>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col v-for="(product, productKey) in filteredProducts" :key="productKey" size="6">
                        <ProductCard :product="product" />
                    </ion-col>
                </ion-row>

                <div v-if="profilSection"
                    style="position: fixed; display: flex; align-items: center; justify-content: flex-start; width: 100%; bottom: 0; background-color: #F3F2F7; height: 70px; padding: 10px;"
                    @click="openFileInput">
                    <img style="height: 20px; margin-top: -10px; margin-right: 10px;" src="@/assets/uploads.png"
                        alt="Upload Icon" />
                    <p style="margin-top: 0; font-size: 14px;">Profil Fotoğrafı Yükle</p>
                    <!-- Gizli dosya yükleme inputu -->
                    <input accept="image/jpeg,image/png,image/jpg" multiple style="display: none;" ref="fileInput"
                        @change="mountImages($event)" type="file" />
                </div>

            </ion-grid>
        </ion-content>

    </ion-page>
</template>



<script lang="ts" setup>
import { IonPage, IonGrid, IonRow, IonCol, IonContent, IonLabel } from '@ionic/vue';
import { calendarOutline, closeOutline, heart, heartOutline, timeOutline, eyeOutline, logoFacebook, logoInstagram, logoWhatsapp, mail } from 'ionicons/icons';
import Header from '@/components/Header.vue';
import { computed, onMounted, ref, reactive } from 'vue';
import productApi from '@/services/productApi';
import { useRoute } from "vue-router";
import ProductCard from '@/modules/product/components/ProductCard.vue';
import favoritesApi from '@/services/favoritesApi';
import userEditApi from '@/services/userEditApi';
import authApi from '@/services/authApi';
import { useToast } from 'vue-toast-notification';
const $toast = useToast();

const isEditButton = ref<boolean>(false);
const isMeProduct = ref<boolean>();
const isLiked = ref<boolean>(false);
const isAuthenticated = ref<boolean>();
const profilSection = ref<boolean>(false);
let route = useRoute();

const addFavorite = () => {
    isLiked.value = !isLiked.value
    favoritesApi.favoritesSettings(userInfo).then((res) => {
        console.log(res)
    })
    $toast.success("Favorilere eklendi", { position: 'top' });
}

const deleteFavorites = () => {
    isLiked.value = !isLiked.value
}




//Data
let name = ref<string>('');
let profilPhoto = ref<string>('');
let products = ref<any>([]);
let searchQuery = ref<string>('');

let userInfo = reactive({
    product_code: null,
    search: null,
    seller_code: route.params.code,
    is_deleted: false,
    owner: {
        phone: null
    },
});





interface User {
    user_code: string; // 'user_code' özelliği olmalı
    // Diğer kullanıcı verileri burada olabilir...
}
let item: string = String(route.params.code);
async function fetchUserData() {
    try {
        // 'user' verisini localStorage'dan al
        const item = localStorage.getItem("user");

        // Eğer localStorage'da 'user' verisi yoksa, hata mesajı göster ve fonksiyonu sonlandır
        if (!item) {
            console.error("User verisi localStorage'da bulunamadı.");
            return;
        }

        // item'i User türüne göre parse et
        const parsedItem: User = JSON.parse(item);

        // localStorage'dan alınan 'user_code' değerini al
        const userCode = parsedItem.user_code;
        console.log("User Code from localStorage:", userCode); // Konsola 'user_code' yazdır

        // Eğer userCode mevcutsa işleme devam et
        if (userCode) {
            // API çağrısını yap
            const res = await authApi.me();

            // API'den dönen seller_code'u al
            const user_code2 = userInfo.seller_code;

            // Kendi ürününüz mü kontrol edin
            if (userCode === user_code2) {
                isAuthenticated.value = false; // Kendi ürününüzse, isAuthenticated false
                isEditButton.value = true;     // Düzenleme butonunu aktif yap
            } else {
                isAuthenticated.value = true;  // Kendi ürününüz değilse, isAuthenticated true
                isEditButton.value = false;    // Düzenleme butonunu pasif yap
            }

            console.log("isAuthenticated:", isAuthenticated.value);
            console.log("isEditButton:", isEditButton.value);
        } else {
            console.log("user_code bulunamadı.");
        }
    } catch (error) {
        console.error("Kullanıcı verisini alırken bir hata oluştu:", error); // Hata mesajını logla
        isEditButton.value = false; // Hata durumunda butonu pasif yap
    }
}



const filteredProducts = computed(() => {
    const query = searchQuery.value.toLowerCase();

    // Arama sorgusu boşsa, orijinal ürünleri döndür
    if (!query) {
        return products.value;
    }

    // Arama sorgusu varsa, filtreleme işlemi yap
    return products.value.filter((product: { name: string; }) => {
        return product.name.toLowerCase().includes(query);
    });
});

const uploadFiles = ref<FileList | null>(null);
const openFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/jpg';
    input.multiple = true;
    input.style.display = 'none';
    input.onchange = (event: Event) => {
        mountImages(event);
    };
    document.body.appendChild(input);
    input.click();
};

const mountImages = (event: Event) => {
    const formImagesData = new FormData();
    // const uploadFiles = ref<FileList | null>(null); // uploadFiles'e uygun tür
    uploadFiles.value = (event.target as HTMLInputElement).files;
    if (uploadFiles.value) {
        for (let i = 0; i < uploadFiles.value.length; i++) {
            const reader = new FileReader();
            const file = uploadFiles.value[i];
            formImagesData.append('images[]', file);
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64Image = reader.result as string;
                formImagesData.append('images[]', base64Image);
            };
        }
        productApi.productImageCreate(formImagesData)
            .then((response: { data: { files: any; }; }) => {
                try {
                    let item = response.data.files;
                    let photo = {
                        photo: response.data.files[0].original
                    }

                    userEditApi.editUser(photo).then(res => {
                        ///console.log("edit", res)
                    })
                    profilPhoto.value = response.data.files[0].original

                    $toast.success("Profil resmi yüklendi", { position: "top-right" });
                } catch (error) {
                    $toast.error("Bu Dosya Türü Desteklenmemektedir.", {
                        position: "top-right",
                    });
                    alert("bu dosya türü desteklenmiyor")
                    console.error('Veri işleme sırasında bir hata oluştu:', error);
                }
            })
            .catch((error: { response: { status: number; }; }) => {
                if (error.response && error.response.status === 401) {
                    // 401 hatası alındığında giriş sayfasına yönlendir

                } else {
                    $toast.error("Bu Dosya formatında resim yükleme desteklenmiyor", {
                        position: "top-right",
                    });
                    console.error('Yükleme işlemi sırasında bir hata oluştu:', error);
                }
            });
    }
};

onMounted(async () => {
    productApi.getOwnerProducts(item).then(res => {
    const ownerData = res.data.data[0].owner;

    userInfo.owner.phone = ownerData.phone;
    name.value = ownerData.name;
    profilPhoto.value = ownerData.photo;

    // Tüm array içindeki product'ları status değeri true olanlara göre filtrele
    const filteredProducts = res.data.data
        .flatMap((item: any) => item.product) // Her bir array içindeki product dizilerini birleştir
        .filter((product: any) => product.status === true); // status true olanları filtrele

    products.value = filteredProducts;

    
}).catch(err => {
    console.error("API hatası:", err);
});

fetchUserData();
});

</script>





<style scoped>
.userInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
</style>