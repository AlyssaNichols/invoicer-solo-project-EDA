import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button, Paper, Card, CardContent, Typography } from "@mui/material";

export default function CustomerInputForm() {
  const history = useHistory();
  const dispatch = useDispatch();

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
    } else {
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
    }
  };
  function cancelAdd() {
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setEmail("");
    setPhone("");
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <br />
      <br />
      <center>      <Card sx={{ minWidth: 275, marginTop: "20px" }}>
        <center>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
            >
              <h2 style={{
                  marginTop: "-5px", marginBottom: "-5px"
                }}>Input New Customer</h2>
            </Typography>
          </CardContent>
        </center>
      </Card>
        <Paper style={{ width: "40%", marginTop: "20px", paddingTop: "25px" }} elevation={3}>
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
                style={{ backgroundColor: "white" }}
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <br />
              <TextField
                style={{ backgroundColor: "white" }}
                label="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              <br />
              <TextField
                style={{ backgroundColor: "white" }}
                label="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <br />
              <TextField
                style={{ backgroundColor: "white" }}
                label="City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
              <br />
              <TextField
                style={{ backgroundColor: "white" }}
                label="State"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
              <br />
              <TextField
                style={{ backgroundColor: "white" }}
                label="Zip Code"
                type="number"
                value={zip}
                onChange={(event) => setZip(Number(event.target.value))}
              />
              <br />
              <TextField
                style={{ backgroundColor: "white" }}
                label="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <br />
              <TextField
                style={{ backgroundColor: "white" }}
                className="phoneInput"
                type="number"
                label="Phone Number"
                value={phone}
                onChange={(event) => setPhone(Number(event.target.value))}
              />
              <br />
              <br />
              <Button
                style={{ backgroundColor: "#008080", color: "white" }}
                variant="contained"
                type="submit"
              >
                Add New Customer
              </Button>{" "}
              <Button
                style={{ backgroundColor: "#7d5e51", color: "white" }}
                variant="contained"
                type="button"
                onClick={cancelAdd}
              >
                Cancel
              </Button>
            </Box>
            <br />
          </form>
        </Paper>
      </center>
    </>
  );
}
