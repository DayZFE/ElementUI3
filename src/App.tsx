import { ComponentPublicInstance, defineComponent, Directive, inject, onMounted, ref, renderSlot } from "vue";
import { $message, EleUIProvider, Dialog, Button, Popover } from "../lib";
import { Alert, Avatar } from "../lib";

const App = defineComponent({
  name: "el-app",
  setup(_, ctx) {
    const message = inject($message)!;
    const visible = ref(false);

    const popoverProps = {
      content: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。',
      placement: "top" as 'top-start',
      title: "标题",
      width: 100,
      trigger: "click" as "hover",
    }

    return function (this: ComponentPublicInstance) {
      return (
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
          <div style="position: fixed; top: 50%; left: 50%;">
            <Popover {...popoverProps}>
              <Button style="pointer-event: auto">click popover</Button>
            </Popover>
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
      )
    }
  },
});

export default defineComponent({
  name: "element-app",
  setup() {
    return () => (
      <EleUIProvider>
        <App ><div>hello</div></App>
      </EleUIProvider>
    );
  },
});
