import { App } from "vue";

export * from "./ele-ui-provider";
import Cdk from "./cdk";

export { default as Alert } from "./alert";
export { default as Avatar } from "./avatar";
export { default as OverlayCompo } from "./cdk/OverlayCompo";
export { default as Backtop } from "./backtop";
export { default as Badge } from "./badge";
export {
  default as globalInject,
  platformToken,
  breakpointToken,
  bidirectionToken,
  clipboardToken,
  viewportToken,
} from "./cdk/global";
export * from "./cdk/tools";

export default {
  install(app: App, ...options: any[]) {
    Cdk.install(app, ...options);
  },
};
