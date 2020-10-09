import { defineComponent, inject, reactive, ref, watch } from "vue";
import { $message, EleUIProvider, EleDialog} from '../lib';

const App = () => {
  const message = inject($message)!;
  const visible = ref(false);
  
  
  return (
    <div>
      <button onClick={() => message.info('hello')}>click me</button>

      <button onClick={() => visible.value = true}>show Dialog</button>

      <EleDialog visible={visible.value}>
        <div>test</div>
      </EleDialog>
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
