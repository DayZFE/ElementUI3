import { computed, InjectionKey, nextTick, Ref, ref, watch } from "vue";

/**
 * *handle typescript type by function
 * get a token from a function
 *
 * @export
 * @template T
 * @param {(...args: any[]) => T} func
 * @param {string} [name]
 * @returns {InjectionKey<T>}
 */
export function getFuncToken<T>(
  func: (...args: any[]) => T,
  name?: string
): InjectionKey<T> {
  if (name) {
    return name as any;
  }
  return Symbol();
}

/**
 * *handle typescript type by function
 * get a token from class
 *
 * @export
 * @template T
 * @param {{ new (...args: any[]): T }} constructor
 * @param {string} [name]
 * @returns {InjectionKey<T>}
 */
export function getClassToken<T>(
  constructor: { new (...args: any[]): T },
  name?: string
): InjectionKey<T> {
  if (name) {
    return name as any;
  }
  return Symbol();
}

/**
 * mark a component or service to dirty
 * so that all the value will reactive once
 * use added number to ensure check every time
 *
 * @export
 * @returns
 */
export function markDirty() {
  const dirtyNum = ref(0);
  const dirty = computed(() => {
    return dirtyNum.value % 2 === 1 ? null : undefined;
  });
  const mark = () => {
    dirtyNum.value++;
  };
  return {
    dirty,
    mark,
  };
}

/**
 * sub component react to service's dirty ref
 *
 * @export
 * @param {(Ref<null | undefined>)} dirty
 * @returns
 */
export function reactToService(dirty: Ref<null | undefined>) {
  const { dirty: localDirty, mark } = markDirty();
  watch(dirty, mark);
  return localDirty;
}
