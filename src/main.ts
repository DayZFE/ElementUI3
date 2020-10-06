import { createApp } from "vue";
import App from "./App";
import elementPlugin from '../lib';
const app = createApp(App);
app.use(elementPlugin, document);
app.mount("#app");