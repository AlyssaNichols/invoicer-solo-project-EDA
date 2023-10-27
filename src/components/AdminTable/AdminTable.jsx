import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminListCustomers from "../AdminListCustomers/AdminListCustomers";
import Swal from "sweetalert2";
import Fuse from "fuse.js";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Button } from "@mui/material";

export default function AdminTable() {
  const dispatch = useDispatch();
  const customerList = useSelector((store) => store.customers);

  const [query, setQuery] = useState(" ");
  const fuse = new Fuse(customerList, {
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

  return (
    <>
      <TextField
        style={{
          marginLeft: "4%",
          borderRadius: "4px",
          width: "280px",
          marginBottom: "20px",
          backgroundColor: "white",
          marginTop: "-60px",
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
          backgroundColor: "#E0D9D9",
          height: "30px",
          color: "black",
          width: "70px",
          fontSize: "13px",
          marginTop: "-105px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
        variant="contained"
        onClick={() => {
          clearInput();
        }}
      >
        Clear
      </Button>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Last, First Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>ZIP</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {((query ? searchResult : customerList).length > 0
            ? query
              ? searchResult
              : customerList
            : customerList
          )?.map((customer, index) => {
            return <AdminListCustomers key={index} customer={customer} />;
          })}
        </tbody>
      </table>
    </>
  );
}
