import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import RingLoader from "react-spinners/RingLoader";
import { Divider, Button } from "@mui/material";
import ItemCount from "../ItemCount/ItemCount.jsx";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import { red } from '@mui/material/colors';

import { getFirestore, doc, getDoc } from "firebase/firestore";
import CartContext from "../../context/CartContext.jsx";
import "./ItemDetail.css";

export default function ItemDetail() {
  const [item, setItem] = useState(null);
  const [total, setTotal] = useState(0);
  const [fav, setFav] = useState(false);
  const { id } = useParams();
  const { cartList } = useContext(CartContext);

//   const db = getFirestore();
//   const orderCollection = collection(db, "favorites");
//   const fetchData = async () => {
//   try {
//     const snapshot = await getDocs(orderCollection);
//     if (snapshot.size === 0) {
//       console.log("No results");
//     }
//     if (id) {
//       const filteredData = snapshot.docs
//         .filter((doc) => doc.data().Category === id)
//         .map((doc) => ({
//           ...doc.data(),
//           uid: doc.id,
//         }));
//       setItems(filteredData);
//     } else {
//       const itemsData = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         uid: doc.id,
//       }));
//       setItems(itemsData);
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   } finally {
//     setLoading(false);
//   }
// };
// fetchData();
// }, [id]);
























  const favHandler = () => {
    setFav(!fav);
  };

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
          setItem(404);
        }
      } catch (error) {
        setItem(404);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    if (item) {
      const updatedTotal = cartList.reduce((acc, items) => {
        if (items.id === parseInt(item.id)) {
          return acc + items.quantity;
        }
        return acc;
      }, 0);
      setTotal(updatedTotal);
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
          <Typography>Loading...</Typography>
        </Grid>
      </Grid>
    );
  }
  if (item === 404) {
    return <div className="notfound"></div>;
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      paddingLeft={"300px"}
      paddingRight={"150px"}
      className="main-container"
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
          <Button onClick={favHandler}>
           {fav?<FavoriteBorderTwoToneIcon sx={{ color: red[500] }}/> : <FavoriteTwoToneIcon sx={{ color: red[500] }}/> } 
          </Button>
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
