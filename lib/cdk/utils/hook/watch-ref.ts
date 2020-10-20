import { Ref, UnwrapRef, isRef, customRef, watch } from "vue";

export function watchRef<T extends Ref<any>, V>(arg: T, fn: (arg: UnwrapRef<T>) => V): Ref<V>;

export function watchRef<T extends any[], V>(args: T, fn: (...args: T) => V): Ref<V>;

export function watchRef<T extends any, V>(arg: T, fn: (...args: any) => V = (args) => args): Ref<V> {
  let watchSource: any;
  if (Array.isArray(arg)) {
    watchSource = () => arg;
  } else if (isRef(arg)) {
    watchSource = arg;
  } else {
    throw Error('');
  }
  return customRef((track, trigger) => {
    let value: V;
    watch(watchSource, (source) => {
      value = Array.isArray(source) ? fn(...source): fn(source);
    }, {immediate: true});

    return {
      get() {
        track();
        return value;
      },
      set(newValue: V) {
        value = newValue;
        trigger();
      }
    }
  });
}
