// src/components/SearchBar.jsx
import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange, placeholder }) => (
  <div className="relative w-full min-w-[200px]">
    <span className="absolute inset-y-0 left-3 flex items-center text-base-content/60">
      <FiSearch className="h-5 w-5" />
    </span>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered w-full pl-10 pr-3 py-2 bg-base-100 border-base-300 text-base-content focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none rounded-lg"
    />
  </div>
);

export default SearchBar;