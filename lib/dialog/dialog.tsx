import { overlayKey } from 'lib/cdk';
import { defineComponent, inject, renderSlot, toRef, watch } from 'vue';

export const Dialog = defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, ctx) {
    const overlayService = inject(overlayKey)!;
    const overlayState = overlayService.create({
      strategy: overlayService.createPositionStrategy('global'),
      backdropClose: false,
      backdropClick: () => {
        ctx.emit('onUpdate:visible', false);
      }
    });

    watch(toRef(props, 'visible'), (value) => {
      if (value) {
        overlayState.attach();
      } else {
        overlayState.detach();
      }
    });

    return () => (
      <>
        <overlayState.element>
          <p>{props.title || renderSlot(ctx.slots, 'title')}</p>
          <div>
            {renderSlot(ctx.slots, 'default')}
          </div>

          <div>
            {renderSlot(ctx.slots, 'footer')}
          </div>
        </overlayState.element>
      </>
    );
  }
});
