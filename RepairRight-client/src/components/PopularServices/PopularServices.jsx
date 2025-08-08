import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import PopularServicesHeader from "./PopularServicesHeader";
import ServiceCard from "../../ui/ServiceCard";
import ShowAllButton from "./ShowAllButton";
import LoadingSpinner from "../../ui/LoadingSpinner";

// Custom hook for responsive slice
function useResponsiveSlice() {
  const [count, setCount] = useState(4);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setCount(8); // lg and above
      } else if (window.innerWidth >= 768) {
        setCount(6); // md
      } else {
        setCount(4); // mobile
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return count;
}

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const visibleCount = useResponsiveSlice();

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://repair-right-server.vercel.app/services"
        );
        const data = await response.json();
        const mapped = data.slice(0, 8).map((service) => ({
          _id: service._id,
          imageUrl: service.imageUrl,
          serviceName: service.name,
          price: service.price,
          description: service.description,
        }));
        if (isMounted) {
          setServices(mapped);
          setLoading(false);
        }
      } catch {
        if (isMounted) setLoading(false);
      }
    };
    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSeeMore = useCallback(
    (serviceId) => {
      if (!user) {
        navigate("/login", { state: { from: `/services/${serviceId}` } });
      } else {
        navigate(`/services/${serviceId}`);
      }
    },
    [user, navigate]
  );

  const handleShowAll = useCallback(() => {
    if (!user) {
      navigate("/login", { state: { from: "/services" } });
    } else {
      navigate("/services");
    }
  }, [user, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="px-4 md:px-14 lg:px-28 container mx-auto">
        <PopularServicesHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.slice(0, visibleCount).map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              variant="popular"
              onSeeMore={() => handleSeeMore(service._id)}
            />
          ))}
        </div>
        <ShowAllButton onClick={handleShowAll} />
      </div>
    </section>
  );
};

export default PopularServices;
