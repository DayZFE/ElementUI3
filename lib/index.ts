import { App } from "vue";

export * from "./ele-ui-provider";
import Cdk from "./cdk";

export { default as Alert } from "./alert";
export { default as Avatar } from "./avatar";

export default {
  install(app: App, ...options: any[]) {
    Cdk.install(app, ...options);
  },
};
