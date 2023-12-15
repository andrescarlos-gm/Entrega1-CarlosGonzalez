import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import RingLoader from "react-spinners/RingLoader";
import {Divider} from "@mui/material";
import ItemCount from "../ItemCount/ItemCount.jsx";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import CartContext from "../../context/CartContext.jsx";
import "./ItemDetail.css"

export default function ItemDetail() {
  const [item, setItem] = useState(null);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const { cartList } = useContext(CartContext);
  function currencyFormat(num) {
    return "$ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const refDoc = doc(db, "parallaxhumanoid", id);

      try {
        const snapshot = await getDoc(refDoc);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setItem(data);
        } else {
          setItem(404)
        }
      } catch (error) {
        setItem(404)
      }
    };

    fetchData();
  }, [id]);
  useEffect(()=>{
    
    if (item) {

    const updatedTotal = cartList.reduce((acc, items) => {
      if (items.id === parseInt(item.id)) {
        return acc + items.quantity
      }
      return acc;
    }, 0);
    setTotal(updatedTotal)
  }
  }, [cartList, item, total]);
  if (!item) {
    return (
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
  if (item === 404) {
    return (
    <div className="notfound"></div>
    )
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      paddingTop={"100px"}
      paddingLeft={"300px"}
      paddingRight={"150px"}
    >
      <Grid item xs={6}>
        <Card
          sx={{
            maxWidth: 500,
            backgroundColor: "#E5D0CC",
            borderRadius: "16px",
          }}
        >
          <CardMedia
            component="img"
            image={item.ProductImage}
            alt="product image"
          />
        </Card>
      </Grid>
      <Grid item xs={6}>
        <CardContent sx={{ borderRadius: "16px" }}>
          <Typography gutterBottom variant="h4" component="div">
            {item.ProductName}
          </Typography>
          <Typography variant="h6">{item.ProductDescription}</Typography>
        </CardContent>
        <Divider />
        <CardContent sx={{ paddingRight: 6 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            paddingTop={"30px"}
          >
            {currencyFormat(item.price)}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Stock available: {item.stock - total}
          </Typography>
        </CardContent>
        <Divider light />
        <CardContent sx={{ paddingRight: 6 }}>
          <ItemCount
            stock={item.stock}
            id={item.id}
            price={item.price}
            name={item.ProductName}
            image={item.ProductImage}
          />
        </CardContent>
      </Grid>
    </Grid>
  );
}
