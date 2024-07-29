import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
// import Register from "../pages/Register.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import guestRoutes from "./routes/guestRoutes";
import mainRoutes from "./routes/mainRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import reduxStore from "./store/store";

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([...guestRoutes, ...mainRoutes]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
