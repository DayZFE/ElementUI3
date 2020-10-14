import { ESCAPE } from "../cdk/keycodes";
import { ConnectionPosition } from '../cdk/overlay';
import { getElement, addEvent } from "../cdk/utils";
import { Ref, ComponentPublicInstance, computed, watch, onUnmounted, readonly } from "vue";
import { Placement, TriggerType, ArrowPlacement } from './types';


interface TooltipsProps {
  disabled: boolean;
  visible: boolean;
  placement: Placement;
  showArrow: boolean;
  arrowOffset: number;
  tabindex: number;
  trigger: TriggerType;
}

let tooltipsId = 0;

export const useTooltips = (
  props: TooltipsProps, 
  referenceRef: Ref<HTMLElement | ComponentPublicInstance>, 
  popoverRef: Ref<HTMLElement>,
  visible: Ref<boolean>,
) => {
  const airaHidden = computed(() => props.disabled ? 'true' : 'false');

  // get placement
  const arrowPlacement = computed(() => (props.placement.match(/(top|left|bottom|right)/)?.[0] || 'top') as ArrowPlacement);

  // set the arrow's position
  const arrowStyle = computed(() => {
    const alignment = props.placement.match(/(start|end)/)?.[0] || 'center';
    if (alignment == 'center') {
      switch (arrowPlacement.value) {
        case 'top':
        case 'bottom':
          return { left: '50%', transform: 'translateX(-50%)' };
        case 'left':
        case 'right':
          return { top: '50%', transform: 'translateY(-50%)' };
      }
    } else {
      switch (arrowPlacement.value) {
        case 'top':
        case 'bottom':
          const horizontal = alignment === 'start' ? 'left' : 'right';
          return { [horizontal]: `${props.arrowOffset || 8}px` };
        case 'left':
        case 'right':
          const vertical = alignment === 'start' ? 'top' : 'bottom';
          return { [vertical]: `${props.arrowOffset || 8}px` };
      }
    }
  });

  const fns: (() => void)[] = [];

  watch(() => [referenceRef.value, popoverRef.value], (values) => {
    const reference = getElement(values[0]);
    const popper = getElement(values[1]);
    if (!(reference && popper)) {
      return;
    }
    const show = () => { visible.value = true; }
    const close = () => { visible.value = false; }

    reference.classList.add('el-popover__reference');
    reference.setAttribute('aria-describedby', `el-popover-${tooltipsId++}`);
    // set tab sequence
    reference.setAttribute('tabindex', `${props.tabindex}`);
    popper.setAttribute('tabindex', '0');

    if (props.trigger === 'click') {
      fns.push(addEvent(reference, 'click', show));
      fns.push(addEvent(document, 'click', (e) => {
        if (e.target instanceof HTMLElement && (reference.contains(e.target) || popper.contains(e.target))) {
          return;
        }
        visible.value = false;
      }));
      fns.push(addEvent(reference, 'keydown', (e) => {
        if (e.keyCode === ESCAPE) {
          close();
        }
        console.log(e);
      }));
    } else if (props.trigger === 'focus') {
      if (props.tabindex < 0) {
        console.warn('[Element Warn][Popover]a negative taindex means that the element cannot be focused by tab key');
      }
      fns.push(addEvent(reference, 'focusin', show));
      fns.push(addEvent(reference, 'focusout', close));

    } else if (props.trigger === 'hover') {
      fns.push(addEvent(reference, 'mouseenter', show));
      fns.push(addEvent(reference, 'mouseleave', close));
      fns.push(addEvent(popper, 'mouseenter', show));
      fns.push(addEvent(popper, 'mouseleave', close));
    } else if (props.trigger === 'manual') {
      fns.push(addEvent(reference, 'click', show));
      fns.push(addEvent(document, 'click', (e) => {
        if (e.target instanceof HTMLElement && (reference.contains(e.target) || popper.contains(e.target))) {
          return;
        }
        visible.value = false;
      }));
    }
  });

  onUnmounted(() => {
    fns.forEach(value => value());
  });

  return readonly({
    airaHidden,
    arrowStyle,
    arrowPlacement,
  });
}