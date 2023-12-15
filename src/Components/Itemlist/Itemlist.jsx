import Item from "../Item/Item.jsx";
import { Grid } from "@mui/material";
import RingLoader from "react-spinners/RingLoader.js";

export default function ItemList({ items, loading }) {
  if (loading) {
    return    (
<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          minHeight: "100vh",
          paddingTop: "200px",
          backgroundColor: "#cfd8dc",
        }}
      >
        <Grid item xs={3}>
          <RingLoader color="#4a90e2" />
        </Grid>
      </Grid>
);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        marginLeft: 300,
        marginTop: 60,
        marginBottom: 65,
      }}
    >
      {items.map((product) => (
        <Item key={product.id} item={product} />
      ))}
    </div>
  );
}