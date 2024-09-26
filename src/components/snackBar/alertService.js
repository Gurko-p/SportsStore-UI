import store from "../../app/store";
import { showSnackBar, hideSnackBar } from "../../features/snack/snackSlice";

export const alertService = {
  show(message, severity, duration = 5000) {
    showSnack(message, severity, duration);
  },
};

export const severityType = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

function showSnack(message, severity, duration = 5000) {
  store.dispatch(showSnackBar({ message: message, severity: severity }));
  setCustomTimeout(duration);
}

const setCustomTimeout = (duration) => {
  let timerId;
  timerId = setTimeout(() => {
    store.dispatch(hideSnackBar());
    clearTimeout(timerId);
  }, duration);
};
