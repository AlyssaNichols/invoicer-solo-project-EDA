import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"; // Import useParams
import ServiceData from "../ServiceData/ServiceData";
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

export default function ArchivedHistory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const invoices = useSelector((state) => state.ArchivedHistory);
  const user = useSelector((store) => store.user);
  console.log("INVOICES", invoices);
  // const [sortOrder, setSortOrder] = useState("desc"); // Default sorting order is ascending
  // const [sortOption, setSortOption] = useState("id");

  useEffect(() => {
    dispatch({ type: "FETCH_ARCHIVED_INVOICES", payload: params.id });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) {
      return " ";
    }
    const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };


  // const [query, setQuery] = useState(" ");
  // const fuse = new Fuse(invoices, {
  //   keys: ["id", "first_name", "last_name", "email"],
  //   includeScore: true,
  //   threshold: 0.3, // Adjust this threshold (0.0 to 1.0) for strictness
  //   minMatchCharLength: 2, // Adjust the minimum character length for a match
  // });
  // const results = fuse.search(query);
  // const searchResult = results.map((result) => result.item);

  // function handleOnSearch(value) {
  //   console.log(value); // Add this line for debugging
  //   setQuery(value);
  // }

  // function clearInput() {
  //   setQuery(" ");
  // }
  // const handleSortClick = (option) => {
  //   if (option === sortOption) {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortOption(option);
  //     setSortOrder("asc");
  //   }
  // };
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
                Archived Invoices
              </h2>
            </Typography>
          </CardContent>
        </Card>
      </center>
      <br />

        <center>
          <table style={{ width: "96%" }} className="invoice-table">
            <thead>
              <tr>
                <th
                  style={{ width: "7%" }}
                  className="sortable-header"
                >
                  <div>
                    Invoice Number
          
                  </div>
                </th>
                <th
                  style={{ width: "8%" }}
                  className="sortable-header"
                >
                  <div>
                    Date Issued
                  </div>
                </th>
                <th
                  style={{ width: "9%" }}
                  className="sortable-header"
                >
                  <div>
                    Name
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
                  className="sortable-header"
                >
                  <div>
                    Total Price
                  </div>
                </th>
                <th
                  style={{ width: "9%" }}
                  className="sortable-header"
                >
                  <div>
                    Date Paid
                  </div>
                </th>
                <th style={{ width: "9%" }} className="sortable-header">
                  <div>Actions</div>
                </th>
              </tr>
            </thead>

            <tbody>
             
                {invoices?.map((invoice) => {
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
                      <td>`$${parseFloat(invoice.total_price).toFixed(2)}`</td>
                      <td>formatDate(invoice.date_paid)</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </center>
    </>
  );
}
