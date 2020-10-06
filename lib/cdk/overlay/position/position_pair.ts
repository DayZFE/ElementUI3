
export type HorizontalConnectionPos = 'left' | 'center' | 'right';

/** Vertical dimension of a connection point on the perimeter of the origin or overlay element. */
export type VerticalConnectionPos = 'top' | 'center' | 'bottom';


/** A connection point on the origin element. */
export interface OriginConnectionPosition {
  originX: HorizontalConnectionPos;
  originY: VerticalConnectionPos;
}

/** A connection point on the overlay element. */
export interface OverlayConnectionPosition {
  overlayX: HorizontalConnectionPos;
  overlayY: VerticalConnectionPos;
}


/** The points of the origin element and the overlay element to connect. */
export class ConnectionPositionPair {
  /** X-axis attachment point for connected overlay origin. Can be 'start', 'end', or 'center'. */
  originX: HorizontalConnectionPos;
  /** Y-axis attachment point for connected overlay origin. Can be 'top', 'bottom', or 'center'. */
  originY: VerticalConnectionPos;
  /** X-axis attachment point for connected overlay. Can be 'start', 'end', or 'center'. */
  overlayX: HorizontalConnectionPos;
  /** Y-axis attachment point for connected overlay. Can be 'top', 'bottom', or 'center'. */
  overlayY: VerticalConnectionPos;

  constructor(
    origin: OriginConnectionPosition,
    overlay: OverlayConnectionPosition,
    /** Offset along the X axis. */
    public offsetX?: number,
    /** Offset along the Y axis. */
    public offsetY?: number,
    /** Class(es) to be applied to the panel while this position is active. */
    public panelClass?: string | string[]) {

    this.originX = origin.originX;
    this.originY = origin.originY;
    this.overlayX = overlay.overlayX;
    this.overlayY = overlay.overlayY;
  }
}

