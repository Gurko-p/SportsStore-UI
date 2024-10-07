import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../sportsstore/Product";
import { Container, Button, Box, TextField } from "@mui/material";
import {
  countProductsInCartChange,
  authUser,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ordersApi } from "../../api/ordersAPI";
import { alertService, severity } from "../snackBar/alertService";

export default function Order() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(authUser);
  const [productQuantity, setQuantity] = useState([]);

  useEffect(() => {
    let productsArray = JSON.parse(localStorage.getItem("cart")) ?? [];
    setProducts(productsArray);
    createKeyPairProductQuantity(productsArray);
  }, []);

  function createKeyPairProductQuantity(productsArray) {
    const arr = productsArray.map((product) => ({
      productId: product.id,
      quantity: getProductQuantity(product.id) ?? 1,
    }));
    setQuantity(arr);
  };

  const increaseQuantity = (id) => {
    setQuantity(
      productQuantity.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setQuantity(
      productQuantity.map((item) =>
        item.productId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  function calculateTotalCost(arr) {
    return arr.reduce((accumulator, product) => {
      return accumulator + (product.price * getProductQuantity(product.id));
    }, 0);
  };

  const total = useMemo(() => {
    return parseFloat(calculateTotalCost(products).toFixed(2));
  }, [products, productQuantity]);

  const removeHandler = (id) => {
    let arr = products.filter((cart) => cart.id !== id);
    setProducts(arr);
  };

  const makeOrder = async (e) => {
    e.preventDefault();
    try {
      const addedCarts = products.map((product) => ({
        quantity: getProductQuantity(product.id),
        productId: product.id,
      }));
      let order = { userId: user.userName, address: address, carts: addedCarts };
      const createdOrder = await ordersApi.createOrderCarts(order);
      localStorage.removeItem("cart");
      dispatch(countProductsInCartChange(0));
      alertService.show(`Ваш заказ №${createdOrder.data.id} успешно сформирован!`, severity.success);
      navigate("/");
    } catch (error) {
      alertService.show("Ошибка при оформлении заказа!", severity.error);
    }
  };

  function getProductQuantity(productId) {
    return productQuantity.find((x) => x.productId === productId)?.quantity;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}>
      <Container>
        <div style={{ textAlign: "center" }}>
          <h2>Оформление заказа</h2>
          <div style={{ fontSize: "25px" }}>
            Общая сумма заказа <strong>{total} BYN</strong>
          </div>
          <h2>Введите адрес доставки:</h2>
          <form onSubmit={async (e) => makeOrder(e)}>
            <Box>
              <TextField
                label="Введите адрес доставки"
                sx={{ minWidth: "400px", maxWidth: "400px" }}
                variant="outlined"
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Box>
            <h2>Состав заказа:</h2>
            <div style={{ display: "inline-block" }}>
              {products.map((product) => (
                <div key={product.id}>
                  <Product product={product} onRemove={removeHandler} />
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button onClick={() => increaseQuantity(product.id)}>
                      <span style={{ fontSize: "15px", fontWeight: "bolder" }}>+</span>
                    </Button>
                    <span style={{ fontSize: "25px", fontWeight: "bolder" }}>
                      {getProductQuantity(product.id)}
                    </span>
                    <Button onClick={() => decreaseQuantity(product.id)}>
                      <span style={{ fontSize: "15px", fontWeight: "bolder" }}>-</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color={"warning"}
                disabled={products.length === 0}
              >
                Оформить заказ
              </Button>
            </Box>
          </form>

        </div>
      </Container>
    </div>
  );
}
