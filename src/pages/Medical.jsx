import React, { useState, useEffect } from "react";
import {
  FaSyringe,
  FaStethoscope,
  FaTooth,
  FaHeartbeat,
  FaVideo,
  FaSearch,
  FaUserMd,
} from "react-icons/fa";

/* ===== SERVICES ===== */
const services = [
  {
    id: 1,
    title: "Vaccination",
    description: "Scheduled vaccines for pets.",
    icon: <FaSyringe className="text-green-700 text-3xl" />,
    category: "General",
    emergency: false,
  },
  {
    id: 2,
    title: "Surgery",
    description: "Safe surgical care.",
    icon: <FaStethoscope className="text-green-700 text-3xl" />,
    category: "General",
    emergency: true,
  },
  {
    id: 3,
    title: "Health Checkups",
    description: "Routine checkups.",
    icon: <FaHeartbeat className="text-green-700 text-3xl" />,
    category: "General",
    emergency: false,
  },
  {
    id: 4,
    title: "Dental Care",
    description: "Pet dental treatment.",
    icon: <FaTooth className="text-green-700 text-3xl" />,
    category: "Dental",
    emergency: false,
  },
  {
    id: 5,
    title: "Online Consultation",
    description: "Video consultation with doctors.",
    icon: <FaVideo className="text-green-700 text-3xl" />,
    category: "Online",
    emergency: false,
  },
];

/* ===== DOCTORS ===== */
const doctors = [
  { id: 1, name: "Dr. Rahman", specialty: "Canine Specialist" },
  { id: 2, name: "Dr. Ahmed", specialty: "Feline Specialist" },
  { id: 3, name: "Dr. Luna", specialty: "Exotic Pets" },
  { id: 4, name: "Dr. Oliver", specialty: "General Vet" },
];

/* ===== HOSPITALS ===== */
const hospitals = [
  { name: "Central Veterinary Hospital (Dhaka)", lat: 23.7465, lng: 90.3742 },
  { name: "Pet Care Clinic (Mirpur)", lat: 23.8069, lng: 90.3687 },
  { name: "Banani Pet Hospital", lat: 23.7935, lng: 90.4066 },
];

/* ===== DISTANCE ===== */
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export default function Medical() {
  const [selected, setSelected] = useState(null);
  const [booked, setBooked] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("booked");
    if (saved) setBooked(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("booked", JSON.stringify(booked));
  }, [booked]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  const filtered = services.filter(
    (s) =>
      (filter === "All" || s.category === filter) &&
      s.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedHospitals = userLocation
    ? [...hospitals].sort(
        (a, b) =>
          getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng) -
          getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng)
      )
    : hospitals;

  const handleBook = (item) => {
    if (!doctorId || !date || !time) {
      alert("Doctor, Date & Time select korte hobe!");
      return;
    }

    const doctor = doctors.find((d) => d.id === Number(doctorId));

    const newBooking = {
      id: `${item.id}-${doctorId}-${date}-${time}`,
      service: item,
      doctor,
      date,
      time,
    };

    setBooked((prev) => {
      if (prev.find((b) => b.id === newBooking.id)) return prev;
      return [...prev, newBooking];
    });

    setSelected(null);
    setDoctorId("");
    setDate("");
    setTime("");
  };

  const handleCancel = (id) => {
    setBooked((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-900 px-6 py-12">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-green-900 text-center mb-6">
        🇧🇩 Pet Care & Veterinary System
      </h1>

      {/* SEARCH */}
      <div className="max-w-md mx-auto mb-8 relative">
        <FaSearch className="absolute top-3 left-3 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* FILTER */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {["All", "General", "Dental", "Online"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl font-semibold ${
              filter === cat
                ? "bg-green-700 text-white"
                : "bg-white border border-gray-300 text-green-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SERVICES + DOCTORS */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* SERVICES */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-gray-900"
              onClick={() => setSelected(s)}
            >
              {s.emergency && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full float-right">
                  Emergency
                </span>
              )}

              <div className="flex justify-center mb-2">{s.icon}</div>

              <h3 className="text-lg font-bold text-green-900 text-center">
                {s.title}
              </h3>

              <p className="text-sm text-gray-800 text-center">
                {s.description}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(s);
                }}
                className="mt-4 w-full bg-green-700 text-white py-2 rounded-xl"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* DOCTORS */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
            <FaUserMd /> Doctors
          </h2>

          {doctors.map((d) => (
            <div key={d.id} className="p-3 border border-gray-200 rounded mt-3">
              <p className="font-semibold text-gray-900">{d.name}</p>
              <p className="text-sm text-gray-800">{d.specialty}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKED */}
      <div className="max-w-4xl mx-auto mt-14">
        <h2 className="text-2xl font-bold text-green-900 text-center">
          Booked Appointments
        </h2>

        {booked.length === 0 ? (
          <p className="text-center text-gray-600 mt-3">No bookings yet</p>
        ) : (
          booked.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 mt-3 rounded-xl border border-gray-200 flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-green-900">
                  {b.service.title}
                </p>
                <p className="text-sm text-gray-800">
                  👨‍⚕️ {b.doctor.name} | 📅 {b.date} | ⏰ {b.time}
                </p>
              </div>

              <button
                onClick={() => handleCancel(b.id)}
                className="text-red-600 font-semibold"
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>

      {/* HOSPITALS */}
      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-6">

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-green-900 mb-4">
            🏥 Closest Hospitals (BD)
          </h2>

          {sortedHospitals.map((h, i) => (
            <div key={i} className="p-3 border border-gray-200 rounded mb-3">
              <p className="font-semibold text-gray-900">{h.name}</p>
              {userLocation && (
                <p className="text-sm text-gray-800">
                  📍{" "}
                  {getDistance(
                    userLocation.lat,
                    userLocation.lng,
                    h.lat,
                    h.lng
                  ).toFixed(2)}{" "}
                  km away
                </p>
              )}
            </div>
          ))}
        </div>

        {/* MAP */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-green-900 mb-4">
            📍 Live Location Map
          </h2>

          {userLocation ? (
            <iframe
              className="w-full h-[350px] rounded-xl"
              src={`https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed`}
            />
          ) : (
            <p className="text-gray-600">Allow location access</p>
          )}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-2xl">

            <h2 className="text-xl font-bold text-green-900">
              {selected.title}
            </h2>

            <select
              className="w-full border border-gray-300 p-2 mt-4"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="w-full border border-gray-300 p-2 mt-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="time"
              className="w-full border border-gray-300 p-2 mt-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleBook(selected)}
                className="w-full bg-green-700 text-white py-2 rounded-xl"
              >
                Confirm Book
              </button>

              <button
                onClick={() => setSelected(null)}
                className="w-full bg-gray-200 py-2 rounded-xl"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}