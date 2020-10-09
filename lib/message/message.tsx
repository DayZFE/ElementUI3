import { coerceCssPixelValue } from '../cdk/coercion';
import { computed, defineComponent, onMounted, onUnmounted, ref, renderSlot, Transition } from "vue";
import '../theme-chalk/src/message.scss';

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

export const Message = defineComponent({
  props: {
    id: {
      type: String,
      default: '',
    },
    iconClass: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info'
    },
    duration: {
      type: Number,
      default: 100000
    },
    showClose: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0,
    },
    onDestroy: Function,
  },
  setup(props, ctx) {
    const visible = ref(true);
    const timer = new Timer(() => {
      visible.value = false;
      setTimeout(() => {
        props.onDestroy?.(props.id);
      }, 200);
    }, props.duration);

    onMounted(() => {
      timer.start();
    });

    onUnmounted(() => {
      timer.end();
    });

    const wrapperClass = computed(() => {
      const animationClass = visible.value ? 'el-message-move-in' : 'el-message-move-out';
      return ['el-message', `el-message--${props.type}`, animationClass];
    });

    const iconTypeClass = computed(() => {
      return [`el-message__icon`, `el-icon-${props.type}`];
    });

    return function () {
      // const animationClass = visible.value ? 'el-message-move-in' : 'el-message-move-out';
      // const wrapperClass = `el-message el-message--${props.type}`;
      // const iconTypeClass = `el-message__icon el-icon-${props.type}`;
      let icon;
      if (!!props.iconClass) {
        icon = <i class={props.iconClass}></i>;
      } else {
        icon = <i class={iconTypeClass.value}></i>;
      }

      let closeIcon;
      if (props.showClose) {
        closeIcon = <i class="el-message__closeBtn el-icon-close" onClick={close}></i>
      }

      return (
        <Transition name="el-message-fade">
          <div
            v-show={visible.value}
            class={wrapperClass.value}
            style={{ top: coerceCssPixelValue(props.top || 20) }}
            onMouseenter={() => timer.end()}
            onMouseleave={() => timer.start()}
          >
            {icon}
            <p class="el-message__content">{props.content}</p>
            {renderSlot(ctx.slots, 'default')}
            {closeIcon}
          </div>
        </Transition>
      );
    };
  }
})

