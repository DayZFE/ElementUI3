import { defineComponent, ref, renderSlot, watchEffect, computed, watch, Transition, } from 'vue';
import { ConnectionPosition, FlexiblePositionStrategy, Overlay, provideStrategy } from '../cdk';
import '../theme-chalk/src/popper.scss';

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
type ArrowAlignment = 'start' | 'center' | 'end';


type TriggerType = 'click' | 'focus' | 'hover' | 'manual';


export function addEvent<E extends Element>(target: E, type: string, fn: (event: Event) => void) {
  target.addEventListener(type, fn);
  return function destroy() {
    target.removeEventListener(type, fn);
  }
}


export default defineComponent({
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
    showPopper: {
      type: Boolean,
      default: false,
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
    popperClass: String,
  },
  setup(props) {
    const visible = ref(false);
    const targetElement = ref<Element>();

    const strategy = new FlexiblePositionStrategy(targetElement, window);
    provideStrategy(strategy);
    watch(
      () => props.placement,
      (value) => {
        strategy.positionPair(positionMap[value]);
      },
      { immediate: true }
    );

    const arrowPlacement = computed(() => (props.placement.match(/(top|left|bottom|right)/)?.[0] || 'top') as ArrowPlacement);
    const arrowAlignment = computed(() => (props.placement.match(/(start|end)/)?.[0] || 'center') as ArrowAlignment);
    const popoverClass = computed(() => {
      const clazz = ['el-popover', 'el-popper'];
      if (props.popperClass) {
        clazz.push(props.popperClass);
      }
      if (props.content) {
        clazz.push('el-popover--plain');
      }
      return clazz;
    });

    const airaHidden = computed(() => (props.disabled || !props.showPopper) ? 'true' : 'false');

    watchEffect((onInvalidate) => {
      const fns: (() => void)[] = [];
      const target = targetElement.value;
      if (!target) {
        return;
      }
      if (props.trigger === 'click') {
        fns.push(addEvent(target, 'click', (event) => {
          visible.value = true;
        }));
      } else if (props.trigger === 'focus') {
        fns.push(addEvent(target, 'mouseenter', () => {
          visible.value = true;
        }));
        fns.push(addEvent(target, 'mouseleave', () => {
          visible.value = false;
        }));
      } else if (props.trigger === 'hover') {
        fns.push(addEvent(target, 'hover', (event) => {

        }));
      } else if (props.trigger === 'manual') {
        fns.push(addEvent(target, 'click', (event) => {

        }));
      }
      onInvalidate(() => fns.forEach(value => value()));
    });

    return {
      visible,
      targetElement,
      popoverClass,
      airaHidden,
      arrowPlacement,
      arrowAlignment,
    }
  },
  render() {
    const { $props: props, $slots: slots, arrowAlignment, arrowPlacement, popoverClass, airaHidden } = this;

    return (
      <>
        <div ref={(ref) => this.targetElement = (ref as Element).children[0] || ref}>
          {renderSlot(slots, 'default')}
        </div>
        <Overlay
          v-model={[this.visible, 'visible']}
          backgroundClass={'el-popover__background'}
        >
          <Transition name="fade-in-linear">
            <div
              v-show={this.visible}
              class={popoverClass}
              style={{ width: `${props.width}px` }}
              aria-hidden={airaHidden}
              x-placement={arrowPlacement}
              x-alignment={arrowAlignment}
            >
              <div class="el-popover__title">{props.title}</div>
              {slots.content ? renderSlot(slots, 'content', { content: props.content }) : (<div>{props.content}</div>)}
              <div x-arrow class="popper__arrow"></div>
            </div>
          </Transition>
        </Overlay>
      </>
    );
  }
});
