import { defineComponent, inject, ref } from "vue";
import {
  Alert,
  Avatar,
  $message,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  vPopover,
  vTooltip,
  Dialog,
  Popover,
  Tooltip,
  $notify,
  vPopconfirm,
  Popconfirm,
  Tag,
  Upload,
  Progress,
} from "../../lib";

export default defineComponent({
  name: "home",
  directives: {
    'popover': vPopover,
    'tooltip': vTooltip,
    'popconfirm': vPopconfirm,
  },
  setup() {
    const message = inject($message)!;
    const notification = inject($notify)!;
    const divRef = ref<HTMLDivElement | null>(null);
    const showModal = ref(false);
    const popoverProps = {
      title: '标题',
      content: '这是一条内容',
      placement: 'top-end',
    } as const;
    return () => (
      <div>
        <Backtop />
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
        <p>
          <Calendar />
        </p>

        {/* dialog */}
        <p>
          <Button onClick={() => showModal.value = true}>show Dialog</Button>
          <Dialog title="提示" width="30%" v-model={[showModal.value, 'visible']} v-slots={{
            footer: () => (
              <span class="dialog-footer">
                <Button onClick={() => showModal.value = false}>取 消</Button>
                <Button type="primary" onClick={() => showModal.value = false}>确 定</Button>
              </span>
            ),
          }}>
            <div>测试内容</div>
          </Dialog>
        </p>

        {/* popover */}
        <p>
          <Popover {...popoverProps}>
            <Button ref="button">click popover</Button>
          </Popover>

          <Popover ref="popover" {...popoverProps} />
          <Button v-popover="popover"> click popover</Button>

          <Popover ref="popover_ts" title="标题" placement="top-start" trigger="hover" content="这是一条内容" />
          <Button v-popover="popover_ts">hover</Button>
        </p>

        <p>
          <Popconfirm ref="popconfirm" />
          <Button v-popconfirm="popconfirm">click </Button>
        </p>

        {/* tooltips */}
        <p>
          <Tooltip ref="tooltip" content="这是一条测试内容！">
            tooltips!!!!
          </Tooltip>
        </p>

        <p>
          <Tag size="medium">标签一</Tag>
          <Tag size="small">标签二</Tag>
          <Tag size="mini">标签三</Tag>
          <Tag type="success">标签四</Tag>
          <Tag type="info">标签五</Tag>
          <Tag type="danger">标签六</Tag>
          <Tag type="warning">标签七</Tag>

        </p>

        {/* notification */}
        <p>
          <Button onClick={() => notification.notify({
            type: 'info',
            title: '标题',
            message: '信息信息信息'
          })}>show notification tr</Button>
          <Button onClick={() => notification.notify({
            type: 'info',
            title: '标题',
            message: '信息信息信息',
            position: 'top-left'
          })}>show notification tl</Button>
          <Button onClick={() => notification.notify({
            type: 'info',
            title: '标题',
            message: '信息信息信息',
            position: 'bottom-right',
          })}>show notification br</Button>
          <Button onClick={() => notification.notify({
            type: 'info',
            title: '标题',
            message: '信息信息信息',
            position: 'bottom-left',
            duration: 0,
            showClose: true
          })}>show notification bl</Button>
        </p>

        <p>
          <div style="width: 20%">
            <Progress />
            <Progress percentage={20} />

          </div>
        </p>
        <p>
          <Upload action="" >
            <Button>测试</Button>
          </Upload>
        </p>



        <div style='height:200px;overflow-y:auto'>
          <div ref={divRef} style='height:1000px'></div>
        </div>
        <div style='height:3000px'></div>
      </div>
    );
  },
});
