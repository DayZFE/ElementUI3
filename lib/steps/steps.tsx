import { Enum } from '../cdk/utils';
import { cloneVNode, defineComponent, ref, renderSlot, shallowReactive, VNode, watch } from "vue";
import { StepService } from './step.service';
import { ElStepDirection } from './types';
import { StepComponent } from './step';


export const Steps = defineComponent({
  props: {
    space: [Number, String],
    alignCenter: Boolean,
    simple: Boolean,
    active: {
      type: Number,
      default: 0,
    },
    direction: {
      type: Enum<ElStepDirection>(),
      default: 'horizontal'
    },
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    }
  },

  setup(props, ctx) {
    const service = new StepService(props);
    const stepComponents = shallowReactive<StepComponent[]>([]);

    watch(() => stepComponents, (value) => {
      // console.log(value);
    })
    watch(() => props.active, (value, oldValue) => {
      ctx.emit('change', value, oldValue);
    });
    return {stepComponents};
  },

  render() {
    const { simple, direction, $slots } = this;
    const slot = renderSlot($slots, 'default');

    return (
      <div
        class={[
          'el-steps',
          !simple && 'el-steps--' + direction,
          simple && 'el-steps--simple'
        ]}
      >
        {slot}
      </div>
    );
  },
});