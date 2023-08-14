import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入字体图标
import "./assets/font/iconfont.css";//引入本地


// vant组件库安装
// https://vant-contrib.gitee.io/vant/v2/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian
// $cnpm i vant@latest-v2 -S
// $cnpm i babel-plugin-import -D
import { Button,Swipe,SwipeItem,Circle,Sticky,Slider,Toast,ShareSheet    } from 'vant';
Vue.use(Button).use(Swipe).use(SwipeItem).use(Circle).use(Sticky).use(Slider).use(Toast).use(ShareSheet);

import "swiper/dist/css/swiper.min.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
