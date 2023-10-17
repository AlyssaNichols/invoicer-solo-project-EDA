import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CreateInvoiceForm() {
  const dispatch = useDispatch();
  const servicesList = useSelector((store) => store.services);
  const customerList = useSelector((store) => store.customers);
  console.log(servicesList);
  console.log(customerList);
  const [newInvoice, setNewInvoice] = useState({
    date_issued: "",
    customer_id: "",
  });

  const [lineItems, setLineItems] = useState([]);
  const [newLineItem, setNewLineItem] = useState({
    service_id: "",
    date_performed: "",
    service_price: "",
  });
  const [invoiceId, setInvoiceId] = useState(null);

  useEffect(() => {
    console.log("component did mount");
    dispatch({ type: "FETCH_SERVICES" });
    dispatch({ type: "FETCH_CUSTOMERS" });
  }, []);

  const handleAddLineItem = () => {
    // Validate the input fields and ensure they are not empty
    if (
      newLineItem.service_id &&
      newLineItem.date_performed &&
      newLineItem.service_price
    ) {
      setLineItems([...lineItems, newLineItem]);
      dispatch({ type: "ADD_LINE_ITEM", payload: newLineItem });
      setNewLineItem({
        service_id: "",
        date_performed: "",
        service_price: "",
      });
      // } else {
      // }
    }
  };

  const handleCreateInvoice = async () => {
    dispatch({ type: "ADD_INVOICE", payload: newInvoice });
    setLineItems([]);
  };

  return (
    <div>
      <form>
        <div>
          <label>Select a Customer:</label>
          <select
            id="customerSelect"
            value={newInvoice.customer_id}
            onChange={(e) =>
              setNewInvoice({ ...newInvoice, customer_id: e.target.value })
            }
          >
            <option value="">Select a customer</option>
            {customerList.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.last_name}, {customer.first_name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label>Select a service:</label>
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
        <br />
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Date Performed</th>
            <th>Service Price</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, index) => {
            return (
              <tr key={index.id}>
                <td>{newInvoice.customer_id}</td>
                <td>{item.service_id}</td>
                <td>{item.date_performed}</td>
                <td>{item.service_price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {invoiceId && <p>Invoice ID: {invoiceId}</p>}
      <label>Date Issued:</label>
      <input
        type="date"
        id="date_issued"
        value={newInvoice.date_issued}
        onChange={(e) =>
          setNewInvoice({ ...newInvoice, date_issued: e.target.value })
        }
      />
      <br />
      <button onClick={handleCreateInvoice}>Create Invoice</button>
    </div>
  );
}

export default CreateInvoiceForm;
