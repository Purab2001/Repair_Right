// src/components/ServicesPageHeader.jsx
import React from "react";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

const ServicesPageHeader = ({
  title,
  subtitle,
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  sortOptions,
}) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
    <div className="flex-1">
      <h1 className="text-4xl font-extrabold text-secondary mb-2">{title}</h1>
      <p className="text-base-content/70">{subtitle}</p>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 items-stretch md:items-end">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search services..."
      />
      <SortDropdown
        value={sortOption}
        onChange={onSortChange}
        options={sortOptions}
      />
    </div>
  </div>
);

export default ServicesPageHeader;