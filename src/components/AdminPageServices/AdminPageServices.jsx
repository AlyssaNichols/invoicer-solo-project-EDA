import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

export default function AdminPageServices() {
  const history = useHistory();
  const dispatch = useDispatch();
  const serviceList = useSelector((store) => store.services);


  useEffect(() => {
    dispatch({ type: "FETCH_SERVICES" });
  }, []);
  const addNewService = (event) => {
    event.preventDefault();
    if (!serviceName) {
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
      <h2>Add a New Service</h2>
      <form onSubmit={addNewService}>
        <input
          placeholder="Service Name"
          type="text"
          value={serviceName.service}
          onChange={(event) => setServiceName({...serviceName, service: event.target.value})}
        />
        <button type="submit">Add New Service</button>
      </form>
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
