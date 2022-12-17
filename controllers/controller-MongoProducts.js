const express = require("express");
const controller = express.Router();
const mongoProductSchema = require('../schemas/mongoProductSchema')
const { auth } = require('../middleware/middleware-auth')

// public routes
controller.route('/')
    .get(async (req, res) => {
        const products = []
        const list = await mongoProductSchema.find()
        if (list) {
            for (let product of list) {
                products.push({
                    articleNumber: product._id,
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    tag: product.tag,
                    price: product.price,
                    rating: product.rating,
                    imageName: product.imageName
                })
            }
            res.status(200).json(products)
        }
        else
            res.status(400).json()
    })
controller.route('/:tag')
    .get(async (req, res) => {
        const products = []
        const list = await mongoProductSchema.find({ tag: req.params.tag })
        if (list) {
            for (let product of list) {
                products.push({
                    articleNumber: product._id,
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    tag: product.tag,
                    price: product.price,
                    rating: product.rating,
                    imageName: product.imageName
                })
            }
            res.status(200).json(products)
        }
        else
            res.status(400).json()
    })
controller.route('/:tag/:take')
    .get(async (req, res) => {
        const products = []
        const list = await mongoProductSchema.find({ tag: req.params.tag }).limit(req.params.take)
        if (list) {
            for (let product of list) {
                products.push({
                    articleNumber: product._id,
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    tag: product.tag,
                    price: product.price,
                    rating: product.rating,
                    imageName: product.imageName
                })
            }
            res.status(200).json(products)
        }
        else
            res.status(400).json()
    })
controller.route('/mongo/details/:articleNumber')
    .get(async (req, res) => {
        const product = await mongoProductSchema.findById(req.params.articleNumber)
        if (product) {
            res.status(200).json({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                tag: product.tag,
                price: product.price,
                rating: product.rating,
                imageName: product.imageName
            })
        } else
            res.status(404).json()
    })

// Auth routes
controller.route('/')
    .post(auth, async (req, res) => {
        const { name, description, category, tag, price, rating, imageName } = req.body

        if (!name || !price)
            res.status(400).json({ text: 'Name price.' })

        const duplicated = await mongoProductSchema.findOne({ name })
        if (duplicated)
            res.status(409).json({ text: 'Error: Name is currently occupied in database.' })
        else {
            const product = await mongoProductSchema.create({
                name,
                description,
                category,
                tag,
                price,
                rating,
                imageName
            })
            if (product)
                res.status(201).json({ text: `Success! created: ${product._id}.` })
            else
                res.status(400).json({ text: '400 error, something went wrong.' })
        }
    })
controller.route('/:articleNumber')
    .delete(auth, async (req, res) => {
        if (!req.params.articleNumber) {
            res.status(400).json('Cant delete MongoProduct, no data.')
        }

        const mongoProduct = await mongoProductSchema.findById(req.params.articleNumber)
        if (mongoProduct) {
            await mongoProductSchema.deleteOne(mongoProduct)
            res.status(200).json({ text: `MongoProduct ${req.params.articleNumber} deleted.` })
        } else {
            res.status(404).json({ text: `MongoProduct ${req.params.articleNumber} not found.` })
        }
    })
controller.route('/mongo/update/:articleNumber')
    .put(auth, async (req, res) => {
        if (!req.params.articleNumber) {
            res.status(400).json({ text: 'Cant find MongoProduct, no data.' })
        }
        console.log(req.params.articleNumber);
        console.log(req.body)

        const product = await mongoProductSchema.findByIdAndUpdate(req.params.articleNumber, req.body, { new: true })

        if (!product) {
            return res.status(404).json({ text: 'could not find that product' })
        }

        res.status(200).json(product)

    })





module.exports = controller;
