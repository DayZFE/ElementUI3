import { defineComponent, render } from 'vue';


class Timer {
  private timerId?: number;

  constructor(
    private readonly fn: () => void,
    private readonly duration: number,
  ) { }

  start() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(this.fn, this.duration);
  }

  end() {
    clearTimeout(this.timerId);
    this.timerId = undefined;
  }
}

export default defineComponent({
  setup() {

    return {
      visible: true,
      positionStyle: {},
      customClass: '',
      horizontalClass: '',
      timer: new Timer(() => undefined, 1000),
      message: '',
    }
  },

  methods: {
    click() { }
  },

  render() {
    const { visible, positionStyle, customClass, horizontalClass, timer, message } = this;
    return (
      <transition name="el-notification-fade">
        <div
          class={['el-notification', customClass, horizontalClass]}
          v-show={visible}
          style={positionStyle}
          onMouseenter={timer.start}
          onMouseleave={timer.end}
          onClick={this.click}
          role="alert"
        >
          <i
            class="el-notification__icon [ typeClass, iconClass ]"
            v-if="type || iconClass"
          ></i>
          <div class="el-notification__group { 'is-with-icon': typeClass || iconClass }">
            <h2 class="el-notification__title" v-text="title"></h2>
            <div class="el-notification__content" v-show="message">
              <slot>
                <p v-if="!dangerouslyUseHTMLString">{message}</p>
                <p v-else v-html="message"></p>
              </slot>
            </div>
            <div
              class="el-notification__closeBtn el-icon-close"
              v-if="showClose"
              onClick={() => { }}
            ></div>
          </div >
        </div >
      </transition>
    );
  }
});
