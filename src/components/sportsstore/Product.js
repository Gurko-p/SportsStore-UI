import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productItem.styles.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  countProductsInCartChange,
  itemCountInCart,
} from "../../features/auth/authSlice";

export default function Product({ product, onRemove }) {
  const key = "cart";
  const dispatch = useDispatch();
  const countInCart = useSelector(itemCountInCart);

  function addToCart(product) {
    if (isCartEmpty()) {
      initializeCart(product);
      return;
    }
    pushProductToCart(product);
  }

  function isCartEmpty() {
    return localStorage.getItem(key) == null;
  }

  function pushProductToCart(product) {
    let cartitems = localStorage.getItem(key);
    let arr = JSON.parse(cartitems);
    arr.push(product);
    localStorage.setItem(key, JSON.stringify(arr));
  }

  function initializeCart(product) {
    localStorage.setItem(key, JSON.stringify([product]));
  }

  function getCarts() {
    let cartitems = localStorage.getItem(key);
    return JSON.parse(cartitems);
  }

  const tryAddProduct = (product) => {
    if (!isExistsInCart(product)) {
      dispatch(countProductsInCartChange(product.id));
      addToCart(product);
      return;
    }
    dispatch(countProductsInCartChange(product.id));
    removeFromCart(product);
    if (onRemove) {
      onRemove(product.id);
    }
  };

  function removeFromCart(product) {
    let carts = getCarts();
    carts = carts?.filter((cart) => cart.id !== product.id);
    if (!carts?.length) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(carts));
  }

  function isExistsInCart(product) {
    return countInCart.some((id) => id === product.id);
  }

  return (
    <>
      <Box sx={{ minWidth: 350, maxWidth: 350, marginBottom: "15px" }}>
        <Card
          variant="outlined"
          align="center"
          sx={{ backgroundColor: "rgb(222 228 235)", mt: 2, fontSize: 15 }}
        >
          <React.Fragment>
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 25 }}
              >
                {product.name}
              </Typography>
              <Typography sx={{ color: "text.secondary", mt: 2, fontSize: 15 }}>
                {product.category.categoryName}
              </Typography>
              <Typography variant="body2">{product.description}</Typography>
            </CardContent>
            <Typography
              sx={{ color: "text.secondary", mt: 0, mb: 1, fontSize: 15 }}
            >
              {product.price + " BYN"}
            </Typography>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color={isExistsInCart(product) ? "success" : "primary"}
                onClick={() => tryAddProduct(product)}
              >
                {isExistsInCart(product)
                  ? "Удалить из корзины"
                  : "Добавить в корзину"}
              </Button>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>
    </>
  );
}
