import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import PopularServicesHeader from './PopularServicesHeader';
import ServicesTable from './ServicesTable';
import ShowAllButton from './ShowAllButton';

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const response = await fetch('https://repair-right-server.vercel.app/services');
        const data = await response.json();
        const mapped = data.slice(0, 6).map(service => ({
          _id: service._id,
          imageUrl: service.imageUrl,
          serviceName: service.name,
          price: service.price,
          serviceArea: service.area,
          description: service.description,
          provider: service.provider
        }));
        if (isMounted) {
          setServices(mapped);
          setLoading(false);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        if (isMounted) setLoading(false);
      }
    };
    fetchServices();
    return () => { isMounted = false; };
  }, []);

  const handleViewDetail = useCallback((serviceId) => {
    if (!user) {
      navigate('/login', { state: { from: `/services/${serviceId}` } });
    } else {
      navigate(`/services/${serviceId}`);
    }
  }, [user, navigate]);

  const handleShowAll = useCallback(() => {
    if (!user) {
      navigate('/login', { state: { from: '/services' } });
    } else {
      navigate('/services');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="px-4 md:px-14 lg:px-28 container mx-auto">
        <PopularServicesHeader />
        <ServicesTable services={services} onViewDetail={handleViewDetail} />
        <ShowAllButton onClick={handleShowAll} />
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
};

export default PopularServices;
