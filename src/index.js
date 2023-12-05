import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QuestionProvider } from "./contexts/QuestionContext.jsx";
import { UsersProvider } from "./contexts/UsersContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsersProvider>
    <QuestionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuestionProvider>
  </UsersProvider>
);
