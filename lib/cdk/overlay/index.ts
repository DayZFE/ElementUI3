import { App } from "vue";

export * from './overlay';
export * from './position/position_pair';
export * from './position/global_position_strategy';
export * from './position/flexible_position_strategy';


export const overlayPlugin = {
  install(app: App, document: Document) {
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
