import { computed, defineComponent, inject, renderSlot } from "vue";

export const ButtonGroup = defineComponent({
  name: "ele-button-group",
  setup(_, ctx) {
    return () => (
      <div class='el-button-group'>{renderSlot(ctx.slots, "default")}</div>
    );
  },
});

export default defineComponent({
  name: "ele-button",
  props: {
    type: {
      type: String as () =>
        | "primary"
        | "success"
        | "warning"
        | "danger"
        | "info"
        | "text"
        | "default",
      default: "default",
    },
    size: {
      type: String as () => "medium" | "small" | "mini",
      default: "medium",
    },
    icon: {
      type: String,
      default: "",
    },
    nativeType: {
      type: String as () => "button" | "submit" | "reset",
      default: "button",
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  emits: ["click"],
  setup(props, ctx) {
    const formItem = inject("ele-form-item", { disabled: false, size: "" });
    const buttonDisabled = computed(() => formItem.disabled || props.disabled);
    const buttonSize = computed(
      () => formItem.size || props.size || inject("ele-global-size")
    );

    return () => (
      <button
        onClick={() => {
          ctx.emit("click");
          props.onClick();
        }}
        disabled={buttonDisabled.value || props.loading}
        autofocus={props.autofocus}
        type={props.nativeType}
        class={[
          "el-button",
          props.type ? "el-button--" + props.type : "",
          buttonSize.value ? "el-button--" + buttonSize.value : "",
          {
            "is-disabled": buttonDisabled.value,
            "is-loading": props.loading,
            "is-plain": props.plain,
            "is-round": props.round,
            "is-circle": props.circle,
          },
        ]}
      >
        {props.loading ? <i class='el-icon-loading' v-if='loading'></i> : null}
        {props.icon && !props.loading ? <i class={props.icon}></i> : null}
        {renderSlot(ctx.slots, "default")}
      </button>
    );
  },
});
