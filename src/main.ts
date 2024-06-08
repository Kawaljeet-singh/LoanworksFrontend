import { createPinia } from "pinia";
import { Quasar } from "quasar";
import { createApp } from "vue";

import App from "@/App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from "./router";

import AppLayout from "@/layouts/AppLayout.vue";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import "./index.css";
//  @tanstack/vue-query
// import { VueQueryPlugin } from "@tanstack/vue-query";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import specific icons */
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronDown,
  faDollarSign,
  faEnvelope,
  faGreaterThan,
} from "@fortawesome/free-solid-svg-icons";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
const app = createApp(App);
/* add icons to the library */
library.add(
  faGreaterThan,
  faDollarSign,
  faChevronDown,
  faCircleCheck,
  faEnvelope,
  faChevronCircleLeft,
  faChevronCircleRight
);

pinia.use(piniaPluginPersistedstate);

app.use(VueQueryPlugin);
app.use(pinia);
app.use(router);
app.use(Toast);
app.use(VueQueryPlugin);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});
app.component("AppLayout", AppLayout);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
