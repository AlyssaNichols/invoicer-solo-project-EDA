import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
        </h1>
        <p className="infoParagraph">
          As the administrator, you have the authority to add or remove
          services, customers, and employees. You will also have the ability to
          edit customer details. <br />
          Below you will discover a comprehensive month-by-month financial
          overview, detailing your company's invoicing history.
        </p>
        <br />
        <AdminFinancialPage />
      </div>
    </>
  );
}
