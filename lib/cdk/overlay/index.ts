import { App } from "vue";
import { OverlayService } from "./overlay_service";
import { getClassToken } from '../tools';

export * from './overlay_config';
export * from './overlay_props';
export * from './overlay_service';
export * from './overlay_state';

export const overlayToken = getClassToken(OverlayService);

export const overlayPlugin = {
  install(app: App, document: Document) {
    console.log(document);
    // only once
    let div = document.getElementById('vue-cdk-overlay');
    if (!div) {
      div = document.createElement('div');
      div.id = 'vue-cdk-overlay';
      div.className = 'vue-cdk-overlay-container';
      document.body.append(div);
    }
    app.provide(overlayToken, new OverlayService(div, document.body));
  }
}
