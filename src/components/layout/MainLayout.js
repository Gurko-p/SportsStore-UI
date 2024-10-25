import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeLoggedIn, isLoggedIn } from "../../features/auth/authSlice";
import { useNavigate, Outlet, useLocation  } from "react-router-dom";
import CartIcon from "../cart/CartIcon";

export default function MainLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedInState = useSelector(isLoggedIn);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedInState) {
      let params = new URLSearchParams();
      params.set("from", location.pathname + location.search);
      navigate("/login?" + params.toString(), { replace: true });
    }
  }, [isLoggedInState]);

  const logout = () => {
    dispatch(removeLoggedIn());
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              minWidth: "50vh",
              display: "flex",
            }}
          >
            <div
              style={{
                marginRight: "30px",
              }}
            >
              <Typography variant="h6">SportsStore</Typography>
            </div>
            <div>
              <Button color="white" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button color="white" onClick={() => navigate("/about")}>
                О проекте
              </Button>
              <Button color="white" onClick={() => navigate("/myOrders")}>
                Мои заказы
              </Button>
            </div>
          </div>
          <div style={{ minWidth: "150px", display: "flex" }}>
            <Button color="white" sx={{ marginRight: "50px" }} onClick={logout}>
              Logout
            </Button>
            <CartIcon />
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
