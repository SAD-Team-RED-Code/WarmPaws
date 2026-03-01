import React, { useState } from "react";
import { 
  FaSyringe, 
  FaStethoscope, 
  FaTooth, 
  FaAmbulance, 
  FaHeartbeat, 
  FaPaw, 
  FaDragon, 
  FaFeather, 
  FaVideo, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaWhatsapp 
} from "react-icons/fa";

// Services with categories and map availability
const services = [
  { id: 1, title: "Vaccination", description: "Scheduled vaccines for dogs, cats, birds, reptiles.", icon: <FaSyringe className="text-green-600 text-4xl mb-3" />, mapAvailable: true, category: "General", emergency: false },
  { id: 2, title: "Surgery", description: "Safe surgical care for all pets.", icon: <FaStethoscope className="text-green-600 text-4xl mb-3" />, mapAvailable: true, category: "General", emergency: true },
  { id: 3, title: "Health Checkups", description: "Wellness exams for your pets.", icon: <FaHeartbeat className="text-green-600 text-4xl mb-3" />, mapAvailable: false, category: "General", emergency: false },
  { id: 4, title: "Dental Care", description: "Teeth cleaning, extractions, and oral health.", icon: <FaTooth className="text-green-600 text-4xl mb-3" />, mapAvailable: false, category: "Dental", emergency: false },
  { id: 5, title: "Omni Consultation", description: "Book a video consultation with any available doctor online.", icon: <FaVideo className="text-green-600 text-4xl mb-3" />, mapAvailable: false, category: "Online", emergency: false },
];

// Online doctors with map availability
const onlineDoctors = [
  { id: 1, name: "Dr. Bella", specialty: "Canine Specialist", online: true, mapAvailable: true },
  { id: 2, name: "Dr. Max", specialty: "Feline Specialist", online: false, mapAvailable: false },
  { id: 3, name: "Dr. Luna", specialty: "Exotic Pets", online: true, mapAvailable: true },
  { id: 4, name: "Dr. Oliver", specialty: "Small Animals", online: true, mapAvailable: true },
];

// FAQs
const faqs = [
  { question: "What pets do you treat?", answer: "We treat dogs, cats, birds, reptiles, and small animals across Bangladesh." },
  { question: "Do you offer online consultation?", answer: "Yes! You can book a video call with any online doctor using the Omni Consultation." },
  { question: "Are emergency services available?", answer: "Yes! Our emergency services are 24/7 for critical cases." },
];

const Medical = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [filter, setFilter] = useState("All");

  // Filter services by category
  const filteredServices = services.filter(service => filter === "All" || service.category === filter);

  return (
    <div className="min-h-screen bg-green-50 py-16 px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-green-700 text-center mb-12">
        Animal Care & Medical Services
      </h1>

      {/* Filter / Categories */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {["All", "General", "Dental", "Online"].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-xl font-semibold transition ${filter === cat ? "bg-green-500 text-white" : "bg-green-100 text-green-800 hover:bg-green-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Services Column */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              onClick={() => { setSelectedItem(service); setShowMap(false); }}
              className="bg-white rounded-3xl shadow-xl p-6 text-center border-2 border-green-100 cursor-pointer hover:scale-105 transition-transform duration-300 relative"
            >
              {service.emergency && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  Emergency
                </span>
              )}
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">{service.title}</h3>
              <p className="text-green-700/90 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Online Doctors Column */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-green-100 h-fit sticky top-24">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Doctors Online</h2>
          {onlineDoctors.map(doc => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 mb-3 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100"
              onClick={() => { setSelectedItem(doc); setShowMap(false); }}
            >
              <div>
                <h3 className="font-semibold text-green-800">{doc.name}</h3>
                <p className="text-green-700 text-sm">{doc.specialty}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${doc.online ? "bg-green-500" : "bg-gray-400"}`} title={doc.online ? "Online" : "Offline"}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative">
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-green-700 font-bold text-2xl">&times;</button>
            <div className="flex justify-center mb-4">{selectedItem.icon}</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">{selectedItem.title || selectedItem.name}</h3>
            <p className="text-green-700/90 mb-4">{selectedItem.description || selectedItem.specialty}</p>

            <div className="flex flex-col md:flex-row gap-4">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
                <FaPhone /> Book Now
              </button>
              {selectedItem.online && (
                <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 px-6 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
                  <FaVideo /> Start Live Consultation
                </button>
              )}
              {selectedItem.mapAvailable && (
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 px-6 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <FaMapMarkerAlt /> See on Map
                </button>
              )}
            </div>

            {/* Map iframe */}
            {showMap && selectedItem.mapAvailable && (
              <div className="mt-6 w-full h-64 rounded-2xl overflow-hidden border-2 border-green-200 shadow-inner">
                <iframe
                  title="Pet Clinic Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.905303782596!2d90.39043557509054!3d23.750903794665554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8571b8e5ebd%3A0x7bcb74b7b21f1f33!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1694967072224!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAQ / Tips Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <details key={idx} className="mb-4 bg-white p-4 rounded-xl shadow-md border border-green-100">
            <summary className="font-semibold cursor-pointer">{faq.question}</summary>
            <p className="mt-2 text-green-700/90">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default Medical;