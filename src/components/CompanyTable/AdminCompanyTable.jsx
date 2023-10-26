import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button } from "@mui/material";

export default function AdminCompanyTable() {
  const dispatch = useDispatch();
  const companyList = useSelector((store) => store.companyReducer);

  const handleArchive = (companyId) => {
    Swal.fire({
      title: "Are you sure you want to delete this Company?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch an action to delete the invoice with the given ID
        dispatch({ type: "DELETE_COMPANY", payload: companyId });
        dispatch({ type: "FETCH_COMPANIES" });
        Swal.fire("Customer Successfully archived!");
      }
    });
  };

  return (
    <>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>ZIP</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Logo Url</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyList?.map((company, index) => {
            return (
              <tr key={index}>
                <td>{company.company_name}</td>
                <td>{company.address}</td>
                <td>{company.city}</td>
                <td>{company.state}</td>
                <td>{company.zip}</td>
                <td>{company.phone}</td>
                <td>{company.email}</td>
                <td>{company.url}</td>
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
                    onClick={() => handleArchive(company.id)}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#D16965")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
