import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CreateInvoiceForm() {
  const dispatch = useDispatch();
  const servicesList = useSelector((store) => store.services);

  const [lineItems, setLineItems] = useState([]);
  const [newLineItem, setNewLineItem] = useState({
    service_id: "",
    date_performed: "",
    service_price: "",
  });
  const [invoiceId, setInvoiceId] = useState(null);

  console.log(servicesList);
  useEffect(() => {
    console.log("component did mount");
    dispatch({ type: "FETCH_SERVICES" });
  }, []);
  const handleAddLineItem = () => {
    // Validate the input fields and ensure they are not empty
    if (
      newLineItem.service_id &&
      newLineItem.date_performed &&
      newLineItem.service_price
    ) {
      setLineItems([...lineItems, newLineItem]);
      // Clear the input fields for the next line item
      setNewLineItem({
        service_id: "",
        date_performed: "",
        service_price: "",
      });
    } else {
      // Handle validation errors or display an error message to the user
    }
  };

  const handleCreateInvoice = async () => {
    // Send a request to your server to create the invoice.
    // Include any relevant data for the invoice creation.
    // The server should return the generated invoice ID.

    // Simulate obtaining the generated invoice ID from the server (for demonstration).
    const generatedInvoiceId = Math.floor(Math.random() * 1000);

    // Set the generated invoice ID in the state.
    setInvoiceId(generatedInvoiceId);

    // Clear the line items array after associating them with the invoice.
    setLineItems([]);

    // In a real application, you would associate the line items with the actual invoice ID.
    console.log("Associating line items with invoice ID:", generatedInvoiceId);
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="serviceSelect">Select a service:</label>
          <select
            id="serviceSelect"
            value={newLineItem.service_id}
            onChange={(e) =>
              setNewLineItem({ ...newLineItem, service_id: e.target.value })
            }
          >
            <option value="">Select a service</option>
            {servicesList.map((service) => (
              <option key={service.id} value={service.id}>
                {service.service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date_performed">Date Performed:</label>
          <input
            type="date"
            id="date_performed"
            value={newLineItem.date_performed}
            onChange={(e) =>
              setNewLineItem({ ...newLineItem, date_performed: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="service_price">Service Price:</label>
          <input
            type="text"
            id="service_price"
            value={newLineItem.service_price}
            onChange={(e) =>
              setNewLineItem({ ...newLineItem, service_price: e.target.value })
            }
          />
        </div>
      </form>
      <button onClick={handleAddLineItem}>Add Line Item</button>
      <button onClick={handleCreateInvoice}>Create Invoice</button>
      <ul>
        {lineItems.map((item, index) => (
          <li key={index}>
            Service ID: {item.service_id}, Date Performed: {item.date_performed}
            , Service Price: {item.service_price}
          </li>
        ))}
      </ul>
      {invoiceId && <p>Invoice ID: {invoiceId}</p>}
    </div>
  );
}

export default CreateInvoiceForm;
