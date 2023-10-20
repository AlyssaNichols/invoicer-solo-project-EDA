import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"; // Import useParams
import ServiceData from "../ServiceData/ServiceData";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./InvoiceHistory.css";

export default function InvoiceHistory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const invoices = useSelector((state) => state.invoice);
  const user = useSelector((store) => store.user);

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
  const handleDeleteInvoice = (invoiceId) => {
    // Dispatch an action to delete the invoice with the given ID
    dispatch({ type: "DELETE_INVOICE", payload: invoiceId });
  };

  const moreDetails = (invoiceId) => {
    history.push(`/invoice/details/${invoiceId}`);
  };

  function printInvoice(invoiceId) {
    history.push(`/invoice/print/${invoiceId}`);
  }

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return price.toFixed(2);
    }
    return "";
  };
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
                  letterSpacing: ".5px"
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
            {invoices.map((invoice) => {
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
                        {" "}
                        <button
                          className="history-deleteButton"
                          onClick={() => {
                            setEditMode(null);
                          }}
                        >
                          Cancel
                        </button>{" "}
                        <button
                          className="paidButton"
                          onClick={() => {
                            dispatch({
                              type: "EDIT_INVOICE",
                              payload: { ...invoice, date_paid: editedDate },
                            });
                            setEditMode(null);
                          }}
                        >
                          Save
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
