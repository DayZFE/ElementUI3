export * from './ele-ui-provider';
export { default as Alert } from "./alert";
export { default as Avatar } from "./avatar";
export { default as Dialog } from './dialog';
export { default as Button } from './button';
import { App } from "vue";
import Cdk from './cdk';


export default {
  install(app: App, ...options: any[]) {
    Cdk.install(app, ...options);
  },
};
