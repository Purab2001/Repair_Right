// ThemeToggleButton.jsx
import React from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggleButton = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`transition-colors duration-300 rounded-full p-2 text-xl cursor-pointer
        ${
          isDark
            ? "text-yellow-400 hover:bg-gray-700"
            : "text-gray-800 hover:bg-yellow-300"
        }
      `}
      style={{ outline: "none", border: "none" }}
    >
      {isDark ? <BsSunFill /> : <BsMoonFill />}
    </button>
  );
};

export default ThemeToggleButton;
