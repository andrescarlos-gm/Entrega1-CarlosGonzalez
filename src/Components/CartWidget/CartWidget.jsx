// CartWidget.jsx
import cart from "../../images/cart.png";
import "./CartWidget.css";
import CartContext from "../../context/CartContext";
import { useContext } from "react";

export default function CartWidget({ onCartClick }) {
  const { cartList } = useContext(CartContext);
  const reduce = cartList.reduce((acc, act) => acc + act.quantity, 0);

  return (
    <div className="cart" onClick={onCartClick}>
      <img src={cart} alt="cart" width="45" height="45" />
      <div className="centred">
        <span className="circle">{reduce}</span>
      </div>
    </div>
  );
}
