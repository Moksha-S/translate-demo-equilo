import Vue from "vue";
import App from "@/App.vue";
import vuetify from './plugins/vuetify'
import "./assets/css/style.css";
Vue.config.productionTip = false; // Hide the propduction tip
// import vSelect from "vue-select";
// Vue.component("v-select", vSelect);
// import clickoutEvent from "clickout-event";
// Vue.use(clickoutEvent);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

