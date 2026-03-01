import React from "react";
import { FaPhoneAlt, FaEnvelope, FaStar } from "react-icons/fa";
import { motion } from "framer-motion"; // For animation

const ExpertVets = () => {
  const expertVets = [
    {
      id: 1,
      name: "Dr. Bella",
      specialty: "Canine Specialist",
      experience: "10 years experience",
      rating: 4.8,
      services: ["Rescue", "Medical", "Vets"],
      image: "/images/doctorbella.jpg",
    },
    {
      id: 2,
      name: "Dr. Max",
      specialty: "Feline Specialist",
      experience: "8 years experience",
      rating: 4.6,
      services: ["Medical", "Vets"],
      image: "/images/doctormax.jpg",
    },
    {
      id: 3,
      name: "Dr. Luna",
      specialty: "Exotic Pets",
      experience: "6 years experience",
      rating: 4.7,
      services: ["Rescue", "Dealer", "Vets"],
      image: "/images/doctorluna.jpg",
    },
    {
      id: 4,
      name: "Dr. Oliver",
      specialty: "Small Animals",
      experience: "12 years experience",
      rating: 4.9,
      services: ["Medical", "Rescue", "Vets"],
      image: "/images/doctoroliver.jpg",
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    return (
      <div className="flex justify-center items-center text-yellow-400 mb-2">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <FaStar key={i} />
          ))}
        {halfStar && <FaStar className="text-yellow-300" />}
      </div>
    );
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 bg-yellow-50 rounded-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-12">
        Meet Our Expert Vets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {expertVets.map((vet) => (
          <motion.div
            key={vet.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-3xl shadow-xl p-6 text-center border-2 border-green-100"
          >
            <motion.img
              src={vet.image}
              alt={`Portrait of ${vet.name}`}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover border-4 border-green-200"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.6 }}
            />

            <h3 className="text-xl font-bold text-green-800 mb-1">{vet.name}</h3>
            <p className="text-green-700/90 text-sm mb-1">{vet.specialty}</p>
            <p className="text-green-600/80 text-sm mb-2">{vet.experience}</p>

            {renderStars(vet.rating)}

            <div className="flex justify-center gap-2 flex-wrap mb-4">
              {vet.services.map((service, i) => (
                <span
                  key={i}
                  className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition">
                <FaPhoneAlt /> Call
              </button>
              <button className="flex items-center gap-2 bg-green-300 hover:bg-green-400 text-white px-4 py-2 rounded-xl font-semibold transition">
                <FaEnvelope /> Email
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExpertVets;