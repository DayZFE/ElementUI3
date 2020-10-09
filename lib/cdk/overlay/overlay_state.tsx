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
  Transition,
} from "vue";
import { OverlayConfig } from '.';
import './overlay_state.css';

export class OverlayState {
  public readonly element: DefineComponent<{ transition: string }>;

  private readonly show = ref(false);

  private readonly originOverflow = this.body.style.overflow;

  private isMounted = false;

  constructor(
    private readonly config: Required<OverlayConfig>,
    private body: HTMLElement,
  ) {
    this.element = this.render();
  }

  attach(): void {
    if (!this.isMounted) {
      console.warn('You must invoke this method after vue mounted or "onMounted()" hook.');
      return;
    }
    this._setOverflow(true);
    this.show.value = true;
  }

  detach(): void {
    if (!this.isMounted) {
      console.warn('You must invoke this method after vue mounted or "onMounted()" hook.');
      return;
    }
    this._setOverflow(false);
    this.show.value = false;
  }

  render(): DefineComponent<{ transition: string }> {
    const that = this;
    return defineComponent({
      name: 'cdk-overlay',
      props: {
        transition: {
          type: String,
          default: 'cdk-overlay-fade',
        }
      },
      setup(props, ctx: SetupContext) {
        const click = (event: Event) => {
          event.preventDefault();

          that.config.backdropClick?.();
          if (that.config.backdropClose ?? true) {
            that.detach();
          }
        };
        const containerClass = that._getContainerClass();
        const styles = reactive<{ containerStyle: CSSProperties, positionedStyle: CSSProperties }>({
          containerStyle: {},
          positionedStyle: {}
        });

        onMounted(() => {
          that.isMounted = true;

          const current = that.config.strategy.setup();
          styles.containerStyle = current.containerStyle;
          styles.containerStyle.pointerEvents = that.config.hasBackdrop ? 'auto' : 'none';

          styles.positionedStyle = current.positionedStyle.value;          

          watch(current.positionedStyle, (value) => {
            styles.positionedStyle = value;
          });
        });

        onUnmounted(() => {
          that.config.strategy.dispose();
        });

        watch(that.show, (value) => {
          if (value) {
            that.config.strategy.attach?.();
          } else {
            that.config.strategy.detach?.();
          }
        });

        return () => (
          <Teleport to="#vue-cdk-overlay">
            <Transition name={props.transition}>
              <div v-show={that.show.value} class={that.config.hasBackdrop ? "cdk-verlay-mask": ''}>
                <div style={styles.containerStyle} onClick={click}>
                  <div style={styles.positionedStyle} onClick={event => event.cancelBubble = true}>
                    {renderSlot(ctx.slots, 'default')}
                  </div>
                </div>
              </div>
            </Transition>
          </Teleport>
        );
      }
    }) as any;
  }

  _setOverflow(enable: boolean) {
    if (this.config.backgroundBlock) {
      this.body.style.overflow = enable ? 'hidden' : this.originOverflow;
    }
  }

  _getContainerClass() {
    let bgClasses = 'overlay_container_background ';
    const backgroundClass = this.config.backgroundClass;
    if (!backgroundClass) {
      return bgClasses;
    }
    if (Array.isArray(backgroundClass)) {
      return bgClasses + backgroundClass.join(' ');
    } else {
      return bgClasses + backgroundClass;
    }
  }
}