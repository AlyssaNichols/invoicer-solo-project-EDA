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
import Swal from "sweetalert2";

export default function AdminPageServices() {
  const history = useHistory();
  const dispatch = useDispatch();
  const employeeList = useSelector((store) => store.employees);
  console.log(employeeList);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);

  const registerUser = (event) => {
    event.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Employee Added",
      text: "The new Employee has been successfully added.",
    });
    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
    setUsername("");
    setPassword("");
  }; // end registerUser

  useEffect(() => {
    dispatch({ type: "FETCH_EMPLOYEES" });
  }, []);

  const handleDelete = (employeeId) => {
    Swal.fire({
      title: "Are you sure you want to remove this Employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove Them",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "DELETE_EMPLOYEE", payload: employeeId });
        Swal.fire("Employee Successfully Removed!");
      }
    });
  };

  return (
    <>
      <br />
      <br />
      <center>
        <Card sx={{ minWidth: 275, marginTop: "20px", width: "96%", backgroundColor: "#DFD9D9" }}>
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
          style={{ width: "35%", marginTop: "20px", paddingTop: "25px" }}
          elevation={3}
        >
          <form onSubmit={registerUser}>
            <Box
              className="formFields"
              sx={{
                "& .MuiTextField-root": { m: 0.4, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
            >
              {" "}
              <h2 style={{ marginTop: "-30px", paddingTop: "25px" }}>
                New Employee Form
              </h2>
              <TextField
                style={{ backgroundColor: "white" }}
                placeholder="Username"
                label="Username"
                type="text"
                name="username"
                value={username}
                required
                onChange={(event) => setUsername(event.target.value)}
              />{" "}
              <br />
              <TextField
                style={{ backgroundColor: "white" }}
                type="password"
                name="password"
                label="Password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
              <br />
              <br />
              <Button
                style={{
                  backgroundColor: "#F69D55",
                  color: "white",
                  marginBottom: "20px",
                }}
                variant="contained"
                type="submit"
                name="submit"
                value="Register"
              >
                Add New Employee
              </Button>
            </Box>
          </form>
        </Paper>
        <br />
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
                <td>
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
                    onClick={() => handleDelete(employee.id)}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#D16965")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Remove Employee
                  </Button>
                </td>
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

{
  /* <TextField
                select
                label="Admin Status"
                id="is_admin"
                value={employee.is_admin}
                onChange={(event) =>
                  setEmployee({ ...employee, is_admin: event.target.value })
                }
                fullWidth
              >
                <MenuItem value={false}>Not Admin</MenuItem>
              </TextField> */
}
