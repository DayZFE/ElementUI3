import { defineComponent, provide, renderSlot } from "vue";
import { getClassToken } from "./cdk/tools";
import { MessageService, MessageServiceImpl } from "./message/message-service";


export const $message = getClassToken<MessageService>(MessageServiceImpl);

export const EleUIProvider = defineComponent({
  setup(_, ctx) {
    const messageService =  new MessageServiceImpl($message);
    return () => (
      <>
        {renderSlot(ctx.slots, 'default')}
        <messageService.container></messageService.container>
      </>
    )
  }
});
