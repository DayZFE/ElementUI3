import { defineComponent, renderSlot } from 'vue';

export const UploadDragger = defineComponent({
  name: 'ElUploadDrag',
  props: {
    disabled: Boolean
  },
  inject: {
    uploader: {
      default: ''
    }
  },
  data() {
    return {
      dragover: false
    };
  },
  methods: {
    onDragover() {
      if (!this.disabled) {
        this.dragover = true;
      }
    },
    onDrop(e: DragEvent) {
      if (this.disabled || !this.uploader) return;
      const accept = this.uploader.accept;
      this.dragover = false;
      if (!accept) {
        this.$emit('file', e.dataTransfer.files);
        return;
      }
      this.$emit('file', [].slice.call(e.dataTransfer.files).filter(file => {
        const { type, name } = file;
        const extension = name.indexOf('.') > -1
          ? `.${name.split('.').pop()}`
          : '';
        const baseType = type.replace(/\/.*$/, '');
        return accept.split(',')
          .map(type => type.trim())
          .filter(type => type)
          .some(acceptedType => {
            if (/\..+$/.test(acceptedType)) {
              return extension === acceptedType;
            }
            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '');
            }
            if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
              return type === acceptedType;
            }
            return false;
          });
      }));
    }
  },

  render() {
    const { $slots: slot } = this;
    return (
      <div
        class="el-upload-dragger is-dragover"
      // drop_prevent={{}}
      // dragover_prevent={onDragover}
      // dragleave_prevent={() => dragover = false}
      >
        {renderSlot(slot, 'default')}
      </div>
    );
  }
});
