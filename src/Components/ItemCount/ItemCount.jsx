import { Box, TextField, CardActions } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { useState, useContext } from "react";
import CartContext from "../../context/CartContext"

export default function ItemCount({ stock , id, image, name, price }) {
  const [num, setNum] = useState(1);
  
  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setNum(e.target.value);
    }
  };

  const { addToCart} = useContext(CartContext)

  const handleAddToCart = ()=>{
    addToCart({
      id: (parseInt(id)),
      quantity: (parseInt(num)),
      image ,
      name ,
      price
    })
  }
  return (
    <Grid item xs={8}>
      <CardActions>
        <Box component="form">
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
        <Button size="medium" color="secondary" variant="contained" onClick={handleAddToCart} >
          Add to Cart
        </Button>
        
      </CardActions>
    </Grid>
  );
}
