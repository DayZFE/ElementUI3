import {computed, watch, onUnmounted, ref } from "vue";
import { Placement, TriggerType, ArrowPlacement, OVERLAY_POSITION_MAP } from './types';
import { ESCAPE } from "../cdk/keycodes";
import { addEvent } from "../cdk/utils";
import { FlexiblePositionStrategy, provideStrategy } from '../cdk/overlay';


interface TooltipProps {
  disabled: boolean;
  placement: Placement;
  visibleArrow: boolean;
  arrowOffset: number;
  tabindex: number;
}

let tooltipCounter = 0;

export const useTooltip = (
  props: TooltipProps,
  trigger: TriggerType = 'hover',
) => {
  const visible = ref(false);
  const referenceRef = ref<HTMLElement | null>(null);
  const popperRef = ref<HTMLElement | null>(null);

  const strategy = new FlexiblePositionStrategy(referenceRef, window);
  watch(
    () => props.placement,
    (value) => {
      strategy.positionPair(OVERLAY_POSITION_MAP[value]);
    },
    { immediate: true }
  );
  provideStrategy(strategy);
  

  const tooltipId = `el-tooltip-${tooltipCounter++}`;

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

  const destroyFns: (() => void)[] = [];

  watch(() => [referenceRef.value, popperRef.value], (values) => {
    const reference = values[0];
    const popper = values[1];
    if (!(reference && popper)) {
      return;
    }
    const show = () => { visible.value = true; }
    const close = () => { visible.value = false; }

    reference.setAttribute('aria-describedby', tooltipId);
    reference.setAttribute('tabindex', `${props.tabindex}`);

    popper.setAttribute('tabindex', '0');

    if (trigger === 'click') {
      destroyFns.push(
        addEvent(reference, 'click', show),
        addEvent(reference, 'keydown', (e) => e.keyCode === ESCAPE && close()),
        addEvent(document, 'click', (e) => {
          const target = e.target as HTMLElement
          const isContain = reference.contains(target) || popper.contains(target);
          if (!isContain) {
            close();
          }
        })
      );
    } else if (trigger === 'focus') {
      if (props.tabindex < 0) {
        console.warn('[Element Warn][Popover]a negative taindex means that the element cannot be focused by tab key');
      }
      destroyFns.push(
        addEvent(reference, 'focusin', show),
        addEvent(reference, 'focusout', close),
      );
    } else if (trigger === 'hover') {
      destroyFns.push(
        addEvent(reference, 'mouseenter', show),
        addEvent(reference, 'mouseleave', close),
        addEvent(popper, 'mouseenter', show),
        addEvent(popper, 'mouseleave', close)
      );
    }
  });

  onUnmounted(() => {
    destroyFns.forEach(value => value());
  });

  return {
    visible,
    airaHidden,
    arrowStyle,
    arrowPlacement,
    tooltipId,
    reference: referenceRef,
    popper: popperRef,
  };
}