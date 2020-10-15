import { FlexiblePositionStrategy, provideStrategy, Overlay } from '../cdk';
import { getElement, isValidElement } from '../cdk/utils';
import { cloneVNode, computed, defineComponent, ref, renderSlot, VNode, watch, Transition } from 'vue';
import { Placement, OVERLAY_POSITION_MAP } from './types';
import { useTooltip } from './use-tooltip';

export const Tooltip = defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: '',
    },
    placement: {
      type: String as () => Placement,
      default: 'top',
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
    effect: {
      type: String as () => 'dark' | 'light' | undefined,
      default: 'dark'
    },
    transition: {
      type: String,
      default: 'el-fade-in-linear',
    },
    popperClass: {
      type: String,
      default: 'el-tooltip__popper',
    },
  },
  setup(props) {
    const state = useTooltip(props);

    const strategy = new FlexiblePositionStrategy(state.reference, window);
    provideStrategy(strategy);
    watch(
      () => props.placement,
      (value) => {
        strategy.positionPair(OVERLAY_POSITION_MAP[value]);
      },
      { immediate: true }
    );


    const popoverClass = computed(() => {
      const clazz = [props.popperClass];
      if (props.effect) {
        clazz.push(`is-${props.effect}`);
      }
      return clazz;
    });

    return {
      eltype: 'tooltip',
      popoverClass,
      ...state,
    }
  },

  render() {
    const {
      $slots: slots,
      arrowStyle,
      arrowPlacement,
      popoverClass,
      airaHidden,
      content,
      tooltipId,
      visibleArrow,
    } = this;


    let node: VNode | VNode[] | undefined = slots.default?.();
    if (node) {
      // set the reference
      const setReference = (ref: object | null) => {
        this.reference = getElement(ref)
      };
      // get the node
      node = node.length === 1 ? node[0] : node;
      if (isValidElement(node)) {
        // create a new node to set the reference
        node = cloneVNode(node as VNode, { ref: setReference }, true);
      } else {
        // set a wrapper dom for the node.
        node = (<span ref={setReference}>{node}</span>) as VNode;
      }
    }

    return (
      <>
        {node}
        <Overlay v-model={[this.visible, 'visible']} hasBackdrop={false}>
          <Transition name={this.transition}>
            <div
              v-show={this.visible}
              ref="popper"
              role="tooltip"
              id={tooltipId}
              aria-hidden={airaHidden}
              class={popoverClass}
              x-placement={arrowPlacement}
            >
              {slots.content ? renderSlot(slots, 'content') : <span>{content}</span>}
              {visibleArrow ? <div x-arrow class="popper__arrow" style={arrowStyle}></div> : undefined}
            </div>
          </Transition>
        </Overlay>
      </>
    );
  }
});