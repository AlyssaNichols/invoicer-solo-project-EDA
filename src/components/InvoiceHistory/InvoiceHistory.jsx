import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"; // Import useParams
import ServiceData from "../ServiceData/ServiceData";

export default function InvoiceHistory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const invoices = useSelector((state) => state.invoice);

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

  return (
    <>
      <h2>Invoice history</h2>
      <div>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Service Data</th>
              <th>Total Price</th>
              <th>Date Paid</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              const inEditMode = editMode === invoice.id;
              return (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>
                    <ul>
                      {invoice.service_data.map((service, index) => (
                        <ServiceData key={index} service={service} />
                      ))}
                    </ul>
                  </td>
                  <td>{invoice.total_price}</td>
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
                    {invoice.first_name} {invoice.last_name}
                  </td>
                  <td>
                    {invoice.address} <br /> {invoice.city}, {invoice.state}{" "}
                    {invoice.zip}
                  </td>
                  <td>
                    Phone: {invoice.phone}<br /> Email: {invoice.email}
                  </td>
                  <td>
                    {inEditMode ? (
                      <button
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
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditedDate(invoice.date_paid || "");
                            setEditMode(invoice.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteInvoice(invoice.id)}
                        >
                          Delete
                        </button>
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