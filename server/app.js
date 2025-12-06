const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');

// Middleware
app.use(cors()); // note: always use cors first, before any route being used
app.use(express.json());

// Routes
app.use('/products', productRouter);
app.use('/users',userRouter);

// Database connection
async function main() {
    await mongoose.connect(process.env.MONGODBURL);
}

main()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Database connection error:", err));

// Root route
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Welcome to the API',
        endpoints: {
            products: {
                GET: '/products',
                POST: '/products',
                GET_SINGLE: '/products/:id',
                PATCH: '/products/:id',
                DELETE: '/products/:id'
            }
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});