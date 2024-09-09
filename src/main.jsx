import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./routes/homepage/HomePage.jsx";
import DashboardPage from "./routes/dashboardPage/DashboardPage";
import ChatPage from "./routes/chatPage/ChatPage";
import LoginPage from "./routes/loginPage/LoginPage";
import SignUpPage from "./routes/signUpPage/SignUpPage.jsx";
import RootLayout from "./layous/rootLayout/RootLayout.jsx";
import DashboardLayout from "./layous/dashboardLayout/DashboardLayout.jsx";

const router =
  createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: (
            <HomePage />
          ),
        },
        {
          path: "/login/*",
          element: (
            <LoginPage />
          ),
        },
        {
          path: "/signUp/*",
          element: (
            <SignUpPage />
          ),
        },
        {
          element: (
            <DashboardLayout />
          ),
          children: [
            {
              path: "/dashboard",
              element: (
                <DashboardPage />
              ),
            },
            {
              path: "/dashboard/chat/:id",
              element: (
                <ChatPage />
              ),
            },
          ],
        },
      ],
    },
  ]);

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
    />
  </React.StrictMode>
);
