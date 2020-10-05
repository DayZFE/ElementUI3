import { defineComponent, inject } from "vue";
import { $message, EleUIProvider } from '../lib';


const App = () => {
  const message = inject($message)!;
  return (
    <div>
      <button onClick={() => message.info('hello')}>click me</button>
    </div>
  );
}

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
