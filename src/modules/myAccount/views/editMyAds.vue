<template>
    <ion-page>
        <Header />
        <ion-content>
            <ion-grid>
                <ion-row>

                    <ion-col size="12"
                        style="background-color:white; position:relative; padding: 10px; display: flex; align-items: center; flex-direction: row;">
                        <img src="../assets/tü.png" alt="" style="height: 30px;">
                        <p style="margin: 0px; margin-left: 0px; font-weight: bold;">İlan Düzenle</p>
                        <p @click="cancel"
                            style="margin: 0px; color:purple; font-weight: bold; position: absolute; right: 10px; top: 8px;">
                            x</p>
                    </ion-col>


                    <ion-col size="12"
                        style="background-color:#F3F2F7; position:relative; padding: 10px; display: flex; flex-direction: row ">
                        <p style="margin: 0px; margin-left: 10px;">İlan Bilgileri </p>

                    </ion-col>


                    <ion-col size="12" style="position: relative;">
                        <!-- Swiper component occupying space on the left -->
                        <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
                            <div style="width: 25%; height: 100px;">
                                <button @click="openFileInput"
                                    style="height: 85%; font-size: 10px; color:white; width: 80px; border-radius: 1vh; margin-top: 5px;  background-color: rgb(160, 10, 129);">Görsel
                                    yükle</button>
                            </div>
                            <div style="width: 100%;">
                                <Swiper :modules="modules" :space-between="-13" :slides-per-view="3" :navigation="true"
                                    style="flex-grow: 1;">
                                    <swiper-slide v-for="image in product.images" :key="image.id">
                                        <ion-card
                                            style="position: relative; padding-right: 6px; padding-left: 6px; padding-top:8px ;  border-radius: 2vh;    background-color: #8F1B69; "
                                            @click="selectImage(image.image)">
                                            <img style="width: 120px; border-radius: 2vh; height: 100%; object-fit: cover;"
                                                :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + image.image" />
                                            <button @click.stop="removeImage(image)"
                                                style="width: 20%; background-color: gainsboro; position: absolute; top: 10px; right: 8px; height: 15px; border-radius: 10px; font-weight: bold; color: purple;">
                                                X
                                            </button>

                                            <!-- Conditionally display the <p> tag -->
                                            <p v-if="selectedImage === image.image"
                                                style="position: absolute; font-size: 11px; background-color: #8F1B69; color: white; padding: 3px; ; margin: 0px; top: 8px; left: 5px;">
                                                Vitrin Görseli
                                            </p>
                                        </ion-card>
                                    </swiper-slide>
                                </Swiper>
                            </div>
                        </div>


                        <!-- The image positioned at the top-right -->
                        <!-- <img src="../assets/i,.png" alt=""
                            style="position: absolute; top: 10px; right: 20px; width: auto; height: 15px; object-fit: contain;"> -->
                    </ion-col>




                    <!-- Form verileri -->
                    <ion-col size="12">
                        <ion-list lines="full">
                            <ion-item>
                                <ion-label slot="start">İlan Başlığı</ion-label>
                                <ion-textarea placeholder="Başlık giriniz" :clear-on-edit="true" :auto-grow="true"
                                    :rows="1" v-model="formData.name" />
                            </ion-item>
                            <ion-item>
                                <ion-label slot="start">Fiyat</ion-label>
                                <ion-input placeholder="Fiyat Giriniz." type="number" v-model.number="formData.price" />
                            </ion-item>
                            <ion-item>
                                <ion-label slot="start">Açıklama</ion-label>
                                <ion-textarea placeholder="Açıklama giriniz" v-model="formData.description"
                                    :clear-on-edit="true" :auto-grow="true" :rows="1" />
                            </ion-item>


                            <ion-item>
                                <div :style="{ width: selectedProvince ? '73%' : '70%' }">
                                    <ion-select placeholder="İl" v-model="selectedProvince.id" ok-text="Tamam"
                                        cancel-text="İptal">
                                        <div slot="label">İl <ion-text color="danger"></ion-text></div>

                                        <ion-select-option v-for="(province, index) in provinceList" :key="index"
                                            :value="province.id">
                                            {{ province.name }}
                                        </ion-select-option>
                                    </ion-select>
                                </div>
                            </ion-item>


                            <ion-item>
                                <div :style="{ width: selectedProvince ? '73%' : '70%' }">
                                    <ion-select placeholder="İl" v-model="selectedDistrict.id" ok-text="Tamam"
                                        cancel-text="İptal">
                                        <div slot="label">İlçe <ion-text color="danger"></ion-text></div>

                                        <ion-select-option v-for="(district, index) in districtList" :key="index"
                                            :value="district.id">
                                            {{ district.name }}
                                        </ion-select-option>
                                    </ion-select>
                                </div>
                            </ion-item>


                            <ion-item>
                                <div :style="{ width: selectedProvince ? '73%' : '70%' }">
                                    <ion-select placeholder="İl" v-model="selectedLocalities.id" ok-text="Tamam"
                                        cancel-text="İptal">
                                        <div slot="label">Mahalle <ion-text color="danger"></ion-text></div>

                                        <ion-select-option v-for="(localities, index) in localizationsList" :key="index"
                                            :value="localities.id">
                                            {{ localities.name }}
                                        </ion-select-option>
                                    </ion-select>
                                </div>
                            </ion-item>

                            <ion-item>
                                <ion-label slot="start">Arama İzni</ion-label>
                                <ion-toggle @ionChange="updatePreference" v-model="toggleValue" />
                            </ion-item>

                            <ion-item>
                                <ion-label slot="start" style="font-size: 15px;">Takas Tekliflerine Aç</ion-label>
                                <ion-toggle v-model="formData.swap" />
                            </ion-item>
                        </ion-list>

                        <ion-col size="12" style="display: flex; bottom:0px; justify-content: center;">
                            <ion-button @click="submitForm" style="width: 60%;">Kaydet</ion-button>
                        </ion-col>

                    </ion-col>
                    <ion-modal id="product-detail-modal-notif" ref="notification" :is-open="isNotificationOpen"
                        @did-dismiss="notificationDismiss">
                        <div class="wrapper" style="display: flex; flex-direction: column; justify-content: flex-start;
                        align-items: center;">
                            <div>
                                <img src="@/assets/delpng.png" />
                            </div>
                            <div style="width: 80%;">
                                <p style="text-align: center;">Görseli kaldırmak istediginizden emin misiniz ?</p>
                            </div>
                            <div style="display: flex; width: 80%; flex-direction: column;">
                                <ion-button @click="applyRemoveImage">Evet Sil</ion-button>
                                <ion-button @click="notificationDismiss">Vazgeç</ion-button>
                            </div>
                            <div
                                style=" width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            </div>
                        </div>
                    </ion-modal>

                    <ion-modal id="product-detail-modal-notif" ref="closeNotification" :is-open="isCloseModal"
                        @did-dismiss="closeDismiss">
                        <div class="wrapper"
                            style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
                            <div>
                                <img src="@/assets/delpng.png" />
                            </div>
                            <div style="width: 80%;">
                                <p style="text-align: center;">Kaydedilmemiş degişiklikler var, Çıkış yapmak
                                    istediginizden emin misiniz ?</p>
                            </div>
                            <div style="display: flex; width: 80%; flex-direction: column;">
                                <ion-button @click="confirmExit">Evet</ion-button>
                                <ion-button @click="confirmCancel">Vazgeç</ion-button>
                            </div>
                            <div
                                style=" width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            </div>
                        </div>
                    </ion-modal>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import { IonPage, IonGrid, IonRow, IonCol, IonContent, IonCardContent, IonCard, IonItem, IonLabel, IonTextarea, IonInput, IonSelect, IonSelectOption, IonToggle, IonButton, IonModal } from '@ionic/vue';
import Header from '@/components/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { ref, onMounted, watch } from 'vue';
import productApi from '@/services/productApi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@ionic/vue/css/ionic-swiper.css';
import Swal from 'sweetalert2'

import 'sweetalert2/src/sweetalert2.scss'
import { idCard, image } from 'ionicons/icons';

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import locationApi from '@/services/locationApi';
const $toast = useToast();

const deneme = ref("deneme")

// Initialize reactive variables
const router = useRouter();
const route = useRoute();
const modules = [Navigation, Pagination, Scrollbar];
const productCode = ref<string>(route.params.code as string);
const selectedImage = ref<string>('');
const notification = ref<HTMLIonModalElement | null>(null);
const isNotificationOpen = ref(false)





let provinceList = ref<any[]>([])
let districtList = ref<any[]>([])
let localizationsList = ref<any[]>([]);




const closeNotification = ref<HTMLIonModalElement | null>(null);
const isCloseModal = ref(false);

const cancel = () => {
    isCloseModal.value = true
};

const confirmExit = () => {
    isCloseModal.value = false
    router.push('/')
}
const confirmCancel = () => {
    isCloseModal.value = false
}

const formData = ref({
    product_code: '',
    showcase_image: '',
    name: '',
    price: 0,
    description: '',
    city: 0,
    district: 0,
    localities: 0,
    communication_preference: [] as string[], // Updated field name
    swap: false,
    images: [] as { id: number; image: string; }[]

});


const product = ref<Product>({
    images: [],
    showcase_image: '',
    city: { id: 0, name: '', slug: '' }, // Set a default value for city as an object
    district: { id: 0, name: '', slug: '' }, // Set a default value for city as an object
    localities: { id: 0, name: '', slug: '' }, // Set a default value for city as an object
    product_code: '',
    name: '',
    price: 0,
    description: '',
    communication_preference: [],
    swap: false
});
interface City {
    id: number;
    name: string;
    slug: string;
}

interface District {
    id: number;
    name: string;
    slug: string;
}

interface Localities {
    id: number;
    name: string;
    slug: string;
}
// Image interface definition (no changes here)
interface Image {
    image_code: string;
    id: number;
    image: string;
}

// Product interface definition (updated to include City)
interface Product {
    images: Image[];
    showcase_image: string;
    product_code: string;
    name: string;
    price: number;
    city: City; // Updated to refer to City interface
    district: District;
    localities: Localities;
    description: string;
    communication_preference: string[]; // Updated field name
    swap: boolean;
}


let toggleValue = true
const updatePreference = () => {
    console.log(toggleValue)
    formData.value.communication_preference = toggleValue ? ["phone"] : ["message"];
}


const generateRandomCode = (length: number = 10): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};
const mountImages = (event: Event) => {
    const formImagesData = new FormData();
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
                    item.forEach((element: { original: string, [240]: string }) => {
                        // image_code değerini rastgele üretiyoruz
                        let item = {
                            id: 1,
                            image_code: generateRandomCode(12), // 12 karakterli rastgele kod
                            image: element[240],
                        };
                        product.value.images.push(item);
                        multitpleImages.value.push(item);
                        console.log("Mulitple", multitpleImages.value);
                        /*
                        $toast.success("Resim yüklendi.", {
                            position: "top-right",
                        });
                        */
                    });

                } catch (error) {
                    $toast.error("Bu Dosya Türü Desteklenmemektedir.", {
                        position: "top-right",
                    });
                    alert("bu dosya türü desteklenmiyor");
                    console.error('Veri işleme sırasında bir hata oluştu:', error);
                }
            })
            .catch((error: { response: { status: number; }; }) => {
                if (error.response && error.response.status === 401) {
                } else {
                    $toast.error("Bu Dosya formatında resim yükleme desteklenmiyor", {
                        position: "top-right",
                    });
                    console.error('Yükleme işlemi sırasında bir hata oluştu:', error);
                }
            });
    }
};


const notificationDismiss = () => {
    isNotificationOpen.value = false;
};

const closeDismiss = () => {
    isCloseModal.value = false
}

const multitpleImages = ref<any[]>([])

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



let selectedProvince = ref<any>({
    id: 0,
    name: '',
    slug: ''
})

let selectedDistrict = ref<any>({
    id: 0,
    name: '',
    slug: ''
})
let selectedLocalities = ref<any>({
    id: 0,
    name: '',
    slug: ''
})

watch(
    () => selectedProvince.value, // selectedProvince'ın tamamını izliyoruz
    (newValue, oldValue) => {

        formData.value.city = newValue.id

        console.log('New province:', newValue); // Yeni değişkeni konsola yazdır
        locationApi.getDistrict(newValue.id).then(res => {
            districtList.value = res.data.data;
            console.log('District List:', res.data.data); // API yanıtını konsola yazdır
        }).catch(error => {
            console.error('Error fetching districts:', error);
        });
    },
    { deep: true } // Derin değişiklikleri izlemek için 'deep' kullanıyoruz
);


watch(
    () => selectedDistrict.value, // selectedProvince'ın tamamını izliyoruz
    (newValue, oldValue) => {

        formData.value.district = newValue.id
        console.log('New province:', newValue); // Yeni değişkeni konsola yazdır
        locationApi.getLocalizitions(newValue.id).then(res => {
            localizationsList.value = res.data.data;
            console.log('Mahalle List:', res.data.data); // API yanıtını konsola yazdır
        }).catch(error => {
            console.error('Error fetching districts:', error);
        });
    },
    { deep: true } // Derin değişiklikleri izlemek için 'deep' kullanıyoruz
);


// Fetch product data on mounted
onMounted(async () => {

    locationApi.getCity().then((res) => {
        // API'den gelen veriyi al
        provinceList.value = res.data.data;
        console.log(provinceList.value); // Sıralanmış listeyi konsola yazdır
    });


    try {
        const response = await productApi.get(productCode.value);
        product.value = response.data;
        selectedProvince.value.name = product.value.city.name
        selectedProvince.value.id = product.value.city.id
        selectedDistrict.value.id = product.value.district.id
        selectedDistrict.value.name = product.value.district.name
        selectedLocalities.value.id = product.value.localities.id
        selectedLocalities.value.name = product.value.localities.name

        // Initialize formData with fetched product data
        formData.value = {
            product_code: product.value.product_code,
            showcase_image: product.value.showcase_image,
            name: product.value.name,
            price: product.value.price,
            city: product.value.city.id,
            district: product.value.district.id,
            localities: product.value.district.id,
            description: product.value.description,
            communication_preference: product.value.communication_preference,
            swap: product.value.swap,
            images: product.value.images
        };

        // Set the initial selected image based on showcase_image
        selectedImage.value = product.value.showcase_image;
        console.log("formİmg", formData.value.images)

        console.log(product.value);
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
});


let deletedImage = {
    image_code: '',
    is_deleted: true,
};

const removeImage = (image: Image) => {
    isNotificationOpen.value = true;
    deletedImage.image_code = image.image_code; // Silinecek görselin kodunu ayarla
   // applyRemoveImage(image);
};

const applyRemoveImage = async (image: Image) => {
    try {
        isNotificationOpen.value = false;
        console.log(isNotificationOpen.value)
        await productApi.productImageUpdate(deletedImage);

        // Silme işleminden sonra API'den güncel veriyi çek
        const response = await productApi.get(productCode.value);
        product.value = response.data;

        // formData'yı güncelle
        formData.value = {
            product_code: product.value.product_code,
            showcase_image: product.value.showcase_image,
            name: product.value.name,
            price: product.value.price,
            city: product.value.city.id,
            district: product.value.district.id,
            localities: product.value.localities.id,
            description: product.value.description,
            communication_preference: product.value.communication_preference,
            swap: product.value.swap,
            images: product.value.images,
        };

    } catch (error) {
        // API başarısız olsa bile kullanıcıyı bilgilendir
        product.value.images = product.value.images.filter(
            (item: any) => item.image_code !== deletedImage.image_code
        );

        
    } 
    
};




// Function to select an image
function selectImage(imageUrl: string): void {
    selectedImage.value = imageUrl;
    formData.value.showcase_image = imageUrl
}

// Function to submit the form
async function submitForm() {
    try {
        // Ürünü güncelle
        const response = await productApi.productUpdate(formData.value);

        // Gelen product_code'u resimlere ekle
        const productCode = response.data?.product_code ?? '';
        console.log("productCode", productCode)
        multitpleImages.value.forEach((element: any) => {
            element.product_code_images = productCode;
        });

        // Çoklu resim kaydet
        await productApi.productMultiImageCreate(multitpleImages.value);

        router.push('/');
        // Başarı mesajı ve yönlendirme
        // $toast.success("İlan Bilgileriniz Güncellendi.", {
        //     position: "top-right",
        // });

        // Sayfayı yenile
        //window.location.reload();

    } catch (error) {
        console.error('Form gönderilirken hata oluştu:', error);

        // Hata mesajı göstermek isterseniz
        $toast.error("Bir hata oluştu. Lütfen tekrar deneyin.", {
            position: "top-right",
        });
    }
}



</script>



<style>
.v-toast__item--success {
    background-color: purple !important;
}

.swiper-button-prev::after {
    font-size: 15px !important;
    font-weight: bold !important;
}

.swiper-button-next::after {
    font-size: 15px !important;
    font-weight: bold !important;
}

.swiper-button-prev {
    color: purple!important;
    font-weight: bold;

}

.swiper-button-next {
    color: purple !important;
    font-weight: bold;
    margin-right: 10px;
    font-size: 20px !important;
}

.swiper-button-next::after {
    font-size: 15px;
    font-weight: bold;
}

.custom-swal .swal2-title {
    font-size: 10px !important;
    /* Başlık metninin boyutunu ayarlayın */
}

#swal2-title {
    font-size: 10px !important;
}

.custom-swal .swal2-text {
    font-size: 1px !important;
    /* Metin boyutunu ayarlayın */
}

.swal2-popup {
    font-size: 1rem;
    /* Genel font boyutu */
}

.swal2-title {
    font-size: 1.5rem;
    /* Başlık font boyutu */
}

.swal2-html-container {
    font-size: 1rem;
    /* Metin font boyutu */
}

ion-modal#product-detail-modal-notif {
    --width: 300px;
    --height: fit-content;
    --border-radius: 40px;

    --overflow: visible;
    --background: none;


    .wrapper {

        width: 300px;
        height: 450px;
        border-radius: 40px;
        background-color: white;

        img {

            margin-right: 10px;
            width: 300px;
        }

        #btn {
            --background: #d7d2d2;
            --color: var(--black);
            --padding-top: 15px;
            --padding-bottom: 15px;
            --padding-start: 60px;
            --padding-end: 60px;
            --border-radius: 30px;
            --box-shadow: none;
            font-family: var(--font-bold), sans-serif;
            font-size: 16px;
        }
    }
}
</style>