import { defineComponent, ref, inject, renderSlot, onMounted, watchEffect, onUnmounted, computed, watch, CSSProperties } from 'vue';
import { ConnectionPosition, Overlay } from '../cdk';
import '../theme-chalk/src/popper.scss';


export function addEvent<E extends Element>(target: E, type: string, fn: (event: Event) => void) {
  target.addEventListener(type, fn);
  return function destroy() {
    target.removeEventListener(type, fn);
  }
}

type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

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
      default: '',
    },
    width: {
      type: Number,
      default: 0
    },
    trigger: {
      type: String as () => 'click' | 'focus' | 'hover' | 'manual',
      default: 'click',
      // validator: value => ['click', 'focus', 'hover', 'manual'].indexOf(value as string) > -1,
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

    const state = computed<{
      position: ConnectionPosition,
      arrowStyle?: CSSProperties,
      arrowPlacement: 'top' | 'left' | 'bottom' | 'right',
    }>(() => {
      switch (props.placement) {
        case 'top': return {
          position: { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
          arrowPlacement: 'top',
        };
        case 'top-start': return {
          position: { originX: 'left', originY: 'top', overlayX: 'left', overlayY: 'bottom' },
          arrowPlacement: 'top',
          arrowStyle: { left: '16px' },
        };
        case 'top-end': return {
          position: { originX: 'right', originY: 'top', overlayX: 'right', overlayY: 'bottom' },
          arrowPlacement: 'top',
          arrowStyle: { right: '16px' },
        };
        case 'bottom': return {
          position: { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
          arrowPlacement: 'bottom',
        };
        case 'bottom-start': return {
          position: { originX: 'left', originY: 'bottom', overlayX: 'right', overlayY: 'top' },
          arrowPlacement: 'bottom',
          arrowStyle: { left: '16px' },
        };
        case 'bottom-end': return {
          position: { originX: 'right', originY: 'bottom', overlayX: 'right', overlayY: 'top' },
          arrowPlacement: 'bottom',
          arrowStyle: { right: '16px' },
        };
        case 'left': return {
          position: { originX: 'center', originY: 'top', overlayX: 'left', overlayY: 'center' },
          arrowPlacement: 'left',
        };
        case 'left-start': return {
          position: { originX: 'left', originY: 'top', overlayX: 'left', overlayY: 'top' },
          arrowPlacement: 'left',
          arrowStyle: { top: '12px' },
        };
        case 'left-end': return {
          position: { originX: 'right', originY: 'top', overlayX: 'left', overlayY: 'bottom' },
          arrowPlacement: 'left',
          arrowStyle: { bottom: '12px' },
        };
        case 'right': return {
          position: { originX: 'center', originY: 'top', overlayX: 'right', overlayY: 'center' },
          arrowPlacement: 'right',
        };
        case 'right-start': return {
          position: { originX: 'left', originY: 'top', overlayX: 'right', overlayY: 'top' },
          arrowPlacement: 'right',
          arrowStyle: { top: '12px' },
        };
        case 'right-end': return {
          position: { originX: 'right', originY: 'top', overlayX: 'right', overlayY: 'bottom' },
          arrowPlacement: 'right',
          arrowStyle: { bottom: '12px' },
        };
        default: return {
          position: { originX: 'left', originY: 'top', overlayX: 'center', overlayY: 'top' },
          arrowPlacement: 'top',
        };
      }
    });

    watchEffect((onInvalidate) => {
      const fns: (() => void)[] = [];
      const target = bindingElement.value;
      if (!target) {
        return [];
      }
      if (props.trigger === 'click') {
        fns.push(addEvent(target, 'click', (event) => {

        }));
      } else if (props.trigger === 'focus') {
        fns.push(addEvent(target, 'click', (event) => {

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
      arrowStyle: state.value.arrowStyle,
      arrowPlacement: state.value.arrowPlacement
    }
  },
  render() {
    const { $props: props, $slots: slots, arrowStyle, arrowPlacement } = this;
    const hidden = (props.disabled || !props.showPopper) ? 'true' : 'false';
    return (
      <>
        <div ref={(ref) => this.bindingElement = (ref as Element).children[0]}>
          {renderSlot(slots, 'default')}
        </div>
        <Overlay v-model={[this.visible, 'visible']}>
          <div
            class={['el-popover', 'el-popper', props.popperClass, props.content && 'el-popover--plain']}
            style={{ width: `${props.width}px` }}
            aria-hidden={hidden}
            x-placement={arrowPlacement}
          >
            <div class="el-popover__title">{props.title}</div>
            {slots.content ? renderSlot(slots, 'content', { content: props.content }) : (<div>{props.content}</div>)}
            <div x-arrow class="popper__arrow" style={arrowStyle}></div>
          </div>
        </Overlay>
      </>
    );
  }
});
