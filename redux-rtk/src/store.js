import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducer";

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunk),
  // 其他 store 增強器（如果有的話）
);

const store = createStore(rootReducer, composedEnhancer);
export default store;
