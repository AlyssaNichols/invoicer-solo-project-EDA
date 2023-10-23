import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"; // Import useParams
import ServiceData from "../ServiceData/ServiceData";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./InvoiceHistory.css";
import Swal from "sweetalert2";
import Fuse from "fuse.js";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

export default function InvoiceHistory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const invoices = useSelector((state) => state.invoice);
  const user = useSelector((store) => store.user);
  console.log("INVOICES", invoices);

  useEffect(() => {
    dispatch({ type: "FETCH_INVOICES", payload: params.id });
  }, []);

  const [editedDate, setEditedDate] = useState("");
  const [editMode, setEditMode] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) {
      return " ";
    }
    const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const moreDetails = (invoiceId) => {
    history.push(`/invoice/details/${invoiceId}`);
  };

  function printInvoice(invoiceId) {
    history.push(`/invoice/print/${invoiceId}`);
  }

  const handleDeleteInvoice = (invoiceId) => {
    Swal.fire({
      title: "Are you sure you want to delete this Invoice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch an action to delete the invoice with the given ID
        dispatch({ type: "DELETE_INVOICE", payload: invoiceId });
        Swal.fire("Invoice Successfully Deleted!");
      }
    });
  };

  const [query, setQuery] = useState(" ");
  const fuse = new Fuse(invoices, {
    keys: ["id", "first_name", "last_name"],
    includeScore: true,
    threshold: 0.3, // Adjust this threshold (0.0 to 1.0) for strictness
    minMatchCharLength: 2, // Adjust the minimum character length for a match
  });
  const results = fuse.search(query);
  const searchResult = results.map((result) => result.item);
  console.log("RESULTS", results);

  function handleOnSearch(value) {
    console.log(value); // Add this line for debugging
    setQuery(value);
  }

  function clearInput() {
    setQuery(" ");
  }

  return (
    <>
      <br />
      <br />
      <center>
        <Card sx={{ minWidth: 275, marginTop: "20px", width: "98%" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              <h2
                style={{
                  marginTop: "-5px",
                  marginBottom: "-5px",
                  letterSpacing: ".5px",
                }}
              >
                Invoice History
              </h2>
            </Typography>
          </CardContent>
        </Card>
      </center>
      <br />
      <div>
        <TextField
          style={{
            marginLeft: "60px",
            borderRadius: "4px",
            width: "300px",
            marginBottom: "20px",
            backgroundColor: "white",
          }}
          variant="outlined"
          fullWidth
          label="Search Invoice History"
          value={query}
          onChange={(e) => handleOnSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon color="primary" style={{ marginRight: "10px" }} />
            ),
          }}
        />
        <Button
          style={{ marginTop: "10px", marginLeft: "10px", backgroundColor: "#996887", height: "30px", color: "white", width: "80px", fontSize: "13px"  }}
          variant="contained"
          onClick={() => {
            clearInput();
          }}
        >
          Clear
        </Button>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Date Issued</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact Info</th>
              <th>Service Data</th>
              <th>Total Price</th>
              <th>Date Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {((query ? searchResult : invoices).length > 0
              ? query
                ? searchResult
                : invoices
              : invoices
            ).map((invoice) => {
              const inEditMode = editMode === invoice.id;
              return (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{formatDate(invoice.date_issued)}</td>
                  <td>
                    {invoice.first_name} {invoice.last_name}
                  </td>
                  <td>
                    {invoice.address} <br /> {invoice.city}, {invoice.state}{" "}
                    {invoice.zip}
                  </td>
                  <td>
                    Phone: {invoice.phone}
                    <br /> Email: {invoice.email}
                  </td>
                  <td>
                    <ul>
                      {invoice.service_data.map((service, index) => (
                        <ServiceData key={index} service={service} />
                      ))}
                    </ul>
                  </td>
                  <td>{parseFloat(invoice.total_price).toFixed(2)}</td>
                  <td>
                    {inEditMode ? (
                      <input
                        type="date"
                        className="custom-date-input"
                        value={editedDate}
                        onChange={(e) => setEditedDate(e.target.value)}
                      />
                    ) : (
                      formatDate(invoice.date_paid)
                    )}
                  </td>

                  <td>
                    {inEditMode ? (
                      <>
                        <button
                          className="paidButton"
                          onClick={() => {
                            Swal.fire({
                              icon: "success",
                              title: "Marked as Paid",
                              text: `The invoice was marked as paid.`,
                            });
                            dispatch({
                              type: "EDIT_INVOICE",
                              payload: { ...invoice, date_paid: editedDate },
                            });
                            setEditMode(null);
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="history-deleteButton"
                          onClick={() => {
                            setEditMode(null);
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="paidButton"
                          onClick={() => {
                            setEditedDate(invoice.date_paid || "");
                            setEditMode(invoice.id);
                          }}
                        >
                          Mark Date Paid
                        </button>
                        <button
                          className="printButton"
                          onClick={() => printInvoice(invoice.id)}
                        >
                          Print
                        </button>{" "}
                        <br />
                        <button
                          className="detailsButton"
                          onClick={() => moreDetails(invoice.id)}
                        >
                          More Details
                        </button>
                        <br />
                        {user.is_admin && (
                          <button
                            className="history-deleteButton"
                            onClick={() => handleDeleteInvoice(invoice.id)}
                          >
                            Delete
                          </button>
                        )}
                        <br />
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

// const handleEditDate = (invoice) => {
//   // Convert the date string to a Date object
//   const date = new Date(editedDate)
//   // Get the year, month, and day components
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1; // Month is zero-based, so add 1
//   const day = date.getDate();
//   const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
//     .toString()
//     .padStart(2, "0")}`;
//   Swal.fire({
//     icon: "success",
//     title: "Marked as Paid",
//     text: `The invoice was marked as paid on ${formattedDate}.`,
//   });
//   dispatch({
//     type: "EDIT_INVOICE",
//     payload: { ...invoice, date_paid: formattedDate },
// //   });
//   setEditMode(null);
// };
