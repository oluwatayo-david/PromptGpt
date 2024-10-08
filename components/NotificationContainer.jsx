import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  return <ToastContainer />;
};

// Function to show a success toast
export const showSuccessToast = (message) => {
  toast.success(message);
};

// Function to show an error toast
export const showErrorToast = (message) => {
  toast.error(message);
};

// Function to show an info toast
export const showInfoToast = (message) => {
  toast.info(message);
};

// Function to show a warning toast
export const showWarningToast = (message) => {
  toast.warn(message);
};

export default ToastNotification;
