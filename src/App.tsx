import { defineComponent, inject, ref } from "vue";
import { $message, EleUIProvider, Dialog, Button } from "../lib";
import { Alert, Avatar } from "../lib";

const App = defineComponent({
  name: "el-app",
  setup() {
    const message = inject($message)!;
    const visible = ref(false);

    return () => (
      <div>
        <Alert
          v-slots={{ title: () => "sdfsdfdsf" }}
          showIcon={true}
          type='error'
          onClose={() => {
            console.log("closed");
          }}
        >
          this is test
        </Alert>
        <Avatar
          size='large'
          src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        ></Avatar>
        <Avatar
          size='medium'
          src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        ></Avatar>
        <Avatar
          size='small'
          src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        ></Avatar>
        <div>
          <Button round onClick={() => message.info("hello")}>click me</Button>
        </div>
        <div>
          <Button onClick={() => visible.value = true}>show Dialog</Button>
        </div>
        <div>

        </div>

        <Dialog title="提示" width="30%" v-model={[visible.value, 'visible']} v-slots={{
          footer: () => (
            <span class="dialog-footer">
              <Button onClick={() => visible.value = false}>取 消</Button>
              <Button type="primary" onClick={() => visible.value = false}>确 定</Button>
            </span>
          ),
        }}>
          <div>测试内容</div>
        </Dialog>
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
