import React from 'react'
import Products from './components/Products'
import AddProduct from './components/AddProduct'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

const App = () => {
  return (
    <Router>
        <nav className='bg-gray-800 p-4 shadow-lg'>
            <div className='max-w-7xl mx-auto'>
                <ul className='flex space-x-6'>
                    <li>
                        <Link 
                            to="/" 
                            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/add-product"
                            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Add Product
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 px-4">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/add-product" element={<AddProduct/>}/>
            </Routes>
        </main>
    </Router>
  )
}

export default App