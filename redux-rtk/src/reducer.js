import { combineReducers } from 'redux'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  // 定義名為 `todos` 的頂層狀態欄位，由 `todosReducer` 處理
  todos: todosReducer,
  filters: filtersReducer,
})

export default rootReducer
