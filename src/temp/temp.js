import Vue from "vue";
import App from "@/App.vue";
import store from "@/helpers/store";
import env from "./../env.js";
import VueGoogleCharts from "vue-google-charts";
import VueScrollReveal from "vue-scroll-reveal";
import VueSweetalert2 from "vue-sweetalert2";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.component("v-select", vSelect);
import ProgressBar from "vuejs-progress-bar";
Vue.use(ProgressBar);
import KProgress from "k-progress";
Vue.component("k-progress", KProgress);
import VueGtag from "vue-gtag";
Vue.use(
  VueGtag,
  {
    config: { id: env.gtag_id },
  },
  router
);
Vue.use(VueSweetalert2);
Vue.use(VueGoogleCharts);
Vue.use(VueScrollReveal, {
  class: "v-scroll-reveal", // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.

  duration: 1600,
  delay: 300,
  scale: 1,
  distance: "30px",
  mobile: true,
  cleanup: true,
});
Vue.filter("formatNumber", (num, digits = 0) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
});
//import * as Sentry from "@sentry/browser";
//import { Vue as VueIntegration } from "@sentry/integrations";
//import { Integrations } from "@sentry/tracing";
import { Steps } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Steps);
import router from "@/router/index";
Vue.config.productionTip = false; // Hide the propduction tip

import moment from "moment";
Vue.prototype.moment = moment;
import clickoutEvent from "clickout-event";
Vue.use(clickoutEvent);
import VueCircle from "vue2-circle-progress";
Vue.component("vue-circle", VueCircle);
import VueEllipseProgress from "vue-ellipse-progress";
Vue.use(VueEllipseProgress);
// Vue.use(VueEllipseProgress, "vep"); you can define a name and use the plugin like <vep/>

/*

Sentry.init({

  dsn: "https://50ef0f3f8c4841bc8cb656f8d0ecb82e@o168698.ingest.sentry.io/5457193",
  integrations: [

    new VueIntegration({

      Vue,
      tracing: true,
    }),
    new Integrations.BrowserTracing(),
  ],


  // We recommend adjusting this value in production, or using tracesSampler

  // for finer control

  tracesSampleRate: 1.0,
}); 
*/

import "./assets/styles/style.css";
import "./filters/index.js";
window.app = new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
