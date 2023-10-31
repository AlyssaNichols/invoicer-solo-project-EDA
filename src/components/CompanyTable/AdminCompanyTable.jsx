import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import CompanyTableDetails from "../CompanyTableDetails/CompanyTableDetails";

export default function AdminCompanyTable() {
  const dispatch = useDispatch();
  const companyList = useSelector((store) => store.companyReducer);

  return (
    <>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>ZIP</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyList?.map((company, index) => {
            return <CompanyTableDetails key={index} company={company} />;
          })}
        </tbody>
      </table>
    </>
  );
}
