import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Moui from "./components/index";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/atom-one-dark.css";

import HeadBar from "./components/HeadBar.vue";
import MouiPage from "./components/Page.vue";

Vue.config.productionTip = false;
Moui.install(Vue);

Vue.use(VueHighlightJS);
Vue.component("mo-head", HeadBar);
Vue.component("mo-page", MouiPage);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
