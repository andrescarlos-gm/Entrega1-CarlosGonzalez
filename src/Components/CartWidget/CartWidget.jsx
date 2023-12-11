import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./CartWidget.css";
import CartContext from "../../context/CartContext";
import { useContext } from "react";
import Cart from "../Cart/Cart";

export default function CartWidget() {
  const { cartList, openModal } = useContext(CartContext);

  const reduce = cartList.reduce((acc, act) => acc + act.quantity, 0);

  const handleCartClick = () => {
    openModal(true);
  };

  return (
    <div className="cart" onClick={handleCartClick}>
      {open && <Cart />}
      <ShoppingCartIcon sx={{ scale: "2.3" }} />
      <div className="centred">
        <span className="circle">{reduce}</span>
      </div>
    </div>
  );
}
