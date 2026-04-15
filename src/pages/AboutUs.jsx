import React, { useState } from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("health");

  const stats = [
    { num: "8K+", label: "Pets adopted" },
    { num: "4.8", label: "User rating" },
    { num: "5K+", label: "Families served" },
    { num: "200+", label: "Rescue partners" },
  ];

  const tabs = [
    { key: "health", label: "Health Care" },
    { key: "products", label: "Products" },
    { key: "adoption", label: "Adoption" },
  ];

  const services = {
    health: [
      { icon: "🩺", title: "Vet Care", desc: "Certified vets across Bangladesh." },
      { icon: "💉", title: "Vaccination", desc: "Track pet vaccination schedules." },
      { icon: "🧪", title: "Diagnostics", desc: "Health check & lab support." },
      { icon: "🐾", title: "Preventive Care", desc: "Long term health plans." },
    ],
    products: [
      { icon: "🛒", title: "Pet Food", desc: "Quality food for all pets." },
      { icon: "🧴", title: "Grooming", desc: "Hygiene & grooming tools." },
      { icon: "🏠", title: "Accessories", desc: "Beds, cages, toys." },
      { icon: "💊", title: "Medicines", desc: "Vet approved medicines." },
    ],
    adoption: [
      { icon: "🐶", title: "Adopt Pets", desc: "Find rescued pets." },
      { icon: "🤝", title: "Rescue Support", desc: "Help stray animals." },
      { icon: "📋", title: "Screening", desc: "Safe adoption process." },
      { icon: "🏡", title: "After Care", desc: "Post adoption support." },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* HERO */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">

          <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            Bangladesh Pet Care Platform
          </span>

          <h1 className="text-4xl font-bold mt-4">
            Caring for every paw across Bangladesh
          </h1>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            We provide veterinary care, pet products, adoption & rescue support in one platform.
          </p>

          {/* BUTTONS (ROUTER FIXED) */}
          <div className="mt-6 flex justify-center gap-3 flex-wrap">

            <Link to="/services">
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg transition">
                Explore Services
              </button>
            </Link>

            <Link to="/adoption">
              <button className="border border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-lg transition">
                Adopt a Pet
              </button>
            </Link>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h2 className="text-2xl font-bold text-amber-700">{s.num}</h2>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-bold mb-5">Our Services</h2>

        {/* TABS */}
        <div className="flex gap-2 flex-wrap mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                activeTab === t.key
                  ? "bg-amber-700 text-white border-amber-700"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-4">
          {services[activeTab].map((s) => (
            <div key={s.title} className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
              <div className="text-2xl">{s.icon}</div>
              <h3 className="font-semibold mt-2">{s.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};

export default AboutUs;