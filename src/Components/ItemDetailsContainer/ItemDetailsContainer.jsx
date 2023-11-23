import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const url = "https://6544295e5a0b4b04436c18e0.mockapi.io/v1/parallaxHumanoid/";

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

  if (!item) {
    return <>Loading...</>;
  }

 


  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh', paddingTop: '100px', backgroundColor: '#cfd8dc' }}
   >
      <Grid item xs={3}>

    <Card sx={{ maxWidth: 345, backgroundColor: "#E5D0CC", width: 450, }}>
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
          <Typography variant="body2" color="text.secondary">
            {item.ProductDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid> </Grid>
  );
}
