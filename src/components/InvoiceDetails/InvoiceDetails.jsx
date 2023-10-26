import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ServiceListItem from "../ServiceListItem/ServiceListItem";
import { InputLabel } from "@mui/material";
import { MenuItem, Box, Paper } from "@mui/material";
import { Button, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

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
    if (
      !newLineItem.service_id ||
      !newLineItem.date_performed ||
      !newLineItem.service_price
    ) {
      alert("please fill in all the fields before submitting!");
    } else {
      setNewLineItem(newLineItem);
      dispatch({
        type: "ADD_LINE_ITEM",
        payload: { newLineItem, invoice_id: params.id },
      });
      Swal.fire({
        icon: "success",
        title: "Service Added",
        text: "The new service has been successfully added.",
      });
      setNewLineItem({
        service_id: "",
        // date_performed: "",
        service_price: "",
      });
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_SERVICES" });
    dispatch({
      type: "FETCH_INVOICE_DETAILS",
      payload: params.id,
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#DFD9D9", paddingBottom: "100px"}}>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ minWidth: 275, marginTop: "20px", width: "92%" }}>
          <center>
            <CardContent>
              <Typography variant="h5" component="div">
                <h1
                  style={{
                    marginTop: "-5px",
                    marginBottom: "5px",
                    fontSize: "34px",
                    letterSpacing: ".5px",
                  }}
                >
                  Invoice: #{details.id}
                </h1>
                <h2
                  style={{
                    marginTop: "0px",
                    marginBottom: "-10px",
                    fontSize: "24px",
                  }}
                >
                  Issued: {formatDate(details.date_issued)}
                </h2>
                <h3
                  style={{
                    width: "70%",
                    letterSpacing: ".5px",
                    borderTop: "1px solid black",
                    paddingTop: "10px",
                    marginBottom: "-10px",
                    fontSize: "20px",
                    fontWeight: "normal",
                  }}
                >
                  {details.first_name} {details.last_name} <br />{" "}
                  {details.address} <br />
                  {details.city}, {details.state} {details.zip}
                </h3>
              </Typography>
            </CardContent>
          </center>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Paper
          elevation={3}
          style={{
            width: "30%",
            marginTop: "30px",
            marginLeft: "1%",
            minWidth: "360px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <center>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                  "& .MuiTextField-root": { m: 0.4, width: "40ch" },
                }}
              >
                <br />
                <InputLabel
                  sx={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Select a Service:
                </InputLabel>
                <TextField
                  select
                  label="Select a Service"
                  id="serviceSelect"
                  value={newLineItem.service_id}
                  onChange={(e) =>
                    setNewLineItem({
                      ...newLineItem,
                      service_id: e.target.value,
                    })
                  }
                  fullWidth
                >
                  {servicesList.map((service, index) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.service}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                  "& .MuiTextField-root": { m: 0.4, width: "40ch" },
                }}
              >
                <InputLabel
                  sx={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Date Service was Performed:
                </InputLabel>
                <TextField
                  type="date"
                  id="date_performed"
                  value={newLineItem.date_performed}
                  onChange={(e) =>
                    setNewLineItem({
                      ...newLineItem,
                      date_performed: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                  "& .MuiTextField-root": { m: 0.4, width: "40ch" },
                }}
              >
                <InputLabel
                  sx={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Service Price:
                </InputLabel>
                <TextField
                  type="text"
                  id="service_price"
                  label="Service Price"
                  value={newLineItem.service_price}
                  onChange={(e) =>
                    setNewLineItem({
                      ...newLineItem,
                      service_price: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Box>
              <br />
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#F69D55",
                  color: "white",
                  fontSize: "16px",
                  marginTop: "0px",
                }}
                onClick={handleAddLineItem}
                sx={{ padding: "10px 28px" }}
              >
                Add Line Item
              </Button>
            </center>
          </div>
          <br />
        </Paper>
        <Paper
          elevation={3}
          style={{
            width: "66%",
            marginTop: "30px",
            marginRight: "1%",
            minWidth: "700px",
          }}
        >
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
                <ServiceListItem key={index} item={item} index={index} />
              ))}
            </tbody>
          </table>
          <center>
            {details.total_price ? (
              <center>
                {" "}
                <Typography variant="h5" component="div">
                  <h1
                    style={{
                      marginTop: "30px",
                      fontSize: "28px",
                      letterSpacing: ".5px",
                    }}
                  >
                    Total Price: ${parseFloat(details.total_price).toFixed(2)}
                  </h1>
                </Typography>
              </center>
            ) : (
              <h3></h3>
            )}
          </center>
          <center>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#996887",
                color: "white",
                fontSize: "16px",
                marginTop: "0px",
              }}
              sx={{ padding: "10px 28px" }}
              onClick={generateInvoice}
            >
              Preview Invoice!
            </Button>
            <br />
            <br />
          </center>
        </Paper>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import ServiceListItem from "../ServiceLineItems/ServiceLineItems";

// export default function InvoiceDetails() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const params = useParams();

//   const invoiceList = useSelector((store) => store.invoice);
//   console.log("INVOICE LIST", invoiceList);
//   const servicesList = useSelector((store) => store.services);
//   const details = useSelector((store) => store.invoiceDetails);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return date.toLocaleDateString(undefined, options);
//   };

//   const [newLineItem, setNewLineItem] = useState({
//     service_id: "",
//     date_performed: "",
//     service_price: "",
//   });

//   function generateInvoice() {
//     history.push(`/invoice/print/${details.id}`);
//   }

//   // const foundInvoice = invoiceList.find(
//   //   (invoice) => Number(invoice.id) === Number(params.id)
//   // );

//   const handleAddLineItem = () => {
//     setNewLineItem(newLineItem);
//     dispatch({ type: "ADD_LINE_ITEM", payload: {newLineItem, invoice_id:params.id}});
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
//       <h2>Date Issued: {formatDate(details.date_issued)}</h2>
//       <h3>{details.first_name} {details.last_name} <br/> {details.address} {details.city}, {details.state} {details.zip}</h3>
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
//        <br />
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
//           {details.service_data?.map((item, index) => (
// <ServiceListItem key={index} item={item} index={index}/>
//           ))}
//         </tbody>
//       </table>
//       <h4>Total Price: ${parseFloat(details.total_price).toFixed(2)}</h4>
// <br />
// <br />
// <br />
//       <button onClick={generateInvoice}>Print Invoice!</button>
//     </div>
//   );
// }
