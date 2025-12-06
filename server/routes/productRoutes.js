const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// GET /products/
router.get('/', async(req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({message:"Product details received",
            data:products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
})

// GET /products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// POST /products/
router.post('/', async (req, res) => {
    try {
        const { name, price, image, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: "name and price required" });
        }
        
        const product = new Product({ name, price, image, description })
        
        await product.save()
        res.status(201).json({ message: "product added", data: product })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// patch /products/:id
router.patch('/:id', async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }   // returns updated document
        );

        if (!updated) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({
            message: "Product updated",
            data: updated
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /products/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({
            message: "Product deleted",
            data: deleted
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router
