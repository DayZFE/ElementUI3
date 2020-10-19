import { coerceCssPixelValue } from '../cdk/coercion';
import { computed, CSSProperties, inject, InjectionKey, onUnmounted, provide, reactive, Ref, toRef, watch } from 'vue';
import { ElStepProps, ElStepsData, ElStepData } from './types';


const stepServiceKey = Symbol() as InjectionKey<StepService>;

export const injectService = () => inject(stepServiceKey)!;

export class StepService {

  state: ElStepsData;


  constructor(props: ElStepProps) {
    provide(stepServiceKey, this);

    this.state = reactive({
      active: toRef(props, 'active'),
      isCenter: computed<boolean>(() => !!props.alignCenter),
      isVertical: computed(() => props.direction === 'vertical'),
      space: computed(() => props.simple ? '' : props.space),
      simple: props.simple,
      finishStatus: props.finishStatus,
      processStatus: props.processStatus,
      direction: props.direction,
      steps: reactive([]),
      stepOffset: 0,
    }) as ElStepsData;

    watch(
      () => this.state.steps,
      values => values.forEach(($data, index) => {
        const data = $data.value;
        data.index = index;
        $data.value = data;
      }),
      { immediate: true }
    );
  }

  style(data: Ref<ElStepData>) {
    return computed(() => {
      const style: CSSProperties = {};
      const {
        space,
        isVertical,
        isCenter,
        steps: { length: count },
        stepOffset
      } = this.state;

      style.flexBasis = coerceCssPixelValue(space) || `${100 / (count - (isCenter ? 0 : 1))}%`;

      if (isVertical) {
        return style;
      }
      if (this.isLast(data)) {
        style.maxWidth = `${100 / count}%`;
      } else {
        style.marginRight = `${- stepOffset}px`;
      }
      return style;
    });
  }

  isLast(data: Ref<ElStepData>) {
    const steps = this.state.steps;
    return steps[steps.length - 1] === data;
  }

  control(data: Ref<ElStepData>) {
    const state = this.state;
    const steps = state.steps;
    watch(() => state.steps, (value) => {
      console.log(value);
    })
    steps.push(data);

    const stop = watch(() => data.value.index, () => {
      console.log('value');
      watch(() => [state.active, state.processStatus], (values) => {
        this.updateStatus(values[0] as number, data);
      }, { immediate: true });
      stop();
    });

    onUnmounted(() => {
      state.steps = steps.filter(step => step.value.index = data.value.index);
    });
  }

  updateStatus(index: number, $data: Ref<ElStepData>) {
    const { steps, finishStatus, processStatus } = this.state;
    const data = $data.value;
    const prevData = steps[data.index - 1];

    if (index > data.index) {
      data.currentStatus = finishStatus;
    } else if (index === data.index && data.prevStatus !== 'error') {
      data.currentStatus = processStatus;
    } else {
      data.currentStatus = 'wait';
    }

    if (prevData) {
      this.calcProgress(prevData, data.currentStatus);
    }
  }

  private calcProgress($data: Ref<ElStepData>, status: string) {
    const { processStatus, isVertical, simple } = this.state;
    const data = $data.value;

    let step = 100;
    const style: CSSProperties = {};

    style.transitionDelay = 150 * data.index + 'ms';
    if (status === processStatus) {
      step = data.currentStatus !== 'error' ? 0 : 0;
    } else if (status === 'wait') {
      step = 0;
      style.transitionDelay = (-150 * data.index) + 'ms';
    }

    style.borderWidth = step && !simple ? '1px' : 0;

    if (isVertical) {
      style.height = step + '%';
    } else {
      style.width = step + '%';
    }
    data.lineStyle = style;


    // mark dirty
    $data.value = data;
  }
}