import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import landingImage from "../UserPage/landingImage.jpg"
import LoginForm from "../LoginForm/LoginForm";

function LoginPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div style={{ marginBottom: "0"}}>
      <center>
      <div className="landing-container">
      <center>
      <div
        className="landingDiv"
        style={{ display: "flex", width: "50%" }}
      >
        <div style={{ flex: 1}}>
          <h1 className="mainUserHeader" >
          <br />
            Easily Generate A <br />
            <span className="professionalInvoice">Professional Invoice</span>
            <br />
            for your Business
          </h1>
          <center>
          <Paper
          elevation={3}
          style={{
            width: "60%",
            paddingBottom: "30px",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoginForm />
          </div>
        </Paper>
        <br />
        </center>
        </div>
        </div>
        </center>
    </div>
      </center>
    </div>
  );
}

export default LoginPage;
