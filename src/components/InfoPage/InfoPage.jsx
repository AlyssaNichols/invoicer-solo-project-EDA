import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MenuItem, Box, Paper } from "@mui/material";
import { Button, TextField } from "@mui/material";
import ServiceData from "../ServiceData/ServiceData";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <br />
      <br />

      <div className="aboutDiv">
        <h1 className="mainUserHeader">
          Easily Generate A <br />
          <span className="professionalInvoice">Professional Invoice</span>
          <br />
          for your Business
        </h1>
        <br />
        <p className="infoParagraph">
          Invoicer has been meticulously crafted with a primary focus on your
          convenience and ease of use. We understand the challenges that often
          come with complicated and overwhelming invoice generation platforms.
          That's why we've paved the way for a simpler and more user-friendly
          solution.
        </p>
        <br />
        <p className="infoParagraph">
          With Invoicer, we've designed a platform with you in mind, offering an
          easy and intuitive solution for generating invoices. Our mission is to
          empower you to effortlessly create custom, professional invoices for
          your valued clients and customers. The best part? It's entirely free
          to use. So why wait? Give it a try today and experience the simplicity
          and efficiency of our platform built with your needs in mind.
        </p>
        <br />
      </div>
    </div>
  );
}

export default InfoPage;
