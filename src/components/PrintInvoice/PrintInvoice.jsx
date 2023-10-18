import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ServiceListItem from "../ServiceLineItems/ServiceLineItems";

export default function PrintInvoice() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
  
    const details = useSelector((store) => store.invoiceDetails);
  
    const formatDate = (dateString) => {
      const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
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

      </div>
    );
  }
  
               
  
  