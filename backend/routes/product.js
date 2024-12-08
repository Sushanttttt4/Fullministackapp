const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Create a product
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = new Product({ name, price, description, createdBy: req.user.id });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
});

// Update a product
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description },
            { new: true }
        );
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
});

// Delete a product
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

module.exports = router;
