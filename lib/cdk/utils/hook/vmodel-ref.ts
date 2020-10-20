import { customRef, Ref } from 'vue';

export function vmodelRef<T>(propValue: Ref<T>, setter: (value: T) => void) {
  return customRef((track, trigger) => ({
    get() {
      track();
      return propValue;
    },
    set(newValue: any) {
      setter(newValue);
      trigger();
    }
  }));
}