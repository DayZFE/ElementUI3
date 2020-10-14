import {
  defineComponent,
  Teleport,
  renderSlot,
  onMounted,
  watch,
  reactive,
  CSSProperties,
  onUnmounted,
  watchEffect,
  Transition,
  Ref,
  computed,
  inject,
  provide, nextTick
} from "vue";
import { PositionStrategy } from './position/position_strategy';
import './overlay.scss';

class OverlayProvider {
  div?: Element | null;
  constructor(document: Document) {
    let div = this.div = document.getElementById('vue-cdk-overlay');
    if (!div) {
      div = this.div = document.createElement('div');
      div.id = 'vue-cdk-overlay';
      div.className = 'vue-cdk-overlay-container';
      document.body.append(div);
    }
  }
}
const overlayProvider = new OverlayProvider(document);

/**
 * @description
 * overlay config.
 * 
 * @date 2020-09-14
 * @export
 * @interface OverlayConfig
 */
export interface OverlayConfig {
  readonly strategy: PositionStrategy;
  readonly hasBackdrop?: boolean;
  readonly backdropClose?: boolean;
  readonly backdropClick?: (() => void) | null;
  readonly backgroundBlock?: boolean;
  readonly backgroundClass?: string | string[];
  readonly backgroundColor?: string;
}

export interface OverlayProps {
  containerStyle: CSSProperties;
  positionedStyle: Ref<CSSProperties>;
}

export const provideStrategy = (strategy: PositionStrategy) => {
  provide('cdk-overlay-strategy', strategy);
}

export const Overlay = defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    backgroundClass: {
      type: String,
      default: 'cdk-overlay-container__background'
    },
    hasBackdrop: {
      type: Boolean,
      default: true,
    },
    backdropClose: {
      type: Boolean,
      default: true,
    },
    backgroundBlock: Boolean,
    backdropClick: Function,
    panelClass: String,
  },
  setup(props, ctx) {
    inject('cdk-overlay-provider', overlayProvider);
    
    const strategy = inject('cdk-overlay-strategy', new PositionStrategy());

    const state = reactive<{
      containerStyle: CSSProperties,
      positionedStyle: CSSProperties,
      overlayElement?: Element,
      overlayWrapper?: HTMLElement,
    }>({
      containerStyle: {},
      positionedStyle: {}
    });


    const clickBackground = (event: Event) => {
      event.preventDefault();

      props.backdropClick?.();
      if (props.backdropClose) {
        ctx.emit('update:visible', false);
      }
    }

    const originOverflow = document.body.style.overflow;
    watchEffect((onInvalidate) => {
      if (props.backgroundBlock) {
        document.body.style.overflow = props.visible ? 'hidden' : originOverflow;
      }
      onInvalidate(() => {
        document.body.style.overflow = originOverflow;
      });
    });

    onMounted(() => {
      const overlayProps = strategy.setup();

      state.containerStyle = overlayProps!.containerStyle;
      watch(overlayProps.positionedStyle, (value) => {
        state.positionedStyle = value;
      },{immediate: true});

      nextTick(() => {
        strategy.apply?.(state.overlayElement!);
      });

      watch(() => props.visible, (value) => {
        if (value) {
          nextTick(() => {
            strategy.apply?.(state.overlayElement!);
          });
        } else {
          strategy.disapply?.();
        }
      });
    });

    onUnmounted(() => {
      strategy.dispose();
    });

    const containerClass = computed(() => {
      const clazz = ['cdk-overlay-container'];
      if (!props.hasBackdrop) {
        clazz.push('cdk-overlay-container__diabled');
      } else {
        clazz.push(props.backgroundClass);
      }
      return clazz;
    });

    return () => (
      <Teleport to="#vue-cdk-overlay">
        <Transition name="cdk-overlay-fade">
          <div v-show={props.visible}>
            <div
              class={containerClass.value}
              style={state.containerStyle}
              onClick={clickBackground}
              ref={(ref) => state.overlayWrapper = ref as HTMLElement}
            >
              <div
                ref={(ref) => state.overlayElement = ref as HTMLElement}
                style={state.positionedStyle}
                onClick={event => event.cancelBubble = true}
              >
                {renderSlot(ctx.slots, 'default')}
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    )
  },
});
