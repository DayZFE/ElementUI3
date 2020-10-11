import { createApp } from "vue";
import App from "./App";
import elementPlugin from "../lib";
import "../lib/theme-chalk/src/index.scss";
const app = createApp(App);
app.use(elementPlugin, document);
app.mount("#app");
