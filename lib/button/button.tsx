import { computed, defineComponent, renderSlot } from 'vue';
import { ElButtonType } from './types';
import '../theme-chalk/src/button.scss';

export default defineComponent({
  props: {
    type: {
      type: String as () => ElButtonType,
      default: 'default'
    },
    nativeType: {
      type: String as () => "button" | "submit" | "reset",
      default: 'button',
    },
    size: String,
    icon: String,
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    onClick: Function,
  },

  setup(props, ctx) {
    const buttonSize = computed(() => props.size);
    const buttonDisabled = computed(() => props.disabled);

    return () => (
      <button
        onClick={(event) => {
          // props.onClick?.();
          ctx.emit('click', event)
        }}
        disabled={props.disabled || props.loading}
        autofocus={props.autofocus}
        type={props.nativeType}
        class={[
          'el-button',
          props.type ? `el-button--${props.type}` : '',
          buttonSize.value ? `el-button--${buttonSize.value}` : '',
          buttonDisabled.value ? 'is-disabled' : '',
          props.loading ? 'is-loading' : '',
          props.plain ? 'is-plain' : '',
          props.round ? 'is-round' : '',
          props.circle ? 'is-circle' : ''
        ]}
      >
        {props.loading ? (<i class="el-icon-loading" ></i>) : undefined}
        {props.icon && !props.loading ? (<i class={props.icon}></i>) : undefined}
        {ctx.slots.default ? (<span>{renderSlot(ctx.slots, 'default')}</span>) : undefined}
      </button>
    )
  },
});
