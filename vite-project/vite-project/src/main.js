import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
const app = createApp(App)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
