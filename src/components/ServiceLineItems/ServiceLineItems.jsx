import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./ServiceLineItems.css";
import Swal from 'sweetalert2'

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
      icon: 'success',
      title: 'Service Edited',
      text: 'The new service has been successfully edited.',
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
            Swal.fire(
              "Service Deleted!",
            );
          }
        });
      }

      return (
        <tr key={index}>
          <td>
            {item.type || "No service selected"}
          </td>
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
            {edit ? (
              <>
                <button className="editButton" onClick={saveEdit}>Save</button> <br />
                <button className="deleteButton" onClick={() => setEdit(!edit)}>Cancel</button>
              </>
            ) : (
              <>
                <button className="editButton" onClick={() => handleEdit(item)}>
                  Edit Service
                </button>
                <br />
                <button className="deleteButton" onClick={() => handleDelete(item.id)}>
                  Delete Service
                </button>
              </>
            )}
          </td>
        </tr>
      );
      
}
