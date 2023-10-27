import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const history = useHistory();
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <div className="infoDiv">
        <h1 className="main-info-header">
          Easily Generate A <br />
          <span className="professionalInvoice">Professional Invoice</span>
          <br />
          for your Business
        </h1>
        <div className="info-content">
          <h2 className="infoHeading">Simplify Your Invoicing</h2>
          <p className="info-paragraph">
            Welcome to Invoicer, where we've reimagined the way you create
            invoices. We understand the challenges that often come with
            complicated and overwhelming invoice generation platforms. That's
            why we've paved the way for a simpler and more user-friendly
            solution.
          </p>

          <h2 className="infoHeading">Effortless & Cost-Free</h2>
          <p className="info-paragraph">
            With Invoicer, we've designed a platform with you in mind, offering
            an easy and intuitive solution for generating invoices. Our mission
            is to empower you to effortlessly create custom, professional
            invoices for your valued clients and customers. The best part? It's
            entirely free to use. So why wait? Give it a try today and
            experience the simplicity and efficiency of our platform built with
            your needs in mind.
          </p>
        </div>
        <center>
          <Button
            style={{
              backgroundColor: "#F69D55",
              color: "white",
              marginTop: "20px",
              fontSize: "16px",
            }}
            variant="contained"
            type="button"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
        </center>
      </div>
    </div>
  );
}

export default InfoPage;

{
  /* <div className="aboutDiv">
<h1 className="mainUserHeader">
  Easily Generate A <br />
  <span className="professionalInvoice">Professional Invoice</span>
  <br />
  for your Business
</h1>

<div className="infoContent">

<Card sx={{ minWidth: 275, marginTop: "20px", width: "98%" }}>
  <center>
    <CardContent>
      <Typography variant="h6" component="div">
        <h1
          style={{
            marginTop: "-5px",
            marginBottom: "5px",
            letterSpacing: ".5px",
          }}
        >
          Simplify Your Invoicing
        </h1>
        <p className="infoParagraph">
          Welcome to Invoicer, where we've reimagined the way you create
          invoices. We understand the challenges that often come with
          complicated and overwhelming invoice generation platforms.
          That's why we've paved the way for a simpler and more
          user-friendly solution.
        </p>
      </Typography>
    </CardContent>
  </center>
</Card>
<Card sx={{ minWidth: 275, marginTop: "20px", width: "98%" }}>
  <center>
    <CardContent>
      <Typography variant="h6" component="div">
        <h1
          style={{
            marginTop: "-5px",
            marginBottom: "5px",
            letterSpacing: ".5px",
          }}
        >
          Effortless & Cost-Free
        </h1>
        <p className="infoParagraph">
    With Invoicer, we've designed a platform with you in mind, offering
    an easy and intuitive solution for generating invoices. Our mission
    is to empower you to effortlessly create custom, professional
    invoices for your valued clients and customers. The best part? It's
    entirely free to use. So why wait? Give it a try today and
    experience the simplicity and efficiency of our platform built with
    your needs in mind.
  </p>
      </Typography>
    </CardContent>
  </center>
</Card>
</div>

<br />
<center>
  <Button
    style={{
      backgroundColor: "#7d5e51",
      color: "white",
      marginTop: "20px",
    }}
    variant="contained"
    type="button"
    onClick={() => {
      history.push("/home");
    }}
  >
    Back To Home
  </Button>
</center>
</div>
</div> */
}
