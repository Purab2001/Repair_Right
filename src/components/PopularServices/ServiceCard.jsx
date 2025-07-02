import React from "react";

const ServiceCard = ({
  imageUrl,
  serviceName,
  description,
  price,
  onSeeMore,
}) => (
  <div className="card bg-base-100 shadow-sm">
    <figure>
      <img
        src={imageUrl}
        alt={serviceName}
        className="object-cover w-full h-60"
        loading="lazy"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{serviceName}</h2>
      <p className="line-clamp-3">{description}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xl font-semibold text-primary">৳{price}</span>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={onSeeMore}
          >
            See More
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ServiceCard;