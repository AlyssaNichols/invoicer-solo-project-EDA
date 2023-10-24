import React from "react";

// import { Link } from "react-router-dom";

export default function ServiceData({ service }) {
  const formatDate = (dateString, timeZone = 'UTC') => {
    if (!dateString) {
      return " ";
    }
    const date = new Date(dateString + 'T00:00:00.000Z'); // Assuming the date string is in 'YYYY-MM-DD' format
    const options = { year: "numeric", month: "long", day: "numeric" };
    const timeZoneOptions = { timeZone };
    return date.toLocaleDateString(undefined, { ...options, ...timeZoneOptions });
  };

  return (
    <>
      <li>
        {service.type}, ${service.price} on {formatDate(service.date)}
      </li>
    </>
  );
}
