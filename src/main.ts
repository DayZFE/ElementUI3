import { createApp } from "vue";
import App from "./App";
import elementPlugin from "../lib";
import "../lib/theme-chalk/lib/index.css";
const app = createApp(App);
app.use(elementPlugin, document);
app.mount("#app");
