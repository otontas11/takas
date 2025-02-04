<template>
    <div class="my-account-header">
        <div class="my-account-avatar" style="position: relative; display: inline-block;">
            <img v-if="user.photo == null || user.photo == ''" src="@/assets/no-avatar.png" alt="Avatar"
                style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" />
            <img v-else :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + user.photo"
                style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" />
            <img @click="editPhoto" src="@/assets/edit.png" alt="Edit"
                style="position: absolute; bottom: 10px; right: 4px; width: 20px; height: 20px; cursor: pointer;" />
        </div>
        <div @click="router.push({ name: 'userDetails', params: { code: user?.user_code } })" style="width: 50%;">
            <div class="font-size-18 is-font-bold">
                {{ user?.name }}

            </div>
            <div>
                <a class="text-primary mt-1">
                    Takasimo Profili
                </a>
            </div>
        </div>
        <div class="my-account-close">
            <slot name="close" />
        </div>

        <div v-if="profilSection"
            style="position: fixed; display: flex; align-items: center; justify-content: flex-start; width: 80%;  border-radius: 10px; bottom: 30px; background-color: #F3F2F7; height: 70px; padding: 10px;"
            @click="openFileInput">
            <img style="height: 20px; margin-top: -10px; margin-right: 10px;" src="@/assets/uploads.png"
                alt="Upload Icon" />
            <p style="margin-top: 0; font-size: 14px;">Profil Fotoğrafı Yükle</p>
            <!-- Gizli dosya yükleme inputu -->
            <input accept="image/jpeg,image/png,image/jpg" multiple style="display: none;" ref="fileInput"
                @change="mountImages($event)" type="file" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref, onMounted, watch } from 'vue';
import productApi from '@/services/productApi';
import userEditApi from '@/services/userEditApi';
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();


interface User {
    email?: string;
    name?: string;
    phone?: string;
    user_code?: string;
    photo?: string;
}
const profilSection = ref<boolean>(false);
let profilPhoto = ref('')
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

const editPhoto = () => {
    profilSection.value = !profilSection.value
    router.push({ name: 'profile' })
}

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
                        console.log("edit", res)
                        authStore.userSet(res);
                    })
                   
                    user.value.photo = response.data.files[0].original

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

const props = defineProps<{
    user?: User;
}>();

const user = ref<User>(props.user || {});

watch(() => props.user, (newUser) => {
    user.value = newUser || {};
}, { immediate: true });


</script>

<style lang="scss" scoped>
.my-account-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    .my-account-avatar {
        img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
        }
    }

    .my-account-close {
        cursor: pointer;
    }
}
</style>
