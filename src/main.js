import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import dataFilter from "@/filters/data.filter";
import messagePlugin from "@/utils/message.plugin";
import router from "./router";
import store from "./store";
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;
Vue.filter('data',dataFilter);
Vue.use(Vuelidate);
Vue.use(messagePlugin);


firebase.initializeApp({
  apiKey: "AIzaSyBpJcMYePtgl_zeepjgVWf8p4I3XI5rFMM",
  authDomain: "vue-crm-cd1fe.firebaseapp.com",
  projectId: "vue-crm-cd1fe",
  storageBucket: "vue-crm-cd1fe.appspot.com",
  messagingSenderId: "814418594874",
  appId: "1:814418594874:web:f056b40b495351347ef903",
  measurementId: "G-L6TW5LV1DL"
});


let app;
firebase.auth().onAuthStateChanged(()=>{
if(!app){
  app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
})
