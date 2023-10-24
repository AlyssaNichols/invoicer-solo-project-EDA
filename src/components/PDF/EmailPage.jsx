import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const EmailPage = () => {
  const details = useSelector((store) => store.invoiceDetails);
  console.log(details);

  const handleEmail = async () => {
    try {
      // Build the HTML representation of the invoice
      const invoiceHTML = generateInvoiceHTML(details);

      // Make a POST request to send the email with the invoice HTML
      const response = await axios.post("/send-email", {
        recipient: details.email,
        subject: "New Invoice From Grassmasters",
        html: invoiceHTML,
      });

      console.log("Email sent successfully!", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // Function to generate the HTML representation of the invoice
  const generateInvoiceHTML = (invoiceDetails) => {
    const {
      id,
      first_name,
      last_name,
      address,
      city,
      state,
      zip /* other details */,
    } = invoiceDetails;

    const formattedServiceData = details.service_data
    .map((item) => (
      `${item.type} on ${item.date} for $${parseFloat(item.price).toFixed(2)}\n`
    ))
    .join("");

    // Customize the invoice structure as needed
    const invoiceHTML = ` 
Hello ${details.first_name} ${details.last_name}! Your Invoice ID is #${details.id}.\nThe Date Issued is ${details.date_issued}.\n\nThe Services performed include:\n${formattedServiceData}\nThe Total Balance due is $${details.total_price}.\nYou will be getting your bill in the mail shortly.

All the best,
The Grassmasters Team
    `;

    return invoiceHTML;
  };

  return (
    <div>
      <h1>Email Page</h1>
      <p>Click the button to send the invoice via email:</p>
      <button onClick={handleEmail}>Send Invoice</button>
    </div>
  );
};

export default EmailPage;
