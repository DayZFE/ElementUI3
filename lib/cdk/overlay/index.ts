import { App } from "vue";

export * from './overlay_config';
export * from './overlay_props';
export * from './overlay_state';
export * from './position/position_pair';

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
  }
}
