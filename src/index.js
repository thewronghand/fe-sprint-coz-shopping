import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url('https://fonts.googleapis.com/css2?family=Inter&display=swap') format('truetype');
  }
  
  body {
    font-family: 'Inter';
    margin: 0;
    padding: 0;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
