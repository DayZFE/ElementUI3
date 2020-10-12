// ! no mixin
// ! no directive
// ! no filter
// ! cdk should not have any of upper cases
// components
import { overlayPlugin } from "./overlay";
import { collectionsPlugin } from "./collections";
export * from "./lang";
export * from "./date/dataUtils";
export { default as month } from "./date/month";

// default export
// import cdk from 'cdk'
// *cdx.xxx Cdk.XXX
export default {
  install(app: any, ...options: any[]) {
    overlayPlugin.install(app, options[0]);
    collectionsPlugin.install(app, ...options);
  },
  // Test,
};

// import {xxx,xxx} from 'cdk'
// export const CdkTest = Test;

export * from "./overlay";
