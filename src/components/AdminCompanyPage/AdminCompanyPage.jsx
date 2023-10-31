import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import AdminCompanyTable from "../CompanyTable/AdminCompanyTable";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";

export default function AdminCompanyPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const companyList = useSelector((store) => store.companyReducer);

  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const toggleCustomerForm = () => {
    setShowCustomerForm(!showCustomerForm);
  };

  const addNewCompany = (event) => {
    event.preventDefault();
    if (!companyName || !address || !city || !state || !zip || !phone || !url) {
      alert("Please make sure all fields are filled in before submitting!");
      return;
    } else {
      Swal.fire({
        icon: "success",
        title: "Company Added",
        text: "Your New Company has been successfully added.",
      });
      dispatch({
        type: "ADD_COMPANY",
        payload: {
          companyName,
          address,
          city,
          state,
          zip,
          email,
          phone,
          url,
        },
      });
      setCompanyName("");
      setUrl("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      setEmail("");
      setPhone("");
      toggleCustomerForm(); // Hide the form after adding a customer
    }
  };

  const cancelAddCompany = () => {
    // Reset form fields and hide the form
    setCompanyName("");
    setUrl("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setEmail("");
    setPhone("");
    toggleCustomerForm(); // Hide the form
  };
  const [companyName, setCompanyName] = useState("");
  const [url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_COMPANIES" });
  }, []);

  function capitalizeFirstLetters(input) {
    return input.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
  }
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuIconStyle = {
    fontSize: "50px",
    color: "black",
    borderRadius: "50%",
    padding: "10px",
  };

  const navStyle = {
    textDecoration: "none",
    color: "black",
    fontSize: "22px",
    padding: "10px 0",
    marginBottom: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <>
      <center>
        <br />
        <br />
        {showCustomerForm ? (
          <Card
            sx={{
              minWidth: 275,
              marginTop: "20px",
              width: "96%",
              backgroundColor: "#DFD9D9",
            }}
          >
            <center>
              <CardContent>
                <Typography variant="h5" component="div">
                  <h2
                    style={{
                      marginTop: "7px",
                      marginBottom: "-45px",
                      marginRight: "-20px",
                    }}
                  >
                    Add New Company
                  </h2>
                </Typography>
              </CardContent>
            </center>
            <div>
              <br />
              <IconButton
                style={{
                  float: "right",
                  marginTop: "-70px",
                  marginRight: "20px",
                  verticalAlign: "middle",
                }}
                onClick={toggleMenu}
                color="inherit"
              >
                <MenuIcon style={menuIconStyle} className="page-menu-icon" />
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
                    <Link to="/admin" className="nav-link" style={navStyle}>
                      Admin
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link
                      to="/admin/services"
                      className="nav-link"
                      style={navStyle}
                    >
                      Services
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link
                      to="/admin/customers"
                      className="nav-link"
                      style={navStyle}
                    >
                      Customers
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link
                      to="/admin/employees"
                      className="nav-link"
                      style={navStyle}
                    >
                      Employees
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link
                      to="/admin/company"
                      className="nav-link"
                      style={navStyle}
                    >
                      Companies
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link
                      to="/admin/archivedInvoices"
                      className="nav-link"
                      style={navStyle}
                    >
                      Archived <br />
                      Invoices
                    </Link>
                  </ListItem>
                </List>
              </Drawer>
            </div>
          </Card>
        ) : (
          <div>
            <Card
              sx={{
                minWidth: 275,
                marginTop: "20px",
                width: "96%",
                backgroundColor: "#DFD9D9",
              }}
            >
              <center>
                <CardContent>
                  <Typography variant="h5" component="div">
                    <h2
                      style={{
                        marginTop: "7px",
                        marginBottom: "-45px",
                        marginRight: "-20px",
                      }}
                    >
                      Your Company List
                    </h2>
                  </Typography>
                </CardContent>
              </center>
              <div>
                <br />
                <IconButton
                  style={{
                    float: "right",
                    marginTop: "-70px",
                    marginRight: "20px",
                    verticalAlign: "middle",
                  }}
                  onClick={toggleMenu}
                  color="inherit"
                >
                  <MenuIcon style={menuIconStyle} className="page-menu-icon" />
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
                      <Link to="/admin" className="nav-link" style={navStyle}>
                        Admin
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link
                        to="/admin/services"
                        className="nav-link"
                        style={navStyle}
                      >
                        Services
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link
                        to="/admin/customers"
                        className="nav-link"
                        style={navStyle}
                      >
                        Customers
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link
                        to="/admin/employees"
                        className="nav-link"
                        style={navStyle}
                      >
                        Employees
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link
                        to="/admin/company"
                        className="nav-link"
                        style={navStyle}
                      >
                        Companies
                      </Link>
                    </ListItem>
                  </List>
                </Drawer>
              </div>
            </Card>
            <br />
            <Button
              style={{ backgroundColor: "#F69D55", color: "white" }}
              variant="contained"
              type="button"
              onClick={toggleCustomerForm}
            >
              Add New Company
            </Button>
          </div>
        )}
        {showCustomerForm && (
          <>
            <Paper
              style={{ width: "40%", marginTop: "20px", paddingTop: "25px" }}
              elevation={3}
            >
              <form onSubmit={addNewCompany}>
                <Box
                  className="formFields"
                  sx={{
                    "& .MuiTextField-root": { m: 0.4, width: "40ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    inputProps={{
                      style: { textTransform: "capitalize" },
                    }}
                    label="Company Name"
                    value={companyName}
                    onChange={(event) =>
                      setCompanyName(capitalizeFirstLetters(event.target.value))
                    }
                  />
                  <br />
                  <TextField
                    label="Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                  <br />
                  <TextField
                    label="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                  <br />
                  <TextField
                    label="State"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                  />
                  <br />
                  <TextField
                    label="Zip Code"
                    type="number"
                    value={zip}
                    onChange={(event) => setZip(Number(event.target.value))}
                  />
                  <br />
                  <TextField
                    label="Email Address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <br />
                  <TextField
                    className="phoneInput"
                    type="number"
                    label="Phone Number"
                    value={phone}
                    onChange={(event) => setPhone(Number(event.target.value))}
                  />
                  <br />
                  <TextField
                    inputProps={{
                      style: { textTransform: "capitalize" },
                    }}
                    label="Logo Url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                  <br />
                  <br />
                  <Button
                    style={{ backgroundColor: "#AFABAB", color: "white" }}
                    variant="contained"
                    type="button"
                    onClick={cancelAddCompany}
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    style={{ backgroundColor: "#F69D55", color: "white" }}
                    variant="contained"
                    type="submit"
                  >
                    Add New Company
                  </Button>
                </Box>
              </form>
              <br />
            </Paper>
            <br />
            <br />
          </>
        )}
      </center>
      <br />
      {!showCustomerForm && <AdminCompanyTable />}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
