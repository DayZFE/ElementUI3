export function thenable<T>(obj: any): obj is PromiseLike<T> {
  return obj && typeof obj === 'object' && obj.then;
}

export function isXHR(obj: any): obj is XMLHttpRequest {
  return obj instanceof XMLHttpRequest;
}


export { isObject } from 'lodash-es';

export const isEquals = <T1 extends any, T2 extends any>(a: T1, b: T2) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
