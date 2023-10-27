import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminFinancialPage() {
  const dispatch = useDispatch();
  const finances = useSelector((store) => store.financesReducer);

  // Initialize objects to hold monthly income and expense totals
  const monthlyIncome = {};
  const monthlyExpenses = {};

  useEffect(() => {
    dispatch({ type: "FETCH_FINANCES" });
  }, []);

  // Iterate through the finances array to calculate monthly totals
  finances.forEach((item) => {
    const dateIssued = new Date(item.date_issued);
    const monthKey = dateIssued.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    if (item.total_price > 0) {
      // Add to income
      if (!monthlyIncome[monthKey]) {
        monthlyIncome[monthKey] = 0;
      }
      monthlyIncome[monthKey] += Number(item.total_price);
    } else {
      // Add to expenses
      if (!monthlyExpenses[monthKey]) {
        monthlyExpenses[monthKey] = 0;
      }
      monthlyExpenses[monthKey] -= Number(item.total_price); // Assuming expenses are represented as negative values
    }
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Extract months and corresponding income and expense data
  const months = Object.keys(monthlyIncome)
    .map((month) => {
      // Convert month names to their numerical values

      const monthIndex = monthNames?.indexOf(month.split(" ")[0]);
      const year = parseInt(month.split(" ")[1]);
      return year * 12 + monthIndex; // Convert to a numeric value based on year and month
    })
    .sort((a, b) => a - b); // Sort the numerical values

  const sortedMonths = months.map((numericMonth) => {
    const year = Math.floor(numericMonth / 12);
    const monthIndex = numericMonth % 12;
    return `${monthNames[monthIndex]} ${year}`;
  });

  const incomeData = sortedMonths.map((month) => monthlyIncome[month] || 0);

  const data = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Amount Invoiced",
        data: incomeData,
        backgroundColor: "#FFA459",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += `$${context.parsed.y.toFixed(2)}`; // Add "$" sign and format value
            return label;
          },
        },
      },
    },
  };

  return (
    <div>
      <center>
        <Paper elevation={3} style={{ paddingRight: "10px", paddingLeft: "10px", width: "65%" }}>
          <Typography variant="h5" component="div">
            <h2
              style={{
                fontSize: "32px",
                marginTop: "-10px",
                padding: "10px",
                paddingBottom: "15px",
                letterSpacing: ".5px",
                borderBottom: "1px solid black",
                width: "80%",
              }}
            >
              Monthly Financial Overview
            </h2>
          </Typography>
          <Bar
            data={data}
            options={options}
            style={{
              fontSize: "32px",
              marginTop: "-10px",
              paddingLeft: "10px",
              paddingRight: "10px",
              width: "80%",
            }}
          ></Bar>
          <br />
          <br />
        </Paper>
      </center>
    </div>
  );
}
