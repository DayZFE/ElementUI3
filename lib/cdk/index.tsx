// ! no mixin
// ! no directive
// ! no filter
// ! cdk should not have any of upper cases
// components
import { overlayPlugin } from "./overlay";
import { collectionsPlugin } from "./collections";

// default export
// import cdk from 'cdk'
// *cdx.xxx Cdk.XXX
export default {
  install(app: any, ...options: any[]) {
<<<<<<< HEAD
    overlayPlugin.install(app);
=======
    overlayPlugin.install(app, options[0]);
>>>>>>> 4c925f1d6908a00d39b9d66c7c8bcb859cab8c46
    collectionsPlugin.install(app, ...options);
  }
};

// import {xxx,xxx} from 'cdk'
// export const CdkTest = Test;

export * from "./overlay";
