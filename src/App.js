import React from "react";
import {
  RouterProvider,
} from "react-router-dom";

import SnackBarComponent from "./components/snackBar/SnackBar";
import { useSelector } from "react-redux";
import router from './routes';


function App() {
  const { open, message, severity } = useSelector((state) => state.alert);
  return (
    <>
      <RouterProvider router={router} />
      <SnackBarComponent open={open} message={message} severity={severity} />
    </>
  );
}

export default App;
