import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">INVOICER</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/customers">
              Add New Customer
            </Link>
            <Link className="navLink" to="/invoice">
              Create Invoice
            </Link>
            {/* <Link className="navLink" to="/invoice/details/:id">
              Invoice Details
            </Link> */}
            <Link className="navLink" to="/invoiceHistory">
              Invoice History
            </Link>
            <Link className="navLink" to="/admin">
              Admin
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
