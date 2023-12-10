import { Box, TextField, CardActions } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { useState, useContext } from "react";
import CartContext from "../../context/CartContext";
import Cart from "../Cart/Cart";

export default function ItemCount({ stock, id, image, name, price }) {
  const [num, setNum] = useState(1);
  const { addToCart, openModal } = useContext(CartContext);

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setNum(e.target.value);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: parseInt(id),
      quantity: parseInt(num),
      image,
      name,
      price,
    });
  };

  const handleCartClick = () => {
  openModal(true)
  };

  return (
    <Grid>
      <CardActions>
        <Box component="form" minWidth="100px">
          <TextField
            type="number"
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            inputProps={{ min: 1, max: stock }}
            onChange={(e) => handleChange(e)}
            value={num}
          />
        </Box>
        
        <Button
          size="medium"
          color="secondary"
          variant="contained"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={handleCartClick}
      >
        View Cart
        </Button>
        {/* Render the Cart component only when open state is true */}
        {open && <Cart />}
      </CardActions>
    </Grid>
  );
}
