import { CSSProperties, Ref } from 'vue';

export type ElStepDirection = 'vertical' | 'horizontal';

export interface ElStepProps {
  space?: number | string;
  active: number;
  direction: ElStepDirection;
  alignCenter?: boolean;
  simple?: boolean;
  finishStatus: string,
  processStatus: string
}


export interface ElStepsData {
  space: number | string;
  active: number;
  isCenter: boolean;
  isVertical: boolean;
  simple: boolean;
  finishStatus: string;
  processStatus: string;
  stepOffset: number;
  direction: string;
  steps: Ref<ElStepData>[];
}

export interface ElStepData {
  index: number;
  currentStatus: string;
  prevStatus: string;
  lineStyle: CSSProperties;
}
