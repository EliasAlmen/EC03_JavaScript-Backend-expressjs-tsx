const express = require("express");
const controller = express.Router();
const bcrypt = require('bcryptjs');
const jwebtoken = require('jsonwebtoken')
const { generateAccessToken } = require('../middleware/middleware-auth')

const mongoUsersSchema = require('../schemas/mongoUsersSchema')

// public routes
controller.route('/register').post(async (req, res) => {
    const { name, password } = req.body
    
    if (!name || !password)
        res.status(400).json({ text: 'Please provide name and password.' })
    
    const checkExists = await mongoUsersSchema.findOne({ name })
    if (checkExists)
        res.status(409).json({ text: 'Name taken.' })
    else {
        const salt = await bcrypt.genSalt(10)
        const passHash = await bcrypt.hash(password, salt)

        const user = await mongoUsersSchema.create({
            name,
            password: passHash
        })

        if (user) 
            res.status(201).json({text: `Success! ${user} created.`})
        else 
            res.status(400).json({text:'Error: 400 something went wrong.'})
    }
})
controller.route('/login').post(async (req, res) => {
    const { name, password } = req.body

    if (!name || !password)
        res.status(400).json({ text: 'Please provide name and password.' })
    
    const checkExistsUser = await mongoUsersSchema.findOne({ name })
    if (checkExistsUser && await bcrypt.compare(password, checkExistsUser.password)) {
        res.status(200).json({
            accessToken: generateAccessToken(checkExistsUser._id)
        })
    } else {
        res.status(400).json({ text: 'Wrong password or username.' })
    }
})

module.exports = controller;
