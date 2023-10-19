import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArchivedCutomerList from "../ArchivedCustomerList/ArchivedCustomerList";

export default function AdminCustomerPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerList = useSelector((store) => store.customers);
  const archivedList = useSelector((store) => store.archived);

  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const toggleCustomerForm = () => {
    setShowCustomerForm(!showCustomerForm);
  };

  const toggleArchived = () => {
    setShowArchived(!showArchived);
  };

  const addNewCustomer = (event) => {
    event.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !phone
    ) {
      alert("Please make sure all fields are filled in before submitting!");
    } else {
      dispatch({
        type: "ADD_CUSTOMER",
        payload: {
          firstName,
          lastName,
          address,
          city,
          state,
          zip,
          email,
          phone,
        },
      });
      setFirstName("");
      setLastName("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      setEmail("");
      setPhone("");
      toggleCustomerForm(); // Hide the form after adding a customer
    }
  };

  const cancelAddCustomer = () => {
    // Reset form fields and hide the form
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setEmail("");
    setPhone("");
    toggleCustomerForm(); // Hide the form
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_CUSTOMERS" });
    dispatch({ type: "FETCH_ARCHIVED_CUSTOMERS" });
  }, []);

  const handleArchive = (customerId) => {
    // Dispatch an action to delete the invoice with the given ID
    dispatch({ type: "DELETE_CUSTOMER", payload: customerId });
    dispatch({ type: "FETCH_CUSTOMERS" });
    dispatch({ type: "FETCH_ARCHIVED_CUSTOMERS" });
  };


  return (
    <>
      <center>
        <br />
        <br />
        <h2>Active Customer List</h2>
        {showCustomerForm ? (
          <h2>Add a New Customer</h2>
        ) : (
          <button onClick={toggleCustomerForm}>Add New Customer</button>
        )}
        {showCustomerForm && (
          <form onSubmit={addNewCustomer}>
            <input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <br />
            <input
              placeholder="Address"
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <input
              placeholder="City"
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <input
              placeholder="State"
              type="text"
              value={state}
              onChange={(event) => setState(event.target.value)}
            />
            <input
              placeholder="Zip Code"
              type="number"
              value={zip}
              onChange={(event) => setZip(Number(event.target.value))}
            />
            <br />
            <input
              placeholder="Email Address"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              placeholder="Phone Number"
              type="number"
              value={phone}
              onChange={(event) => setPhone(Number(event.target.value))}
            />
            <br />
            <button type="submit">Add New Customer</button>
            <br />
            <button type="button" onClick={cancelAddCustomer}>
              Cancel Add
            </button>
          </form>
        )}
      </center>
      <br />
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
          {customerList?.map((customer, index) => {
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
                  <button
                    onClick={() => handleArchive(customer.id)}
                  >
                    Archive Customer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <br />
      <center>
        {showArchived ? (
          <ArchivedCutomerList toggleArchived={toggleArchived}/>
        ) : (
          <button onClick={toggleArchived}>Show Archived Customers</button>
        )}
      </center>
    </>
  );
}
