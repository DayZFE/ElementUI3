// import { renderCondition } from '../cdk/utils';
// import { Tag } from '../tag';
// import { computed, defineComponent, ref, renderList, renderSlot, Transition, TransitionGroup } from "vue";
// import { Tooltip, vTooltip } from '@/tooltip';
// import { TagInput } from './tag-input';

// export const Select = defineComponent({
//   directives: {
//     tooltip: vTooltip,
//   },
//   props: {
//     name: String,
//     id: String,
//     modelValue: {
//       required: true
//     },
//     autocomplete: {
//       type: String,
//       default: 'off'
//     },
//     automaticDropdown: Boolean,
//     size: String,
//     disabled: Boolean,
//     clearable: Boolean,
//     filterable: Boolean,
//     allowCreate: Boolean,
//     loading: Boolean,
//     popperClass: String,
//     remote: Boolean,
//     loadingText: String,
//     noMatchText: String,
//     noDataText: String,
//     remoteMethod: Function,
//     filterMethod: Function,
//     multiple: Boolean,
//     multipleLimit: {
//       type: Number,
//       default: 0
//     },
//     placeholder: {
//       type: String,
//       default: 'el.select.placeholder',
//     },
//     defaultFirstOption: Boolean,
//     reserveKeyword: Boolean,
//     valueKey: {
//       type: String,
//       default: 'value'
//     },
//     collapseTags: Boolean,
//   },

//   setup(props, ctx) {
//     const inputText = computed(() => '');

//     const emptyText = computed(() => '');

//     return {
//       emptyText,
//       collapseTagSize: '',
//       selectSize: '',
//       inputWidth: 100,
//       selected: [],
//       selectDisabled: false,
//       options,
//       inputLength,
//       visible,
//       filteredOptionsCount,
//       inputValue,
//     }
//   },

//   render() {
//     const {
//       multiple,
//       filterable,
//       collapseTags,
//       loading,
//       allowCreate,
//       autocomplete,
//       emptyText,
//       collapseTagSize,
//       selectSize,
//       inputWidth,
//       selected,
//       selectDisabled,
//       options,
//       inputLength,
//       visible,
//       filteredOptionsCount,
//       inputValue,
//     } = this;
//     return (
//       <div
//         class={["el-select", selectSize ? 'el-select--' + selectSize : '']}
//         onClick={/*stop*/ toggleMenu}
//         v-tooltip="tooltip"
//       >
//         {renderCondition(
//           multiple,
//           <TagInput 
//             v-model={this.inputValue}
//             inputWidth={inputWidth}
//             inputLength={inputLength}
//             collapseTags={collapseTags} 
//             collapseTagSize={collapseTagSize}
//             selected={selected}
//             selectDisabled={selectDisabled}
//             selectSize={selectSize}
//             filterable={filterable}
//             autoComplete={autocomplete}
//           />
//         )}
//         {/* <Input
//           ref="reference"
//           v-model="selectedLabel"
//           type="text"
//       : placeholder="currentPlaceholder"
//       : name="name"
//       : id="id"
//       : autocomplete="autoComplete || autocomplete"
//       : size="selectSize"
//       : disabled="selectDisabled"
//       : readonly="readonly"
//       : validate-event="false"
//       : class="{ 'is-focus': visible }"
//       : tabindex="(multiple && filterable) ? '-1' : null"
//       onfocus="handleFocus"
//       onblur="handleBlur"
//       onkeyup.native="debouncedOnInputChange"
//       onkeydown.native.down.stop.prevent="navigateOptions('next')"
//       onkeydown.native.up.stop.prevent="navigateOptions('prev')"
//       onkeydown.native.enter.prevent="selectOption"
//       onkeydown.native.esc.stop.prevent="visible = false"
//       onkeydown.native.tab="visible = false"
//       onpaste.native="debouncedOnInputChange"
//       onmouseenter.native="inputHovering = true"
//       onmouseleave.native="inputHovering = false" >
//       <template slot="prefix" v-if="$slots.prefix">
//         <slot name="prefix"></slot>
//       </template>
//       <template slot="suffix">
//         <i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
//         <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" onclick="handleClearClick" ></i >
//       </template >
//     </el - input > */}

//         <Tooltip
//           ref="tooltip"
//           disabled={visible && emptyText !== false}
//           transition="el-zoom-in-top"
//           effect="light"
//           trigger="click"
//           popperClass={['el-select-dropdown', multiple ? 'is-multiple' : '']}
//         >
//           <div class="el-select-dropdown__wrap">
//             <ul
//               v-show={options.length > 0 && !loading}
//               class={['el-select-dropdown__list', { 'is-empty': !allowCreate && inputValue && filteredOptionsCount === 0 }]}
//             >
//               {/* {renderCondition(
//                 showNewOption,
//                 <ElOption value="query" created/>
//               )} */}
//               {renderSlot(this.$slots, 'default')}
//             </ul>
//           </div>
//           {renderCondition(
//             emptyText && (!allowCreate || loading || (allowCreate && options.length === 0)),
//             renderCondition(
//               this.$slots.empty,
//               renderSlot(this.$slots, 'empty'),
//               <p class="el-select-dropdown__empty" v-else>
//                 {emptyText}
//               </p>
//             )
//           )}
//         </Tooltip>
//       </div >
//     );
//   }
// });