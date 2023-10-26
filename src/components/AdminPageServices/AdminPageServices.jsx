import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Typography,
  InputLabel,
} from "@mui/material";
import Swal from "sweetalert2";

export default function AdminPageServices() {
  const history = useHistory();
  const dispatch = useDispatch();
  const serviceList = useSelector((store) => store.services);

  useEffect(() => {
    dispatch({ type: "FETCH_SERVICES" });
  }, []);

  const addNewService = (event) => {
    event.preventDefault();
    if (!serviceName.service) {
      alert("Please make sure you enter a new Service!");
    } else {
      Swal.fire({
        icon: "success",
        title: "Service Added",
        text: "The new service has been successfully added.",
      });
      dispatch({ type: "ADD_SERVICE", payload: serviceName });
      setServiceName({ service: "" });
    }
  };

  const handleArchive = (serviceId) => {
    Swal.fire({
      title: "Are you sure you want to delete this Service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch an action to delete the invoice with the given ID
        dispatch({ type: "DELETE_SERVICE", payload: serviceId });
        Swal.fire("Service Successfully Deleted!");
      }
    });
  };

  const [serviceName, setServiceName] = useState({ service: "" });

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
                  }}
                >
                  Add New Service
                </h2>
              </Typography>
            </CardContent>
          </center>
        </Card>
        <Paper
          style={{ width: "40%", marginTop: "20px", paddingTop: "25px" }}
          elevation={3}
        >
          <form onSubmit={addNewService}>
            <Box
              className="formFields"
              sx={{
                "& .MuiTextField-root": { m: 0.4, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <InputLabel
                sx={{
                  fontWeight: "normal",
                  fontSize: "16px",
                  color: "black",
                }}
              >
                New Service:
              </InputLabel>
              <TextField
                style={{ backgroundColor: "white" }}
                placeholder="Service Name"
                label="Service Name"
                type="text"
                value={serviceName.service}
                onChange={(event) =>
                  setServiceName({
                    ...serviceName,
                    service: event.target.value,
                  })
                }
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
              >
                Add New Service
              </Button>
            </Box>
          </form>
        </Paper>
      </center>
      <br />
      <br />
      <br />
      <center>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceList?.map((service, index) => {
              return (
                <tr key={index}>
                  <td>{service.service}</td>
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
                      onClick={() => handleArchive(service.id)}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#D16965")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <center>
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
      </center>
    </>
  );
}
