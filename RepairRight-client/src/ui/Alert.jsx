import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Icon from "./Icon";

const Alert = ({
  type = "info",
  message,
  className = "",
  animated = true,
  size = "md",
}) => {
  if (!message) return null;

  const iconMap = {
    error: "error",
    success: "success",
    warning: "warning",
    info: "info",
  };

  const alertClasses = {
    error: "alert-error",
    success: "alert-success",
    warning: "alert-warning",
    info: "alert-info",
  };

  const sizeClasses = {
    sm: "py-2 text-sm",
    md: "py-3",
    lg: "py-4 text-lg",
  };

  const iconName = iconMap[type];

  const alertContent = (
    <div
      className={`alert ${alertClasses[type]} ${sizeClasses[size]} ${className}`}
    >
      <Icon name={iconName} size="h-5 w-5" className="shrink-0" />
      <span>{message}</span>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {alertContent}
      </motion.div>
    );
  }

  return alertContent;
};

export default Alert;
