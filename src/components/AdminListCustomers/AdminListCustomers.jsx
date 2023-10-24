import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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

export default function AdminListCustomers({ customer, index }) {
  const params = useParams();
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
  const [editLast, setEditLast] = useState(customer.last_name);
  const [editAddress, setEditAddress] = useState(customer.address);
  const [editCity, setEditCity] = useState(customer.city);
  const [editState, setEditState] = useState(customer.state);
  const [editZip, setEditZip] = useState(customer.zip);
  const [editPhone, setEditPhone] = useState(customer.phone);
  const [editEmail, setEditEmail] = useState(customer.email);

  const handleEdit = () => {
    setEdit(!edit);
    setEditFirst(customer.first_name)
    setEditLast(customer.last_name)
    setEditAddress(customer.address);
    setEditCity(customer.city);
    setEditState(customer.state);
    setEditZip(customer.zip);
    setEditPhone(customer.phone);
    setEditEmail(customer.email);
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
        address: editAddress,
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
          <><input
            type="text"
            value={editLast}
            onChange={(e) => setEditLast(e.target.value)}
          />,
          <input
          type="text"
          value={editFirst}
          onChange={(e) => setEditFirst(e.target.value)}
        />
        </> ) : (
          `${customer.last_name}, ${customer.first_name}`
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="text"
            value={editAddress}
            onChange={(e) => setEditAddress(e.target.value)}
          />
        ) : (
          `${customer.address}`
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
          `${customer.city}`
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
          `${customer.state}`
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
          `${customer.zip}`
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
          `${customer.phone}`
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
          `${customer.email}`
        )}
      </td>
      <td>
        {edit ? (
          <>
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
              onClick={() => setEdit(!edit)}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgb(173, 216, 195)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Cancel
            </Button>{" "}
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
              onClick={saveEdit}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgb(173, 216, 195)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Save
            </Button>
          </>
        ) : (
          <><Button
            style={{
              fontSize: "12px",
              padding: "2px 10px",
              color: "black",
              fontWeight: "bold",
              border: "1px solid black",
              transition: "background-color 0.3s",
            }}
            variant="outlined"
            onClick={handleEdit}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgb(173, 216, 195)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Edit
          </Button>{" "}
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
            (e.target.style.backgroundColor = "rgb(173, 216, 195)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Archive
        </Button>
          </> )}{" "}

      </td>
    </tr>
  );
}
