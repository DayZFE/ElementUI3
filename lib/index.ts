export * from './ele-ui-provider';
export * from './dialog';

import { App } from 'vue';
import Cdk from './cdk';

export default {
  install(app: App, ...options: any[]) {
    Cdk.install(app, ...options);
  }
}