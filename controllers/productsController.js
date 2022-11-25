const { request, response } = require('express')
const express = require('express')
const controller = express.Router()
let crudProducts = require('../data/simulated_database')

controller.param("id", (req, res, next, id) => {
    req.crudProduct = crudProducts.find(crudProduct => crudProduct.id == id)
    next()
})


// http://localhost:5000/api/crudProducts/

controller.route('/')
    .post((httpRequest, httpResponse) => {
        let crudProduct = {
            id: (crudProducts[crudProducts.length - 1])?.id > 0 ? (crudProducts[crudProducts.length - 1])?.id + 1 : 1,
            name: httpRequest.body.name,
            category: httpRequest.body.category,
            description: httpRequest.body.description,
            rating: httpRequest.body.rating,
            price: httpRequest.body.price
        }
        crudProducts.push(crudProduct)
        httpResponse.status(201).json(crudProduct)
    })
    .get((httpRequest, httpResponse) => {
        httpResponse.status(200).json(crudProducts);
    })

// http://localhost:5000/api/crudProducts/1

controller.route("/:id")
    .get((httpRequest, httpResponse) => {
        if (httpRequest.crudProduct != undefined)
            httpResponse.status(200).json(httpRequest.crudProduct)
        else
            httpResponse.status(404).json
    })
    .put((httpRequest, httpResponse) => {
        if (httpRequest.crudProduct != undefined) {
            crudProducts.forEach(crudProduct => {
                if (crudProduct.id == httpRequest.crudProduct.id) {
                    crudProduct.name = httpRequest.body.name ? httpRequest.body.name : crudProduct.name
                    crudProduct.category = httpRequest.body.category ? httpRequest.body.category : crudProduct.category
                    crudProduct.description = httpRequest.body.description ? httpRequest.body.description : crudProduct.description
                    crudProduct.rating = httpRequest.body.rating ? httpRequest.body.rating : crudProduct.rating
                    crudProduct.price = httpRequest.body.price ? httpRequest.body.price : crudProduct.price
                }
            })
            httpResponse.status(200).json(httpRequest.crudProduct)
        }
        else
            httpResponse.status(404).json
    })
    .delete((httpRequest, httpResponse) => {
        if (httpRequest.crudProduct != undefined) {
            crudProducts = crudProducts.filter(crudProduct => crudProduct.id !== httpRequest.crudProduct.id)
            httpResponse.status(204).json()
        }
        else
            httpResponse.status(404).json
    })

module.exports = controller