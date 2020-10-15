import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { globalInject, EleUIProvider } from "../lib";

const App = defineComponent({
  name: "el-app",
  setup() {
    globalInject();
    return () => <RouterView />;
  },
});

export default defineComponent({
  name: "element-app",
  setup() {
    return () => (
      <EleUIProvider>
        <App />
      </EleUIProvider>
    );
  },
});
