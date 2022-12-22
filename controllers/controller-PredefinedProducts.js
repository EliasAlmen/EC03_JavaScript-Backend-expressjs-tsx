const { request, response } = require("express")
const express = require("express")
const controller = express.Router();
let products = require("../db/db-PredefinedProducts")

controller.param('articleNumber', (httpRequest, httpResponse, next, articleNumber) => {
    httpRequest.product = products.find(product => product.articleNumber == articleNumber);
    next();
});

controller.route('/:articleNumber')
    .get((httpRequest, httpResponse) => {
    if (httpRequest.product != undefined)
        httpResponse.status(200).json(httpRequest.product)
    else
        httpResponse.status(404).json()
});

controller.param('tag', (httpRequest, httpResponse, next, tag) => {
    httpRequest.products = products.filter(e => e.tag == tag)
    next();
});

controller.route('/:tag')
    .get((httpRequest, httpResponse) => {
    if (httpRequest.products != undefined)
        httpResponse.status(200).json(httpRequest.products);
    else
        httpResponse.status(404).json();
});

controller.route('/:tag/:take')
    .get((httpRequest, httpResponse) => {
    let tempList = []
    for (let i = 0; i < Number(httpRequest.params.take); i++)
        tempList.push(httpRequest.products[i])

    httpResponse.status(200).json(tempList);
});

controller.route('/')
    .get((httpRequest, httpResponse) => {
    httpResponse.status(200).json(products);
});


module.exports = controller;
