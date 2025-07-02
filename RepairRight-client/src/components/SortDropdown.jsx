// src/components/SortDropdown.jsx
import React from "react";

const SortDropdown = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    className="select select-bordered min-w-[180px] bg-base-100 border-base-300 text-base-content focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg"
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default SortDropdown;