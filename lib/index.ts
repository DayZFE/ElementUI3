import { App } from "vue";

export * from "./ele-ui-provider";
import Cdk from "./cdk";

export { default as Alert } from "./alert/alert";
import "../lib/theme-chalk/lib/index.css";

export default {
  install(app: App, ...options: any[]) {
    Cdk.install(app, ...options);
  },
};
