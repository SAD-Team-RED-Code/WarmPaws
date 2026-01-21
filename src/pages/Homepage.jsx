import React from "react";
import HeroSwiper from "../components/HeroSwiper";
import WinterCareSection from "../components/WinterCareSection";
import WinterCareTips from "../components/WinterCareTips";
import ExpertVets from "../components/ExpertVets";


const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-pink-50">
      {/* Hero slider */}
      <HeroSwiper />

      {/* Popular Winter Care Services */}
      <WinterCareSection />
      {/* WinterCareTips */}
      <WinterCareTips />
      {/* Expert vets */}
      <ExpertVets />
    </div>
  );
};

export default Homepage;
