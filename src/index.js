import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./components/Theme/Theme.jsx"
import Footer from "./components/Footer/Footer";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App/App";

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <ThemeProvider theme={Theme}>
        <App />
        <Footer />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);




