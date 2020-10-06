// ! no mixin
// ! no directive
// ! no filter
// ! cdk should not have any of upper cases
// components
import { overlayPlugin } from "./overlay";
import { collectionsPlugin } from './collections';

// default export
// import cdk from 'cdk'
// *cdx.xxx Cdk.XXX
export default {
  install(app: any, ...options: any[]) {
    overlayPlugin.install(app);
    collectionsPlugin.install(app, ...options);
  }
};

// import {xxx,xxx} from 'cdk'
// export const CdkTest = Test;

export * from './overlay';
