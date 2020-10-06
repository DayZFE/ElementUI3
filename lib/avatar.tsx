import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ele-avatar",
  props: {
    size: {
      type: [Number, String],
      default: "2em",
    },
    shape: {
      type: String,
      default: "circle",
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: "cover",
    },
  },
  setup(props) {},
});
