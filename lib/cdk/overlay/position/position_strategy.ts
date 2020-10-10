import { OverlayProps } from '../overlay_props';



export interface PositionStrategy {
  setup(): OverlayProps;

  apply?(overlayWrapper: Element): void;

  disapply?(): void;

  dispose(): void;
}