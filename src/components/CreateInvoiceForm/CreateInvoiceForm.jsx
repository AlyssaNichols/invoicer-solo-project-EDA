import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CreateInvoicePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [newInvoice, setNewInvoice] = useState({
    date_issued: "",
    customer_id: "",
  });

  const customerList = useSelector((store) => store.customers);


  useEffect(() => {
    console.log("fetching services and customers");
    dispatch({ type: "FETCH_CUSTOMERS" });
  }, []);

  const handleCreateInvoice = async () => {
    // Dispatch the ADD_INVOICE action and wait for it to complete
    const actionResult = await dispatch({
      type: "ADD_INVOICE",
      payload: { newInvoice, history },
    });
  };

  console.log(newInvoice);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <center>
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
      </center>
    </div>
  );
}
