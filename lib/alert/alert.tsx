import { computed, defineComponent, ref, renderSlot, Transition } from "vue";

export const TYPE_CLASSES_MAP = {
  success: "el-icon-success",
  warning: "el-icon-warning",
  error: "el-icon-error",
};

export default defineComponent({
  name: "ele-alert",
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "info",
    },
    closable: {
      type: Boolean,
      default: true,
    },
    closeText: {
      type: String,
      default: "",
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: "light",
    },
  },
  setup(props, ctx) {
    const visible = ref(true);
    const close = () => {
      visible.value = false;
      console.log(visible);
    };
    const typeClass = computed(() => `el-alert--${props.type}`);
    const iconClass = computed(
      () => (TYPE_CLASSES_MAP as any)[props.type] || "el-icon-info"
    );
    const isBigIcon = computed(() =>
      props.description || ctx.slots["default"]?.() ? "is-big" : ""
    );
    const isBoldTitle = computed(() =>
      props.description || ctx.slots["default"]?.() ? "is-bold" : ""
    );

    return () => (
      <Transition name='el-alert-fade'>
        <div
          class={[
            "el-alert",
            typeClass.value,
            props.center ? "is-center" : "",
            "is-" + props.effect,
          ]}
          v-show={visible.value}
          role='alert'
        >
          {props.showIcon ? (
            <i class={["el-alert__icon", iconClass.value, isBigIcon.value]}></i>
          ) : null}

          <div class='el-alert__content'>
            {props.title || ctx.slots["title"]?.() ? (
              <span class={["el-alert__title", isBoldTitle.value]}>
                {renderSlot(ctx.slots, "title", { title: props.title })}
              </span>
            ) : null}
            {ctx.slots["default"]?.() && !props.description ? (
              <p class='el-alert__description'>
                {renderSlot(ctx.slots, "default")}
              </p>
            ) : null}
            <i
              class={{
                "el-alert__closebtn": true,
                "is-customed": props.closeText !== "",
                "el-icon-close": props.closeText === "",
              }}
              v-show={props.closable}
              onClick={close}
            >
              {props.closeText}
            </i>
          </div>
        </div>
      </Transition>
    );
  },
});
