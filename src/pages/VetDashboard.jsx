import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { collection, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function VetDashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "rescue_cases"), (snap) => {
      setCases(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const updateStatus = async (id, status) => {
    const ref = doc(db, "rescue_cases", id);

    await updateDoc(ref, {
      status,
      timeline: arrayUnion(status),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Vet Dashboard
      </h1>

      <div className="max-w-5xl mx-auto space-y-5">

        {cases.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-xl shadow">

            <h2 className="font-bold text-lg">🐾 {c.animal}</h2>
            <p>📍 {c.location}</p>
            <p>{c.description}</p>

            <p className="mt-2 font-bold text-red-600">
              Status: {c.status}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">

              {["Accepted", "On the way", "Arrived", "Treating", "Rescued"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(c.id, s)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  {s}
                </button>
              ))}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}