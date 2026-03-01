import React from "react";

const Rescue = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
        Rescue & Support
      </h2>

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl text-center">
        <p className="text-lg text-gray-700 mb-6">
          Help us rescue stray and injured animals. Your contribution
          can save lives and provide them with proper medical care.
        </p>

        <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold">
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default Rescue;