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
} from "@mui/material";

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
    dispatch({ type: "ADD_SERVICE", payload: serviceName});
    setServiceName({service: ""});

  }
}

  const [serviceName, setServiceName] = useState( {service: ""});


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
                  }}
                >
                  Add New Service
                </h2>
              </Typography>
            </CardContent>
          </center>
        </Card>
        <Paper
          style={{ width: "40%", marginTop: "20px", paddingTop: "25px"}}
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
              <TextField
                style={{ backgroundColor: "white" }}
                placeholder="Service Name"
                label="Service Name"
                type="text"
                value={serviceName.service}
                onChange={(event) => setServiceName({...serviceName, service: event.target.value})}
              />
              <br />
              <br />
              <Button
                style={{ backgroundColor: "#008080", color: "white", marginBottom: "20px" }}
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
                <td><button onClick={() => dispatch({ type: "DELETE_SERVICE", payload: service.id })}>Delete Line</button></td>
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
