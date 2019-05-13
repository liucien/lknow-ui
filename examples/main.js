import Vue from 'vue'
import App from './App.vue'
import router from './router'

//导入组件库(package文件夹)
import LKnowUI from '~/';
//注册组件库
Vue.use(LKnowUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
