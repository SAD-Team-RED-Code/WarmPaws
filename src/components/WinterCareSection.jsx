import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const WinterCareSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading services:", err);
        setLoading(false);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(services.length);
  };

  const handleLearnMore = (id) => {
    navigate(`/service/${id}`); 
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-orange-500 font-semibold">
        Loading services...
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-600 text-center mb-12">
        Winter Care for Your Pets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.slice(0, visibleCount).map((service) => (
          <div
            key={service.serviceId}
            className="bg-white rounded-3xl shadow-xl p-6 text-center hover:scale-105 transition-transform duration-300 border-2 border-orange-100"
          >
            <img
              src={`${import.meta.env.BASE_URL}${service.image}`}
              alt={service.serviceName}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <h3 className="text-xl font-bold text-orange-700 mb-2">
              {service.serviceName}
            </h3>
            <p className="text-orange-800/90 text-sm mb-4">{service.description}</p>

            <div className="text-sm text-gray-600 mb-4">
              <p>
                <strong>Provider:</strong> {service.providerName}
              </p>
              <p>
                <strong>Email:</strong> {service.providerEmail}
              </p>
              <p>
                <strong>Price:</strong> ${service.price}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {service.rating}
              </p>
            </div>

            <button
              onClick={() => handleLearnMore(service.serviceId)} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {visibleCount < services.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default WinterCareSection;
