export function addEvent<T extends Element | Document, K extends keyof HTMLElementEventMap>(target: T, type: K, fn: (this: T, event: HTMLElementEventMap[K]) => void) {
  target.addEventListener(type, fn as any);
  return function destroy() {
    target.removeEventListener(type, fn as any);
  }
}

export const isValidElement = (element: any) => {
  return element && element['__v_isVNode'] && typeof element.type !== 'symbol';
}

export function getElement(element: any): Element | null {
  if (element instanceof Element) {
    return element;
  }
  if (element && element.$el instanceof Element) {
    return element.$el;
  }
  return null;
};