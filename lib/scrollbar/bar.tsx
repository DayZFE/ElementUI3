import { addEvent } from '@/cdk/utils';
import { computed, defineComponent, ref } from 'vue';
import { renderThumbStyle, BAR_MAP, BarProps } from './utils';

/* istanbul ignore next */
export const Bar = defineComponent({
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },

  setup(props) {
    const state = {
      bar: computed<BarProps>(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal']),
      wrap: ref<HTMLElement>(),
      thumb: ref<HTMLElement>(),
      X: ref(0),
      Y: ref(0),
      cursorDown: false,
    };



    return state;
  },

  methods: {
    clickThumbHandler(e: MouseEvent) {
      this.$parent?.$el
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2 || !(e.currentTarget instanceof HTMLElement)) {
        return;
      }
      const { bar: { axis, direction, offset, client } } = this;
      const target = e.currentTarget;
      
      this.startDrag(e);
      this[axis] = (target[offset] - (e[client] - target.getBoundingClientRect()[direction]));
    },

    clickTrackHandler(event: MouseEvent) {
      const { thumb, $el, wrap, bar: {direction, client, offset, scroll, scrollSize} } = this;
      if (!(thumb && wrap)) {
        return;
      }
      const div = event.target! as HTMLDivElement;
      const divOffset = Math.abs(div.getBoundingClientRect()[direction] - event[client]);
      const thumbHalf = (thumb[offset] / 2);
      const thumbPositionPercentage = ((divOffset - thumbHalf) * 100 / $el[offset]);

      wrap[scroll] = (thumbPositionPercentage * wrap[scrollSize] / 100);
    },

    startDrag(e: Event) {
      e.stopImmediatePropagation();
      this.cursorDown = true;

      addEvent(document, 'mousemove', this.mouseMoveDocumentHandler);
      addEvent(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
    },

    mouseMoveDocumentHandler(e: MouseEvent) {
      const { 
        thumb, 
        $el, 
        wrap, 
        bar: {axis, direction, client, offset, scroll, scrollSize} 
      } = this;
      if (!(thumb && wrap)) {
        return;
      }

      if (this.cursorDown === false) return;
      const prevPage = this[axis];

      if (!prevPage) return;

      const elOffset = (($el.getBoundingClientRect()[direction] - e[client]) * -1);
      const thumbClickPosition = (thumb[offset] - prevPage);
      const thumbPositionPercentage = ((elOffset - thumbClickPosition) * 100 / $el[offset]);

      wrap[scroll] = (thumbPositionPercentage * wrap[scrollSize] / 100);
    },

    mouseUpDocumentHandler(e: Event) {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      off(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    }
  },

  destroyed() {
    off(document, 'mouseup', this.mouseUpDocumentHandler);
  },

  render() {
    const { size, move, bar, clickTrackHandler, clickThumbHandler } = this;

    return (
      <div
        class={['el-scrollbar__bar', 'is-' + bar.key]}
        onMousedown={clickTrackHandler} 
      >
        <div
          ref="thumb"
          class="el-scrollbar__thumb"
          onMousedown={clickThumbHandler}
          style={renderThumbStyle({ size, move, bar })}>
        </div>
      </div>
    );
  },
});
