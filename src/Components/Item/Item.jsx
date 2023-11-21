import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Link} from 'react-router-dom'

export default function Item({ProductImage, ProductName, ProductDescription, id} ) {

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#E5D0CC", width: 450,  }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={ProductImage}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {ProductName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ProductDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Link to= {`/item/${id}`}>
        <Button size="small" color="primary">
          Learn More
        
        </Button>
        </Link>
        <Button size="medium" color="secondary" variant="contained" >
          Join the Waiting List
        </Button>
      </CardActions>
    </Card>
  );
}