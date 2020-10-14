import { FlexiblePositionStrategy, provideStrategy, Overlay } from '../cdk';
import { ESCAPE } from '../cdk/keycodes';
import { getElement, addEvent, isValidElement } from '../cdk/utils';
import { cloneVNode, ComponentPublicInstance, computed, defineComponent, onUnmounted, ref, renderSlot, VNode, watch, Transition } from 'vue';
import { TriggerType, Placement, ArrowPlacement, TOOLTIPS_POSITION_MAP } from './types';

let tooltipsId = 0;

export const Tooltips = defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 150
    },
    trigger: {
      type: String as () => TriggerType,
      default: 'click',
    },
    placement: {
      type: String as () => Placement,
      default: 'top',
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    arrowOffset: {
      type: Number,
      default: 8,
    },
    tabindex: {
      type: Number,
      default: 0
    },
    popperClass: String,
  },
  setup(props) {
    const visible = ref(false);

    const referenceRef = ref<ComponentPublicInstance | HTMLElement | null>(null);
    const popoverRef = ref<HTMLElement | null>(null);
    const strategy = new FlexiblePositionStrategy(referenceRef, window);
    watch(
      () => props.placement,
      (value) => {
        strategy.positionPair(TOOLTIPS_POSITION_MAP[value]);
      },
      { immediate: true }
    );
    provideStrategy(strategy);


    const popoverClass = computed(() => {
      const clazz = ['el-popover'];
      if (props.popperClass) {
        clazz.push(props.popperClass);
      }
      if (props.content) {
        clazz.push('el-popover--plain');
      }
      return clazz;
    });

    const airaHidden = computed(() => props.disabled ? 'true' : 'false');

    // get placement
    const arrowPlacement = computed(() => {
      if (!props.showArrow) {
        return;
      }
      return (props.placement.match(/(top|left|bottom|right)/)?.[0] || 'top') as ArrowPlacement;
    });

    // set the arrow's position
    const arrowStyle = computed(() => {
      if (!props.showArrow) {
        return;
      }
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

    return {
      visible,
      reference: referenceRef,
      popover: popoverRef,
      popoverClass,
      airaHidden,
      arrowPlacement,
      arrowStyle,
    }
  },

  render() {
    const { 
      $slots: slots, 
      arrowStyle, 
      arrowPlacement, 
      popoverClass, 
      airaHidden, 
      title, 
      content, 
      width,
      showArrow,
    } = this;

    let slotNode: VNode | VNode[] | undefined = slots.default?.();
    if (slotNode) {
      slotNode = slotNode.length === 1 ? slotNode[0] : slotNode;
      const node = isValidElement(slotNode) ? slotNode as VNode : (<span>{slotNode}</span>) as VNode;
      slotNode = cloneVNode(node, { ref: 'reference' });
    }

    return (
      <>
        {slotNode}
        <Overlay
          v-model={[this.visible, 'visible']}
          hasBackdrop={false}
        >
          <Transition name="fade-in-linear">
            <div
              v-show={this.visible}
              class={popoverClass}
              style={{ width: `${width}px` }}
              aria-hidden={airaHidden}
              x-placement={arrowPlacement}
              ref="popover"
            >
              <div class="el-popover__title">{title}</div>
              {slots.content ? renderSlot(slots, 'content', { content }) : (<div>{content}</div>)}
              <div x-arrow={showArrow} class="popper__arrow" style={arrowStyle}></div>
            </div>
          </Transition>
        </Overlay>
      </>
    );
  }
});