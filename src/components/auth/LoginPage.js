import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isLoggedIn, userLogin } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedInState = useSelector(isLoggedIn);

  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(userLogin({ email: email, password: password }));
  };

  return (
    <div>
      {isLoggedInState ? (
        <Navigate to={from} replace={true} />
      ) : (
        <div>
          <Box sx={{
             display: 'flex',
             justifyContent: 'center', /* Центрирование по горизонтали */
             alignItems: 'center', /* Центрирование по вертикали */
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  label="Пароль"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
