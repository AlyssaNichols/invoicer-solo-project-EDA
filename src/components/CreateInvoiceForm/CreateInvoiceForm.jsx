import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { InputLabel } from "@mui/material";
import { MenuItem, Box, FormControl } from "@mui/material";
import { Button, TextField } from "@mui/material";

export default function CreateInvoicePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [newInvoice, setNewInvoice] = useState({
    date_issued: "",
    customer_id: "",
  });

  const customerList = useSelector((store) => store.customers);

  useEffect(() => {
    console.log("fetching services and customers");
    dispatch({ type: "FETCH_CUSTOMERS" });
  }, []);

  const handleCreateInvoice = async () => {
    if (!newInvoice.date_issued || !newInvoice.customer_id) {
      alert("Please make sure all fields are filled in before submitting!");
    } else {
    const actionResult = await dispatch({
      type: "ADD_INVOICE",
      payload: { newInvoice, history },
    });
  };
}

  console.log(newInvoice);

  return (
    <div>
      <br />
      <br />
      <center>
        <h1>Let's Get Started!</h1>
        <InputLabel
          sx={{
            fontWeight: "normal",
            fontSize: "18px",
            color: "black",
          }}
        >
          {" "}
          Step 1: Select a customer <br /> Step 2: Select a date for the invoice
          to be issued <br /> Step 3: Click Create Invoice
        </InputLabel>{" "}
        <br />
        <hr />
      </center>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <center>
          <Box
            sx={{
              textAlign: "left",
              padding: "16px",
              "& .MuiTextField-root": { m: 0.4, width: "40ch" },
            }}
          >
            <InputLabel sx={{
            fontWeight: "normal",
            fontSize: "18px",
            color: "black",
          }}>Select a Customer:</InputLabel>
            <TextField
              select
              label="Select a Customer"
              id="customerSelect"
              value={newInvoice.customer_id}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, customer_id: e.target.value })
              }
              fullWidth
              InputLabelProps={{
                shrink: false,
              }}
            >
              {customerList.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.last_name}, {customer.first_name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            sx={{
              textAlign: "left",
              padding: "16px",
              "& .MuiTextField-root": { m: 0.4, width: "40ch" },
            }}
          >
             <InputLabel sx={{
            fontWeight: "normal",
            fontSize: "18px",
            color: "black",
          }}>Date Issued:</InputLabel>
            <TextField
              type="date"
              id="date_issued"
              value={newInvoice.date_issued}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, date_issued: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateInvoice}
            sx={{ textAlign: "left", padding: "16px" }}
          >
            Create Invoice
          </Button>
        </center>
      </div>
    </div>
  );
}
