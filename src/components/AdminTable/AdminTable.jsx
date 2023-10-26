import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminListCustomers from "../AdminListCustomers/AdminListCustomers";
import Swal from "sweetalert2";

export default function AdminTable() {
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

  return (
    <>
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
            return <AdminListCustomers key={index} customer={customer} />;

          })}
        </tbody>
      </table>
    </>
  );
}
