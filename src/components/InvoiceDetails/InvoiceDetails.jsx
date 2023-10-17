import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function InvoiceDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const invoiceList = useSelector((store) => store.invoice);
  console.log("INVOICE LIST", invoiceList);
  const servicesList = useSelector((store) => store.services);


  const [newLineItem, setNewLineItem] = useState({
    service_id: "",
    date_performed: "",
    service_price: "",
  });

  function handleAdd() {
    console.log("handleAdd");
  }

  const foundInvoice = invoiceList.find(
    (invoice) => Number(invoice.id) === Number(params.id)
  );

  const handleAddLineItem = () => {
    setNewLineItem(newLineItem);
    dispatch({ type: "ADD_LINE_ITEM", payload: newLineItem });
    setNewLineItem({
      service_id: "",
      date_performed: "",
      service_price: "",
    });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_SERVICES" });
    dispatch({
      type: "FETCH_INVOICE_DETAILS",
      payload: params.id,
    });
    dispatch({ type: "FETCH_INVOICES" });
  }, []);

  if (!foundInvoice){
    return (<h1>loading...</h1>)
  }
  return (
    <div>
      <h1>Invoice Number: {foundInvoice.id}</h1>
      <h2>{foundInvoice.first_name} {foundInvoice.last_name}</h2>
      <h4>{foundInvoice.address} {foundInvoice.city}, {foundInvoice.state} {foundInvoice.zip}</h4>
      <form>
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
            {servicesList.map((service, index) => (
              <option key={index} value={service.id}>
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
            <th>Service</th>
            <th>Date Performed</th>
            <th>Service Price</th>
          </tr>
        </thead>
        <tbody>
          {foundInvoice.service_data.map((item, index) => {
            return (
              <tr key={index.id}>
                <td>{item.type}</td>
                <td>{item.date}</td>
                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={handleAdd}>Add to Invoice</button>
    </div>
  );
}
