import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function AdminCustomerPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerList = useSelector((store) => store.customers);

  const addNewCustomer = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !address || !city || !state || !zip || !phone) {
        alert("Please make sure all fields are filled in before submitting!");
      } else {
    dispatch({ type: "ADD_CUSTOMER", payload: {firstName, lastName, address, city, state, zip, email, phone} });
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setEmail("");
    setPhone("");
  }
}

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
  }, []);



  return (
    <>
      <center>
      <h2>Add a New Customer</h2>
      <form onSubmit={addNewCustomer}>
        <input
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <br />
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
        <br />
        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <br />
        <input
          placeholder="State"
          type="text"
          value={state}
          onChange={(event) => setState(event.target.value)}
        />
        <br />
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
        <br />
        <input
          placeholder="Phone Number"
          type="number"
          value={phone}
          onChange={(event) => setPhone(Number(event.target.value))}
        />
        <br />
        <button type="submit">Add New Customer</button>
      </form>
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
                <td>{customer.last_name}, {customer.first_name} </td>
                <td>{customer.address}</td>
                <td>{customer.city}</td>
                <td>{customer.state}</td>
                <td>{customer.zip}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td><button onClick={() => dispatch({ type: "DELETE_CUSTOMER", payload: customer.id })}>Delete Line</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
