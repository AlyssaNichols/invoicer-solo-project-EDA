import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import CustomerInputForm from "../CustomerInputForm/CustomerInputForm";
import CreateInvoicePage from "../CreateInvoiceForm/CreateInvoiceForm";
import InvoiceHistory from "../InvoiceHistory/InvoiceHistory";
import AdminPage from "../AdminPage/AdminPage";
import AdminCustomerPage from "../AdminCustomerPage/AdminCustomerPage";
import AdminPageServices from "../AdminPageServices/AdminPageServices";
// import RegisterPage from '../RegisterPage/RegisterPage';
import PrintInvoice from "../PrintInvoice/PrintInvoice";
import AdminEmployeeList from "../AdminEmployeeList/AdminEmployeeList";
import EmailPage from "../PDF/EmailPage";
import "./App.css";
import InvoiceDetails from "../InvoiceDetails/InvoiceDetails";
import AdminCompanyPage from "../AdminCompanyPage/AdminCompanyPage.jsx";
import ArchivedHistory from "../ArchivedHistory/ArchivedHistory";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <Route
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </Route>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/customers"
          >
            <CustomerInputForm />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/invoice"
          >
            <CreateInvoicePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/invoice/details/:id"
          >
            <InvoiceDetails />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/invoice/print/:id"
          >
            <PrintInvoice />
          </ProtectedRoute>
          <Route path="/email/:id">
            <EmailPage />
          </Route>
          <ProtectedRoute exact path="/invoiceHistory">
            <InvoiceHistory />
          </ProtectedRoute>
          {user.is_admin && (
            <ProtectedRoute exact path="/admin">
              <AdminPage />
            </ProtectedRoute>
          )}

          <ProtectedRoute exact path="/admin/services">
            <AdminPageServices />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/customers">
            <AdminCustomerPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/employees">
            <AdminEmployeeList />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/company">
            <AdminCompanyPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/archivedInvoices">
            <ArchivedHistory />
          </ProtectedRoute>
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <br />
            <h1>Page not Found</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
