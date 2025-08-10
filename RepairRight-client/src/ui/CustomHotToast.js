import { toast, Toaster } from "react-hot-toast";

const COLORS = {
  success: "#6366f1",
  error: "#dc2626",
  secondary: "#f1f5f9",
  text: "#1e293b",
};

// Success toast
export function toastSuccess(message, options = {}) {
  return toast.success(message, {
    style: {
      border: `1px solid ${COLORS.success}`,
      padding: "16px",
      color: COLORS.success,
      background: COLORS.secondary,
      fontWeight: 600,
      ...options.style,
    },
    iconTheme: {
      primary: COLORS.success,
      secondary: COLORS.secondary,
      ...options.iconTheme,
    },
    ...options,
  });
}

// Error toast
export function toastError(message, options = {}) {
  return toast.error(message, {
    style: {
      border: `1px solid ${COLORS.error}`,
      padding: "16px",
      color: COLORS.error,
      background: COLORS.secondary,
      fontWeight: 600,
      ...options.style,
    },
    iconTheme: {
      primary: COLORS.error,
      secondary: COLORS.secondary,
      ...options.iconTheme,
    },
    ...options,
  });
}

// Warning toast
export function toastWarning(message, options = {}) {
  return toast(message, {
    style: {
      border: `1px solid #f59e0b`,
      padding: "16px",
      color: "#f59e0b",
      background: COLORS.secondary,
      fontWeight: 600,
      ...options.style,
    },
    iconTheme: {
      primary: "#f59e0b",
      secondary: COLORS.secondary,
      ...options.iconTheme,
    },
    ...options,
  });
}

export { Toaster };