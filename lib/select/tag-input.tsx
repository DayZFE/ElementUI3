// import { defineComponent, inject, ref, renderList, toRef, TransitionGroup } from 'vue';

// import { Enum, renderCondition } from '@/cdk/utils';
// import { Tag } from '../tag';
// import { vmodelRef } from '@/cdk/hook';
// import { ElSize } from '@/types';

// export const TagInput = defineComponent({
//   props: {
//     modelValue: {
//       type: String,
//       default: ''
//     },
//     autocomplete: {
//       type: Boolean,
//       default: false,
//     },
//     inputLength: {

//     },

//     inputWidth: {},

//     selected: {
//       type: Array,
//       default: []
//     },
//     collapseTags: {
//       type: Boolean,
//       default: false,
//     },
//     collapseTagSize: {
//       type: Enum<ElSize>(),
//       default: ''
//     }
//   },

//   setup(props, ctx) {
//     const inputValue = vmodelRef(
//       toRef(props, 'modelValue'), 
//       (value) => ctx.emit('update:modelValue', value)
//     );


//     return {
//       inputValue,
//     }
//   },

//   methods: {
//     resetInputHeight() {

//     },

//     deleteTag(event: Event,) { },
//   },

//   render() {
//     const {
//       autocomplete,
//       inputLength,
//       inputWidth,
//       collapseTags,
//       selected,
//       collapseTagSize,
//       selectDisabled,
//       selectSize,
//       filterable,
//       resetInputHeight,
//       deleteTag,
//     } = this;
//     return (
//       <div
//         class="el-select__tags"
//         ref="tags"
//         style={{ maxWidth: `${inputWidth - 32}px`, width: '100%' }}
//       >
//         {renderCondition(
//           collapseTags && selected.length,
//           <span>
//             <Tag
//               closable={!selectDisabled}
//               size={collapseTagSize}
//               hit={selected[0].hitState}
//               type="info"
//               onClose={(event) => deleteTag(event, selected[0])}
//               disableTransitions
//             >
//               <span class="el-select__tags-text">{selected[0].currentLabel}</span>
//             </Tag>
//             {renderCondition(
//               selected.length > 1,
//               <Tag
//                 closable={false}
//                 size={collapseTagSize}
//                 type="info"
//                 disableTransitions
//               >
//                 <span class="el-select__tags-text">+ {selected.length - 1}</span>
//               </Tag>
//             )}
//           </span>
//         )}
//         {renderCondition(
//           !collapseTags,
//           <TransitionGroup onAfterLeave={resetInputHeight}>
//             {renderList(selected, (item) => {
//               <Tag
//                 key={getValueKey(item)}
//                 closable={!selectDisabled}
//                 size={collapseTagSize}
//                 hit={item.hitState}
//                 type="info"
//                 onClose={(event) => deleteTag(event, item)}
//                 disableTransitions={true}
//               >
//                 <span class="el-select__tags-text">{item.currentLabel}</span>
//               </Tag>
//             })}
//           </TransitionGroup>
//         )}
//         {renderCondition(
//           filterable,
//           <input
//             type="text"
//             ref="input"
//             class={['el-select__input', selectSize ? `is-${selectSize}` : '']}
//             v-model={this.inputValue}
//             disabled={selectDisabled}
//             autocomplete={autocomplete}
//             onFocus={handleFocus}
//             onBlur={() => this.softFocus = false}
//             onKeyup={managePlaceholder}
//             onKeydown={resetInputState}
//             // onKeydown.down.prevent="navigateOptions('next')"
//             // onKeydown.up.prevent="navigateOptions('prev')"
//             // onKeydown.enter.prevent="selectOption"
//             // onKeydown.esc.stop.prevent="visible = false"
//             // onKeydown.delete="deletePrevTag"
//             // onKeydown.tab="visible = false"
//             onCompositionstart={handleComposition}
//             onCompositionupdate={handleComposition}
//             onCompositionend={handleComposition}
//             onInput={debouncedQueryChange}
//             style={{ flexGrow: 1, width: `${inputLength / (inputWidth - 32)}%`, maxWidth: `${inputWidth - 42}px` }}
//           />
//         )}
//       </div >);
//   }
// });
