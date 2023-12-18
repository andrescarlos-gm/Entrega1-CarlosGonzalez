import { Grid } from "@mui/material";
import ItemDetail from "../ItemDetail/ItemDetail";
import Footer from "../Footer/Footer";

export default function ItemDetailContainer() {
  return (
    <Grid>
      <ItemDetail />
      <Footer />
    </Grid>
  );
}
