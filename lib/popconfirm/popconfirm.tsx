import { Popover } from '../popover';
import { defineComponent } from 'vue';
import { default as Button, ElButtonType } from '../button';

export const Popconfirm = defineComponent({
  props: {
    icon: String,
    hideIcon: Boolean,
    title: String,

    cancelButtonType: {
      type: String as () => ElButtonType,
      default: 'default',
    },
    cancelButtonText: {
      type: String,
      default: 'cancel',
    },
    confirmButtonType: {
      type: String as () => ElButtonType,
      default: 'primary',
    },
    confirmButtonText: {
      type: String,
      default: 'confirm',      
    }
  },
  setup() {
    
    const cancel = () => {

    }
    const confirm = () => {

    }
    return {
      eltype: 'popconfirm',
      cancel,
      confirm
    }
  },
  render() {
    const { 
      icon, 
      hideIcon, 
      title, 
      cancelButtonText, 
      cancelButtonType,
      cancel,
      confirmButtonText, 
      confirmButtonType,
      confirm,
    } = this;

    const slots = {
      default: this.$slots.default,
      content: () => (
        <div class="el-popconfirm">
          <p class="el-popconfirm__main">
            <i
              v-show={!hideIcon}
              class={["el-popconfirm__icon", icon]}
              style="{color: iconColor}"
            ></i>
            {title}
          </p>
          <div class="el-popconfirm__action">
            <Button
              size="mini"
              type={cancelButtonType}
              onClick={cancel}
            >
              {cancelButtonText}
            </Button>
            <Button
              size="mini"
              type={confirmButtonType}
              onClick={confirm}
            >
              {{ confirmButtonText }}
            </Button>
          </div>
        </div >)
    }
    return (<Popover v-slots={slots} />);
  }
});