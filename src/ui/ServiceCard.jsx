import React from "react";
import { Link } from "react-router";
import { FiMapPin, FiDollarSign, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const ServiceCard = ({
  service,
  variant = "default", // 'default', 'popular', 'compact'
  onSeeMore,
  className = "",
}) => {
  const { user } = useAuth();
  const isOwnService = user?.email === service?.provider?.email;

  // Handle different data structures
  const serviceData = {
    id: service?._id || service?.id,
    name: service?.name || service?.serviceName,
    description: service?.description,
    price: service?.price,
    imageUrl: service?.imageUrl,
    area: service?.area,
    provider: service?.provider,
  };

  const renderPrice = () => {
    if (variant === "popular") {
      return (
        <span className="text-xl font-semibold text-primary">
          ৳{serviceData.price}
        </span>
      );
    }

    return (
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
        <FiDollarSign className="text-sm text-primary" />
        <span className="text-primary font-bold">{serviceData.price}</span>
      </div>
    );
  };

  const renderActions = () => {
    if (variant === "popular" && onSeeMore) {
      return (
        <div className="card-actions justify-end">
          <Button variant="primary" className="px-4 py-2 rounded-sm" size="sm" onClick={onSeeMore}>
            See More
          </Button>
        </div>
      );
    }

    return (
      <div className="card-actions justify-end">
        <Link to={`/services/${serviceData.id}`}>
          <Button
            className="px-4 py-2 rounded-sm"
            variant={isOwnService ? "outline" : "primary"}
            size="sm"
          >
            {isOwnService ? "View Details" : "Book Now"}
          </Button>
        </Link>
      </div>
    );
  };

  const cardClasses = `card bg-base-100 shadow overflow-hidden relative ${className}`;
  const imageClasses =
    variant === "compact"
      ? "object-cover w-full h-40"
      : "object-cover w-full h-60";

  return (
    <div className={cardClasses}>
      {isOwnService && variant !== "popular" && (
        <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-br-xl z-10">
          <FiUser className="inline mr-1" />
          Your Service
        </div>
      )}

      <figure className="relative">
        <img
          src={serviceData.imageUrl}
          alt={serviceData.name}
          className={imageClasses}
          loading="lazy"
        />
        {variant !== "popular" && renderPrice()}
      </figure>

      <div className="card-body">
        <h2 className="card-title">{serviceData.name}</h2>

        {serviceData.area && variant !== "popular" && (
          <p className="flex items-center gap-1 text-base-content/70 mb-1">
            <FiMapPin className="text-sm" />
            {serviceData.area}
          </p>
        )}

        <p className="line-clamp-3 text-base-content/80 text-sm mb-2">
          {serviceData.description}
        </p>

        {variant === "popular" ? (
          <div className="flex items-center justify-between mt-2">
            {renderPrice()}
            {renderActions()}
          </div>
        ) : (
          renderActions()
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
