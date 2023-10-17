import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function InvoiceDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const invoiceDetails = useSelector((store) => store.invoiceDetails);
  console.log(invoiceDetails);
  const servicesList = useSelector((store) => store.services);

  const [lineItems, setLineItems] = useState([]);
  const [newLineItem, setNewLineItem] = useState({
    service_id: "",
    date_performed: "",
    service_price: "",
  });

  function handleAdd() {
    console.log("handleAdd");
  }

  const handleAddLineItem = () => {
    setLineItems([...lineItems, newLineItem]);
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
  }, []);

  return (
    <div>
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
            <th>Customer Name</th>
            <th>Service</th>
            <th>Date Performed</th>
            <th>Service Price</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, index) => {
            return (
              <tr key={index.id}>
                <td> need to figure out</td>
                <td>{item.service_id}</td>
                <td>{item.date_performed}</td>
                <td>{item.service_price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={handleAdd}>Add to Invoice</button>
    </div>
  );
}
