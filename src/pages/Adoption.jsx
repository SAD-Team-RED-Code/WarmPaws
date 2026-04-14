import React, { useState } from "react";

const img = (i, type) => {
  if (type === "Dog") return `https://placedog.net/400/300?id=${i}`;
  if (type === "Cat") return `https://placekitten.com/400/30${i % 10}`;
  return `https://picsum.photos/400/300?random=${i}`;
};

const makePets = (startId = 1, count = 20) =>
  Array.from({ length: count }, (_, k) => {
    const i = startId + k;
    const type = ["Dog", "Cat", "Bird", "Other"][i % 4];
    return {
      id: i,
      name: `${type} ${i}`,
      age: (i % 5) + 1,
      type,
      location: ["Dhaka", "Chittagong", "Sylhet"][i % 3],
      gender: i % 2 === 0 ? "Male" : "Female",
      vaccinated: i % 2 === 0,
      description: "Friendly, healthy and ready for a loving home.",
      image: img(i, type)
    };
  });

const allPets = makePets(1, 24);
const rescuedPets = makePets(101, 8);

const Adoption = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [selectedPet, setSelectedPet] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredPets = allPets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase()) &&
      (type === "All" || pet.type === type)
  );

  const displayPets = showSaved
    ? allPets.filter((pet) => favorites.includes(pet.id))
    : filteredPets;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white py-14 px-6">

      <h2 className="text-4xl font-bold text-center text-black mb-6">
        Pet Adoption Section
      </h2>
      <h1 className="text-2xl font-semibold text-center text-gray-700 mb-8">
        Get your beloved pet here.
      </h1>

      <div className="max-w-7xl mx-auto flex gap-8">

        {/* LEFT SIDE */}
        <div className="flex-1">

          {/* FILTER */}
          <div className="mb-8 grid md:grid-cols-4 gap-3">

            <input
              type="text"
              placeholder="Search pet..."
              className="p-3 rounded-xl border text-black placeholder-gray-500"
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="p-3 rounded-xl text-black"
              onChange={(e) => setType(e.target.value)}
            >
              <option>All</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Other</option>
            </select>

            <button
              onClick={() => setShowSaved(!showSaved)}
              className="bg-yellow-400 rounded-xl"
            >
              {showSaved ? "Show All" : "Saved Pets"}
            </button>

            <button
              onClick={() => {
                setSearch("");
                setType("All");
                setShowSaved(false);
              }}
              className="bg-gray-300 rounded-xl"
            >
              Reset
            </button>

          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {displayPets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-3xl shadow-md p-5">

                <img
                  src={pet.image}
                  className="h-48 w-full object-cover rounded-xl mb-3"
                />

                <h3 className="text-lg font-semibold text-black">
                  {pet.name}
                </h3>

                <p className="text-black">
                  Age: {pet.age} yrs • {pet.type}
                </p>

                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => setSelectedPet(pet)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-xl"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => toggleFavorite(pet.id)}
                    className="flex-1 bg-yellow-400 py-2 rounded-xl"
                  >
                    {favorites.includes(pet.id) ? "★ Saved" : "☆ Save"}
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT FIXED RESCUE SECTION */}
        <div className="w-80 hidden lg:block">
          <div className="sticky top-10 bg-white shadow-lg rounded-2xl p-4 border-l-4 border-red-500">

            <h3 className="text-xl font-bold text-red-600 mb-4">
              Rescued Pets
            </h3>

            <div className="space-y-4">

              {rescuedPets.slice(0, 4).map((pet) => (
                <div key={pet.id} className="flex gap-3 items-center">

                  <img
                    src={pet.image}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div>
                    <p className="text-black font-semibold text-sm">
                      {pet.name}
                    </p>

                    <button
                      onClick={() => setSelectedPet(pet)}
                      className="text-xs text-red-500"
                    >
                      Adopt
                    </button>
                  </div>

                </div>
              ))}

            </div>

            <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl">
              See More
            </button>

          </div>
        </div>

      </div>

      {/* MODAL */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">

          <div className="bg-white p-6 rounded-2xl max-w-md w-full">

            <img
              src={selectedPet.image}
              className="rounded-xl mb-4 w-full h-56 object-cover"
            />

            <h2 className="text-2xl font-bold text-black">
              {selectedPet.name}
            </h2>

            <p className="text-black">{selectedPet.description}</p>

            <p className="text-black">
              Gender: {selectedPet.gender}
            </p>

            <p className="text-black">
              Vaccinated: {selectedPet.vaccinated ? "Yes" : "No"}
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="w-full mt-4 bg-pink-500 text-white py-2 rounded-xl"
            >
              Apply for Adoption
            </button>

            <button
              onClick={() => setSelectedPet(null)}
              className="w-full mt-2 bg-gray-300 py-2 rounded-xl"
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">

          <div className="bg-white p-6 rounded-2xl max-w-md w-full">

            <h2 className="text-xl font-bold mb-3 text-black">
              Adoption Form
            </h2>

            <input className="w-full p-2 border rounded mb-2 text-black placeholder-gray-500" placeholder="Your Name" />
            <input className="w-full p-2 border rounded mb-2 text-black placeholder-gray-500" placeholder="Phone" />
            <input className="w-full p-2 border rounded mb-2 text-black placeholder-gray-500" placeholder="Address" />
            <textarea className="w-full p-2 border rounded mb-2 text-black placeholder-gray-500" placeholder="Why adopt?" />

            <button
              onClick={() => {
                alert("Request Submitted!");
                setShowForm(false);
                setSelectedPet(null);
              }}
              className="w-full bg-green-500 text-white py-2 rounded-xl"
            >
              Submit
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="w-full mt-2 bg-gray-300 py-2 rounded-xl"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Adoption;