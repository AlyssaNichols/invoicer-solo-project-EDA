import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArchivedCustomerList from "../ArchivedCustomerList/ArchivedCustomerList";
import {
  Box,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";

export default function AdminTable(){
    const dispatch = useDispatch();
    const customerList = useSelector((store) => store.customers);
    const archivedList = useSelector((store) => store.archived);
    const handleArchive = (customerId) => {
        Swal.fire({
          title: "Are you sure you want to archive this Customer?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, archive them",
        }).then((result) => {
          if (result.isConfirmed) {
            // Dispatch an action to delete the invoice with the given ID
            dispatch({ type: "DELETE_CUSTOMER", payload: customerId });
            dispatch({ type: "FETCH_CUSTOMERS" });
            dispatch({ type: "FETCH_ARCHIVED_CUSTOMERS" });
            Swal.fire("Customer Successfully archived!");
          }
        });
      };


    return(<>
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
            {customerList?.map((customer, index) => {
                // <AdminListCustomers key={index} customer={customer} />
                            return (
                <tr key={index}>
                  <td>
                    {customer.last_name}, {customer.first_name}{" "}
                  </td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>{customer.state}</td>
                  <td>{customer.zip}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>
                    <Button
                      style={{
                        fontSize: "12px",
                        padding: "2px 10px",
                        color: "black",
                        fontWeight: "bold",
                        border: "1px solid black",
                        transition: "background-color 0.3s",
                      }}
                      variant="outlined"
                      onClick={() => handleArchive(customer.id)}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#D16965")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      Archive
                    </Button>
                  </td>
                </tr>
              );

            })}
          </tbody>
        </table></>)
}