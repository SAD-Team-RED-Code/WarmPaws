import React from "react";

const Adoption = () => {
  const pets = [
    { id: 1, name: "Golden Retriever", age: "2 Years", image: "/images/pet1.jpg" },
    { id: 2, name: "Persian Cat", age: "1 Year", image: "/images/pet2.jpg" },
    { id: 3, name: "Parrot", age: "8 Months", image: "/images/pet3.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-12">
        Pet Adoption
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-3xl shadow-xl p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={pet.image}
              alt={pet.name}
              className="h-48 w-full object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold text-pink-700">
              {pet.name}
            </h3>
            <p className="text-gray-600 mb-4">{pet.age}</p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl">
              Adopt Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adoption;