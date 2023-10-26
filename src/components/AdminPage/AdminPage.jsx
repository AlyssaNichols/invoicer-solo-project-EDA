import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AdminFinancialPage from "../AdminFinancesPage/AdminFinancesPage";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

export default function AdminPage() {
  const user = useSelector((store) => store.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuIconStyle = {
    fontSize: "50px",
    color: "black",
    borderRadius: "50%",
    padding:"10px",
  };

  const navStyle = {
  textDecoration: "none",
  color: "black",
  fontSize: "22px",
  padding: "10px 0",
  marginBottom: "20px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto"
}


  return (
    <>
      <br />
      <div>
        <br />
        <IconButton
          style={{ float: "right", marginTop: "10px", marginRight: "20px", verticalAlign: "middle" }}
          onClick={toggleMenu}
          color="inherit"
        >
          <MenuIcon style={menuIconStyle} className="menu-icon" />
        </IconButton>
        <Drawer anchor="right" open={menuOpen} onClose={toggleMenu}>
          <List
            style={{
              backgroundColor: "#DBDBDB",
              color: "black",
              width: "150px",
              position: "fixed",
              right: "0",
              height: "100%",
              overflowY: "auto",
              transition: "width 0.3s",
              zIndex: "1",
            }}
          >
            <ListItem button>
              
              <Link
                to="/admin/services" className="nav-link"
                style={navStyle}
              >
                Services
              </Link>
            </ListItem>
            <ListItem button>
              <Link
                to="/admin/customers" className="nav-link"
                style={navStyle}
              >
                Customers
              </Link>
            </ListItem>
            <ListItem button>
              <Link
                to="/admin/employees" className="nav-link"
                style={navStyle}
              >
                Employees
              </Link>
            </ListItem>
            <ListItem button>
              <Link
                to="/admin/company" className="nav-link"
                style={navStyle}
              >
                Companies
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </div>
      <div className="financialDiv">
        <br /> <br />
        <h1 className="mainUserHeader">
          <div className="welcomeName"><span>Welcome{" "}
          {user.username.charAt(0).toUpperCase() + user.username.slice(1)},</span></div>
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



      {/* <center>
        <Card sx={{ minWidth: 275, width: "96%", backgroundColor: "#DFD9D9"}}>
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
        </Card>
      </center> */}
      {/* <nav className="adminNav">
        <div class="menu-icon" id="menuIcon">
          &#9776;
        </div>
        <div className="adminNavLinks">
          <Link to="/admin/services">Services</Link>
          <Link to="/admin/customers">Customers</Link>
          <Link to="/admin/employees">Employees</Link>
          <Link to="/admin/company">Companies</Link>
        </div>
      </nav> */}