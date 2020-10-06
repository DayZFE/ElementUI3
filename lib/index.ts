import { App } from "vue";
import Cdk from "./cdk";

export * from "./ele-ui-provider";
export { default as Alert } from "./alert";

export default {
  install(app: App, ...options: any[]) {
    Cdk.install(app, ...options);
  },
};
