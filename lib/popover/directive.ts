import { Directive } from 'vue';

export const vPopover: Directive = {
  mounted(el, binding, vnode) {
    const instance = binding.instance;
    if (!instance || !instance.$refs) {
      return;
    }
    const popper = instance.$refs[binding.value] as any;
    if (popper) {
      popper.reference = el;
    }
  }
}