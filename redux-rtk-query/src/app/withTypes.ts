// createAsyncThunk 是 RTK 用來建立非同步 thunk 的工廠函式。
// 它會自動 dispatch pending / fulfilled / rejected 三種 action，
// 讓我們可以輕鬆在 slice 的 extraReducers 中處理載入狀態。
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState, AppDispatch } from "./store";

// 建立已預先綁定專案型別的 createAsyncThunk 版本。
//
// 為什麼需要這個？
// 原始的 createAsyncThunk 在 thunk payload creator 的第二個參數
// thunkAPI 中，getState() 回傳的是 unknown 型別，
// 無法直接存取 state.posts、state.auth 等屬性。
//
// 透過 .withTypes<{ state: RootState; dispatch: AppDispatch }>() 綁定後：
// - thunkAPI.getState() 會自動回傳 RootState，可直接取用各 slice 的資料
// - thunkAPI.dispatch() 會接受 AppDispatch 所支援的所有型別
//
// 在各 feature slice 中使用 createAppAsyncThunk 取代原始的 createAsyncThunk，
// 就不必在每個 thunk 裡重複標注型別參數，減少樣板程式碼（boilerplate）。
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
