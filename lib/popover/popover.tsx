import { defineComponent, ref, watch, computed, renderSlot, Transition, VNode, cloneVNode } from 'vue';
import { FlexiblePositionStrategy, provideStrategy, Overlay } from '../cdk/overlay';
import { getElement, isValidElement } from '../cdk/utils';
import { useTooltip } from '../tooltip';
import '../theme-chalk/src/popover.scss';
import { OVERLAY_POSITION_MAP, Placement, TriggerType } from '../tooltip';

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
    placement: {
      type: String as () => Placement,
      default: 'top',
    },
    trigger: {
      type: String as () => TriggerType,
      default: 'click',
    },
    visibleArrow: {
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
    enterable: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'el-fade-in-linear'
    },
    popperClass: String,
  },
  setup(props) {
    const state = useTooltip(props, props.trigger);
    const strategy = new FlexiblePositionStrategy(state.reference, window);
    watch(
      () => props.placement,
      (value) => {
        strategy.positionPair(OVERLAY_POSITION_MAP[value]);
      },
      { immediate: true }
    );
    provideStrategy(strategy);


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

    return {
      eltype: 'popover',
      popoverClass,
      ...state
    }
  },

  render() {
    const {
      $slots: slots,
      title,
      width,
      content,
      arrowStyle,
      arrowPlacement,
      popoverClass,
      airaHidden
    } = this;
    let node: VNode | VNode[] | undefined = slots.default?.();
    if (node) {
      node = node.length === 1 ? node[0] : node;
      const setReference = (ref: object | null) => { 
        this.reference = getElement(ref) 
      };
      if (isValidElement(node)) {
        node = cloneVNode(node as VNode, { ref: setReference }, true);
      } else {
        node = (<span ref={setReference}>{node}</span>) as VNode;
      }
    }

    return (
      <>
        {node}
        <Overlay v-model={[this.visible, 'visible']} hasBackdrop={false}>
          <Transition name={this.transition}>
            <div
              ref="popper"
              v-show={this.visible}
              class={popoverClass}
              style={{ width: `${width}px` }}
              aria-hidden={airaHidden}
              x-placement={arrowPlacement}
            >
              <div class="el-popover__title">{title}</div>
              {slots.content ? renderSlot(slots, 'content') : (<div>{content}</div>)}
              <div x-arrow class="popper__arrow" style={arrowStyle}></div>
            </div>
          </Transition>
        </Overlay>
      </>
    );
  }
});
