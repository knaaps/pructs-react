import React, { useState, useEffect } from 'react'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            
            if (response.ok) {
                setProducts(data.data || []);
            } else {
                setError(data.error || 'Failed to fetch products');
            }
        } catch (err) {
            setError('Network error. Please check if server is running.');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading products...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            
            {products.length === 0 ? (
                <p className="text-gray-600">No products found. Add some products first!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div 
                            key={product._id} 
                            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                        >
                            {product.image && (
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                            )}
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            <p className="text-lg font-bold text-blue-600">${product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Products