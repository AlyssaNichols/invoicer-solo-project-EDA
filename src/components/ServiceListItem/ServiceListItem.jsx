import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./ServiceLineItems.css";
import Swal from "sweetalert2";
import {
  Button 
} from "@mui/material";

export default function ServiceListItem({ item, index }) {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Set the time zone to UTC
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  console.log("ITEM", item);
  const [edit, setEdit] = useState(false);
  const [editDate, setEditDate] = useState(item.date);
  const [editPrice, setEditPrice] = useState(item.price);
  const dispatch = useDispatch();
  const params = useParams();

  const handleEdit = () => {
    setEdit(!edit);
    setEditDate(item.date);
    setEditPrice(item.price);
  };

  const saveEdit = () => {
    Swal.fire({
      icon: "success",
      title: "Service Edited",
      text: "The new service has been successfully edited.",
    });
    dispatch({
      type: "EDIT_LINE_ITEM",
      payload: {
        invoice_id: params.id,
        itemId: item.id,
        date_performed: editDate, // Use the edited value
        service_price: editPrice, // Use the edited value
      },
    }),
      setEdit(false);
  };

  function handleDelete(itemId) {
    Swal.fire({
      title: "Are you sure you want to delete this Service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "DELETE_LINE_ITEM",
          payload: { itemId, invoice_id: params.id },
        });
        Swal.fire("Service Deleted!");
      }
    });
  }

  return (
    <tr key={index}>
      <td>{item.type || "No service selected"}</td>
      <td>
        {edit ? (
          <input
            type="date"
            className="custom-date-input"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
        ) : item.date ? (
          formatDate(item.date)
        ) : (
          "No date selected"
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="number"
            className="custom-text-input"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />
        ) : item.price ? (
          `$${parseFloat(item.price).toFixed(2)}`
        ) : (
          "No price selected"
        )}
      </td>
      <td>
        {item.date ? (
          edit ? (
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
                onClick={saveEdit}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgb(173, 216, 195)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Save
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
                onClick={() => setEdit(!edit)}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#D16965")
                }
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
                  fontWeight: "bold",
                  border: "1px solid black",
                  transition: "background-color 0.3s",
                }}
                variant="outlined"
                onClick={() => handleEdit(item)}
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
                onClick={() => handleDelete(item.id)}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#D16965")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Delete
              </Button>
            </>
          )
        ) : (
          "No actions available"
        )}
      </td>
    </tr>
  );
}
