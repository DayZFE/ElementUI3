import { defineComponent, inject, ref } from "vue";
import {
  Alert,
  Avatar,
  OverlayCompo,
  $message,
  getRefRect,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
} from "../../lib";
export default defineComponent({
  name: "home",
  setup() {
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
            zIndex: 999,
          }}
        >
          <Alert closable={false} type='success'>
            测试滑动overlay
          </Alert>
        </div>
        <OverlayCompo
          showBackdrop={true}
          position='center'
          show={showModal.value}
          backdropClick={() => {
            showModal.value = false;
          }}
        >
          <div style='width:100px;height:200px;background-color:white'>
            <Button
              type='primary'
              onClick={() => {
                showModal2.value = true;
              }}
            >
              打开另一个弹框
            </Button>
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
          <Button
            type='primary'
            onClick={() => {
              showModal.value = true;
            }}
          >
            打开弹框
          </Button>
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
        <Button type='danger' onClick={() => message.info("hello")}>
          打开消息
        </Button>
        <div>
          <Breadcrumb
            onSelected={(e: string) => {
              console.log(e);
            }}
          >
            <BreadcrumbItem value='123'>test</BreadcrumbItem>
            <BreadcrumbItem value='234'>test</BreadcrumbItem>
            <BreadcrumbItem value='345'>test</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <p>
          <Button type='primary'>test</Button>
          <Button icon='el-icon-search' circle></Button>
          <Button type='primary' icon='el-icon-edit' circle></Button>
          <Button type='success' icon='el-icon-check' circle></Button>
          <Button type='info' icon='el-icon-message' circle></Button>
          <Button type='warning' icon='el-icon-star-off' circle></Button>
          <Button type='danger' icon='el-icon-delete' circle></Button>
        </p>
        <p>
          <ButtonGroup>
            <Button type='primary' icon='el-icon-arrow-left'>
              上一页
            </Button>
            <Button type='primary'>
              下一页<i class='el-icon-arrow-right el-icon--right'></i>
            </Button>
          </ButtonGroup>
        </p>

        <div style='height:200px;overflow-y:auto'>
          <div ref={divRef} style='height:1000px'></div>
        </div>
        <div style='height:3000px'></div>
      </div>
    );
  },
});
