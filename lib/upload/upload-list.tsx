import { DELETE } from '@/cdk/keycodes';
import { computed, defineComponent, renderSlot, TransitionGroup } from 'vue';

export interface UploadFileOptions {
  uid: string;
  status: string;
  url: string;
  name: string;
}

export const UploadList = defineComponent({

  name: 'ElUploadList',

  // mixins: [Locale],
  // components: { ElProgress },

  props: {
    files: {
      type: Array as () => UploadFileOptions[],
      default: [],
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: Function,
    listType: {
      type: String as () => 'picture-card' | 'picture',
      default: 'picture'
    }
  },
  methods: {
    parsePercentage(val) {
      return parseInt(val, 10);
    },
  },

  setup(props) {
    const files: File[] = [];
    const focusing = false;

    const validateType = computed(() => ['picture-card', 'picture'].indexOf(props.listType) > -1);
    const isCard = computed(() => props.listType === 'picture-card');

    const uploadListClass = computed(() => `el-upload-list el-upload-list--${props.listType} ${props.disabled ? 'is-disabled' : ''}`)

    return {
      files,
      focusing,
      validateType,
      isCard,
      uploadListClass
    }
  },

  render() {
    const { $slots: slots, files, focusing, disabled, validateType, isCard, handlePreview, uploadListClass } = this;

    const enableNode = (test: boolean, node: JSX.Element) => !test ? node : undefined;
    const onRemove = (file: UploadFileOptions) => () => this.$emit('remove', file);

    const previewIcon = (file: UploadFileOptions) => {
      if (!handlePreview) {
        return;
      }
      return <span
        class="el-upload-list__item-preview"
        onClick={() => handlePreview(file)}
      >
        <i class="el-icon-zoom-in"></i>
      </span>;
    }

    const fileNodes = files.map((file) => (
      <li
        class={['el-upload-list__item', `is-${file.status}`, focusing ? 'focusing' : '']}
        key={file.uid}
        tabindex={0}
        onFocus={() => this.focusing = true}
        onClick={() => this.focusing = false}
        onBlur={() => this.focusing = false}
        onKeydown={(e: KeyboardEvent) => e.keyCode === DELETE && !disabled && this.$emit('remove', file)}
      >
        {renderSlot(slots, 'file', { file })}
        {enableNode(file.status !== 'uploading' && validateType,
          <img src={file.url} alt="" />
        )}
        <a class="el-upload-list__item-name" onClick={() => handlePreview?.(file)}>
          <i class="el-icon-document"></i>
          {file.name}
        </a>
        <label class="el-upload-list__item-status-label">
          <i class="{
              'el-icon-upload-success': true,
              'el-icon-circle-check': listType === 'text',
              'el-icon-check': validateType
            }"></i>
        </label>
        {enableNode(!disabled, <i class="el-icon-close" onClick={onRemove(file)} />)}
        {/* <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上--> */}
        {enableNode(!disabled, <i class="el-icon-close-tip">delete</i>)}

        {/* <el-progress
              v-if="file.status === 'uploading'"
              :type="listType === 'picture-card' ? 'circle' : 'line'"
              :stroke-width="listType === 'picture-card' ? 6 : 2"
              :percentage="parsePercentage(file.percentage)">
            </el-progress> */}
        {enableNode(isCard,
          <span class="el-upload-list__item-actions">
            {previewIcon(file)}
            {enableNode(
              !disabled,
              <span class="el-upload-list__item-delete" onClick={onRemove(file)}>
                <i class="el-icon-delete"></i>
              </span>
            )}
          </span>
        )}
      </li>
    ));
    return (
      <TransitionGroup
        tag="ul"
        name="el-list"
        moveClass={uploadListClass}
      >
        {...fileNodes}
      </TransitionGroup >
    );
  }
});