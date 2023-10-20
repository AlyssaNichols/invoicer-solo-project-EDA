import { Link } from 'react-router-dom';
import React from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export default function AdminPage() {

  const user = useSelector((store) => store.user);

  return (<>    <br /> <br /> <br /><Card sx={{ minWidth: 275 }}>
    <center>
      <CardContent>
      <h2 style={{
              marginTop: "-5px", marginBottom: "0px", fontSize: "22px"
            }}>              Welcome,
            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!</h2>
        <p style={{
              marginTop: "5px", marginBottom: "-5px", fontSize: "16px"
            }}> 
          Your ID Number is: {user.id} 
        </p>
      </CardContent>
    </center>
  </Card>    <nav className="adminNav">
      <div className="adminNavLinks">
        <Link to="/admin/services">Services</Link>
        <Link to="/admin/customers">Customers</Link>
        <Link to="/admin/employees">Employees</Link>
      </div>
    </nav> <div className="aboutDiv">
        <h1 className="mainUserHeader">
          Thanks for chooseing <br />
          <span className="professionalInvoice">Invoicer</span>
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
        {/* <center>
          <Button
            style={{ backgroundColor: "#9a5c6f", color: "white" }}
            variant="contained"
            onClick={() => {
              invoicePage();
            }}
          >
            Create an Invoice Now
          </Button>
        </center> */}
      </div></>

  );
}
