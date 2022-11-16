import Vue from "vue";
import App from "./App";
import VueTailwind from "vue-tailwind";

import API from "./stash/ApiTests";

import "./index.css";

Vue.use(VueTailwind, {});

Vue.config.productionTip = false;

new Vue({
  render: (h) =>
    h(App, { props: { connection: "API", connectionEndpoints: API } }),
}).$mount("#mongo-query-builder-app");

export default App;
