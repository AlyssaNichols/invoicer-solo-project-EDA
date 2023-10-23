import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArchivedCustomerList from "../ArchivedCustomerList/ArchivedCustomerList";
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
import AdminListCustomers from "../AdminListCustomers/AdminListCustomers";
import CustomerInputForm from "../CustomerInputForm/CustomerInputForm";
import AdminTable from "../AdminTable/AdminTable";

export default function AdminCustomerPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerList = useSelector((store) => store.customers);
  const archivedList = useSelector((store) => store.archived);

  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const toggleCustomerForm = () => {
    setShowCustomerForm(!showCustomerForm);
  };

  const toggleArchived = () => {
    setShowArchived(!showArchived);
  };

  const addNewCustomer = (event) => {
    event.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !phone
    ) {
      alert("Please make sure all fields are filled in before submitting!");
      return
    } else {
      Swal.fire({
        icon: "success",
        title: "Customer Added",
        text: "The new customer has been successfully added.",
      });
      dispatch({
        type: "ADD_CUSTOMER",
        payload: {
          firstName,
          lastName,
          address,
          city,
          state,
          zip,
          email,
          phone,
        },
      });
      setFirstName("");
      setLastName("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      setEmail("");
      setPhone("");
      toggleCustomerForm(); // Hide the form after adding a customer
    }
  };

  const cancelAddCustomer = () => {
    // Reset form fields and hide the form
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setEmail("");
    setPhone("");
    toggleCustomerForm(); // Hide the form
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_CUSTOMERS" });
    dispatch({ type: "FETCH_ARCHIVED_CUSTOMERS" });
  }, []);


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
                    Input New Customer
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
                      Customer List
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
              Add New Customer
            </Button>
          </div>
        )}
        {showCustomerForm && (
          <>
            <Paper
              style={{ width: "40%", marginTop: "20px", paddingTop: "25px" }}
              elevation={3}
            >
              <form onSubmit={addNewCustomer}>
                <Box
                  className="formFields"
                  sx={{
                    "& .MuiTextField-root": { m: 0.4, width: "40ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <br />
                  <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
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
                  <br />
                  <Button
                    style={{ backgroundColor: "#A09084", color: "white" }}
                    variant="contained"
                    type="button"
                    onClick={cancelAddCustomer}
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    style={{ backgroundColor: "#008080", color: "white" }}
                    variant="contained"
                    type="submit"
                  >
                    Add New Customer
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
      {!showCustomerForm && (
       <AdminTable />
      )}
      <br />
      <br />
      <center>
        <br />
        <br />
        <Button
          style={{ backgroundColor: "#996887", color: "white" }}
          variant="contained"
          onClick={() => {
            history.push("/admin");
          }}
        >
          Back to Admin Main Page
        </Button>
      </center>
      <br />
      <center>
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
      </center>
    </>
  );
}

