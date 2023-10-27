import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Swal from "sweetalert2";

export default function ArchivedCustomerList({ toggleArchived }) {
  const dispatch = useDispatch();
  const archivedList = useSelector((store) => store.archived);

  useEffect(() => {
    dispatch({ type: "FETCH_ARCHIVED_CUSTOMERS" });
  }, []);

  const handleReset = (customerId) => {
    Swal.fire({
      title: "Are you sure you want to Un-Archive this Customer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Un-Archive Them",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch an action to delete the invoice with the given ID
        // Dispatch an action to delete the invoice with the given ID
        dispatch({ type: "RESET_CUSTOMER", payload: customerId });
        dispatch({ type: "FETCH_CUSTOMERS" });
        Swal.fire("Customer Successfully Un-Archived!");
      }
    });
  };

  return (
    <center>
      <Button
        style={{
          backgroundColor: "#F69D55",
          color: "white",
          marginTop: "-10px",
        }}
        variant="contained"
        type="button"
        onClick={toggleArchived}
      >
        Back to Active Customers
      </Button>
      <br />
      <br />
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
          {archivedList?.map((customer, index) => {
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
                    onClick={() => handleReset(customer.id)}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "rgb(173, 216, 195)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Un-Archive
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </center>
  );
}
