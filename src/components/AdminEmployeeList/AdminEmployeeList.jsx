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
} from "@mui/material";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";

export default function AdminPageServices() {
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuIconStyle = {
    fontSize: "50px",
    color: "black",
    borderRadius: "50%",
    padding: "10px",
  };

  const navStyle = {
    textDecoration: "none",
    color: "black",
    fontSize: "22px",
    padding: "10px 0",
    marginBottom: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const employeeList = useSelector((store) => store.employees);
  console.log(employeeList);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const [menuOpen, setMenuOpen] = useState(false);
  const registerUser = (event) => {
    event.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Employee Added",
      text: "The New Employee has been successfully added.",
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
      title: "Are you sure you want to Remove this Employee?",
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

  function clear() {
    setUsername("");
    setPassword("");
  }

  return (
    <>
      <br />
      <br />
      <center>
        <Card
          sx={{
            minWidth: 275,
            marginTop: "20px",
            width: "96%",
            backgroundColor: "#DFD9D9",
          }}
        >
          <center>
            <CardContent>
              <Typography variant="h5" component="div">
                <h2
                  style={{
                    marginTop: "7px",
                    marginBottom: "-45px",
                    marginRight: "-20px",
                  }}
                >
                  Employee List
                </h2>
              </Typography>
            </CardContent>
          </center>
          <div>
            <br />
            <IconButton
              style={{
                float: "right",
                marginTop: "-70px",
                marginRight: "20px",
                verticalAlign: "middle",
              }}
              onClick={toggleMenu}
              color="inherit"
            >
              <MenuIcon style={menuIconStyle} className="page-menu-icon" />
            </IconButton>
            <Drawer anchor="right" open={menuOpen} onClose={toggleMenu}>
              <List
                style={{
                  backgroundColor: "#DBDBDB",
                  color: "black",
                  width: "150px",
                  position: "fixed",
                  right: "0",
                  height: "100%",
                  overflowY: "auto",
                  transition: "width 0.3s",
                  zIndex: "1",
                }}
              >
                <ListItem button>
                  <Link to="/admin" className="nav-link" style={navStyle}>
                    Admin
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link
                    to="/admin/services"
                    className="nav-link"
                    style={navStyle}
                  >
                    Services
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link
                    to="/admin/customers"
                    className="nav-link"
                    style={navStyle}
                  >
                    Customers
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link
                    to="/admin/employees"
                    className="nav-link"
                    style={navStyle}
                  >
                    Employees
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link
                    to="/admin/company"
                    className="nav-link"
                    style={navStyle}
                  >
                    Companies
                  </Link>
                </ListItem>
              </List>
            </Drawer>
          </div>
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
                  backgroundColor: "#AFABAB",
                  color: "white",
                  marginBottom: "20px",
                }}
                variant="contained"
                type="button"
                onClick={clear}
              >
                Cancel
              </Button>{" "}
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
