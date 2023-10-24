import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { InputLabel } from "@mui/material";
import { MenuItem, Box } from "@mui/material";
import { Button, TextField, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
    // Dispatch the ADD_INVOICE action and wait for it to complete
    const actionResult = await dispatch({
      type: "ADD_INVOICE",
      payload: { newInvoice, history },
    });
  };

  console.log(newInvoice);

  return (
    <div>
      <br />
      <br />
      <div className="createInvoice-header-section">
        <center>
          <Card sx={{ minWidth: 275, marginTop: "20px", width: "98%" }}>
            <CardContent>
              <h1
                style={{
                  marginTop: "-5px",
                  letterSpacing: ".5px",
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
              <TextField
                select
                label="Select a Customer"
                id="customerSelect"
                value={newInvoice.customer_id}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, customer_id: e.target.value })
                }
                fullWidth
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
              />
            </Box>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#008080",
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
