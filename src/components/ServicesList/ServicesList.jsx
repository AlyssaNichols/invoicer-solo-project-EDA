import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ServicesList() {
  const dispatch = useDispatch();
  const services = useSelector((store) => store.services);
  console.log(services);

  useEffect(() => {
    console.log("component did mount");
    dispatch({ type: "FETCH_SERVICES" });
  }, []);


 return (
    <div>
      <label htmlFor="serviceSelect">Select a service:</label>
      <select
        id="serviceSelect"
        value={selectedService}
        onChange={handleServiceChange}
      >
        <option value="">Select a service</option>
        {services.map((service, index) => (
          <option key={index} value={service}>
            {service}
          </option>
        ))}
      </select>
      <p>You selected: {selectedService}</p>
    </div>
  );
  
}
