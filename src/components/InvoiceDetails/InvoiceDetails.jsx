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
  const details = useSelector((store) => store.invoiceDetails);
  const [editedInvoice, setEditedInvoice] = useState({
    service_id: "",
    date_performed: "",
    service_price: "",
  });
  
  const handleEditLineItem = (lineItem) => {
    setEditedLineItem({
      service_id: lineItem.service_id,
      date_performed: lineItem.date_performed,
      service_price: lineItem.service_price,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return " ";
    }
    const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const [newLineItem, setNewLineItem] = useState({
    service_id: "",
    date_performed: "",
    service_price: "",
  });

  function handleAdd() {
    console.log("handleAdd");
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

  const handleDelete = (itemId) => {
    // Dispatch an action to delete the invoice with the given ID
    dispatch({ type: "DELETE_LINE_ITEM", payload: itemId});
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
      <h2>{details.first_name} {details.last_name}</h2>
      <h4>{details.address} {details.city}, {details.state} {details.zip}</h4>
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
          {details.service_data?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{formatDate(item.date)}</td>
                <td>${item.price}</td>
                <td><button  onClick={() => handleDelete()}>Delete Line</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Total Price: ${details.total_price}</h4>
<br />
<br />
<br />
      <button onClick={handleAdd}>Generate Invoice!</button>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";

// export default function InvoiceDetails() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const params = useParams();

//   const invoiceList = useSelector((store) => store.invoice);
//   console.log("INVOICE LIST", invoiceList);
//   const servicesList = useSelector((store) => store.services);
//   const details = useSelector((store) => store.invoiceDetails);

//   const [editMode, setEditMode] = useState(null);
//   const [editedInvoice, setEditedInvoice] = useState({
//     service_id: "",
//     date_performed: "",
//     service_price: "",
//   });


//   const formatDate = (dateString) => {
//     if (!dateString) {
//       return " ";
//     }
//     const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return date.toLocaleDateString(undefined, options);
//   };

//   const [newLineItem, setNewLineItem] = useState({
//     service_id: "",
//     date_performed: "",
//     service_price: "",
//   });

//   function handleAdd() {
//     console.log("handleAdd");
//   }


//   const handleAddLineItem = () => {
//     setNewLineItem(newLineItem);
//     dispatch({
//       type: "ADD_LINE_ITEM",
//       payload: { newLineItem, invoice_id: params.id },
//     });
//     setNewLineItem({
//       service_id: "",
//       date_performed: "",
//       service_price: "",
//     });
//   };

//   useEffect(() => {
//     dispatch({ type: "FETCH_SERVICES" });
//     dispatch({
//       type: "FETCH_INVOICE_DETAILS",
//       payload: params.id,
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Invoice Number: {details.id}</h1>
//       <h2>
//         {details.first_name} {details.last_name}
//       </h2>
//       <h4>
//         {details.address} {details.city}, {details.state} {details.zip}
//       </h4>
//       <form>
//         <br />
//         <div>
//           <label>Select a service:</label>
//           <select
//             id="serviceSelect"
//             value={newLineItem.service_id}
//             onChange={(e) =>
//               setNewLineItem({ ...newLineItem, service_id: e.target.value })
//             }
//           >
//             <option value="">Select a service</option>
//             {servicesList.map((service, index) => (
//               <option key={index} value={service.id}>
//                 {service.service}
//               </option>
//             ))}
//           </select>
//         </div>
//         <br />
//         <div>
//           <label htmlFor="date_performed">Date Performed:</label>
//           <input
//             type="date"
//             id="date_performed"
//             value={newLineItem.date_performed}
//             onChange={(e) =>
//               setNewLineItem({ ...newLineItem, date_performed: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <label htmlFor="service_price">Service Price:</label>
//           <input
//             type="text"
//             id="service_price"
//             value={newLineItem.service_price}
//             onChange={(e) =>
//               setNewLineItem({ ...newLineItem, service_price: e.target.value })
//             }
//           />
//         </div>
//       </form>
//       <button onClick={handleAddLineItem}>Add Line Item</button>
//       <br />
//       <br />
//       <table className="invoice-table">
//         <thead>
//           <tr>
//             <th>Service</th>
//             <th>Date Performed</th>
//             <th>Service Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {details.service_data?.map((item, index) => {
//             const inEditMode = editMode === item.id;
//             return (
//               <tr key={index}>
//                 <td>
//                   {editMode === item.id ? (
//                     <input
//                       type="text"
//                       value={editedInvoice.type}
//                       onChange={(e) =>
//                         setEditedInvoice({ ...editedInvoice, type: e.target.value })
//                       }
//                     />
//                   ) : (
//                     item.type
//                   )}
//                 </td>
//                 <td>
//                   {editMode === item.id ? (
//                     <input
//                       type="date"
//                       value={editedInvoice.date}
//                       onChange={(e) =>
//                         setEditedInvoice({ ...editedInvoice, date: e.target.value })
//                       }
//                     />
//                   ) : (
//                     formatDate(item.date)
//                   )}
//                 </td>
//                 <td>
//                   {editMode === item.id ? (
//                     <input
//                       type="text"
//                       value={editedInvoice.price}
//                       onChange={(e) =>
//                         setEditedInvoice({ ...editedInvoice, price: e.target.value })
//                       }
//                     />
//                   ) : (
//                     `$${item.price}`
//                   )}
//                 </td>
//                 <td>
//                   {editMode === item.id ? (
//                     <button
//                       onClick={() => {
//                         // Dispatch an action to save the changes
//                         dispatch({
//                           type: "EDIT_LINE_ITEM",
//                           payload: { ...item, ...editedInvoice },
//                         });
//                         // Exit edit mode for this row
//                         setEditMode(null);
//                       }}
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => {
//                           // Enter edit mode for this row
//                           setEditedInvoice({ ...item });
//                           setEditMode(item.id);
//                         }}
//                       >
//                         Edit
//                       </button>
//                       <button onClick={() => handleDeleteInvoice(item.id)}>
//                         Delete
//                       </button>
//                       <button onClick={() => moreDetails(item.id)}>
//                         More Details
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             );
            
//           })}
//         </tbody>
//       </table>
//       <h4>Total Price: ${details.total_price}</h4>
//       <br />
//       <br />
//       <br />
//       <button onClick={handleAdd}>Generate Invoice!</button>
//     </div>
//   );
// }


             

