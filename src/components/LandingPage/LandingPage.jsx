import React from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import landingImage from "../UserPage/landingImage.jpg"
import background from "./background.jpg"


function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
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
            paddingBottom: "40px",
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
            <center>
              <Typography variant="h8" component="div">
                <h2
                  style={{
                    marginTop: "5px",
                    marginBottom: "25px",
                  }}
                >
                  Invoicer Members: <br />
                  Please Login
                </h2>
              </Typography>
              <center>
                <Button
                  style={{
                    backgroundColor: "#F69D55",
                    color: "white",
                    width: "140px",
                    height: "40px",
                    fontSize: "16px",
                  }}
                  variant="contained"
                  onClick={onLogin}
                >
                  Login
                </Button>
              </center>
            </center>
          </div>
        </Paper>
        <br />
        </center>
        </div>
        </div>
        </center>
    </div>
  );
}

export default LandingPage;



// return (
//   <div className="container">
//     <div
//       className="homeDiv"
//       style={{ display: "flex", alignItems: "center" }}
//     >
//       <div style={{ flex: 1 }}>
//         <h1 className="mainUserHeader">
//           Easily Generate A <br />
//           <span className="professionalInvoice">Professional Invoice</span>
//           <br />
//           for your Business
//         </h1>
//         <center>
//         <Paper
//         elevation={3}
//         style={{
//           width: "50%",
//           paddingBottom: "40px",
//           paddingTop: "20px",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <center>
//             <Typography variant="h8" component="div">
//               <h2
//                 style={{
//                   marginTop: "5px",
//                   marginBottom: "25px",
//                 }}
//               >
//                 Invoicer Members: <br />
//                 Please Login
//               </h2>
//             </Typography>
//             <center>
//               <Button
//                 style={{
//                   backgroundColor: "#F69D55",
//                   color: "white",
//                   width: "140px",
//                   height: "40px",
//                   fontSize: "16px",
//                 }}
//                 variant="contained"
//                 onClick={onLogin}
//               >
//                 Login
//               </Button>
//             </center>
//           </center>
//         </div>
//       </Paper>
//       </center>
//       </div>
//       <div style={{ flex: 0.5, textAlign: "right", marginRight: "5%", marginBottom: "1%" }}>
//         <img
//           src={landingImage}
//           alt="heroImg"
//           style={{ maxWidth: "100%", height: "auto" }}
//         />
//       </div>
//       </div>
//   </div>
// );