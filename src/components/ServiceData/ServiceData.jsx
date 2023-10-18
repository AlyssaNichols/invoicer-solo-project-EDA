import React from "react";

// import { Link } from "react-router-dom";

export default function ServiceData({ service }) {
  const formatDate = (dateString) => {

    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <li>
        {service.type}, ${service.price} on {formatDate(service.date)}
      </li>
    </>
  );
}
