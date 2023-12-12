import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./CartWidget.css";
import CartContext from "../../context/CartContext";
import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

export default function CartWidget() {
  const { cartList } = useContext(CartContext);
  const reduce = cartList.reduce((acc, act) => acc + act.quantity, 0);
  return (
    <Link as={NavLink} to={`/cart`}>
      <div className="cart">
        <ShoppingCartIcon sx={{ scale: "2.3" }} />
        <div className="centred">
          <span className="circle">{reduce}</span>
        </div>
      </div>
    </Link>
  );
}
