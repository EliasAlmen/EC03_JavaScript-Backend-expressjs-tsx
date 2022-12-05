const port = process.env.PORT || 5000
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Controller PredefinedProducts
const PredefinedProductsController = require('./controllers/PredefinedProductsController')
app.use('/api/products', PredefinedProductsController)

//Controller CrudProducts
const CrudProductsController = require('./controllers/CrudProductsController')
app.use('/api/crudproducts', CrudProductsController)

app.listen(port, () => console.log(`webApi is running on http://localhost:${port}`));