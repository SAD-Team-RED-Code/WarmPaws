import React from "react";

const ExpertVets = () => {
  const expertVets = [
    { id: 1, name: "Dr. Bella", specialty: "Canine Specialist", image: "/images/doctorbella.jpg" },
    { id: 2, name: "Dr. Max", specialty: "Feline Specialist", image: "/images/doctormax.jpg" },
    { id: 3, name: "Dr. Luna", specialty: "Exotic Pets", image: "/images/doctorluna.jpg" },
    { id: 4, name: "Dr. Oliver", specialty: "Small Animals", image: "/images/doctoroliver.jpg" },
  ];


  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-green-600 text-center mb-12">
        Meet Our Expert Vets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {expertVets.map((vet) => (
          <div
            key={vet.id}
            className="bg-white rounded-3xl shadow-xl p-6 text-center hover:scale-105 transition-transform duration-300 border-2 border-green-100"
          >
             <img
              src={vet.image}
              alt={vet.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-green-700 mb-2">{vet.name}</h3>
            <p className="text-green-800/90 text-sm mb-4">{vet.specialty}</p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold transition">
              Contact Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertVets;
