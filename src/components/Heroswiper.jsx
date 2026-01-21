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
        className="h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
      >
        {featuredServices.map((service) => (
          <SwiperSlide key={service.serviceId}>
            <div className="relative w-full h-full group overflow-hidden rounded-3xl shadow-lg">

              <img
                src={`${import.meta.env.BASE_URL}${service.image}`}
                alt={service.serviceName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/70 via-yellow-400/40 to-transparent flex items-end rounded-3xl p-6 md:p-8 lg:p-12">
                <div className="text-white">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg">
                    {service.serviceName}
                  </h2>
                  <div className="flex items-center gap-4 text-sm md:text-base">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-semibold shadow-md">
                      ${service.price}
                    </span>
                    <span className="flex items-center gap-1 drop-shadow-md">
                      ⭐ {service.rating} / 5
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-orange-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSwiper;
