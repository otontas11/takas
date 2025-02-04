

import { createApp } from 'vue'
import App from './App.vue'
import { IonicVue } from '@ionic/vue'
import { createPinia } from 'pinia'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

// Theme variables
import '@/scss/style.scss'

const app = createApp(App)
export const pinia = createPinia()

// Google Login
const clientId = '921124018442-l0abp51oh0imtkr26qmpl7vukrosflo2.apps.googleusercontent.com'
app.use(vue3GoogleLogin, { clientId })
app.use(IonicVue)
app.use(pinia)
app.use(router)

router.isReady().then(() => {
    app.mount('#app');

}).catch((err) => {
    console.error("Router yüklenirken hata oluştu:", err);
});

