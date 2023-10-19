import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import "./UserPage.css"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';


function UserPage() {


  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (<> 
  <br />
  <br />
  <br />
    <Card sx={{ minWidth: 275 }}>
      <center>
    <CardContent>
      <Typography variant="h5" component="div" sx={{  marginTop: "-15px"}}>
      Welcome, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!
      </Typography>
      <Typography sx={{ mb: 1.5, marginBottom: "-2px"}} color="text.secondary">
     Your ID is: {user.id}
      </Typography>
    </CardContent>
    </center>
  </Card>
  <div style={{ display: 'flex', marginLeft: '120px', marginTop: '500px' }}>
  <Card sx={{ maxWidth: 450, marginRight: '110px' }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>

  <Card sx={{ maxWidth: 450, marginRight: '20px' }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Second card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
</div>
</>
  )
}


export default UserPage;

