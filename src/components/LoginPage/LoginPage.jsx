import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <center>
        <br />
        <br />
        <br />
        <LoginForm />
      </center>
    </div>
  );
}

export default LoginPage;
