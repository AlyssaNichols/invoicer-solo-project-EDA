import React, { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

export default function AdminListCustomers({ customer, index }) {
  const dispatch = useDispatch();

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
        dispatch({ type: "DELETE_CUSTOMER", payload: customerId });
        dispatch({ type: "FETCH_CUSTOMERS" });
        dispatch({ type: "FETCH_ARCHIVED_CUSTOMERS" });
        Swal.fire("Customer Successfully archived!");
      }
    });
  };

  const [edit, setEdit] = useState(false);
  const [editFirst, setEditFirst] = useState(customer.first_name);
  const [editCity, setEditCity] = useState(customer.city);
  const [editState, setEditState] = useState(customer.state);
  const [editZip, setEditZip] = useState(customer.zip);
  const [editPhone, setEditPhone] = useState(customer.phone);
  const [editEmail, setEditEmail] = useState(customer.email);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const saveEdit = () => {
    Swal.fire({
      icon: "success",
      title: "Customer Edited",
      text: "The customer information has been successfully edited.",
    });

    dispatch({
      type: "EDIT_CUSTOMER",
      payload: {
        id: customer.id,
        first_name: editFirst,
        last_name: editLast,
        city: editCity,
        zip: editZip,
        state: editState,
        phone: editPhone,
        email: editEmail,
      },
    });

    setEdit(false);
  };

  return (
    <tr key={index}>
      <td>
        {edit ? (
          <input
            type="text"
            value={editFirst}
            onChange={(e) => setEditFirst(e.target.value)}
          />
        ) : (
          `${customer.last_name}, ${customer.first_name}`
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="text"
            value={editCity}
            onChange={(e) => setEditCity(e.target.value)}
          />
        ) : (
          customer.city
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="text"
            value={editState}
            onChange={(e) => setEditState(e.target.value)}
          />
        ) : (
          customer.state
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="text"
            value={editZip}
            onChange={(e) => setEditZip(e.target.value)}
          />
        ) : (
          customer.zip
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="text"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
        ) : (
          customer.phone
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="text"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
        ) : (
          customer.email
        )}
      </td>
      <td>
        {edit ? (
          <button onClick={saveEdit}>Save</button>
        ) : (
          <button className="history-editButton" onClick={handleEdit}>
            Edit
          </button>
        )}
        <button
          className="history-deleteButton"
          onClick={() => handleArchive(customer.id)}
        >
          Archive Customer
        </button>
      </td>
    </tr>
  );
}
