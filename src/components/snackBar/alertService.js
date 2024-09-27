import store from "../../app/store";
import { showMessage, severityType } from "../../features/alert/alertSlice";

export const alertService = {
  show(message, severity, duration = 5000) {
    store.dispatch(showMessage({ message: message, severity: severity, duration: duration }));
  },
};

export const severity = severityType;
