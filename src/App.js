import React from "react";
import { RouterProvider } from "react-router-dom";

import SnackBarComponent from "./components/snackBar/SnackBar";
import { useSelector } from "react-redux";
import router from "./routes";
import ProgressLoader from "./components/loader/ProgressLoader";

function App() {
  const { open, message, severity } = useSelector((state) => state.alert);
  const { isLoading } = useSelector((state) => state.loader);
  return (
    <>
      <RouterProvider router={router} />
      <ProgressLoader loading={isLoading} />
      <SnackBarComponent open={open} message={message} severity={severity} />
    </>
  );
}

export default App;
