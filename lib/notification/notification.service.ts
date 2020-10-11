import { DefineComponent, InjectionKey, provide, ref } from "vue";
import Notification from './notification';

let _$counter = 0;

export abstract class NotificationService {

}

export class NotificationServiceImpl extends NotificationService {
  readonly element: DefineComponent;

  constructor(key: InjectionKey<NotificationService>) {
    super();
    this.element = this.render();
    provide(key, this);
  }

  render(): DefineComponent {
    return Notification;
  }
}
