import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { authUser, isLoggedIn } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { ordersApi } from "../../api/ordersAPI";
import OrderItem from "./OrderItem";

export default function MyOrders() {
  const user = useSelector(authUser);
  const isLoggedInState = useSelector(isLoggedIn);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (isLoggedInState && user?.userName) {
      ordersApi
        .getMyOrders(user.userName)
        .then((response) => response.data)
        .then((p) => setMyOrders(p));
    }
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <Container>
        <div style={{ textAlign: "left" }}>
          <h2 style={{ color: "rgba(239,129,31,0.84)" }}>
            {myOrders.length ? "Мои заказы" : "Заказов пока нет"}
          </h2>
          <div>
            {myOrders.map((order) => (
              <div key={order.orderId}>
                <OrderItem order={order} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
