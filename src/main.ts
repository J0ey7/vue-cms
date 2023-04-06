import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/css/index.less'
import { setupStore } from './store'

// 按需导入的ele组件
import registerElement from './global'
import registerProperties from './global/register-properties'
const app = createApp(App)
setupStore()
// 设置全局方法
app.use(store).use(router).mount('#app')
registerElement(app)
registerProperties(app)
console.log(123)
