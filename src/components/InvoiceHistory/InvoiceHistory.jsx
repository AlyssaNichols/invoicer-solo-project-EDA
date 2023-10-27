import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"; // Import useParams
import ServiceData from "../ServiceData/ServiceData";
import "./InvoiceHistory.css";
import Swal from "sweetalert2";
import Fuse from "fuse.js";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function InvoiceHistory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const invoices = useSelector((state) => state.invoice);
  const user = useSelector((store) => store.user);
  console.log("INVOICES", invoices);
  const [sortOrder, setSortOrder] = useState("desc"); // Default sorting order is ascending
  const [sortOption, setSortOption] = useState("id");

  useEffect(() => {
    dispatch({ type: "FETCH_INVOICES", payload: params.id });
  }, []);

  const [editedDate, setEditedDate] = useState("");
  const [editMode, setEditMode] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) {
      return " ";
    }
    const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const moreDetails = (invoiceId) => {
    history.push(`/invoice/details/${invoiceId}`);
  };

  function printInvoice(invoiceId) {
    history.push(`/invoice/print/${invoiceId}`);
  }

  const handleDeleteInvoice = (invoiceId) => {
    Swal.fire({
      title: "Are you sure you want to delete this Invoice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Invoice will be PERMANENTLY deleted",
          text: `You will not be able to recover this Invoice! Are you absolutely sure?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, I'm sure",
        }).then((doubleConfirmResult) => {
          if (doubleConfirmResult.isConfirmed) {
            // Dispatch an action to delete the invoice with the given ID
            dispatch({ type: "DELETE_INVOICE", payload: invoiceId });
            Swal.fire({
              title: "Invoice Successfully Deleted",
              icon: "success", // You can choose a fun icon here
            });
          } else if (
            doubleConfirmResult.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire({
              title: "Invoice saved",
              icon: "success", // You can choose a fun icon here
            });
          }
        });
      }
    });
  };

  const [query, setQuery] = useState(" ");
  const fuse = new Fuse(invoices, {
    keys: ["id", "first_name", "last_name", "email"],
    includeScore: true,
    threshold: 0.3, // Adjust this threshold (0.0 to 1.0) for strictness
    minMatchCharLength: 2, // Adjust the minimum character length for a match
  });
  const results = fuse.search(query);
  const searchResult = results.map((result) => result.item);

  function handleOnSearch(value) {
    console.log(value); // Add this line for debugging
    setQuery(value);
  }

  function clearInput() {
    setQuery(" ");
  }
  const handleSortClick = (option) => {
    if (option === sortOption) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOption(option);
      setSortOrder("asc");
    }
  };
  function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }
    return cleaned;
  }

  return (
    <>
      <br />
      <br />
      <center>
        <Card
          sx={{
            minWidth: 275,
            marginTop: "20px",
            width: "96%",
            backgroundColor: "#DFD9D9",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              <h2
                style={{
                  marginTop: "-5px",
                  marginBottom: "-5px",
                  letterSpacing: ".5px",
                }}
              >
                Invoice History
              </h2>
            </Typography>
          </CardContent>
        </Card>
      </center>
      <br />
      <div>
        <TextField
          style={{
            marginLeft: "3%",
            borderRadius: "4px",
            width: "280px",
            marginBottom: "20px",
            backgroundColor: "white",
          }}
          variant="outlined"
          fullWidth
          size="small"
          label="Search By Name"
          value={query}
          onChange={(e) => handleOnSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon color="primary" style={{ marginRight: "10px" }} />
            ),
          }}
        />
        <Button
          style={{
            marginTop: "5px",
            marginLeft: "10px",
            backgroundColor: "#F69D55",
            height: "30px",
            color: "white",
            width: "80px",
            fontSize: "13px",
          }}
          variant="contained"
          onClick={() => {
            clearInput();
          }}
        >
          Clear
        </Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            float: "right",
            marginRight: "3%",
            marginTop: "3px",
          }}
        >
          <select
            className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="id">Sort by ID</option>
            <option value="date_issued">Sort by Date Issued</option>
            <option value="last_name">Sort by Last Name</option>
            <option value="total_price">Sort by Total Price</option>
            <option value="date_paid">Sort by Date Paid</option>
          </select>
          <button
            onClick={() => setSortOrder("asc")}
            className={`sort-button ${sortOrder === "asc" ? "active" : ""}`}
          >
            <div className="button-content">
              <span className="button-icon">
                <FontAwesomeIcon icon={faSortUp} />
              </span>
            </div>
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`sort-button ${sortOrder === "desc" ? "active" : ""}`}
          >
            <div className="button-content">
              <span className="button-icon">
                <FontAwesomeIcon icon={faSortDown} />
              </span>
            </div>
          </button>
        </div>
        <center>
          <table style={{ width: "96%" }} className="invoice-table">
            <thead>
              <tr>
                <th
                  style={{ width: "7%" }}
                  className={`sortable-header ${
                    sortOption === "id" ? "sorted" : ""
                  }`}
                  onClick={() => handleSortClick("id")}
                >
                  <div>
                    Invoice Number
                    {sortOption === "id" && (
                      <span
                        className={`sort-icon ${
                          sortOrder === "asc" ? "asc" : "desc"
                        }`}
                      ></span>
                    )}
                  </div>
                </th>
                <th
                  style={{ width: "8%" }}
                  className={`sortable-header ${
                    sortOption === "date_issued" ? "sorted" : ""
                  }`}
                  onClick={() => handleSortClick("date_issued")}
                >
                  <div>
                    Date Issued{" "}
                    {sortOption === "date_issued" && (
                      <span
                        className={`sort-icon ${
                          sortOrder === "asc" ? "asc" : "desc"
                        }`}
                      ></span>
                    )}
                  </div>
                </th>
                <th
                  style={{ width: "9%" }}
                  className={`sortable-header ${
                    sortOption === "last_name" ? "sorted" : ""
                  }`}
                  onClick={() => handleSortClick("last_name")}
                >
                  <div>
                    Name{" "}
                    {sortOption === "last_name" && (
                      <span
                        className={`sort-icon ${
                          sortOrder === "asc" ? "asc" : "desc"
                        }`}
                      ></span>
                    )}
                  </div>
                </th>
                <th style={{ width: "12%" }} className="sortable-header">
                  <div>Address</div>
                </th>
                <th style={{ width: "19%" }} className="sortable-header">
                  <div>Contact Info</div>
                </th>
                <th className="sortable-header" style={{ width: "20%" }}>
                  <div>Service Data</div>
                </th>
                <th
                  style={{ width: "7%" }}
                  className={`sortable-header ${
                    sortOption === "total_price" ? "sorted" : ""
                  }`}
                  onClick={() => handleSortClick("total_price")}
                >
                  <div>
                    Total Price{" "}
                    {sortOption === "total_price" && (
                      <span
                        className={`sort-icon ${
                          sortOrder === "asc" ? "asc" : "desc"
                        }`}
                      ></span>
                    )}
                  </div>
                </th>
                <th
                  style={{ width: "9%" }}
                  className={`sortable-header ${
                    sortOption === "date_paid" ? "sorted" : ""
                  }`}
                  onClick={() => handleSortClick("date_paid")}
                >
                  <div>
                    Date Paid{" "}
                    {sortOption === "date_paid" && (
                      <span
                        className={`sort-icon ${
                          sortOrder === "asc" ? "asc" : "desc"
                        }`}
                      ></span>
                    )}
                  </div>
                </th>
                <th style={{ width: "9%" }} className="sortable-header">
                  <div>Actions</div>
                </th>
              </tr>
            </thead>

            <tbody>
              {((query ? searchResult : invoices).length > 0
                ? query
                  ? searchResult
                  : invoices
                : invoices
              )
                .sort((a, b) => {
                  switch (sortOption) {
                    case "last_name":
                      return sortOrder === "asc"
                        ? a.last_name.localeCompare(b.last_name)
                        : b.last_name.localeCompare(a.last_name);
                    case "id":
                      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
                    case "date_issued":
                      const dateA = new Date(a.date_issued);
                      const dateB = new Date(b.date_issued);
                      return sortOrder === "asc"
                        ? dateA - dateB
                        : dateB - dateA;
                    case "total_price":
                      return sortOrder === "asc"
                        ? a.total_price - b.total_price
                        : b.total_price - a.total_price;
                    case "date_paid":
                      const datePaidA = a.date_paid
                        ? new Date(a.date_paid)
                        : null;
                      const datePaidB = b.date_paid
                        ? new Date(b.date_paid)
                        : null;
                      return sortOrder === "asc"
                        ? datePaidA - datePaidB
                        : datePaidB - datePaidA;
                    default:
                      return 0;
                  }
                })
                .map((invoice) => {
                  const inEditMode = editMode === invoice.id;
                  return (
                    <tr key={invoice.id}>
                      <td>{invoice.id}</td>
                      <td>{formatDate(invoice.date_issued)}</td>
                      <td>
                        {invoice.first_name} {invoice.last_name}
                      </td>
                      <td>
                        {invoice.address} <br /> {invoice.city}, {invoice.state}{" "}
                        {invoice.zip}
                      </td>
                      <td>
                        {formatPhoneNumber(invoice.phone)}
                        <br />
                        <br />
                        {invoice.email}
                      </td>
                      <td>
                        <ul>
                          {invoice.service_data
                            .slice()
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .map((service, index) => (
                              <ServiceData key={index} service={service} />
                            ))}
                        </ul>
                      </td>
                      <td>

                        {invoice.total_price
                          ? `$${parseFloat(invoice.total_price).toFixed(2)}`
                          : "No price selected"}
                      </td>
                      <td>
                        {inEditMode ? (
                          <input
                            type="date"
                            className="custom-date-input"
                            value={editedDate}
                            onChange={(e) => setEditedDate(e.target.value)}
                          />
                        ) : (
                          formatDate(invoice.date_paid)
                        )}
                      </td>

                      <td>
                        {inEditMode ? (
                          <>
                            <button
                              className="paidButton"
                              onClick={() => {
                                Swal.fire({
                                  icon: "success",
                                  title: "Marked as Paid",
                                  text: `The invoice was marked as paid.`,
                                });
                                dispatch({
                                  type: "EDIT_INVOICE",
                                  payload: {
                                    ...invoice,
                                    date_paid: editedDate,
                                  },
                                });
                                setEditMode(null);
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="history-deleteButton"
                              onClick={() => {
                                setEditMode(null);
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            {!invoice.date_paid ? (
                              <Button
                                style={{
                                  marginBottom: "6px",
                                  fontSize: "12px",
                                  padding: "2px 14px",
                                  color: "black",
                                  fontWeight: "bold",
                                  border: "1px solid black",
                                }}
                                variant="outlined"
                                onClick={() => {
                                  setEditedDate(invoice.date_paid || "");
                                  setEditMode(invoice.id);
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor =
                                    "#78E0A3")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    "transparent")
                                }
                              >
                                Mark Paid
                              </Button>
                            ) : null}
                            <Button
                              style={{
                                marginBottom: "6px",
                                fontSize: "12px",
                                padding: "2px 20px",
                                color: "black",
                                fontWeight: "bold",
                                border: "1px solid black",
                              }}
                              variant="outlined"
                              onClick={() => printInvoice(invoice.id)}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#F5A877")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "transparent")
                              }
                            >
                              Preview
                            </Button>
                            <br />
                            {!invoice.date_paid ? (
                              <Button
                                style={{
                                  marginBottom: "6px",
                                  fontSize: "12px",
                                  padding: "2px 6px",
                                  color: "black",
                                  fontWeight: "bold",
                                  border: "1px solid black",
                                }}
                                variant="outlined"
                                onClick={() => moreDetails(invoice.id)}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor = "#83A2C9")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    "transparent")
                                }
                              >
                                Edit Details
                              </Button>
                            ) : null}
                            {user.is_admin && (
                              <Button
                                style={{
                                  fontSize: "12px",
                                  padding: "2px 24px",
                                  color: "black",
                                  fontWeight: "bold",
                                  border: "1px solid black",
                                }}
                                variant="outlined"
                                onClick={() => handleDeleteInvoice(invoice.id)}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor = "#D16965")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    "transparent")
                                }
                              >
                                Delete
                              </Button>
                            )}
                            <br />
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </center>
      </div>
    </>
  );
}

// const handleEditDate = (invoice) => {
//   // Convert the date string to a Date object
//   const date = new Date(editedDate)
//   // Get the year, month, and day components
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1; // Month is zero-based, so add 1
//   const day = date.getDate();
//   const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
//     .toString()
//     .padStart(2, "0")}`;
//   Swal.fire({
//     icon: "success",
//     title: "Marked as Paid",
//     text: `The invoice was marked as paid on ${formattedDate}.`,
//   });
//   dispatch({
//     type: "EDIT_INVOICE",
//     payload: { ...invoice, date_paid: formattedDate },
// //   });
//   setEditMode(null);
// };
