import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AdminEmployee.css";
import {
  Box,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Typography,
  MenuItem,
} from "@mui/material";

export default function AdminPageServices() {
  const history = useHistory();
  const dispatch = useDispatch();
  const employeeList = useSelector((store) => store.employees);
  console.log(employeeList);
  const [employee, setEmployee] = useState({
    username: "",
    password: "",
    is_admin: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_EMPLOYEES" });
  }, []);

  const addNewEmployee = (event) => {
    event.preventDefault();
    if (!employee.username) {
      alert("Please make sure you enter a new Employee!");
    } else {
      dispatch({ type: "ADD_EMPLOYEE", payload: employee });
      setEmployee({ username: "", password: "", is_admin: "" });
    }
  };

  return (
    <>
      <br />
      <br />
      <center>
        <Card sx={{ minWidth: 275, marginTop: "20px", width: "98%" }}>
          <center>
            <CardContent>
              <Typography variant="h5" component="div">
                <h2
                  style={{
                    marginTop: "-5px",
                    marginBottom: "-10px",
                    letterSpacing: ".5px",
                  }}
                >
                  Employee List
                </h2>
              </Typography>
            </CardContent>
          </center>
        </Card>
      </center>
      <center>
        <Paper
          style={{ width: "40%", marginTop: "20px", paddingTop: "25px" }}
          elevation={3}
        >
          <form onSubmit={addNewEmployee}>
            <Box
              className="formFields"
              sx={{
                "& .MuiTextField-root": { m: 0.4, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                style={{ backgroundColor: "white" }}
                placeholder="Username"
                label="Userame"
                type="text"
                value={employee.username}
                onChange={(event) =>
                  setEmployee({ ...employee, username: event.target.value })
                }
              />
                            <TextField
                style={{ backgroundColor: "white" }}
                placeholder="Password"
                label="Password"
                type="text"
                value={employee.password}
                onChange={(event) =>
                  setEmployee({ ...employee, password: event.target.value })
                }
              />
              <TextField
                select
                label="Admin Status"
                id="is_admin"
                value={employee.is_admin}
                onChange={(event) =>
                  setEmployee({ ...employee, is_admin: event.target.value })
                }
                fullWidth
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </TextField>
              <br />
              <br />
              <Button
                style={{
                  backgroundColor: "#008080",
                  color: "white",
                  marginBottom: "20px",
                }}
                variant="contained"
                type="submit"
              >
                Add New Employee
              </Button>
            </Box>
          </form>
        </Paper>
        <br />
      </center>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Username</th>
            <th>Admin status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList?.map((employee, index) => {
            return (
              <tr key={index}>
                <td>{employee.id}</td>
                <td>
                  {employee.username.charAt(0).toUpperCase() +
                    employee.username.slice(1)}
                </td>
                <td>{employee.is_admin ? "Admin" : "No"}</td>
                <td><button className="history-deleteButton" onClick={() => dispatch({ type: "DELETE_EMPLOYEE", payload: employee.id })}>Remove Employee</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <center>
        <br />
        <br />
        <Button
          style={{ backgroundColor: "#996887", color: "white" }}
          variant="contained"
          onClick={() => {
            history.push("/admin");
          }}
        >
          Back to Admin Main Page
        </Button>
      </center>
    </>
  );
}
