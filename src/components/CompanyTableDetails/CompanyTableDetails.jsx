import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

export default function CompanyTableDetails({ company, index }) {
  const params = useParams();
  const dispatch = useDispatch();

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
        Swal.fire("Company Successfully archived!");
      }
    });
  };

  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(company.company_name);
  const [editAddress, setEditAddress] = useState(company.address);
  const [editCity, setEditCity] = useState(company.city);
  const [editState, setEditState] = useState(company.state);
  const [editZip, setEditZip] = useState(company.zip);
  const [editPhone, setEditPhone] = useState(company.phone);
  const [editEmail, setEditEmail] = useState(company.email);
  const [editUrl, setEditUrl] = useState(company.url);

  const handleEdit = () => {
    setEdit(!edit);
    setEditName(company.company_name);
    setEditUrl(company.url);
    setEditAddress(company.address);
    setEditCity(company.city);
    setEditState(company.state);
    setEditZip(company.zip);
    setEditPhone(company.phone);
    setEditEmail(company.email);
  };

  const saveEdit = () => {
    Swal.fire({
      icon: "success",
      title: "Customer Edited",
      text: "The customer information has been successfully edited.",
    });

    dispatch({
      type: "EDIT_COMPANY",
      payload: {
        id: company.id,
        company_name: editName,
        address: editAddress,
        city: editCity,
        zip: editZip,
        state: editState,
        phone: editPhone,
        email: editEmail,
        url: editUrl
      },
    });

    setEdit(false);
  };

  return (
    <tr key={index}>
      <td>
        {edit ? (
          <>
            <input
              className="custom-date-input-name"
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </>
        ) : (
          `${company.company_name}`
        )}
      </td>
      <td>
        {edit ? (
          <input
            className="custom-date-input"
            type="text"
            value={editAddress}
            onChange={(e) => setEditAddress(e.target.value)}
          />
        ) : (
          `${company.address}`
        )}
      </td>
      <td>
        {edit ? (
          <input
            className="custom-date-input"
            type="text"
            value={editCity}
            onChange={(e) => setEditCity(e.target.value)}
          />
        ) : (
          `${company.city}`
        )}
      </td>
      <td>
        {edit ? (
          <input
            className="custom-date-input"
            type="text"
            value={editState}
            onChange={(e) => setEditState(e.target.value)}
          />
        ) : (
          `${company.state}`
        )}
      </td>
      <td>
        {edit ? (
          <input
            className="custom-date-input"
            type="number"
            value={editZip}
            onChange={(e) => setEditZip(e.target.value)}
          />
        ) : (
          `${company.zip}`
        )}
      </td>
      <td>
        {edit ? (
          <input
            className="custom-date-input"
            type="number"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
        ) : (
          `${company.phone}`
        )}
      </td>
      <td>
        {edit ? (
          <input
            className="custom-date-input"
            type="text"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
        ) : (
          `${company.email}`
        )}
      </td>
      {/* <td>
        {edit ? (
          <input
            className="custom-date-input"
            type="text"
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
          />
        ) : (
          `${company.url}`
        )}
      </td> */}
      <td>
        {edit ? (
          <>
            <Button
              style={{
                fontSize: "12px",
                padding: "2px 10px",
                color: "black",
                fontWeight: "bold",
                marginBottom: "5px",
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
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#D16965")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{
                fontSize: "12px",
                padding: "2px 10px",
                color: "black",
                marginBottom: "5px",
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
            </Button>
            <br />
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
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#D16965")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Archive
            </Button>
          </>
        )}{" "}
      </td>
    </tr>
  );
}
