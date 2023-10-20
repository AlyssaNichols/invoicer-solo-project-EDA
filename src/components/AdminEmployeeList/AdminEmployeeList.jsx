import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AdminEmployee.css";
import Button from "@mui/material/Button";

export default function AdminPageServices() {
  const history = useHistory();
  const dispatch = useDispatch();
  const employeeList = useSelector((store) => store.employees);
  console.log(employeeList)


  useEffect(() => {
    dispatch({ type: "FETCH_EMPLOYEES" });
  }, []);


  return (
    <>
    <br />
    <br />
     <center><h2>Employee List</h2></center>
    <br />
      <table className="invoice-table">
        <thead>
          <tr>
          <th>Employee ID</th>
            <th>Username</th>
            <th>Admin status</th>
          </tr>
        </thead>
        <tbody>
          {employeeList?.map((employee, index) => {
            return (
              <tr key={index}>
                <td>{employee.id}</td>
                <td>{employee.username.charAt(0).toUpperCase() + employee.username.slice(1)}</td>
                <td>{employee.is_admin ? "Admin" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <center>
        <br />
        <br />
          <Button
            style={{ backgroundColor: "#9a5c6f", color: "white" }}
            variant="contained"
            onClick={() => {
              history.push("/admin")
            }}
          >
            Back to Admin Main Page
          </Button>
        </center>
    </>
  );
}
