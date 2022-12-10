require('dotenv').config()
const port = process.env.PORT;
const mongodb = require('./mongodbServer');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//Controller PredefinedProducts
const PredefinedProductsController = require('./controllers/controller-PredefinedProducts')
app.use('/api/products', PredefinedProductsController)

//Controller CrudProducts
const CrudProductsController = require('./controllers/controller-CrudProducts')
app.use('/api/crudproducts', CrudProductsController)

//Controller MongoProducts
const MongoProductController = require('./controllers/controller-MongoProducts')
app.use('/api/mongoproducts', MongoProductController)

//Controller MongoAuth
const MongoAuthController = require('./controllers/controller-auth')
app.use('/api/mongousers', MongoAuthController)

// mongoDB

mongodb();

// express
app.listen(port, () => console.log(`webApi is listening on http://localhost:${port}`));