import { ConnectionPosition, FlexiblePositionStrategy, provideStrategy, Overlay } from '../cdk';
import { defineComponent, ref, watch, computed, renderSlot, Transition, onUnmounted, VNode, cloneVNode, ComponentInternalInstance, ComponentPublicInstance, Ref, readonly } from 'vue';
import '../theme-chalk/src/popper.scss';
import { ESCAPE } from '../cdk/keycodes';
import { addEvent, getElement, isValidElement } from '../cdk/utils';

const positionMap: { [key in string]: ConnectionPosition } = {
  'top': { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
  'top-start': { originX: 'left', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
  'top-end': { originX: 'right', originY: 'top', overlayX: 'right', overlayY: 'bottom' },
  'bottom': { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
  'bottom-start': { originX: 'left', originY: 'bottom', overlayX: 'left', overlayY: 'top' },
  'bottom-end': { originX: 'right', originY: 'bottom', overlayX: 'right', overlayY: 'top' },
  'left': { originX: 'left', originY: 'center', overlayX: 'right', overlayY: 'center' },
  'left-start': { originX: 'left', originY: 'top', overlayX: 'right', overlayY: 'top' },
  'left-end': { originX: 'left', originY: 'bottom', overlayX: 'right', overlayY: 'bottom' },
  'right': { originX: 'right', originY: 'center', overlayX: 'left', overlayY: 'center' },
  'right-start': { originX: 'right', originY: 'top', overlayX: 'left', overlayY: 'top' },
  'right-end': { originX: 'right', originY: 'bottom', overlayX: 'left', overlayY: 'bottom' },
}

type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

type ArrowPlacement = 'top' | 'left' | 'bottom' | 'right';

type TriggerType = 'click' | 'focus' | 'hover';

let popoverId = 0;


export const Popover = defineComponent({
  name: 'el-popover',
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
        strategy.positionPair(positionMap[value]);
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
      reference.setAttribute('aria-describedby', `el-popover-${popoverId++}`);
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
    const { $props: props, $slots: slots, arrowStyle, arrowPlacement, popoverClass, airaHidden } = this;
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
              style={{ width: `${props.width}px` }}
              aria-hidden={airaHidden}
              x-placement={arrowPlacement}
              ref="popover"
            >
              <div class="el-popover__title">{props.title}</div>
              {slots.content ? renderSlot(slots, 'content', { content: props.content }) : (<div>{props.content}</div>)}
              <div x-arrow class="popper__arrow" style={arrowStyle}></div>
            </div>
          </Transition>
        </Overlay>
      </>
    );
  }
});
