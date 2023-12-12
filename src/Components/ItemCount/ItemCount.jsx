import { Box, TextField, CardActions } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import CartContext from "../../context/CartContext";
import { NavLink, Link } from "react-router-dom";


export default function ItemCount({ stock, id, image, name, price }) {
  const [num, setNum] = useState(1);
  const [total, setTotal] = useState(0);
  const { cartList, addToCart } = useContext(CartContext);

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      
      setNum(e.target.value);
    }
  };

   useEffect(()=>{
     if (id) {
     const updatedTotal = cartList.reduce((acc, items) => {
      if (items.id == id) {
         return acc + items.quantity
       }
       return acc;
     }, 0);
     setTotal(updatedTotal)
   }
   }, [cartList, id]);
  const handleAddToCart = () => {
    
    if ((stock - total)-num > -1 )
    addToCart({
      id: parseInt(id),
      quantity: parseInt(num),
      image,
      name,
      price,
    });

  };

const isDisabled = (stock-total) <= 0;

  return (
    <Grid>
      <CardActions>
        <Box component="form" minWidth="100px">
          <TextField
            type="number"
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            inputProps={{ min: 0, max: stock-total,  }}
            onChange={(e) => handleChange(e)}
            value={num}
            disabled={isDisabled}
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
        <Link as={NavLink} to={`/cart`}>
        <Button
        size="medium"
        color="primary"
        variant="contained"
      >
        View Cart
        </Button>
</Link>


      </CardActions>
    </Grid>
  );
}
