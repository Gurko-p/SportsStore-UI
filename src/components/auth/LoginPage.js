import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isLoggedIn, userLogin } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useInput }  from '../../hooks/customHooks';

export default function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [emailProps, resetEmail] = useInput("");
  const [passwordProps, resetPassword] = useInput("");

  const isLoggedInState = useSelector(isLoggedIn);

  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(userLogin({ email: emailProps.value, password: passwordProps.value }));
    resetEmail();
    resetPassword();
  };

  return (
    <div>
      {isLoggedInState ? (
        <Navigate to={from} replace={true} />
      ) : (
        <div>
          <Box sx={{
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             height: '100vh'
          }}>
            <Container maxWidth="xs">
              <Typography variant="h4" align="center" gutterBottom>
                Вход в систему
              </Typography>
              <form onSubmit={submitForm}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...emailProps}
                  required
                />
                <TextField
                  label="Пароль"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...passwordProps}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Войти
                </Button>
              </form>
            </Container>
          </Box>
        </div>
      )}
    </div>
  );
}