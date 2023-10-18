import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function AdminCustomerPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const employeeList = useSelector((store) => store.user);

  const addNewEmployee = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !address || !city || !state || !zip || !phone) {
        alert("Please make sure all fields are filled in before submitting!");
      } else {
    dispatch({ type: "ADD_USER", payload: {username: userName, is_admin: adminStatus} });
    setUserName("");
    setAdminStatus("");
  }
}

  const [userName, setUserName] = useState("");
  const [adminStatus, setAdminStatus] = useState(False);


  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
  }, []);



  return (
    <>
      <center>
      <h2>Add a New Employee</h2>
      <form onSubmit={addNewEmployee}>
        <input
          placeholder="UserName"
          type="text"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          placeholder="Admin Status"
          type="text"
          value={adminStatus}
          onChange={(event) => setAdminStatus(!adminStatus)}
        />
        <br />
        <button type="submit">Add New Employee</button>
      </form>
      </center>
      <br />
      <br />
      <br />
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Admin Status</th>
            <th>ID Number</th>
          </tr>
        </thead>
        <tbody>
          {employeeList?.map((employee, index) => {
            return (
              <tr key={index}>
                <td>{employee.id} </td>
                <td>{employee.username}</td>
                <td>{employee.is_admin}</td>

                <td><button onClick={() => dispatch({ type: "DELETE_USER", payload: employee.id })}>Delete Line</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}