import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "moment/locale/id";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { baseURL } from "./utils/constant.js";

axios.defaults.baseURL = `${baseURL}`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Router>
);
