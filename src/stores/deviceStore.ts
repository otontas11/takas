import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import { useAuthStore } from '@/stores/authStore'
// login olmayan kullanıcılar için device_id olustup istek atılacak
//amac : device id ye göre bildirim veya ilan cesidi gösterilcek
export const useDeviceStore = defineStore('deviceStore', () => {
    const authStore = useAuthStore()
    const deviceId = useStorage('device_id', '')

    // DeviceId yoksa veya kullanıcı giriş yapmamışssa oluştur
    const initDeviceId = () => {
        if (!deviceId.value && !authStore.isAuthenticated()) {
            deviceId.value = uuidv4()
        }
        return deviceId.value
    }

    // Sadece anonim kullanıcılar için device ID'yi döndür
    const getDeviceId = () => {
        if (authStore.isAuthenticated()) {
            return null
        }
        return deviceId.value || initDeviceId()
    }

    // log-in oldugunda device id'ye ihtiyac olmayacaki, device-id silinebilir !!
    // log-out oldugunda eski device-id ile de istek atılabilir ?? device-id kalabilir !!
    const clearDeviceId = () => {
        deviceId.value = ''
    }

    return {
        deviceId,
        initDeviceId,
        getDeviceId,
        clearDeviceId
    }
})