import { defineComponent, inject, Ref, renderSlot, VNode, watch } from "vue";
import { OverlayService, overlayToken } from "../cdk";
import { Message } from './message';
import { MessageData } from "./types";
import '../theme-chalk/src/message.scss';

export const MessageContainerFactory = (datas: Ref<Required<MessageData>[]>, destroy: (id: string) => void) => defineComponent({
  setup(_, ctx) {
    const service = inject<OverlayService>(overlayToken)!;
    const strategy = service.createPositionStrategy('global');
    const overlay = service.create({
      strategy,
      hasBackdrop: false,
      backgroundClass: 'el-message__background'
    });

    watch(datas.value, (value) => {
      if (value.length > 0) {
        overlay.attach();
      } else {
        overlay.detach();
      }
    });

    return function () {
      const messages = datas.value.map((data, index) => (
        <Message
          key={data.messageId}
          id={data.messageId}
          type={data.type} 
          iconClass={data.iconClass} 
          content={data.content}
          onDestroy={destroy}
          top={(index) * 56 + 20}
        ></Message>
      ));
      return (
        <overlay.element>
          {...messages}
        </overlay.element>
      );
    }
  }
});