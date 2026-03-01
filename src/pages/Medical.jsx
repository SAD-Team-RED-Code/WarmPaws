import React from "react";

const Medical = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-green-600 mb-12">
        Medical Services
      </h2>

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl text-center">
        <p className="text-lg text-gray-700 mb-6">
          We provide vaccination, surgery, health checkups, dental care,
          emergency treatment and more for your beloved pets.
        </p>

        <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Medical;