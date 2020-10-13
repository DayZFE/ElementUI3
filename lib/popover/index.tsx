import { defineComponent, ref, inject, renderSlot, onMounted, watchEffect, onUnmounted, computed, watch, CSSProperties, Transition, toRef, reactive } from 'vue';
import { ConnectionPosition, FlexiblePositionStrategy, Overlay, provideStrategy } from '../cdk';
import '../theme-chalk/src/popper.scss';

const positionMap: { [key in string]: ConnectionPosition } = {
  'top': { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
  'top-start': { originX: 'left', originY: 'top', overlayX: 'left', overlayY: 'bottom' },
  'top-end': { originX: 'left', originY: 'top', overlayX: 'left', overlayY: 'bottom' },
  'bottom': { originX: 'right', originY: 'top', overlayX: 'right', overlayY: 'bottom' },
  'bottom-start': { originX: 'left', originY: 'bottom', overlayX: 'right', overlayY: 'top' },
  'bottom-end': { originX: 'right', originY: 'bottom', overlayX: 'right', overlayY: 'top' },
  'left': { originX: 'center', originY: 'top', overlayX: 'left', overlayY: 'center' },
  'left-start': { originX: 'left', originY: 'top', overlayX: 'left', overlayY: 'top' },
  'left-end': { originX: 'right', originY: 'top', overlayX: 'left', overlayY: 'bottom' },
  'right': { originX: 'center', originY: 'top', overlayX: 'right', overlayY: 'center' },
  'right-start': { originX: 'left', originY: 'top', overlayX: 'right', overlayY: 'top' },
  'right-end': { originX: 'right', originY: 'top', overlayX: 'right', overlayY: 'bottom' },
}


type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

type ArrowPlacement = 'top' | 'left' | 'bottom' | 'right';

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
    const bindingElement = ref<Element>();

    const state = computed(() => {
      return {
        position: positionMap[props.placement],
        arrowStyle: {} as CSSProperties,
        arrowPlacement: (props.placement.match(/(top|left|bottom|right)/)?.[0] || 'top') as ArrowPlacement,
      };
    });

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

    provideStrategy( new FlexiblePositionStrategy(bindingElement, window).positionPair(state.value.position));
    
    watchEffect((onInvalidate) => {
      const fns: (() => void)[] = [];
      const target = bindingElement.value;
      if (!target) {
        return [];
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
      bindingElement,
      popoverClass,
      arrowPlacement: state.value.arrowPlacement,
      arrowStyle: state.value.arrowStyle,
      position: state.value.position,
    }
  },
  render() {
    const { $props: props, $slots: slots, arrowStyle, arrowPlacement, position, popoverClass } = this;
    const hidden = (props.disabled || !props.showPopper) ? 'true' : 'false';
    return (
      <>
        <div ref={(ref) => this.bindingElement = (ref as Element).children[0] || ref}>
          {renderSlot(slots, 'default')}
        </div>
        <Overlay
          v-model={[this.visible, 'visible']}
          backgroundClass={'el-popover__background'}
        >
          <Transition name="el-dialog-fade">
            <div
              v-show={this.visible}
              class={popoverClass}
              style={{ width: `${props.width}px` }}
              aria-hidden={hidden}
              x-placement={arrowPlacement}
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
