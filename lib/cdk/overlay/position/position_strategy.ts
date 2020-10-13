import { ref } from 'vue';
import { OverlayProps } from '../overlay';

export class PositionStrategy {
  setup(): OverlayProps {
    return {
      positionedStyle: ref({}),
      containerStyle: {}
    };
  }

  apply?(overlayElement: Element): void {

  }

  disapply?(): void {

  }

  dispose(): void {

  }
}