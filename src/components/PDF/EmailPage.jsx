import React, { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EmailPage = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const details = useSelector((store) => store.invoiceDetails);
  const companies = useSelector((store) => store.companyReducer);
  console.log("DETAILS", details);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const calculateDueDate = () => {
    const dateIssued = new Date(details.date_issued);
    dateIssued.setMonth(dateIssued.getMonth() + 1);
    dateIssued.setDate(dateIssued.getDate() + 0);
    return formatDate(dateIssued);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_COMPANIES" });
    dispatch({ type: "FETCH_SERVICES" });
    dispatch({
      type: "FETCH_INVOICE_DETAILS",
      payload: params.id,
    });
  }, [dispatch, params.id]);

  const phone_number = `${companies[0]?.phone}`;
  const formatted_phone = `${phone_number.slice(0, 3)}-${phone_number.slice(
    3,
    6
  )}-${phone_number.slice(6)}`;

  
  return (
    <div>
      <br />
      <br />
      <br />
      <button onClick={() => alert("clicked")}>Generate PDF</button>
      <div id="pdf-content" >
        <div className="print-invoice">
          <div className="header">
            <img className="logo" src={companies[0]?.url} alt="Company Logo" />
            <div className="company-info">
              <p>{companies[0]?.address}</p>
              <p>
                {companies[0]?.city}, {companies[0]?.state} {companies[0]?.zip}
              </p>
              <p>{formatted_phone}</p>
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
          </div>

          <div className="bottom">
            <h2 className="balance-footer">
              Balance Due: ${parseFloat(details.total_price).toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailPage;

// import React from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const EmailPage = () => {
//   const details = useSelector((store) => store.invoiceDetails);
//   console.log(details);

//   const handleEmail = async () => {
//     try {
//       // Build the HTML representation of the invoice
//       const invoiceHTML = generateInvoiceHTML(details);

//       // Make a POST request to send the email with the invoice HTML
//       const response = await axios.post("/send-email", {
//         recipient: details.email,
//         subject: "New Invoice From Grassmasters",
//         html: invoiceHTML,
//       });

//       console.log("Email sent successfully!", response.data);
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   };

//   // Function to generate the HTML representation of the invoice
//   const generateInvoiceHTML = (invoiceDetails) => {
//     const {
//       id,
//       first_name,
//       last_name,
//       address,
//       city,
//       state,
//       zip /* other details */,
//     } = invoiceDetails;

//     const formattedServiceData = details.service_data
//     .map((item) => (
//       `${item.type} on ${item.date} for $${parseFloat(item.price).toFixed(2)}\n`
//     ))
//     .join("");

//     // Customize the invoice structure as needed
//     const invoiceHTML = `
// Hello ${details.first_name} ${details.last_name}! Your Invoice ID is #${details.id}.\nThe Date Issued is ${details.date_issued}.\n\nThe Services performed include:\n${formattedServiceData}\nThe Total Balance due is $${details.total_price}.\nYou will be getting your bill in the mail shortly.

// All the best,
// The Grassmasters Team
//     `;

//     return invoiceHTML;
//   };

//   return (
//     <div>
//       <h1>Email Page</h1>
//       <p>Click the button to send the invoice via email:</p>
//       <button onClick={handleEmail}>Send Invoice</button>
//     </div>
//   );
// };

// export default EmailPage;
