
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


export default function PrintInvoice() {
  const dispatch = useDispatch();
  const params = useParams();
  const details = useSelector((store) => store.invoiceDetails);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const calculateDueDate = () => {
    // Get the date issued from details
    const dateIssued = new Date(details.date_issued);
  
    // Calculate one month from the date issued
    dateIssued.setMonth(dateIssued.getMonth() + 1);
    // To make it exactly one month, subtract one day from the calculated date
    dateIssued.setDate(dateIssued.getDate() -1);
  
    // Format the calculated date
    return formatDate(dateIssued);
  };
  useEffect(() => {
    dispatch({ type: "FETCH_SERVICES" });
    dispatch({
      type: "FETCH_INVOICE_DETAILS",
      payload: params.id,
    });
  }, [dispatch, params.id]);

  return (
    <div className="invoice">
      <div className="header">
        <img className="logo" src="/Logo.jpg" alt="Company Logo" />
        <div className="company-info">
          <p>2407 34th Ave S.</p>
          <p>Fargo, ND 58104</p>
        </div>
      </div>

      <div className="print-details">
        <h1 className="print-header">Invoice</h1>
        <p>Invoice Number: #{details.id}</p>
        <p>Date Issued: {formatDate(details.date_issued)}</p>
        <h2>Due Date: {calculateDueDate()}</h2>
      </div>

      <div className="customer-info">
        <h2>Bill To:</h2>
        <p>
          {details.first_name} {details.last_name}
          <br />
          {details.address}
          <br />
          {details.city}, {details.state} {details.zip}
        </p>
      </div>

      <div className="services">
        <table className="print-table">
          <thead>
            <tr>
              <th>Date Performed</th>
              <th>Service</th>
              <th>Service Price</th>
            </tr>
          </thead>
          <tbody>
            {details.service_data?.map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item.date)}</td>
                <td>{item.type}</td>
                <td>${parseFloat(item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          <h4>Total: ${parseFloat(details.total_price).toFixed(2)}</h4>
        </div>
      </div>

      <div className="footer">
        <h2>Balance Due: ${parseFloat(details.total_price).toFixed(2)}</h2>
      </div>
    </div>
  );
}
