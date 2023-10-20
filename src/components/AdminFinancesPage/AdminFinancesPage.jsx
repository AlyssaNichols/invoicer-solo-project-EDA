import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


export default function AdminFinancialPage() {

    const dispatch = useDispatch();
  const finances = useSelector((store) => store.finances);
    useEffect(() => {
    dispatch({ type: "FETCH_FINANCES" });
  }, [dispatch]);

  function calculateMonthlyTotals(finances) {
    // Create an object to store monthly totals
    const monthlyTotals = {};
  
    // Iterate through each financial entry
    finances?.forEach((entry) => {
      const date = new Date(entry.date_paid);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Month is zero-based, so add 1
  
      // Create a unique key for each month (e.g., "2023-01" for January 2023)
      const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
  
      // Initialize the total for the month if it doesn't exist
      if (!monthlyTotals[monthKey]) {
        monthlyTotals[monthKey] = 0;
      }
  
      // Add the total_price to the corresponding month
      monthlyTotals[monthKey] += entry.total_price;
    });
  
    return monthlyTotals;
  }
  
  // Calculate monthly totals
  const monthlyTotals = calculateMonthlyTotals(finances);
  
  // Resulting object with monthly totals
  console.log("TOTALS", monthlyTotals);

  
  
  

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Invoice Amounts',
        data: finances?.map((invoice) => invoice.total_price),
        backgroundColor: 'rgba(255, 99, 132, 0.5',
      }
    ],
  };
  return <Bar options={options} data={data} />;
}


