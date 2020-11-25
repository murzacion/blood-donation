import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/tailwind.css";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

const firebaseConfig = {
  apiKey: "AIzaSyBx7rfYcre4pDKCH-qe19V9e2CPY_M3Tb8",
  authDomain: "blooddonation-ffec6.firebaseapp.com",
  databaseURL: "https://blooddonation-ffec6.firebaseio.com",
  projectId: "blooddonation-ffec6",
  storageBucket: "blooddonation-ffec6.appspot.com",
  messagingSenderId: "663488745067",
  appId: "1:663488745067:web:32219728f38219ba0aeb2e",
  measurementId: "G-TBCDLBJEP3"
};

firebase.initializeApp(firebaseConfig);

router.push({ name: "Start" });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
