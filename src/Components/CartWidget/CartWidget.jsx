import cart from "../../images/cart.png";
import "./CartWidget.css";

export default function CartWidget() {
  return (
    <div className="cart">
      <img src={cart} alt="cart" width="45" height="45" />
      <div className="centred">
        <span className="circle">1</span>
      </div>
    </div>
  );
}
