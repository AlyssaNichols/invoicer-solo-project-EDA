import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./ServiceLineItems.css";

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
    console.log("clicked saveEdit");
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
    dispatch({
      type: "DELETE_LINE_ITEM",
      payload: { itemId, invoice_id: params.id },
    });
  }

  return (
    <tr key={index}>
      <td>
        {item.type || "No service selected"}{" "}
        {/* Display "No service selected" if item.type is falsy */}
      </td>
      <td>
        {
          edit ? (
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
          ) : item.date ? (
            formatDate(item.date)
          ) : (
            "No date selected"
          ) // Display "No date selected" if item.date is falsy
        }
      </td>
      <td>
        {
          edit ? (
            <input
              type="text"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
            />
          ) : item.price ? (
            `$${parseFloat(item.price).toFixed(2)}`
          ) : (
            "No price selected"
          ) // Display "No price selected" if item.price is falsy
        }
      </td>
      <td>
        {edit ? (
          <>
            <button onClick={saveEdit}>Save</button>
            <button
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="editButton" onClick={() => handleEdit(item)}>
            Edit Service
          </button>
        )}
        <br />
        <button className="deleteButton" onClick={() => handleDelete(item.id)}>
          Delete Service
        </button>
      </td>
    </tr>
  );
}
