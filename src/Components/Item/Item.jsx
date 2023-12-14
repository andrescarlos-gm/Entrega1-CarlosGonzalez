import { Link } from "react-router-dom";
import {
  Button,
  CardActionArea,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function Item({ item }) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#E5D0CC", width: 450 }}>
      <Link to={`/item/${item.uid}`} style={{ textDecoration: "none" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={item.ProductImage}
            alt="image"
          />

          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "250px",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="black"
              paddingBottom={3}
            >
              {item.ProductName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.ProductDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to={`/item/${item.uid}`}>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </Link>
      </Grid>
    </Card>
  );
}
