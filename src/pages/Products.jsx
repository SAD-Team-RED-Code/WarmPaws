import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";   // ← এটা আছে ধরে নিচ্ছি

const Products = () => {
  const allProducts = [
    { id: 1, name: "Premium Dog Food", price: 40, type: "Food", category: "Premium", image: "/images/product1.jpg" },
    { id: 2, name: "Cat Toy Set", price: 15, type: "Accessories", category: "", image: "/images/product2.jpg" },
    { id: 3, name: "Organic Cat Food", price: 20, type: "Food", category: "Organic", image: "/images/product3.jpg" },
    { id: 4, name: "Pet Bed", price: 55, type: "Accessories", category: "", image: "/images/product4.jpg" },
    { id: 5, name: "Normal Dog Food", price: 25, type: "Food", category: "Normal", image: "/images/product5.jpg" },
    { id: 6, name: "Brand Cat Food", price: 30, type: "Food", category: "Brand", image: "/images/product6.jpg" },
    { id: 7, name: "Pet Collar Set", price: 18, type: "Accessories", category: "", image: "/images/product7.jpg" },
    { id: 8, name: "Chew Toys", price: 12, type: "Accessories", category: "", image: "/images/product8.jpg" },
    { id: 9, name: "Catnip Toy", price: 10, type: "Accessories", category: "", image: "/images/product9.jpg" },
    { id: 10, name: "Luxury Pet Bed", price: 75, type: "Accessories", category: "", image: "/images/product10.jpg" },
  ];

  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortOption, setSortOption] = useState("");

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const filteredProducts = allProducts
    .filter((product) => 
      (typeFilter ? product.type === typeFilter : true) &&
      (categoryFilter ? product.category === categoryFilter : true) &&
      product.price <= maxPrice
    )
    .sort((a, b) => {
      if (sortOption === "low") return a.price - b.price;
      if (sortOption === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-pink-50 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-12">
        Pet Store
      </h1>

      <div className="flex gap-8 max-w-7xl mx-auto">
        {/* Sidebar Filters */}
        <div className="w-72 bg-white p-6 rounded-3xl shadow-xl sticky top-24 h-max">
          <h2 className="text-2xl font-bold text-orange-700 mb-6">Filters</h2>

          {/* Type Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Type</h3>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCategoryFilter("");
              }}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            >
              <option value="">All</option>
              <option value="Food">Food</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Category Filter */}
          {typeFilter === "Food" && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              >
                <option value="">All</option>
                <option value="Brand">Brand</option>
                <option value="Organic">Organic</option>
                <option value="Premium">Premium</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          )}

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Max Price: ${maxPrice}</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>

          {/* Sort */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Sort By</h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            >
              <option value="">Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          <button
            onClick={() => {
              setTypeFilter("");
              setCategoryFilter("");
              setMaxPrice(100);
              setSortOption("");
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl w-full font-semibold"
          >
            Reset Filters
          </button>
        </div>

        {/* Products Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-3xl shadow-lg p-5 text-center hover:scale-105 transition-transform duration-300 hover:shadow-2xl cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-44 w-full object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-bold text-orange-700">{product.name}</h3>
              <p className="text-orange-600 font-semibold mb-4">${product.price}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();          // ← এটা না দিলে details পেজে চলে যাবে
                  addToCart(product);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl w-full font-semibold"
              >
                Add to Cart
              </button>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No products match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;