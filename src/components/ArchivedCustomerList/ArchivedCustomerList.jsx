import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function ArchivedCutomerList({ toggleArchived }) {
  const dispatch = useDispatch();
  const archivedList = useSelector((store) => store.archived);

  useEffect(() => {
    dispatch({ type: "FETCH_ARCHIVED_CUSTOMERS" });
  }, []);

  const handleReset = (customerId) => {
    // Dispatch an action to delete the invoice with the given ID
    dispatch({ type: "RESET_CUSTOMER", payload: customerId });
    dispatch({ type: "FETCH_CUSTOMERS" });
  };

  return (
    <center>
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
                Archived Customers
              </h2>
            </Typography>
          </CardContent>
        </center>
      </Card>
      <br />
      <br />
      <Button
        style={{ backgroundColor: "#A09084", color: "white" }}
        variant="contained"
        type="button"
        onClick={toggleArchived}
      >
        Collapse List
      </Button>
      <br />
      <br />
      <br />
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Last, First Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>ZIP</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {archivedList?.map((customer, index) => {
            return (
              <tr key={index}>
                <td>
                  {customer.last_name}, {customer.first_name}{" "}
                </td>
                <td>{customer.address}</td>
                <td>{customer.city}</td>
                <td>{customer.state}</td>
                <td>{customer.zip}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>
                  <button
                    className="paidButton"
                    onClick={() => handleReset(customer.id)}
                  >
                    Un-Archive Customer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </center>
  );
}
