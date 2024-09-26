import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackBarComponent = ({ open, message, severity }) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={severity}
        color={severity}
        variant="filled"
        sx={{
          maxWidth: "250px",
          maxHeight: "200px",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
