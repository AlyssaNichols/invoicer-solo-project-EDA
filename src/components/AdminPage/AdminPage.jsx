import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import AdminFinancialPage from "../AdminFinancesPage/AdminFinancesPage";

export default function AdminPage() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <br /> <br /> <br />
      <center>
        <Card sx={{ minWidth: 275, width: "98%" }}>
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
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!
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
        </Card>{" "}
      </center>
      <nav className="adminNav">
        <div className="adminNavLinks">
          <Link to="/admin/services">Services</Link>
          <Link to="/admin/customers">Customers</Link>
          <Link to="/admin/employees">Employees</Link>
        </div>
      </nav>
      <div className="aboutDiv">
        <h1 className="mainUserHeader">
          Thanks for choosing <br />
          <span className="professionalInvoice">Invoicer</span>
          <br />
          for your Business
        </h1>
        <p className="infoParagraph">
          As the Admin, you have the control to Add and Remove: Services, Customers, and Employees
        </p>
        <p className="infoParagraph">
         Below you will find a Month by Month Financial <br />overview of how much your company has Invoiced.

        </p>
        <br />
        <AdminFinancialPage />
      </div>
    </>
  );
}
