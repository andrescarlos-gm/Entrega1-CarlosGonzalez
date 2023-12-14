import { Grid } from "@mui/material";
import Cart from "../Cart/Cart";
import Footer from "../Footer/Footer";
export function CartContainer() {
  return (
    <Grid>
      <Cart />
      <Footer/>
    </Grid>
  );
}

export default CartContainer;
