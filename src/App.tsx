import { defineComponent, inject } from "vue";
import { $message, EleUIProvider } from "../lib";
import { Alert } from "../lib";

const App = defineComponent({
  name: "el-app",
  setup() {
    const message = inject($message)!;
    return () => (
      <div>
        <Alert v-slots={{ title: () => "sdfsdfdsf" }} showIcon={true}>
          this is test
        </Alert>
        <button onClick={() => message.info("hello")}>click me</button>
      </div>
    );
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
