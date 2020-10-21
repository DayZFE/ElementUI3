import { ref } from 'vue';
import { OverlayProps } from '../overlay';

export abstract class PositionStrategy {
  setup(): OverlayProps {
    return {
      positionedStyle: ref({}),
      containerStyle: {}
    };
  }

  apply?(overlayElement: Element): void;

  disapply?(): void;

  abstract dispose(): void;
}