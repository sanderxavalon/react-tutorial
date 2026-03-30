// 此檔案作為「預先綁定型別的 Redux Hooks」的統一匯出中心。
//
// 為什麼需要這個檔案？
// react-redux 原生的 useDispatch / useSelector 是泛型（generic）Hook，
// 預設不知道我們專案的 RootState 和 AppDispatch 的型別，
// 因此每次使用時都必須手動標注型別，例如：
//   const dispatch = useDispatch<AppDispatch>()
//   const posts = useSelector((state: RootState) => state.posts)
//
// 透過 .withTypes<>() 建立「已綁定型別」的版本後，
// 在元件中只需直接呼叫 useAppDispatch() / useAppSelector()，
// TypeScript 就能自動推導型別，不需要重複標注，
// 同時也能獲得完整的自動補全與型別錯誤提示。
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// useAppDispatch：取得已綁定 AppDispatch 型別的 dispatch 函式。
// 確保 dispatch 只接受合法的 Action 或 Thunk，
// 避免意外傳入不相容的物件導致執行階段錯誤。
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// useAppSelector：取得已綁定 RootState 型別的 selector Hook。
// 使用此 Hook 時，selector 函式的 state 參數會自動推導為 RootState，
// 可直接存取 state.posts、state.auth 等子樹，並獲得型別安全保障。
export const useAppSelector = useSelector.withTypes<RootState>();
