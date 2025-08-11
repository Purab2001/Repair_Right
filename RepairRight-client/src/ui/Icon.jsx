import React from "react";

const Icon = ({ name, className = "", size = "w-6 h-6", ...props }) => {
  const icons = {
    // Error/Alert icons
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`stroke-current ${size} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),

    // Success icon
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`stroke-current ${size} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),

    // Warning icon
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`stroke-current ${size} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    ),

    // Info icon
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`stroke-current ${size} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),

    // Add more icons as needed
    user: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`stroke-current ${size} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),

    calendar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`stroke-current ${size} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default Icon;
