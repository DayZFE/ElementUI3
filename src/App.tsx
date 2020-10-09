import { defineComponent, inject, ref } from "vue";
import {
  Alert,
  Avatar,
  globalInject,
  OverlayCompo,
  $message,
  EleUIProvider,
  getRefRect,
  Backtop,
  Badge,
} from "../lib";

const App = defineComponent({
  name: "el-app",
  setup() {
    globalInject();
    const message = inject($message)!;
    const divRef = ref<HTMLDivElement | null>(null);
    const divRect = getRefRect(divRef);
    const showModal = ref(false);
    const showModal2 = ref(false);
    return () => (
      <div>
        <Backtop />
        <div
          style={{
            position: "fixed",
            left: divRect.value.left + "px",
            top: divRect.value.top + "px",
            width: "200px",
            height: "200px",
            backgroundColor: "black",
          }}
        ></div>
        <OverlayCompo
          showBackdrop={true}
          position='center'
          show={showModal.value}
          backdropClick={() => {
            showModal.value = false;
          }}
        >
          <div style='width:100px;height:200px;background-color:white'>
            <button
              onClick={() => {
                showModal2.value = true;
              }}
            >
              打开另一个弹框
            </button>
          </div>
        </OverlayCompo>
        <OverlayCompo
          showBackdrop={true}
          position='top'
          show={showModal2.value}
          backdropClick={() => {
            showModal2.value = false;
          }}
        >
          <div style='width:100px;height:200px;background-color:white'></div>
        </OverlayCompo>

        <Badge value='快点我'>
          <button
            onClick={() => {
              showModal.value = true;
            }}
          >
            打开弹框
          </button>
        </Badge>
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
        <button onClick={() => message.info("hello")}>click me</button>
        <div style='height:200px;overflow-y:auto'>
          <div ref={divRef} style='height:1000px'></div>
        </div>
        <div style='height:3000px'></div>
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
