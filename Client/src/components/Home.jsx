import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6">Welcome to Product Manager</h1>
            <p className="text-gray-600 mb-8">
                Manage your products efficiently with this full-stack MERN application.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h2 className="text-2xl font-semibold mb-4">View Products</h2>
                    <p className="mb-4">Browse all your products in a beautiful grid layout.</p>
                    <Link 
                        to="/products" 
                        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        View Products →
                    </Link>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
                    <p className="mb-4">Add new products to your inventory with a simple form.</p>
                    <Link 
                        to="/add-product" 
                        className="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Add Product →
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home