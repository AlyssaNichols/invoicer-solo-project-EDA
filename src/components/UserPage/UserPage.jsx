import React from "react";
import { useSelector } from "react-redux";
import "./UserPage.css";
import { Card, CardContent, Button, Box } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import landingImage from "./landingImage.jpg";


export default function UserPage() {
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
      <div
        className="aboutDiv"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div style={{ flex: 1 }}>
          <h1 className="mainUserHeader">
            Easily Generate A <br />
            <span className="professionalInvoice">Professional Invoice</span>
            <br />
            for your Business
          </h1>
          <p className="infoParagraph" style={{ color: "black" }}>
            With Invoicer, you have the power to effortlessly craft tailor-made,
            polished invoices for your valued clients and customers. <br />
            The best part? It's absolutely free. Don't hesitate, give it a try
            today!
          </p>
          <br />
          <center>
            <Button
              style={{
                backgroundColor: "#F69D55",
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
        <div style={{ flex: 0.51, textAlign: "right", marginRight: "5%", marginBottom: "1%" }}>
          <img
            src={landingImage}
            alt="heroImg"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </>
  );
}
