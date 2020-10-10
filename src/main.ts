import { createApp } from "vue";
import App from "./App";
import elementPlugin from "../lib";
import "../lib/theme-chalk/lib/index.css";
import router from "./router";
import { createI18n } from "vue-i18n";

const app = createApp(App);
app.use(router).use(elementPlugin, document);
app.mount("#app");
