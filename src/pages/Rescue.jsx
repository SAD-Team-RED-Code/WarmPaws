import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { db } from "../firebase/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const containerStyle = {
  width: "100%",
  height: "380px",
  borderRadius: "16px",
};

const defaultCenter = {
  lat: 23.8103,
  lng: 90.4125,
};

export default function Rescue() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  const [form, setForm] = useState({
    animal: "",
    location: "",
    description: "",
    image: "",
    lat: defaultCenter.lat,
    lng: defaultCenter.lng,
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((p) => ({
        ...p,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleMapClick = (e) => {
    setForm((p) => ({
      ...p,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }));
  };

  const handleSubmit = async () => {
    if (!form.animal || !form.location) return;

    await addDoc(collection(db, "rescue_cases"), {
      ...form,
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    alert("Rescue request sent!");

    setForm({
      animal: "",
      location: "",
      description: "",
      image: "",
      lat: defaultCenter.lat,
      lng: defaultCenter.lng,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-red-50 to-gray-100 px-6 py-10 text-gray-900">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600">
          Animal Rescue System
        </h1>
        <p className="text-gray-600 mt-2">
          Report injured animals and help vets respond faster
        </p>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

        {/* FORM CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border">

          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            🐾 Rescue Report Form
          </h2>

          <div className="space-y-3">

            <input
              className="w-full border rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Animal type (Dog, Cat...)"
              value={form.animal}
              onChange={(e) =>
                setForm({ ...form, animal: e.target.value })
              }
            />

            <input
              className="w-full border rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Location name"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <textarea
              className="w-full border rounded-lg p-3 text-gray-900 h-28 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Describe animal condition (injury, situation...)"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Proof Image (optional)
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full border p-2 rounded-lg bg-gray-50"
              />
            </div>

            {/* PREVIEW */}
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="w-full h-44 object-cover rounded-lg border mt-2"
              />
            )}

            {/* LOCATION INFO */}
            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
              <p>📍 Latitude: <b>{form.lat.toFixed(5)}</b></p>
              <p>📍 Longitude: <b>{form.lng.toFixed(5)}</b></p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-lg font-semibold shadow"
            >
              🚑 Send Rescue Request
            </button>

          </div>
        </div>

        {/* MAP CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-4 border">

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            📍 Select Rescue Location
          </h2>

          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: form.lat, lng: form.lng }}
              zoom={13}
              onClick={handleMapClick}
            >
              <Marker position={{ lat: form.lat, lng: form.lng }} />
            </GoogleMap>
          ) : (
            <div className="text-center text-gray-500 py-20">
              Loading map...
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-3">
            Click on map to pin exact rescue location
          </p>
        </div>

      </div>
    </div>
  );
}