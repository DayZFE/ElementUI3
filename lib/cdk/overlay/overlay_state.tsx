import {
  defineComponent,
  ref,
  SetupContext,
  Teleport,
  renderSlot,
  DefineComponent,
  onMounted,
  watch,
  reactive,
  CSSProperties,
  onUnmounted,
  watchEffect, computed, Transition, inject
} from "vue";
import { OverlayConfig } from '.';
import './overlay_state.scss';
import { FlexiblePositionStrategy } from './position/flexible_position_strategy';
import { GlobalPositionStrategy } from './position/global_position_strategy';
import { PositionStrategy } from './position/position_strategy';


export const Overlay = defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: '',
    },
    strategy: {
      type: () => ({}) as PositionStrategy,
      default: GlobalPositionStrategy
    },
    backgroundClass: {
      type: String,
      default: ''
    },
    backdropClick: Function,
    backdropClose: Boolean,
    backgroundBlock: Boolean,
  },
  setup(props, ctx) {

    const state = reactive<{
      containerStyle: CSSProperties,
      positionedStyle: CSSProperties,
      wrapper?: Element,
    }>({
      containerStyle: {},
      positionedStyle: {}
    });


    const clickBackground = (event: Event) => {
      event.preventDefault();

      props.backdropClick?.();

      if (props.backdropClose ?? true) {
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
      const overlayProps = props.strategy.setup();
      state.containerStyle = overlayProps.containerStyle;
      state.positionedStyle = overlayProps.positionedStyle.value;

      watch(overlayProps.positionedStyle, (value) => {
        state.positionedStyle = value;
      });
    });

    onUnmounted(() => {
      props.strategy.dispose();
    });

    return () => (
      <Teleport to="#vue-cdk-overlay">
        <Transition name="cdk-overlay-fade">
          <div v-show={props.visible}>
            <div
              ref={(ref) => state.wrapper = ref as Element}
              class={['cdk-overlay-container', props.backgroundClass]}
              style={state.containerStyle}
              onClick={clickBackground}
            >
              <div
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
  }
});
