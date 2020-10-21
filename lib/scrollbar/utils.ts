import { CSSProperties } from 'vue';

export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
};

export function renderThumbStyle({ move, size, bar }: { move: number, size: string, bar: { size: number, axis: 'X' | 'Y' } }) {
  const style: CSSProperties = {};
  const translate = `translate${bar.axis}(${move}%)`;

  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.WebkitTransform = translate;

  return style;
}
