import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { InputLabel } from "@mui/material";
import { MenuItem, Box } from "@mui/material";
import { Button, TextField, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";

export default function CreateInvoicePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerList = useSelector((store) => store.customers);
  const [newInvoice, setNewInvoice] = useState({
    date_issued: " ",
    customer_id: " ",
  });
  const defaultProps = {
    options: customerList,
    getOptionLabel: (customer) =>
      `${customer.last_name}, ${customer.first_name}`,
  };

  useEffect(() => {
    console.log("fetching services and customers");
    dispatch({ type: "FETCH_CUSTOMERS" });
  }, []);
  

  const handleCreateInvoice = async () => {
    if (!newInvoice.customer_id || !newInvoice.date_issued) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure all fields are filled in before submitting!",
      });
      return;
    }
    const actionResult = await dispatch({
      type: "ADD_INVOICE",
      payload: { newInvoice, history },
    });
  };

  return (
    <div>
      <br />
      <br />
      <div className="createInvoice-header-section">
        <center>
          <Card
            sx={{
              minWidth: 275,
              marginTop: "20px",
              width: "96%",
              backgroundColor: "#DFD9D9",
            }}
          >
            <CardContent>
              <h1
                style={{
                  marginTop: "-5px",
                  letterSpacing: ".7px",
                }}
              >
                Let's Get Started!
              </h1>
              <Typography
                sx={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginBottom: "-5px",
                  marginTop: "-15px",
                }}
              >
                Step 1: Select a customer <br /> Step 2: Select a date for the
                invoice to be issued <br /> Step 3: Click Create Invoice
              </Typography>
            </CardContent>
          </Card>
        </center>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <center>
          <br />
          <br />
          <Paper elevation={3}>
            <br />
            <Box
              sx={{
                textAlign: "left",
                padding: "16px",
                "& .MuiTextField-root": { m: 0.4, width: "40ch" },
              }}
            >
              <InputLabel
                sx={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                }}
              >
                Select a Customer:
              </InputLabel>
              <Autocomplete
                {...defaultProps}
                id="customerSelect"
                value={
                  customerList.find(
                    (customer) => customer.id === newInvoice.customer_id
                  ) || null
                }
                onChange={(_, newValue) => {
                  setNewInvoice({
                    ...newInvoice,
                    customer_id: newValue ? newValue.id : null,
                  });
                }}
                includeInputInList
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select a Customer"
                    variant="outlined"
                    placeholder="Start typing to select a customer"
                    
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                textAlign: "left",
                padding: "16px",
                "& .MuiTextField-root": { m: 0.4, width: "40ch" },
              }}
            >
              <InputLabel
                sx={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                }}
              >
                Date Issued:
              </InputLabel>
              <TextField
                type="date"
                id="date_issued"
                value={newInvoice.date_issued}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, date_issued: e.target.value })
                }
                fullWidth
                variant="outlined"
              />
            </Box>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#F69D55",
                color: "white",
                fontSize: "16px",
                marginTop: "20px",
              }}
              onClick={handleCreateInvoice}
              sx={{ textAlign: "left", padding: "10px 20px" }}
            >
              Create Invoice
            </Button>
            <br />
            <br />
          </Paper>
        </center>
      </div>
    </div>
  );
}
