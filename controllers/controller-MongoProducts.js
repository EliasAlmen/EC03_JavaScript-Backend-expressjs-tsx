const express = require("express")
const controller = express.Router();

const mongoProductSchema = require('../schemas/mongoProductSchema')


// Unsecured routes
controller.route('/')
.get(async(req, res) =>{
    try {
        res.status(200).json(await mongoProductSchema.find())
    } catch {
        res.status(400).json()
    }
})
controller.route('/:tag')
.get((req, res) =>{

})
controller.route('/:tag/:take')
.get((req, res) =>{

})
controller.route('/details/:articleNumber')
.get((req, res) =>{

})

// Secured routes

module.exports = controller;
