import React, { useEffect, useState } from "react";

const WinterCareTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/tips.json`)
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading tips:", err);
        setLoading(false);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(tips.length);
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-blue-500 font-semibold">
        Loading winter care tips...
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-12">
        Winter Care Tips for Pets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tips.slice(0, visibleCount).map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-3xl shadow-xl p-6 text-center hover:scale-105 transition-transform duration-300 border-2 border-blue-100"
          >
            <img
              src={`${import.meta.env.BASE_URL}${tip.image}`}
              alt={tip.title}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <h3 className="text-xl font-bold text-blue-700 mb-2">{tip.title}</h3>
            <p className="text-blue-800/90 text-sm mb-4">{tip.description}</p>

            <div className="text-sm text-gray-600 mb-4">
              <p>
                <strong>Provider:</strong> {tip.provider}
              </p>
              <p>
                <strong>Email:</strong> {tip.email}
              </p>
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold transition">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {visibleCount < tips.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default WinterCareTips;
