import axios from 'axios';
import { useDeviceStore } from '@/stores/deviceStore';
import { useAuthStore } from '@/stores/authStore';

// const baseUrl = 'https://api.takasimo.com/api/';
 const baseUrl = 'https://ap1.takasimo.com/api'

const api = axios.create({
    baseURL: baseUrl
})

api.interceptors.request.use((config) => {
    const deviceStore = useDeviceStore();
    const authStore = useAuthStore();

    // Auth token varsa ekle
    if (authStore.isAuthenticated()) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    } else {
        // Kullncı giriş yapmamış ise device-id ile istek atılıacak
        const anonymousId = deviceStore.getDeviceId();
        if (anonymousId) {
            config.headers['device-id'] = `${anonymousId}`;
        }
    }

    return config;
})

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;
