<<<<<<< HEAD
import { App } from 'vue';
import Cdk from './cdk';

export * from './ele-ui-provider';
=======
import { App } from "vue";

export * from "./ele-ui-provider";
import Cdk from "./cdk";

export { default as Alert } from "./alert";
>>>>>>> 4c925f1d6908a00d39b9d66c7c8bcb859cab8c46

export default {
  install(app: App, ...options: any[]) {
    Cdk.install(app, ...options);
  },
};
