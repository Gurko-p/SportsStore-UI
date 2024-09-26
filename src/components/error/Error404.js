import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Error404() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Страница не найдена</h1>
      <p>К сожалению, запрашиваемая вами страница не существует.</p>
      <Button
        type="primary"
        variant="contained"
        color={"warning"}
        onClick={handleRedirect}
      >
        Вернуться на главную
      </Button>
    </div>
  );
}
