import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (<>
    <Paper
      style={{ width: "40%", marginTop: "20px", paddingTop: "30px" }}
      elevation={3}
    >
      <center>
      <Typography variant="h8" component="div">
                <h1
                  style={{
                    marginTop: "5px",
                    marginBottom: "25px",
                  }}
                >
                  Please Login:
                </h1>
              </Typography>
        <form onSubmit={login}>
          <Box
            className="formFields"
            sx={{
              "& .MuiTextField-root": { m: 0.4, width: "40ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              style={{ backgroundColor: "white" }}
              type="text"
              label="Username"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <TextField
              style={{ backgroundColor: "white" }}
              type="password"
              label="Password"
              name="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <br />
            <Button
              style={{ backgroundColor: "#008080", color: "white" }}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
            <br />
            <br />
          </Box>
          <br />
        </form>
      </center>
    </Paper>
    <br />
           <Button
           style={{ backgroundColor: "#7d5e51", color: "white", marginTop: "20px" }}
           variant="contained"
           type="button"
           onClick={() => {
             history.push("/home");
           }}
         >
           Back To Home
         </Button>
         </>
  );
}

export default LoginForm;
