import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <nav>
      <div className="nav">
        <h2 className="navbar-title">INVOICER</h2>
        <ul>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <><li>
              <Link className="navLink" to="/info">
                More Info
              </Link>
            </li>
            <li>
              <Link className="navLink" to="/login">
                Login
              </Link>
            </li>
            </>
          )}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <li>
                <Link className="navLink" to="/user">
                  Home
                </Link>
              </li>

              <li>
                <Link className="navLink" to="/customers">
                  Input New Customer
                </Link>
              </li>
              <li>
                <Link className="navLink" to="/invoice">
                  Create Invoice
                </Link>
              </li>
              {/* <Link className="navLink" to="/invoice/details/:id">
              Invoice Details
            </Link> */}
              <li>
                <Link className="navLink" to="/invoiceHistory">
                  Invoice History
                </Link>
              </li>
              {user.is_admin && (
                <li>
                  <Link className="navLink" to="/admin">
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <LogOutButton className="navLink logout-button" />
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="content"></div>
    </nav>
  );
}

export default Nav;
