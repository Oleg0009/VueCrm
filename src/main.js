import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import dataFilter from "@/filters/data.filter";
import router from "./router";
import store from "./store";
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false;
Vue.filter('data',dataFilter);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
