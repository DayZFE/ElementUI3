import { overlayToken } from '@/cdk';
import { defineComponent, Directive, inject, renderSlot } from 'vue';

export const elPopover: Directive<Element> = {
  beforeMount(el) {
    
  }
}

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: '',
    },
    showPopper: {
      type: Boolean,
      default: '',
    },
    popperClass: String,
    reference: Object as () => Element,
  },
  setup(props, ctx) {
    if () {

    }
    const overlay = inject(overlayToken)!;
    const overlayState = overlay.create({
      strategy: overlay.createPositionStrategy('flexible', props.reference!),
    });

    return () => (
      <overlayState.element>
        <span>
          <div
            class={['el-popover', 'el-popper', props.popperClass, props.content && 'el-popover--plain']}
            ref="popper"
            v-show={!props.disabled && props.showPopper}
            style="{ width: width + 'px' }"
            role="tooltip"
            id="tooltipId"
            aria-hidden={(props.disabled || !props.showPopper) ? 'true' : 'false'}
          >
            <div class="el-popover__title" v-if="title" v-text="title"></div>
            {renderSlot(ctx.slots, 'default', { content: props.content })}
          </div>
        </span>
      </overlayState.element>
    )
  }
});
