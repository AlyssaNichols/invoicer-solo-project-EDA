import React, { useState } from "react";
import { useDispatch } from "react-redux";
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

export default function CustomerInputForm() {
  
  const history = useHistory();
  const dispatch = useDispatch();

  const addNewCustomer = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !address || !city || !state || !zip || !phone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure all fields are filled in before submitting!",
      });
      return;
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
    Swal.fire({
      icon: "success",
      title: "Customer Added",
      text: "The New Customer has been successfully Added.",
    });
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

  function capitalizeFirstLetters(input) {
    return input.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
  }

  return (
    <>
      <br />
      <br />
      <center>
        {" "}
        <Card sx={{ minWidth: 275, marginTop: "20px", width: "96%", backgroundColor: "#DFD9D9"}}>
          <center>
            <CardContent>
              <Typography variant="h5" component="div">
                <h2
                  style={{
                    marginTop: "-5px",
                    marginBottom: "-5px",
                    letterSpacing: ".5px",
                  }}
                >
                  Input New Customer
                </h2>
              </Typography>
            </CardContent>
          </center>
        </Card>
        <Paper
          style={{ width: "40%", marginTop: "20px", paddingTop: "25px" }}
          elevation={3} 
        >
          <form onSubmit={addNewCustomer}>
            <Box
              className="formFields"
              sx={{
                "& .MuiTextField-root": { m: 0.5, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                style={{ backgroundColor: "white" }}
                inputProps={{
                  style: { textTransform: "capitalize" },
                }}
                label="First Name"
                value={firstName}
                onChange={(event) =>
                  setFirstName(capitalizeFirstLetters(event.target.value))
                }
                
                  />
              <br />
              <TextField
                style={{ backgroundColor: "white", }}
                inputProps={{
                  style: { textTransform: "capitalize" },
                }}
                label="Last Name"
                value={lastName}
                onChange={(event) =>
                  setLastName(capitalizeFirstLetters(event.target.value))
                }
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
                label="Email Address (optional)"
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
                style={{ backgroundColor: "#AFABAB", color: "white" }}
                variant="contained"
                type="button"
                onClick={cancelAdd}
              >
                Cancel
              </Button>{" "}
              <Button
                style={{ backgroundColor: "#F69D55", color: "white" }}
                variant="contained"
                type="submit"
              >
                Add New Customer
              </Button>
            </Box>
            <br />
          </form>
        </Paper>
      </center>
    </>
  );
}
