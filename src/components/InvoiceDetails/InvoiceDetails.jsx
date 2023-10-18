import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ServiceListItem from "../ServiceLineItems/ServiceLineItems";

export default function InvoiceDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const invoiceList = useSelector((store) => store.invoice);
  console.log("INVOICE LIST", invoiceList);
  const servicesList = useSelector((store) => store.services);
  const details = useSelector((store) => store.invoiceDetails);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const [newLineItem, setNewLineItem] = useState({
    service_id: "",
    date_performed: "",
    service_price: "",
  });

  function generateInvoice() {
    history.push(`/invoice/print/${details.id}`);
  }

  // const foundInvoice = invoiceList.find(
  //   (invoice) => Number(invoice.id) === Number(params.id)
  // );


  const handleAddLineItem = () => {
    setNewLineItem(newLineItem);
    dispatch({ type: "ADD_LINE_ITEM", payload: {newLineItem, invoice_id:params.id}});
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
      <h1>Invoice Number: {details.id}</h1>
      <h2>Date Issued: {formatDate(details.date_issued)}</h2>
      <h3>{details.first_name} {details.last_name} <br/> {details.address} {details.city}, {details.state} {details.zip}</h3>
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
      <br />
       <br />
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Date Performed</th>
            <th>Service Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.service_data?.map((item, index) => (
<ServiceListItem key={index} item={item} index={index}/>
          ))}
        </tbody>
      </table>
      <h4>Total Price: ${parseFloat(details.total_price).toFixed(2)}</h4>
<br />
<br />
<br />
      <button onClick={generateInvoice}>Print Invoice!</button>
    </div>
  );
}

             

