import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";

const demoImages = {
  dogFood:
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
  catToy:
    "https://images.unsplash.com/photo-1601758123927-19634b2a4b1a?auto=format&fit=crop&w=800&q=80",
  petBed:
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
  accessories:
    "https://images.unsplash.com/photo-1611175694980-8f5b1b2c4a9a?auto=format&fit=crop&w=800&q=80",
};

const initialProducts = [
  { id: 1, name: "Premium Dog Food", price: 40, type: "Food", category: "Premium", rating: 4.8, image: demoImages.dogFood },
  { id: 2, name: "Cat Toy Set", price: 15, type: "Accessories", category: "Toy", rating: 4.3, image: demoImages.catToy },
  { id: 3, name: "Organic Cat Food", price: 20, type: "Food", category: "Organic", rating: 4.6, image: demoImages.dogFood },
  { id: 4, name: "Pet Bed", price: 55, type: "Accessories", category: "Comfort", rating: 4.7, image: demoImages.petBed },
  { id: 5, name: "Normal Dog Food", price: 25, type: "Food", category: "Normal", rating: 4.1, image: demoImages.dogFood },
  { id: 6, name: "Brand Cat Food", price: 30, type: "Food", category: "Brand", rating: 4.5, image: demoImages.dogFood },
  { id: 7, name: "Pet Collar Set", price: 18, type: "Accessories", category: "Wearable", rating: 4.2, image: demoImages.accessories },
  { id: 8, name: "Chew Toys", price: 12, type: "Accessories", category: "Toy", rating: 4.4, image: demoImages.catToy },
  { id: 9, name: "Catnip Toy", price: 10, type: "Accessories", category: "Toy", rating: 4.0, image: demoImages.catToy },
  { id: 10, name: "Luxury Pet Bed", price: 75, type: "Accessories", category: "Luxury", rating: 4.9, image: demoImages.petBed },
];

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortOption, setSortOption] = useState("");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setWishlist(saved);
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addToCartLocal = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) =>
        (typeFilter ? p.type === typeFilter : true) &&
        (categoryFilter ? p.category === categoryFilter : true) &&
        p.price <= maxPrice &&
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOption === "low") return a.price - b.price;
        if (sortOption === "high") return b.price - a.price;
        if (sortOption === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [typeFilter, categoryFilter, maxPrice, sortOption, search]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* MAIN AREA */}
      <div className="flex-1 pr-0 lg:pr-80">

        {/* HEADER */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-600">Pet Store</h1>
          <div className="text-gray-700 font-semibold">
            Cart: <span className="text-orange-600">{cart.length}</span>
          </div>
        </div>

        <div className="flex gap-6 p-6">

          {/* FILTERS */}
          <div className="w-72 bg-white p-5 rounded-2xl shadow text-gray-800">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Filters</h2>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <select className="w-full border p-2 rounded mb-3" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All Type</option>
              <option value="Food">Food</option>
              <option value="Accessories">Accessories</option>
            </select>

            <select className="w-full border p-2 rounded mb-3" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Category</option>
              <option value="Premium">Premium</option>
              <option value="Organic">Organic</option>
              <option value="Brand">Brand</option>
              <option value="Toy">Toy</option>
              <option value="Luxury">Luxury</option>
            </select>

            <h3 className="font-semibold text-gray-700">Max Price: ${maxPrice}</h3>
            <input type="range" min="0" max="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" />

            <select className="w-full border p-2 rounded mt-3" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Default</option>
              <option value="low">Price Low</option>
              <option value="high">Price High</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* PRODUCTS */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
                <img src={p.image} className="h-40 w-full object-cover rounded-xl" />
                <h3 className="font-bold text-gray-900 mt-2">{p.name}</h3>
                <p className="text-orange-600 font-bold">${p.price}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => addToCartLocal(p)}
                    className="flex-1 bg-orange-500 text-white py-1 rounded"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="px-3 bg-gray-200 rounded"
                  >
                    ♥
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CART SIDEBAR */}
      <div className="w-80 fixed right-0 top-0 h-full bg-white shadow-xl p-5 overflow-y-auto border-l">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cart</h2>

        {cart.length === 0 && <p className="text-gray-500">Your cart is empty</p>}

        {cart.map((item) => (
          <div key={item.id} className="border-b py-3">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-gray-600">${item.price} x {item.qty}</p>

            <div className="flex justify-between mt-2">
              <span className="text-orange-600 font-bold">${item.price * item.qty}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
            </div>
          </div>
        ))}

        <div className="mt-5 border-t pt-4">
          <h3 className="text-xl font-bold text-gray-900">Total: ${total}</h3>
          <button className="w-full mt-3 bg-green-500 text-white py-2 rounded">
            Checkout
          </button>
        </div>
      </div>

    </div>
  );
};

export default Products;