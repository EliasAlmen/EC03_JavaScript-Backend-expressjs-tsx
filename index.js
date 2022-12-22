require('dotenv').config()
const port = process.env.PORT;
const mongodb = require('./mongodbServer');
// const GraphQLInit = require('./mongodbgrapQLServer')
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
//graphQL
const { graphqlHTTP } = require('express-graphql')


// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//graphQL
app.use('/graphql', graphqlHTTP({
    schema: require('./schemas/graphQL/graphqlSchema'),
    graphiql: true
}))

//Controller PredefinedProducts
const PredefinedProductsController = require('./controllers/controller-PredefinedProducts')
app.use('/api/predefinedproducts', PredefinedProductsController)

//Controller CrudProducts
const CrudProductsController = require('./controllers/controller-CrudProducts')
app.use('/api/crudproducts', CrudProductsController)

//Controller MongoProducts
const MongoProductController = require('./controllers/controller-MongoProducts')
app.use('/api/mongoproducts', MongoProductController)

//Controller MongoAuth
const MongoAuthController = require('./controllers/controller-auth')
app.use('/api/mongousers', MongoAuthController)



// express
app.listen(port, () => {
    console.log(`webApi is listening on http://localhost:${port}`)
    mongodb();
});