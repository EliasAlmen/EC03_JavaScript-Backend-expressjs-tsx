const { request, response } = require("express");
const express = require("express");
const PredefinedProducts = require("../data/PredefinedProducts_database");
const controller = express.Router();

controller.param('articleNumber', (httpRequest, httpResponse, next, articleNumber) => {
    httpRequest.PredefinedProduct = PredefinedProducts.find((x) => x.articleNumber == articleNumber);
    next();
});

controller.route('/details/:articleNumber').get((httpRequest, httpResponse) => {
    if(httpRequest.PredefinedProduct != undefined)
        httpResponse.status(200).json(httpRequest.PredefinedProduct)
    else
        httpResponse.status(404).json()
});

controller.param('tag', (httpRequest, httpResponse, next, tag) => {
    httpRequest.PredefinedProduct = PredefinedProducts.filter(e => e.tag == tag)
    next();
});

controller.route('/:tag').get((httpRequest, httpResponse) => {
    if (httpRequest.PredefinedProducts != undefined)
        httpResponse.status(200).json(httpRequest.PredefinedProducts);
    else httpResponse.status(404).json();
});

controller.route('/:tag/:take').get((httpRequest, httpResponse) => {
    let tempList = [];
    for (let i = 0; i < Number(httpRequest.params.take); i++) {
        list.push(httpRequest.PredefinedProducts[i]);
    }
    httpResponse(200).json(tempList);
});


module.exports = controller;
