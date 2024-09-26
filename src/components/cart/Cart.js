import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../sportsstore/Product";
import { Container, Button, Box } from "@mui/material";

export default function Cart() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    let result = JSON.parse(localStorage.getItem("cart")) ?? [];
    setCarts(result);
  }, []);

  function removeHandler(id) {
    setCarts(carts.filter((cart) => cart.id !== id));
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <Container>
        {carts.length === 0 ? (
          <div>
            <div style={{ textAlign: "center" }}>
              <h2>Корзина пуста</h2>
              <Button
                type="primary"
                variant="contained"
                color={"primary"}
                onClick={() => navigate("/")}
              >
                Вернуться к списку товаров
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>Корзина</h2>
            <div style={{ display: "inline-block" }}>
              {carts.map((product) => (
                <div key={product.id}>
                  <Product product={product} onRemove={removeHandler} />
                </div>
              ))}
            </div>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <Button
                type="primary"
                variant="contained"
                color={"primary"}
                onClick={() => navigate("/order")}
              >
                Оформить заказ
              </Button>
            </Box>
          </div>
        )}
      </Container>
    </div>
  );
}
