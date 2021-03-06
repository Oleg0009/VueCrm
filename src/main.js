import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import dataFilter from "@/filters/data.filter";
import messagePlugin from "@/utils/message.plugin";
import router from "./router";
import store from "./store";
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false;
Vue.filter('data',dataFilter);
Vue.use(Vuelidate);
Vue.use(messagePlugin);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
