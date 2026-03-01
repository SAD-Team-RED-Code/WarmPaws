import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const HeroSwiper = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/services.json`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error loading services:", err));
  }, []);

  const featuredServices = services.slice(0, 3);

  return (
    <section className="relative mb-16">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        centeredSlides
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="h-72 md:h-96 lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl"
      >
        {featuredServices.map((service) => (
          <SwiperSlide key={service.serviceId}>
            <div className="relative w-full h-full group overflow-hidden rounded-3xl">

              <img
                src={`${import.meta.env.BASE_URL}${service.image}`}
                alt={service.serviceName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center rounded-3xl p-6 md:p-12">
                <div className="text-white max-w-xl">

                  <p className="uppercase tracking-widest text-sm mb-3 text-orange-400 font-semibold">
                    Trusted Animal Care
                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {service.serviceName}
                  </h2>

                  <p className="text-gray-200 mb-6 text-sm md:text-base">
                    We provide professional and loving care for your pets.
                    Because your furry friends deserve the best.
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                      ${service.price}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-300">
                      ⭐ {service.rating} / 5
                    </span>
                  </div>

                  <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
                    Book Now
                  </button>

                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSwiper;