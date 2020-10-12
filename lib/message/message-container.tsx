import { computed, defineComponent, inject, Ref, watch } from "vue";
import { Message } from './message';
import { MessageData } from "./types";
import '../theme-chalk/src/message.scss';
import { GlobalPositionStrategy, Overlay } from '../cdk';

export const MessageContainerFactory = (datas: Ref<Required<MessageData>[]>, destroy: (id: string) => void) => defineComponent({
  setup(_, ctx) {

    const visible = computed(() => {
      return datas.value.length > 0;
    })

    return function () {
      const messages = datas.value.map((data, index) => (
        <Message
          key={data.messageId}
          id={data.messageId}
          type={data.type}
          iconClass={data.iconClass}
          content={data.content}
          onDestroy={destroy}
        ></Message>
      ));
      return (
        <Overlay
          v-model={[visible.value, 'visible']}
          hasBackdrop={false}
          // strategy={new GlobalPositionStrategy().centerHorizontally()}
        >
          <div class="el-message-container">
            {...messages}
          </div>
        </Overlay>
      );
    }
  }
});