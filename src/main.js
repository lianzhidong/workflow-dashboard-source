/*
 * @Description:
 * @Version: 2.0
 * @Autor: Lianzhidong
 * @Date: 2021-06-28 17:23:30
 * @LastEditors: Lianzhidong
 * @LastEditTime: 2021-07-12 10:47:23
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import CtgIcon from "@/components/CtgIcon";
import ElementUI from "element-ui";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component("CtgIcon", CtgIcon);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
