import React from "react";
import { useSelector } from "react-redux";
import "./UserPage.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
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
      <center>
        <Card sx={{ minWidth: "275", width: "98%" }}>
          <center>
            <CardContent>
              <h2
                style={{
                  marginTop: "-5px",
                  marginBottom: "0px",
                  fontSize: "22px",
                }}
              >
                {" "}
                Welcome,{" "}
                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                !
              </h2>
              <p
                style={{
                  marginTop: "5px",
                  marginBottom: "-5px",
                  fontSize: "16px",
                }}
              >
                Your ID Number is: {user.id}
              </p>
            </CardContent>
          </center>
        </Card>
      </center>
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
            style={{
              backgroundColor: "#946E6D",
              color: "white",
              fontSize: "16px",
            }}
            variant="contained"
            onClick={() => {
              invoicePage();
            }}
          >
            Create an Invoice Now
          </Button>
        </center>
      </div>
    </>
  );
}

export default UserPage;
