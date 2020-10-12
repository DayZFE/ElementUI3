import {
  computed,
  defineComponent,
  provide,
  renderSlot,
  Teleport,
  Transition,
} from "vue";
import "./OverlayCompo.scss";

export default defineComponent({
  name: "cdk-overlay-compo",
  props: {
    width: { type: String, default: "100px" },
    height: { type: String, default: "100px" },
    position: {
      type: String as () =>
        | "left-top"
        | "top"
        | "right-top"
        | "right"
        | "right-bottom"
        | "bottom"
        | "left-bottom"
        | "left"
        | "center",
      default: "center",
    },
    showBackdrop: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: "cdk-overlay-fade",
    },
    backdropClick: {
      type: Function,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const contentStyle = computed(() => {
      switch (props.position) {
        case "left":
          return { left: 0, top: "50%", transform: "translate(0,-50%)" };
        case "left-top":
          return { left: 0, top: 0 };
        case "top":
          return { left: "50%", top: 0, transform: "translate(-50%,0)" };
        case "right-top":
          return { right: 0, top: 0 };
        case "right":
          return { right: 0, top: "50%", transform: "translate(0,-50%)" };
        case "right-bottom":
          return { right: 0, bottom: 0 };
        case "bottom":
          return { left: "50%", bottom: 0, transform: "translate(-50%,0)" };
        case "left-bottom":
          return { left: 0, bottom: 0 };
        case "center":
          return { left: "50%", top: "50%", transform: "translate(-50%,-50%)" };
        default:
          return { left: "50%", top: "50%", transform: "translate(-50%,-50%)" };
      }
    });
    return () => (
      <Teleport to='#cdk-overlay-anchor'>
        <Transition
          name={props.transition}
          persisted
          appear
          v-show={props.show}
        >
          <div class='cdk-overlay-compo'>
            <div
              class='cdk-overlay-backdrop'
              v-show={props.showBackdrop}
              onClick={props.backdropClick as any}
            ></div>
            <div class='cdk-overlay-content' style={contentStyle.value}>
              {renderSlot(ctx.slots, "default")}
            </div>
          </div>
        </Transition>
      </Teleport>
    );
  },
});
