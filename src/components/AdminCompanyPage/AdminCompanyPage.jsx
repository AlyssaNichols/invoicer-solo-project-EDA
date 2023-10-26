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
    if (
      !companyName ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !phone ||
      !url
    ) {
      alert("Please make sure all fields are filled in before submitting!");
      return;
    } else {
      Swal.fire({
        icon: "success",
        title: "Company Added",
        text: "The new Company has been successfully added.",
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

  return (
    <>
      <center>
        <br />
        <br />
        {showCustomerForm ? (
          <Card sx={{ minWidth: 275, marginTop: "20px", width: "98%" }}>
            <center>
              <CardContent>
                <Typography variant="h5" component="div">
                  <h2
                    style={{
                      marginTop: "-5px",
                      marginBottom: "-15px",
                      letterSpacing: ".5px",
                    }}
                  >
                    Input Company Details
                  </h2>
                </Typography>
              </CardContent>
            </center>
          </Card>
        ) : (
          <div>
            <Card sx={{ minWidth: 275, marginTop: "20px", width: "98%" }}>
              <center>
                <CardContent>
                  <Typography variant="h5" component="div">
                    <h2
                      style={{
                        marginTop: "-5px",
                        marginBottom: "-15px",
                        letterSpacing: ".5px",
                      }}
                    >
                      Company List
                    </h2>
                  </Typography>
                </CardContent>
              </center>
            </Card>
            <br />
            <Button
              style={{ backgroundColor: "#008080", color: "white" }}
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
                    onChange={(event) =>
                      setUrl(event.target.value)
                    }
                  />
                  <br />
                  <br />
                  <Button
                    style={{ backgroundColor: "#A09084", color: "white" }}
                    variant="contained"
                    type="button"
                    onClick={cancelAddCompany}
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    style={{ backgroundColor: "#008080", color: "white" }}
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
      <center>
        <br />
        <br />
        <Button
          style={{ backgroundColor: "#946563", color: "white" }}
          variant="contained"
          onClick={() => {
            history.push("/admin");
          }}
        >
          Back to Admin Main Page
        </Button>
      </center>
      <br />
      {/* <center>
        {showArchived ? (
          <ArchivedCustomerList toggleArchived={toggleArchived} />
        ) : (
          <Button
            style={{ backgroundColor: "#A09084", color: "white" }}
            variant="contained"
            type="button"
            onClick={toggleArchived}
          >
            Show Archived Customers
          </Button>
        )}
      </center> */}
    </>
  );
}
