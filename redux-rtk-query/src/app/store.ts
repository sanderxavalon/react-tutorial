// configureStore 是 Redux Toolkit 提供的 store 建立函式，
// 它整合了 combineReducers、applyMiddleware 與 DevTools 設定，
// 讓我們不必像舊版 Redux 那樣手動組合。
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

// 匯入各功能模組（feature slice）的 reducer。
// 每個 reducer 只負責管理自己那一塊的 state，
// 透過 configureStore 的 reducer 物件合併為完整的 RootState。
import authReducer from "@/features/auth/authSlice";
import postsReducer from "@/features/posts/postsSlice";
import usersReducer from "@/features/users/usersSlice";
import notificationsReducer from "@/features/notifications/notificationsSlice";

// 匯入 listenerMiddleware，用於監聽 action 並執行副作用（side effects）。
// 詳細說明請見 listenerMiddleware.ts。
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  // reducer 物件的每個 key 會對應到 RootState 的同名屬性。
  // 例如 auth: authReducer 表示 state.auth 由 authReducer 管理。
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
  // middleware 設定：
  // getDefaultMiddleware() 會回傳 RTK 預設的 middleware 陣列，
  // 其中包含 redux-thunk（處理非同步 action）及開發用的序列化檢查等。
  // 使用 .prepend() 將 listenerMiddleware 插在所有 middleware 的最前面，
  // 確保它能在其他 middleware 處理 action 之前先行攔截並執行監聽邏輯。
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// 從 store 實例直接推導 AppStore 型別。
// 這樣型別定義永遠與實際 store 設定保持同步，不需要手動維護。
export type AppStore = typeof store;

// 從 store.dispatch 推導 AppDispatch 型別。
// 由於 store 已整合 thunk middleware，AppDispatch 會自動支援
// 一般 Action 物件以及 Thunk 函式，型別推導會一併涵蓋這些情況。
export type AppDispatch = typeof store.dispatch;

// 從 store.getState 的回傳值推導 RootState 型別。
// 這表示每次新增或移除 reducer 時，RootState 型別會自動更新，
// 不需要手動維護一個龐大的型別定義。
export type RootState = ReturnType<typeof store.getState>;

// AppThunk 是手寫 thunk 函式的通用型別別名。
// ThunkAction<ReturnType, StateType, ExtraArgType, ActionType>
// 這裡設定回傳值為 void（一般非同步操作不需要回傳），
// ExtraArgument 設為 unknown（本專案未使用 thunk extra argument）。
// 在 slice 中定義 thunk 時可直接使用此型別，避免每次重複撰寫泛型參數。
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
