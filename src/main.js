import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import axios from './static/js/axios'
Vue.prototype.$axios = axios
Vue.use(ElementUI, {
  size: 'small'
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// 封装方法
Object.defineProperty(Vue.prototype, '$messageTips', {
  value: function (mes, type = 'warning', duration = 1500) {
    this.$message({
      message: mes,
      type: type,
      duration: duration,
      offset: 40
    });
  }
});
