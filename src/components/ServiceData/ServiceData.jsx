import React from "react";

export default function ServiceData({ service }) {
  const formatDate = (dateString, timeZone = "UTC") => {
    if (!dateString) {
      return " ";
    }
    const date = new Date(dateString + "T00:00:00.000Z"); // Assuming the date string is in 'YYYY-MM-DD' format
    const options = { year: "numeric", month: "long", day: "numeric" };
    const timeZoneOptions = { timeZone };
    return date.toLocaleDateString(undefined, {
      ...options,
      ...timeZoneOptions,
    });
  };

  return (
    <>
      <li>
       ${service.price} - {service.type} <br /> - {formatDate(service.date)}
      </li>
    </>
  );
}


