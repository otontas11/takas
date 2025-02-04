import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useDeviceStore } from '@/stores/deviceStore';

export const useAuthStore = defineStore('authStore', () => {
    const isAuthenticated = () => {
        return accessToken.value !== null && accessToken.value !== '';
    }

    // Access Token
    const accessToken = useStorage<any>('access_token', '');
    const accessTokenSet = (value: string) => {
        accessToken.value = value;
    }
    const accessTokenClear = () => {
        accessToken.value = ''
    }


    const user = useStorage<any>('user', {
        user_code: null,
        name: null,
        last_name: null,
        email: null,
        phone: null,
        photo: null,
        google_id: null,
        phone_verified_at: null
    })

    const userSet = (value: any) => {
        user.value = {
            user_code: value?.user_code || value,
            name: value?.name || value,
            last_name: value?.last_name || '',
            email: value?.email || value,
            phone: value?.phone || '',
            phone_verified_at: value?.phone_verified_at || '',
            photo: value?.photo || "",
            google_id: value?.google_id || value
        }
    }
    const userClear = () => {
        user.value = {
            user_code: null,
            name: null,
            last_name: null,
            email: null,
            phone: null,
            phone_verified_at: null,
            photo: null,
            google_id: null
        }
    }

    const logout = async() => {
        accessTokenClear()
        userClear()

        const existingDeviceId = localStorage.getItem('device_id');
        localStorage.clear()

        // eger eski bir device_id var ise bunu silme, logut olmuş kullanıcıya eski device_id si ile ilişkilendirmiş verileri gosterebileceğiz
        if (existingDeviceId) {
            localStorage.setItem('device_id', existingDeviceId);
        } else {
            // Eğer yoksa yeni bir device ID oluştur
            const deviceStore = useDeviceStore();
            deviceStore.initDeviceId();
        }

        return true
    }

    return {
        isAuthenticated,
        accessToken,
        accessTokenSet,
        accessTokenClear,
        user,
        userSet,
        userClear,
        logout
    };
});
