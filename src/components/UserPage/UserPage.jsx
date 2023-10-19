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

  </>
  )
}

// this allows us to use <App /> in index.js
export default UserPage;


/* <br />
<br />
    <div className="container">

  <div className="grid">
    <div className="grid-col grid-col_8">
      <p>
        With KwikInvoice, you can generate, customise and send out
        professional invoices to your clients or customers superfast. The
        best thing is that you get to do this at zero cost. Try it out now!
      </p>

      {/* <p>
        Praesent consectetur orci dui, id elementum eros facilisis id. Sed
        id dolor in augue porttitor faucibus eget sit amet ante. Nunc
        consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
        finibus metus facilisis. Nullam eget lectus non urna rhoncus
        accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
        euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
        lobortis augue mi vel felis. Duis ultrices sapien at est convallis
        congue.
      </p>

      <p>
        Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
        Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
        vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
        sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
        non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
        amet nisi.
      </p> */
//     </div>
//     <div className="grid-col grid-col_4">
//       <center>
//       <br />
//   <h2>Welcome, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!</h2>
//   <p>Your ID is: {user.id}</p>
//       </center>
//     </div>
//   </div>
// </div>
// <div>

// </div>
// ); */}