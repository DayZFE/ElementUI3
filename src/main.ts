import { createApp } from "vue";
import App from "./App";
import elementPlugin from "../lib";
import "../lib/theme-chalk/lib/index.css";
import router from "./router";
const app = createApp(App);
app.use(elementPlugin, document).use(router);
app.mount("#app");
