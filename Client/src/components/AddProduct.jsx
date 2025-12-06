import React, { useState } from "react";

import{useNavigate} from 'react-router-dom'

const AddProduct = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validate required fields
        if (!formData.name || !formData.price) {
            setError("Name and price are required");
            setLoading(false);
            return;
        }

        // Convert price to number
        const productData = {
            ...formData,
            price: parseFloat(formData.price) || 0
        };

        try {
            const res = await fetch("http://localhost:3000/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Product added successfully!");
                // Reset form
                setFormData({
                    name: "",
                    price: "",
                    image: "",
                    description: ""
                });
            } else {
                setError(data.error || "Failed to add product");
            }

            navigate('/products');

        } catch (err) {
            setError("Network error. Please check if the server is running.");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid place-items-center bg-amber-200 py-8 min-h-screen">
            <form
                className="border p-6 rounded-xl shadow-lg bg-white w-96"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Name:</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Price:</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Enter price"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Image URL:</label>
                    <input
                        type="text"
                        placeholder="Enter image URL"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Description:</label>
                    <textarea
                        placeholder="Product description"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="4"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;