import { defineComponent, inject, onMounted, renderSlot, Transition, watch } from "vue";
import { overlayToken } from '../cdk';
import '../theme-chalk/src/dialog.scss';
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    // key: String,
    title: {
      type: String,
      default: '',
    },
    modal: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    },
    style: {
      type: String,
      default: ''
    },
    showClose: Boolean,
    beforeClose: Function,
    width: String,
  },
  setup(props, ctx) {
    const overlay = inject(overlayToken)!;
    const overlayState = overlay.create({
      strategy: overlay.createPositionStrategy('global').top('15vh').width(`${props.width || '50%'}`).centerHorizontally(),
      backdropClose: false,
      backdropClick: () => {
        hide();
      },
      hasBackdrop: true,
    });
    watch(() => props.visible, (value) => {
      if (value) {
        overlayState.attach();
      } else {
        overlayState.detach();
      }
    });

    const hide = () => {
      ctx.emit('update:visible', false);
    }

    const handleClose = () => {
      if (typeof props.beforeClose === 'function') {
        props.beforeClose(hide);
      } else {
        hide();
      }
    }

    return () => {
      const center = props.center ? 'el-dialog--center' : '';
      const footer = ctx.slots['footer'] ? (
        <div class="el-dialog__footer">
          {renderSlot(ctx.slots, 'footer')}
        </div>
      ) : undefined;
      return (
        <>
          <overlayState.element transition="dialog-fade">
            <div
              aria-modal="true"
              aria-label={props.title || 'dialog'}
              // key={props.key}
              class={`el-dialog ${props.customClass} ${center}`}
              style={`${props.style}`}
            >
              <div class="el-dialog__header">
                <span class="el-dialog__title">{props.title}</span>
                {renderSlot(ctx.slots, 'title')}
                <button
                  type="button"
                  class="el-dialog__headerbtn"
                  aria-label="Close"
                  v-show={props.showClose || true}
                  onClick={handleClose}
                >
                  <i class="el-dialog__close el-icon el-icon-close"></i>
                </button>
              </div>
              <div class="el-dialog__body">
                {renderSlot(ctx.slots, 'default')}
              </div>
              {footer}
            </div>
          </overlayState.element>
        </>
      );
    }
  }
});
