import { List, renderCondition, watchRef } from '@/cdk/utils';
import { computed, defineComponent, Prop, ref, renderList, toRef, toRefs } from 'vue';
import { getValueFromMap } from './utils';



export const Rate = defineComponent({
  name: 'el-rate',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    lowThreshold: {
      type: Number,
      default: 2
    },
    highThreshold: {
      type: Number,
      default: 4
    },
    max: {
      type: Number,
      default: 5
    },
    colors: {
      type: [Array, Object],
      default() {
        return ['#F7BA2A', '#F7BA2A', '#F7BA2A'];
      }
    } as Prop<string[] | object>,
    voidColor: {
      type: String,
      default: '#C6D1DE'
    },
    disabledVoidColor: {
      type: String,
      default: '#EFF2F7'
    },
    iconClasses: {
      type: [Array, Object],
      default() {
        return ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'];
      }
    } as Prop<string[] | object>,
    voidIconClass: {
      type: String,
      default: 'el-icon-star-off'
    },
    disabledVoidIconClass: {
      type: String,
      default: 'el-icon-star-on'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    showScore: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: '#1f2d3d'
    },
    texts: {
      type: List<string>(),
      default: ['极差', '失望', '一般', '满意', '惊喜'],
    },
    scoreTemplate: {
      type: String,
      default: '{value}'
    }
  },

  setup(props, ctx) {
    const currentValue = watchRef(toRef(props, 'modelValue'), value => value);
    const rateDisabled = watchRef(toRef(props, 'disabled'), value => value);
    const texts = ref([]);

    const text = computed(() => {
      let result = '';
      const current = currentValue.value;
      if (props.showScore) {
        const value = rateDisabled.value ? props.modelValue : current;
        result = props.scoreTemplate.replace(/\{\s*value\s*\}/, `${value}`);
      } else if (props.showText) {
        result = props.texts[Math.ceil(current) - 1];
      }
      return result;
    });

    const valueDecimal = computed(() => {
      return props.modelValue * 100 - Math.floor(props.modelValue) * 100;
    });

    const activeColor = computed(() => {
      return getValueFromMap(currentValue.value, colorMap);
    });


    const decimalStyle = computed(() => {
      let width = '';
      if (rateDisabled.value) {
        width = `${valueDecimal.value}%`;
      } else if (props.allowHalf) {
        width = '50%';
      }
      return {
        color: activeColor.value,
        width
      };
    });

    return {
      currentValue,
      rateDisabled,
    }
  },

  render() {
    const {
      max,
      rateDisabled,
      currentValue,
      showText,
      showScore,
      textColor,
      text,
      decimalIconClass,
      classes,
      hoverIndex,
      handleKey,
      setCurrentValue,
      selectValue,
      resetCurrentValue,
      getIconStyle,
      showDecimalIcon,
      decimalStyle,
    } = this;

    return (
      <div
        class="el-rate"
        role="slider"
        onKeydown={handleKey}
        aria-valuenow={currentValue}
        aria-valuetext={text}
        aria-valuemin={0}
        aria-valuemax={max}
        tabindex={0}
      >
        {renderList(max, (item, key) => {
          <span
            class="el-rate__item"
            onMousemove={($event) => setCurrentValue(item, $event)}
            onMouseleave={resetCurrentValue}
            onClick={() => selectValue(item)}
            style={{ cursor: rateDisabled ? 'auto' : 'pointer' }}
            key={key as number}
          >
            <i
              class={["el-rate__icon", classes[item - 1], { 'hover': hoverIndex === item }]}
              style={getIconStyle(item)}
            >
              {renderCondition(
                showDecimalIcon(item),
                <i
                  class={["el-rate__decimal", decimalIconClass]}
                  style={decimalStyle}
                />
              )}
            </i>
          </span>
        })}
        {renderCondition(
          showText || showScore,
          <span class="el-rate__text" style={`color: ${textColor};`}>{text}</span>
        )}
      </div>
    );
  },
});