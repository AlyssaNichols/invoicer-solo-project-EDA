import React from "react";
import { useSelector } from "react-redux";
import "./UserPage.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function UserPage() {
  const history = useHistory();
  function invoicePage() {
    history.push("/invoice");
  }
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <br />
      <br />
      <br />
      <Card sx={{ minWidth: 275}}>
        <center>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                marginTop: "0px",
                fontWeight: "normal",
                fontSize: "22px",
                color: "black",
              }}
            >
              Welcome,{" "}
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!
            </Typography>
            <Typography sx={{ mb: 1.5, marginBottom: "-10px" }} color="black">
              Your ID is: {user.id}
            </Typography>
          </CardContent>
        </center>
      </Card>
      <div className="aboutDiv">
        <h1 className="mainUserHeader">
          Easily Generate A <br />
          <span className="professionalInvoice">Professional Invoice</span>
          <br />
          for your Business
        </h1>
        <p className="infoParagraph">
          With Invoicer, you have the power to effortlessly craft tailor-made,
          polished invoices for your valued clients and customers. <br />
          The best part? It's absolutely free. Don't hesitate, give it a try
          today!
        </p>
        <br />
        <center>
          <Button
           style={{ backgroundColor: "#9a5c6f", color: "white" }}
            variant="contained"
            onClick={() => {
              invoicePage();
            }}
          >
            Create an Invoice Now
          </Button>
        </center>
      </div>
      <div></div>
      {/* <div style={{ display: "flex", marginLeft: "120px", marginTop: "100px" }}>
        <Card sx={{ maxWidth: 450, marginRight: "110px" }}>
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
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 450, marginRight: "20px" }}>
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
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div> */}
    </>
  );
}

export default UserPage;
