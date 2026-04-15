import React from "react";

export default function RescueTimeline({ data }) {
  const steps = [
    "Request Received",
    "Accepted",
    "On the way",
    "Arrived",
    "Treating",
    "Rescued",
  ];

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-lg">

      <h2 className="font-bold mb-2">🚑 Live Progress</h2>

      {steps.map((step, i) => {
        const active = steps.indexOf(data?.status) >= i;

        return (
          <div key={i} className="flex items-center gap-2">

            <div className={`w-3 h-3 rounded-full ${active ? "bg-green-500" : "bg-gray-300"}`} />

            <span className={active ? "text-green-600" : "text-gray-400"}>
              {step}
            </span>

          </div>
        );
      })}

    </div>
  );
}