import { useContext } from 'react';
import { CartContext } from '../CartContext.jsx';

export function CartIcon() {
  const { totalItems } = useContext(CartContext);

  return (
    <div className="cart-icon">
      <span className="cart-emoji">🛒</span>
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </div>
  );
} 