import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
} from "@mui/material";
import RingLoader from "react-spinners/RingLoader";
import { Divider, Button } from "@mui/material";
import ItemCount from "../ItemCount/ItemCount.jsx";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import { red } from "@mui/material/colors";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import CartContext from "../../context/CartContext.jsx";
import "./ItemDetail.css";

export default function ItemDetail() {
  const [item, setItem] = useState(null);
  const [total, setTotal] = useState(0);
  const [fav, setFav] = useState(false);
  const { id } = useParams();
  const { cartList, favs, favList } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [openLike, setOpenLike] = useState(false);
  const [openLikerm, setOpenLikerm] = useState(false);

  //First check if product is fav for first render
useEffect(()=>{
  if(favs.includes(id)){
    setFav(true)
  }
},[favs, id])
  // Get item data and verify if it exists, otherwise renders 404
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

  const user = JSON.parse(localStorage.getItem("user"));
//Recupera todos los favoritos 
useEffect(() => {
  if (user) {
    const fetchLikes = async () => {
      const db = getFirestore();
      const favRef = doc(db, "favorites", `${user.uid}`);
      try {
        const snapshot = await getDoc(favRef);
        const favs = snapshot.data();
        favList(favs.product);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchLikes();
  }
}, []);

  // Item Quantity
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

  const handleUpdate = async () => {
    const db = getFirestore();
    const user = localStorage.getItem("user");
    const uid = JSON.parse(user);
    const favsDoc = doc(db, "favorites", uid.uid);
    if (!fav === true) {
      const favsData = (await getDoc(favsDoc)).data();
      const existingProducts = favsData?.product || [];
      const updatedProducts = [...existingProducts, id];
      if (!favsData.product.includes(id)) {
        await updateDoc(favsDoc, {
          product: updatedProducts,
        });
      }

      setOpenLike(true);
    } else {
      const favsData = (await getDoc(favsDoc)).data();
      const existingProducts = favsData?.product || [];
      const updatedProducts = existingProducts.filter(
        (productId) => productId !== id
      );
      await updateDoc(favsDoc, {
        product: updatedProducts,
      });
      setOpenLikerm(true);
    }
  };
  const favHandler = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setFav(!fav);
      handleUpdate();
    } else {
      handleClick();
    }
  };

  function currencyFormat(num) {
    return "$ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseLike = () => {
    setOpenLike(false);
  };
  const handleCloseLikerm = () => {
    setOpenLikerm(false);
  };

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
            {fav ? (
              <FavoriteTwoToneIcon sx={{ color: red[500] }} />
            ) : (
              <FavoriteBorderTwoToneIcon sx={{ color: red[500] }} />
            )}
          </Button>

          <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={2000}
            message="You must login in order to add favorites"
          />
          <Snackbar
            open={openLike}
            onClose={handleCloseLike}
            autoHideDuration={2000}
            message={`Added to favs`}
          />
           <Snackbar
            open={openLikerm}
            onClose={handleCloseLikerm}
            autoHideDuration={2000}
            message={`Removed from favs`}
          />
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
