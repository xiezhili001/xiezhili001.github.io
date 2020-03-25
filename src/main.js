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

window.vm = new Vue({
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
//获取这种格式的日期：2018年X月X日 00:00:00 星期X
function dateToString(date){
	//2018年X月X日 00:00:00 星期X
	// y/m/d h:M:s
	var week = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"]

	var dateStr = "";
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var w = date.getDay();
	var h = date.getHours();
	var M = date.getMinutes();
	var s = date.getSeconds();

	dateStr += y+"年"+getDB(m)+"月"+getDB(d)+"日"
	dateStr += " " + getDB(h) + ":" + getDB(M) + ":" + getDB(s);
	dateStr += " " + week[w];
	return dateStr;
}

function getDB(num){
	return num < 10 ? "0" + num : num;
}
Vue.prototype.$dateToString = dateToString
