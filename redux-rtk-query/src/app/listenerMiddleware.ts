// createListenerMiddleware 是 RTK 提供的「監聽器中介軟體」建立函式。
// 它類似於 redux-saga 或 redux-observable，但不需要額外的函式庫，
// 讓我們可以監聽特定 action 被 dispatch 後，執行對應的副作用邏輯
// （例如：自動儲存資料、串連多個 action 的流程、啟動計時器等）。
// addListener 是一個特殊的 Action Creator，可在 middleware 外部
// 動態地向 listener 佇列新增監聽項目。
import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "./store";

// 匯入 posts 功能的監聽器註冊函式。
// 將各 feature 的 listener 設定集中在各自的 slice 檔案中，
// 這裡只負責呼叫，保持關注點分離（separation of concerns）。
import { addPostsListeners } from "@/features/posts/postsSlice";

// 建立 listenerMiddleware 實例。
// 此實例會在 store.ts 中透過 .prepend() 被加入 middleware 鏈，
// 確保它在所有 action 被 reducer 處理之前就能攔截到。
export const listenerMiddleware = createListenerMiddleware();

// 建立已綁定 RootState 與 AppDispatch 型別的 startListening 函式。
// 為什麼要用 .withTypes<>()？
// 原始的 startListening 無法自動推導 listenerApi.getState() 的型別，
// 綁定型別後，監聽器的 callback 中 getState() 會回傳正確的 RootState，
// dispatch() 也會接受正確的 AppDispatch 型別，提升開發時的型別安全性。
export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

// 匯出 startAppListening 的型別，供各 feature slice 使用。
// 各 slice 的 addXxxListeners 函式可接受此型別作為參數，
// 使它們不需要直接依賴 listenerMiddleware 實例，降低耦合度。
export type AppStartListening = typeof startAppListening;

// 建立已綁定型別的 addListener Action Creator。
// addAppListener 可在元件或其他地方（middleware 外部）動態新增監聽器，
// 使用場景較少，但在需要條件式、動態啟用監聽時很有用。
export const addAppListener = addListener.withTypes<RootState, AppDispatch>();
export type AppAddListener = typeof addAppListener;

// 在 store 初始化完成後，立即註冊 posts 相關的所有監聽器。
// 將各 feature 的 listener 設定收攏到這裡統一啟動，
// 方便日後新增其他 feature 的監聽器時只需在此處加一行。
addPostsListeners(startAppListening);
