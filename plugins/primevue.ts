import PrimeVue from 'primevue/config'
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import ConfirmPopup from 'primevue/confirmpopup'
import ConfirmationService from 'primevue/confirmationservice';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.component("Toast", Toast);
    nuxtApp.vueApp.use(ConfirmationService);
    nuxtApp.vueApp.component("confirm",ConfirmPopup);
    nuxtApp.provide('toast', nuxtApp.vueApp.config.globalProperties.$toast)
})