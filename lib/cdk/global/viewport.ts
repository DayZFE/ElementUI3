import { inject, onBeforeUnmount, ref, watch } from "vue";
import { platformToken } from ".";

/**
 * current viewport rect & size
 *
 * @export
 * @class ViewPort
 */
export default class ViewPort {
  size = ref({ width: 0, height: 0 });
  rect = ref({ top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 });
  isBrowser = inject(platformToken)!.BROWSER;

  /**
   * update viewport size
   *
   * @memberof ViewPort
   */
  updateSize = () => {
    this.size.value = this.isBrowser
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 0, height: 0 };
  };

  constructor() {
    if (!this.isBrowser) return;
    this.updateSize();
    const body = document.documentElement || document.body;
    const rect = body.getBoundingClientRect();
    watch(this.size, (res) => {
      const top = -rect.top || body.scrollTop || window.scrollY;
      const left = -rect.left || body.scrollLeft || window.scrollX;
      const { width, height } = res;
      this.rect.value = {
        top,
        left,
        bottom: top + height,
        right: left + width,
        width,
        height,
      };
    });
    window.addEventListener("resize", this.updateSize);
    window.addEventListener("orientationchange", this.updateSize);

    onBeforeUnmount(() => {
      window.removeEventListener("resize", this.updateSize);
      window.removeEventListener("orientationchange", this.updateSize);
    });
  }
}
