import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function LogOutButton(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => {
        {
          Swal.fire({
            title: "Are you sure you want to Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch({ type: "LOGOUT" });
              Swal.fire("Logged out!");
            } history.push("/home")
          });
        }
      }}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
