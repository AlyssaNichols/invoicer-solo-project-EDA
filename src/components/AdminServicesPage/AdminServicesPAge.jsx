import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function AdminServicePage() {
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
    </>
  );
}
