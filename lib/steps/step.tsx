import { renderCondition } from '../cdk/utils';
import { computed, defineComponent, onUnmounted, ref, renderSlot } from 'vue';
import { injectService } from './step.service';
import { ElStepData } from './types';
import { Steps } from './steps';


export const Step = defineComponent({
  props: {
    title: String,
    icon: String,
    description: String,
    status: String
  },
  setup(props, ctx) {
    const service = injectService();
    const data = ref<ElStepData>({
      index: 0,
      currentStatus: props.status || '',
      prevStatus: '',
      lineStyle: {},
    });
    service.control(data);

    const serviceState = service.state;
    const style = service.style(data);
    const isLast = computed(() => service.isLast(data));

    return {
      style,
      isLast,
      isSimple: serviceState.simple,
      isCenter: serviceState.isCenter,
      isVertical: serviceState.isVertical,
      space: serviceState.space,
      stepOffset: serviceState.stepOffset,
      direction: serviceState.direction,
      data
    }
  },

  render() {
    const {
      style,
      isSimple,
      isLast,
      isCenter,
      isVertical,
      space,
      stepOffset,
      direction,
      icon,
      description,
      $slots,
      title,
      data: {
        index,
        currentStatus,
        lineStyle,
      },
    } = this;

    return <div
      style={style}
      class={[
        "el-step",
        !isSimple && `is-${direction}`,
        isSimple && 'is-simple',
        isLast && !space && !isCenter && 'is-flex',
        isCenter && !isVertical && !isSimple && 'is-center'
      ]}>
      {/* <!-- icon & line --> */}
      <div class={["el-step__head", `is-${currentStatus}`]}>
        <div
          class="el-step__line"
          style={isLast ? '' : { marginRight: stepOffset + 'px' }}
        >
          <i class="el-step__line-inner" style={lineStyle} />
        </div>

        <div class={['el-step__icon', `is-${icon ? 'icon' : 'text'}`]}>
          {renderCondition(
            currentStatus !== 'success' && currentStatus !== 'error',
            [
              renderSlot($slots, 'default'),
              renderCondition(icon, <i class={['el-step__icon-inner', icon]} />),
              renderCondition(!icon && !isSimple, <div class="el-step__icon-inner">{index + 1}</div>)
            ],
            <i class={[
              'el-step__icon-inner',
              'is-status',
              'el-icon-' + (currentStatus === 'success' ? 'check' : 'close')
            ]} />
          )}
        </div>
      </div >
      {/* < !--title & description-- > */}
      <div class="el-step__main">
        <div ref="title" class={['el-step__title', 'is-' + currentStatus]}>
          {renderSlot($slots, 'title')}
          {title}
        </div>
        {renderCondition(
          isSimple,
          <div class="el-step__arrow" />,
          <div class={['el-step__description', 'is-' + currentStatus]}>
            {renderSlot($slots, 'description')}
            {description}
          </div>
        )}
      </div>
    </div>;
  }
});


export type StepComponent = InstanceType<typeof Step>;
