import "./PrintInvoice.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"; // Import useParams
import Button from "@mui/material/Button";

export default function PrintInvoice() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const details = useSelector((store) => store.invoiceDetails);
  const companies = useSelector((store) => store.companyReducer);
  const user = useSelector((store) => store.user);
  console.log("USER", user)

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
    dateIssued.setDate(dateIssued.getDate() + 0);

    // Format the calculated date
    return formatDate(dateIssued);
  };

  const handlePrint = () => {
    window.print(); // This will trigger the print dialog
  };
  const handleEmail = () => {
    // Navigate to the email sending page with the email and details ID
    history.push(`/email/${details.id}`);
  };
  useEffect(() => {
    dispatch({ type: "FETCH_COMPANIES" });
    dispatch({ type: "FETCH_SERVICES" });
    dispatch({
      type: "FETCH_INVOICE_DETAILS",
      payload: params.id,
    });
  }, [dispatch, params.id]);
  const moreDetails = (invoiceId) => {
    history.push(`/invoice/details/${invoiceId}`);
  };

  const phone_number = `${companies[0]?.phone}`;
  const formatted_phone = `${phone_number.slice(0, 3)}-${phone_number.slice(
    3,
    6
  )}-${phone_number.slice(6)}`;

  const printButtonStyle = {
    display: "none", // Hide the button for printing
  };
  const buttonStyle = {
    marginTop: "-250px",
    marginLeft: "620px",
    backgroundColor: "#9a5c6f",
    color: "white",
    fontSize: "20px",
    padding: "10px 20px",
  };

  const userCompanyIndex = (user.company_id - 1);
  console.log(userCompanyIndex)
  
  return (
    <>
      <div className="topSpace">
        {" "}
        <br />
        <br />
      </div>
      <div className="print-invoice">
        <div className="header">
          <img className="logo" src={companies[0]?.url} alt="Company Logo" />
          <div className="company-info">
            <p>{companies[0]?.address}</p>
            <p>
              {companies[0]?.city}, {companies[0]?.state} {companies[0]?.zip}
            </p>
            <p>{formatted_phone}</p>
            <div>
              <Button
                className="printInvoiceButton" // Use className for the button
                style={buttonStyle}
                variant="contained"
                onClick={handlePrint}
              >
                Print This Invoice!
              </Button>
              <Button
                className="printInvoiceButton" // Use className for the button
                style={{
                  marginTop: "-170px",
                  marginLeft: "687px",
                  backgroundColor: "#A09084",
                  color: "white",
                  fontSize: "14px",
                  padding: "8px 16px",
                }}
                variant="contained"
                onClick={() => moreDetails(details.id)}
              >
                Edit Details
              </Button>
              {/* <Button
                className="printInvoiceButton"
                style={{
                  marginTop: "-110px",
                  marginLeft: "716px",
                  backgroundColor: "#BCBBED",
                  color: "white",
                  fontSize: "14px",
                  padding: "4px 14px",
                }}
                variant="contained"
                onClick={() => handleEmail(details.email, details.id)}
              > Email
              </Button> */}
            </div>
          </div>
        </div>

        <div className="print-details">
          <h1 className="print-h1">Invoice</h1>
          <div className="table-container">
            <table className="date-table">
              <thead>
                <tr>
                  <th>Date Issued</th>
                  <th>Invoice #</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatDate(details.date_issued)}</td>
                  <td>{details.id}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="due-date-container">
            <h2 className="dueH2">Due: {calculateDueDate()}</h2>
          </div>
        </div>

        <div className="customer-info">
          <h2 className="bill-to-header">Bill To:</h2>
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
                <th>Service Type</th>
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
          <hr />
          <div className="total">
            {/* <h4>Total: ${parseFloat(details.total_price).toFixed(2)}</h4> */}
          </div>
        </div>

        <div className="bottom">
          <h2 className="balance-footer">
            Balance Due: ${parseFloat(details.total_price).toFixed(2)}
          </h2>
        </div>
      </div>
      <br />
    </>
  );
}
