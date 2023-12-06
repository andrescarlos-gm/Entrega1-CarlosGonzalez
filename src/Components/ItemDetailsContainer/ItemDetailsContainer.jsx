import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount.jsx";
const url = "https://6544295e5a0b4b04436c18e0.mockapi.io/v1/parallaxHumanoid/";
import {getFirestore, doc, getDoc} from "firebase/firestore"
import RingLoader from "react-spinners/RingLoader";

export default function ItemDetailsContainer() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(url + (id ? `?category=${id}` : ""));
        }, 2000);
      });

      promise
        .then((response) => fetch(response))
        .then((fetchResponse) => fetchResponse.json())
        .then((data) => {
          const filterRes = data.find((item) => item.id == id);
          setItem(filterRes);
        });
    };

    fetchData();
  }, [id]);
  
  
  useEffect(() => {
    const db = getFirestore();

    const refDoc = doc(db,"parallaxhumanoid","XkfDXoNeA9rF8xo5LaxN")
    
    getDoc(refDoc).then((snapshot)=>{
       const catalog = snapshot.data()
       console.log(catalog.id)
    })
  },[]);
//  console.log(item)

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
          <RingLoader />
        </Grid>
      </Grid>
    );
  }

  return (
    
    <Grid
      container
      spacing={3}
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      paddingTop={6}
    >
      <Card sx={{ maxWidth: 345, backgroundColor: "#E5D0CC", width: 450 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={item.ProductImage}
            alt="image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.ProductName}
            </Typography>
            <Typography variant="body2">{item.ProductDescription}</Typography>
          </CardContent>
          <Typography gutterBottom variant="h6" component="div" paddingLeft={6} >
             Stock available: {item.stock}
            </Typography>
          <Grid item xs={20}>   
          </Grid>
        </CardActionArea>
        <ItemCount
              stock={item.stock}
              id={item.id}
              price={item.price}
              name={item.ProductName}
              image={item.Product}
            />
      </Card>
      
    </Grid>
  );
}
