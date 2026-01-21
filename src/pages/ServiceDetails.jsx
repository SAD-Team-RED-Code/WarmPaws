import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "" });

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/services.json`)
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((s) => s.serviceId === parseInt(id));
                setService(found);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading service:", err);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Service booked successfully!");
        setFormData({ name: "", email: "" });
    };

    if (loading) {
        return (
            <div className="text-center py-16 text-orange-500 font-semibold">
                Loading service details...
            </div>
        );
    }

    if (!service) {
        return (
            <div className="text-center py-16 text-red-500 font-semibold">
                Service not found
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-200">


            <section className="max-w-4xl mx-auto px-6 py-16 bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-200">
                {/* Service Info */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
                    <img
                        src={`${import.meta.env.BASE_URL}${service.image}`}
                        alt={service.serviceName}
                        className="w-full h-64 object-cover rounded-2xl mb-6"
                    />
                    <h1 className="text-3xl font-bold text-orange-700 mb-4">{service.serviceName}</h1>
                    <p className="text-gray-700 mb-2">
                        <strong>Provider:</strong> {service.providerName}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Email:</strong> {service.providerEmail}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Category:</strong> {service.category}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Price:</strong> ${service.price}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Rating:</strong> ⭐ {service.rating}
                    </p>
                    <p className="text-gray-800 mt-4">{service.description}</p>


                    {/* Book Service Form */}
                    <div className="bg-white rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-orange-600 mb-6">Book This Service</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                {/* Name Field */}
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="text-gray-700 font-medium mb-1">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-gray-700 font-medium mb-1">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full border text-black border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                            >
                                Book Now
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetails;
