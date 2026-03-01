// src/pages/ProductDetails.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";

// Products পেজ থেকে কপি করা allProducts array
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

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-pink-50 flex items-center justify-center py-12 px-6">
        <p className="text-2xl md:text-3xl font-bold text-orange-600 text-center">
          প্রোডাক্ট পাওয়া যায়নি 😿
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-pink-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg font-medium transition-colors"
        >
          ← Back to Store
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/2 bg-gradient-to-br from-orange-50 to-yellow-50 p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[500px] w-full object-contain rounded-2xl shadow-lg"
              />
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-orange-700 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="text-5xl font-bold text-orange-600 mb-8">
                ${product.price}
              </div>

              <div className="space-y-4 text-gray-700 text-lg mb-10">
                <p><span className="font-semibold text-gray-800">Type:</span> {product.type}</p>
                {product.category && (
                  <p><span className="font-semibold text-gray-800">Category:</span> {product.category}</p>
                )}
                <p className="mt-6 text-gray-600 leading-relaxed">
                  Premium quality {product.type.toLowerCase()} designed with love for your furry friend. 
                  Ensures comfort, fun, and complete satisfaction.
                </p>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xl font-bold px-10 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 w-full md:w-auto"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;