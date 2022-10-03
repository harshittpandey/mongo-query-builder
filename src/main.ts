import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueTailwind from "vue-tailwind";

import "./index.css";

Vue.use(VueTailwind, {});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
