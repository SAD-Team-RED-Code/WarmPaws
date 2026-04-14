import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AboutUs = () => {
  const [date, setDate] = useState(new Date());

  // Notify toast function
  const handleNotify = () => {
    toast.success("🎉 You’ll be notified when the About Us page is ready!", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });
  };

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-200 text-center px-4">
      {/* Hero heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-amber-900 animate-bounce drop-shadow-lg mb-6">
        🐾 Next update is Coming Soon!
      </h1>

      {/* Live Clock */}
      <h2 className="font-bold text-amber-800 text-3xl mb-5">
        {date.toLocaleTimeString()}
      </h2>

      {/* Description */}
      <p className="mt-3 text-lg text-amber-900/90 animate-pulse max-w-xl">
        Welcome to WarmPaws! We are crafting a cozy winter companion platform for
        pet owners. Stay tuned for services, tips, and expert advice to keep your
        furry friends safe and warm during winter ❄️
      </p>

      {/* Notify button */}
      <div className="mt-10">
        <button
          onClick={handleNotify}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105 animate-pulse"
        >
          Notify Me
        </button>
      </div>

      {/* Footer credit */}
      <div className="absolute bottom-6 text-amber-900 text-sm animate-pulse">
        Developed with ❤️ by <span className="font-bold">Red_Coders</span>
      </div>
    </div>
  );
};

export default AboutUs;
