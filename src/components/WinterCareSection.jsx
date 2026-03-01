import React from "react";
import { useNavigate } from "react-router-dom";

const AnimalCareSection = () => {
  const navigate = useNavigate();

  const services = [
    {
      serviceId: 1,
      serviceName: "Pet Medical Care",
      description: "Routine check-ups, vaccinations, emergency treatment, dental care, and specialized services for all types of pets — dogs, cats, birds, rabbits, and more.",
      providerName: "WarmPaws Vet Team",
      providerEmail: "vet@warmpaws.com",
      rating: 4.8,
      image: "/images/medical-care.jpg",
      icon: "🩺",
      link: "/medical",          // ← Medical পেজে যাবে
      buttonText: "Book Now",
    },
    {
      serviceId: 2,
      serviceName: "Products and Foods",
      description: "High-quality pet food, treats, toys, grooming supplies, beds, collars, and accessories tailored for every animal's needs and lifestyle.",
      providerName: "WarmPaws Store",
      providerEmail: "shop@warmpaws.com",
      rating: 4.7,
      image: "/images/products-food.jpg",
      icon: "🛍️",
      link: "/products",         // ← Products পেজে যাবে
      buttonText: "Explore Now",
    },
    {
      serviceId: 3,
      serviceName: "Adoption",
      description: "Find your perfect companion! We help match loving homes with rescued animals of all kinds — puppies, kittens, adult pets, and special-needs companions.",
      providerName: "WarmPaws Rescue Center",
      providerEmail: "adopt@warmpaws.com",
      rating: 4.9,
      image: "/images/adoption.jpg",
      icon: "❤️",
      link: "/adoption",         // ← Adoption পেজে যাবে
      buttonText: "Book Now",
    },
    {
      serviceId: 4,
      serviceName: "Rescue",
      description: "We respond to distress calls, provide immediate aid, rehabilitation, and safe shelter for stray, abandoned, and injured animals of all species.",
      providerName: "WarmPaws Rescue Team",
      providerEmail: "rescue@warmpaws.com",
      rating: 5.0,
      image: "/images/rescue.jpg",
      icon: "🛡️",
      link: "/rescue",           // ← Rescue পেজে যাবে
      buttonText: "Learn More",
    },
  ];

  const handleNavigate = (link) => {
    navigate(link);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50" />
      </div>

      <h2 className="relative text-4xl md:text-5xl font-extrabold text-orange-700 text-center mb-16 drop-shadow-md">
        Comprehensive Animal Care Services
        <span className="block text-xl md:text-2xl font-medium text-orange-600 mt-3">
          For every pet and animal that needs love and support
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service.serviceId}
            className="group relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-7 border border-orange-100/50 hover:border-orange-300 transition-all duration-500 hover:shadow-3xl hover:scale-[1.04] overflow-hidden"
          >
            {/* Icon badge */}
            <div className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
              {service.icon}
            </div>

            <div className="relative overflow-hidden rounded-2xl mb-5">
              <img
                src={`${import.meta.env.BASE_URL}${service.image}`}
                alt={service.serviceName}
                className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <h3 className="text-2xl font-bold text-orange-700 mb-3 group-hover:text-orange-600 transition-colors">
              {service.serviceName}
            </h3>

            <p className="text-gray-700 text-base leading-relaxed mb-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
              {service.description}
            </p>

            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p><strong>Provider:</strong> {service.providerName}</p>
              <p><strong>Contact:</strong> {service.providerEmail}</p>
              <p><strong>Rating:</strong> ⭐ {service.rating} / 5</p>
            </div>

            <button
              onClick={() => handleNavigate(service.link)}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {service.buttonText} →
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-600 italic text-lg">
          "Every animal deserves care, love, and a safe home — we're here for them all 🐾"
        </p>
      </div>
    </section>
  );
};

export default AnimalCareSection;