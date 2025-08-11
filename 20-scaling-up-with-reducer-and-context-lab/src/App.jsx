import { useState } from "react";
import { CartProvider } from "./CartContext.jsx";
import { ProductList } from "./components/ProductList.jsx";
import { Cart } from "./components/Cart.jsx";
import { CartIcon } from "./components/CartIcon.jsx";
import "./style.css";

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      <div className="app">
        <header className="app-header">
          <h1>🛍️ React 購物車 Lab</h1>
          <div className="header-controls">
            <button
              className="toggle-cart-btn"
              onClick={() => {
                // 請在這裡實現切換購物車顯示的邏輯
              }}
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
          <div
            className={`cart-overlay ${showCart ? "show" : ""}`}
            onClick={() => {
              // 請在這裡實現關閉購物車的邏輯
            }}
          ></div>
          <div className={`cart-container ${showCart ? "show" : ""}`}>
            <Cart
              onClose={() => {
                // 請在這裡實現關閉購物車的邏輯
              }}
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
