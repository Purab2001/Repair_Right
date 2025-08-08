import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import PageHelmet from "../components/PageHelmet";
import ServicesPageHeader from "../components/ServicesPageHeader";
import ServiceCard from "../ui/ServiceCard";

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Alphabetical (A-Z)", value: "az" },
  { label: "Alphabetical (Z-A)", value: "za" },
];

const Services = () => {
  const services = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("relevance");

  const filteredServices = useMemo(() => {
    let filtered = services;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.name?.toLowerCase().includes(term) ||
          service.description?.toLowerCase().includes(term) ||
          service.area?.toLowerCase().includes(term) ||
          service.provider?.name?.toLowerCase().includes(term)
      );
    }
    switch (sortOption) {
      case "az":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // "relevance" - keep original order
        break;
    }
    return filtered;
  }, [services, searchTerm, sortOption]);

  return (
    <div className="bg-base-200 min-h-screen">
      <PageHelmet />
      <div className="px-4 md:px-14 lg:px-28 container mx-auto py-10">
        <ServicesPageHeader
          title="All Services"
          subtitle="Find the perfect service for your needs"
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          sortOption={sortOption}
          onSortChange={(e) => setSortOption(e.target.value)}
          sortOptions={sortOptions}
        />
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-base-content mb-2">
              No Services Found
            </h3>
            <p className="text-base-content/70 mb-4">
              We couldn't find any services matching "{searchTerm}". Try
              adjusting your search terms.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors duration-200"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
