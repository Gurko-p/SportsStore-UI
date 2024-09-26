import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import SportsPage from "./components/sportsstore/SportsPage";
import LoginPage from "./components/auth/LoginPage";
import About from "./components/navMenu/About";
import Cart from "./components/cart/Cart";
import Order from "./components/order/Order";
import MyOrders from "./components/order/MyOrders";
import Error404 from "./components/error/Error404";

import store from "./app/store";
import { checkLoggedIn } from "./features/auth/authSlice";
import MainLayout from "./components/layout/MainLayout";
import SnackBarComponent from "./components/snackBar/SnackBar";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: SportsPage },
      { path: "about", Component: About },
      { path: "cart", Component: Cart },
      { path: "order", Component: Order },
      { path: "myOrders", Component: MyOrders },
    ],
    loader: protectedLoader,
  },
  { path: "/login", Component: LoginPage },
  { path: "*", Component: Error404 },
]);

function App() {
  const { open, message, severity } = useSelector((state) => state.snackBar);
  return (
    <>
      <RouterProvider router={router} />
      <SnackBarComponent open={open} message={message} severity={severity} />
    </>
  );
}

export default App;

async function protectedLoader({ request }) {
  await store.dispatch(checkLoggedIn());
  const state = store.getState();
  const isLoggedIn = state.auth.isLoggedIn;

  if (!isLoggedIn) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}
