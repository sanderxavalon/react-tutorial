import { useState } from "react";
import { CartProvider } from "./CartContext.jsx";
import { ProductList } from "./components/ProductList.jsx";
import { Cart } from "./components/Cart.jsx";
import { CartIcon } from "./components/CartIcon.jsx";
import "./style.css";

function App() {
  // 填空 1: 創建 showCart 狀態和 setShowCart 方法
  // 使用 useState Hook 來管理購物車的顯示/隱藏狀態
  // showCart 為 true 時顯示購物車，為 false 時隱藏購物車
  const [showCart, setShowCart] = useState(false);

  return (
    // 填空 2: 用 CartProvider 包裝應用
    // CartProvider 提供購物車的 Context，讓所有子組件都能使用購物車功能
    // 這樣 ProductList、Cart、CartIcon 等組件就能共享購物車狀態
    <CartProvider>
      <div className="app">
        <header className="app-header">
          <h1>🛍️ React 購物車 Lab</h1>
          <div className="header-controls">
            {/* 填空 3: 添加切換購物車顯示的點擊事件 */}
            {/* 當用戶點擊按鈕時，切換購物車的顯示狀態 */}
            {/* 如果當前顯示購物車，點擊後隱藏；如果當前隱藏，點擊後顯示 */}
            <button
              className="toggle-cart-btn"
              onClick={() => setShowCart(!showCart)}
            >
              <CartIcon />
              {showCart ? "隱藏購物車" : "顯示購物車"}
            </button>
          </div>
        </header>

        <main className="app-main">
          <div className="content-container">
            <ProductList />
          </div>
          {/* 填空 4: 添加遮罩層，點擊時關閉購物車 */}
          {/* 遮罩層覆蓋在購物車下方，當購物車顯示時可見 */}
          {/* 用戶點擊遮罩層時會關閉購物車，提供更好的用戶體驗 */}
          <div
            className={`cart-overlay ${showCart ? "show" : ""}`}
            onClick={() => setShowCart(false)}
          ></div>
          {/* 填空 5: 添加購物車組件，並傳遞關閉函數 */}
          {/* 購物車組件根據 showCart 狀態來顯示或隱藏 */}
          {/* 傳遞 onClose 函數給購物車組件，讓購物車能關閉自己 */}
          <div className={`cart-container ${showCart ? "show" : ""}`}>
            <Cart
              onClose={() => setShowCart(false)}
            />
          </div>
        </main>

        <footer className="app-footer">
          <p>🎓 React useContext + useReducer 購物車 Lab</p>
          <p>學習 Context 和 Reducer 的實際應用</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
