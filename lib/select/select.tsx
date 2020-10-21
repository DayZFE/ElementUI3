// import { renderCondition } from 'on/cdk/utils';
// import { Tag } from 'on/tag';
// import { defineComponent, renderSlot, Transition, TransitionGroup } from "vue";

// export const Select = defineComponent({
//   props: {
//     name: String,
//     id: String,
//     value: {
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
//     popperAppendToBody: {
//       type: Boolean,
//       default: true
//     }
//   },

//   setup() {

//   },

//   render() {
//     return (
//       <div
//         class={["el-select", selectSize ? 'el-select--' + selectSize : '']}
//         onClick={/*stop*/ toggleMenu}
//       >
//         <div
//           class="el-select__tags"
//           v-if="multiple"
//           ref="tags"
//           style={{ 'max-width': inputWidth - 32 + 'px', width: '100%' }}
//         >
//           {renderCondition(collapseTags && selected.length,
//             <span>
//               <Tag
//                 closable="!selectDisabled"
//                 size="collapseTagSize"
//                 hit="selected[0].hitState"
//                 type="info"
//                 onClose="deleteTag($event, selected[0])"
//                 disable-transitions
//               >
//                 <span class="el-select__tags-text">{selected[0].currentLabel}</span>
//               </Tag>
//               {renderCondition(
//                 selected.length > 1,
//                 <Tag
//                   closable="false"
//                   size="collapseTagSize"
//                   type="info"
//                   disable-transitions
//                 >
//                   <span class="el-select__tags-text">+ {{ selected.length - 1 }}</span>
//                 </Tag>
//               )}
//             </span>
//           )}
//           {renderCondition(
//             !collapseTags,
//             <TransitionGroup onAfterLeave="resetInputHeight">
//               <Tag
//                 v-for="item in selected"
//                 key="getValueKey(item)"
//                 closable="!selectDisabled"
//                 size="collapseTagSize"
//                 hit="item.hitState"
//                 type="info"
//                 onClose="deleteTag($event, item)"
//                 disableTransitions={true}
//               >
//                 <span class="el-select__tags-text">{item.currentLabel}</span>
//               </Tag>
//             </TransitionGroup>
//           )}
//           {renderCondition(
//             filterable,
//             <input
//               type="text"
//               class="el-select__input"
//               class="[selectSize ? `is-${ selectSize }` : '']"
//               disabled="selectDisabled"
//               autocomplete="autoComplete || autocomplete"
//               focus="handleFocus"
//               onBlur="softFocus = false"
//               onKeyup="managePlaceholder"
//               onKeydown="resetInputState"
//               // onKeydown.down.prevent="navigateOptions('next')"
//               // onKeydown.up.prevent="navigateOptions('prev')"
//               // onKeydown.enter.prevent="selectOption"
//               // onKeydown.esc.stop.prevent="visible = false"
//               // onKeydown.delete="deletePrevTag"
//               // onKeydown.tab="visible = false"
//               onCompositionstart="handleComposition"
//               onCompositionupdate="handleComposition"
//               onCompositionend="handleComposition"
//               v-model="inputValue"
//               oninput="debouncedQueryChange"
//               style={{ 'flex-grow': '1', width: inputLength / (inputWidth - 32) + '%', 'max-width': inputWidth - 42 + 'px' }}
//               ref="input"
//             />
//           )}

//         </div >
//         {/* <Input
//     ref="reference"
//     v-model="selectedLabel"
//     type="text"
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
// onblur="handleBlur"
// onkeyup.native="debouncedOnInputChange"
// onkeydown.native.down.stop.prevent="navigateOptions('next')"
// onkeydown.native.up.stop.prevent="navigateOptions('prev')"
// onkeydown.native.enter.prevent="selectOption"
// onkeydown.native.esc.stop.prevent="visible = false"
// onkeydown.native.tab="visible = false"
// onpaste.native="debouncedOnInputChange"
// onmouseenter.native="inputHovering = true"
// onmouseleave.native="inputHovering = false" >
//       <template slot="prefix" v-if="$slots.prefix">
//         <slot name="prefix"></slot>
//       </template>
//       <template slot="suffix">
//         <i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
//         <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" onclick="handleClearClick" ></i >
//       </template >
//     </el - input > */}
//         <Transition
//           name="el-zoom-in-top"
//           onbefore-enter="handleMenuEnter"
//           onafter-leave="doDestroy"
//         >
//           <SelectMenu
//             ref="popper"
//             append-to-body="popperAppendToBody"
//             v-show={visible && emptyText !== false}>
//             <ScrollBar
//               tag="ul"
//               wrap-class="el-select-dropdown__wrap"
//               view-class="el-select-dropdown__list"
//               ref="scrollbar"
//               class={{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }}
//               v-show={options.length > 0 && !loading}
//             >
//               {renderCondition(
//                 showNewOption,
//                 <el-option
//                   value="query"
//                   created
//                 />
//               )}
//               {renderSlot(this.$slots, 'default')}
//             </ScrollBar>
//             {renderCondition(
//               emptyText && (!allowCreate || loading || (allowCreate && options.length === 0)),
//               renderCondition(
//                 this.$slots.empty,
//                 renderSlot(this.$slots, 'empty'),
//                 <p class="el-select-dropdown__empty" v-else>
//                   {emptyText}
//                 </p>
//               ),
//             )}
//           </SelectMenu>
//         </Transition >
//       </div >
//     );
//   }
// });