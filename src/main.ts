import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import views from './utils/installViews.ts'
import 'uno.css'
import 'virtual:uno.css'
import router from './router/index.ts'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style/overwrite.css';
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)


app.use(views).use(router).use(pinia)
app.mount('#app')
