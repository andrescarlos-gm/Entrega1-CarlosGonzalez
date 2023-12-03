import { CartProvider } from "../../context/CartContext";
import Cart from "../Cart/Cart";
import { Grid } from "@mui/material";
export function CartContainer() {
  return (
    <CartProvider>
      <Grid>
        <Cart />
      </Grid>
    </CartProvider>
  );
}

export default CartContainer;
