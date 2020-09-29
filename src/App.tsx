import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "element-app",
  setup() {
    return () => (
      <div>
        <RouterView />
      </div>
    );
  },
});
